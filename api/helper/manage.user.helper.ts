import { ManageUserService } from '../services/manage.user.service';
import { AddUserService } from '../services/adduser.service';
import { LDAPService } from '../services/ldap.service';
import Promise = require('tspromise');
import LoggerUtil from './../logs/log';
import { User } from '../model/user';
import { UserDetails } from '../model/manage.user';
import { Address, ManagementBP, Region, Property } from '../model/common';
import { SearchUsersForUpdateRequest, UserProfileWithBPHierarchyRequest, ResetPwdDtlsRequest,UserRequest, ChangeAdminForAssociateUserRequest,
    UpdateUserRequest, DeactivateUserRequest, GetAssociatesRequest, DissociateCustomerFromUserRequest, AssociateUser2CustomerRequest } from '../request/user.request';
import * as cst from './../util/constant';
import {AddUserTxnRequest} from '../request/addusertxn.request';
import { CommonUtil } from './../util/common.util';
import * as _ from "lodash";
import { EmailHelper } from './../helper/email.helper';
import {ChangePwdRequest} from '../request/changepwd.request';
import { AddUserHelper } from './../helper/adduser.helper'

export class ManageUserHelper {


   private manageUserService: ManageUserService;
   private addUserService: AddUserService;
   private ldapService:LDAPService;
   private emailHelper: EmailHelper;

   constructor() {
         this.manageUserService = new ManageUserService();
         this.addUserService = new AddUserService();
         this.ldapService = new LDAPService();
         this.emailHelper = new EmailHelper();
   }


    public searchUsersForUpdate(req: any): Promise<any> {

        let inReq = this.populateSearchUsersForUpdateRequest(req);

        var p = new Promise((resolve, reject) => {
            this.manageUserService.searchUsersForUpdate(inReq).then(s => {
                if(null != s && null != s.updateUserSet && s.updateUserSet.length > 0){
                  LoggerUtil.debug("FOUND USERS FOR THE SEARCH CRITERIA:::"+s.updateUserSet.length)
                    let userAry: any[] = s.updateUserSet;
                    let userList = new Array<User>();
                    userAry.forEach(u => {
                        var user = new User();
                        user.firstName = u.firstName;
                        user.lastName = u.lastName;
                        user.userName = u.userName;
                        user.securityRole = u.securityRole;
                        user.email = u.email;
                        if(u.securityRole == 'Agent' || u.securityRole == 'Customer Admin'){
                            user.securityRoleDisplayName = u.userTypeDisplay;
                        }else{
                            user.securityRoleDisplayName = "NA";
                        }
                        if(u.userName != req.session.bmfAdminSession.loggedInSapUserName){
                            userList.push(user);
                        }
                        if(this.isUpdatingOwnprofile(req.body.userCategory)){
                            userList.push(user);
                        }
                    });
                    if(null != s && undefined != s.bpDetails){
                        let bpDetails: any = {};
                        bpDetails = s.bpDetails;
		                }
                    resolve({userList,bpDetails:s.bpDetails});
                }else{
                   LoggerUtil.debug("NO USERS FOUND FOR THE SEARCH CRITERIA::")
                   resolve({userList:[]});
                }
            })
        });
        return p;
    }

    private populateSearchUsersForUpdateRequest(req: any): SearchUsersForUpdateRequest {

        let inReq = new SearchUsersForUpdateRequest();
        try{
          inReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
          inReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
          inReq.strPortal = "ADMIN_TOOL";
          inReq.searchString = req.body.searchString;
          inReq.searchCriteria = (req.body.searchType == 'CBP')?'BP':(req.body.searchType == 'BBP')?'BRKBP':req.body.searchType;
          inReq.userCategory = (req.body.userCategory != undefined)?req.body.userCategory.split(":")[1]:'ALL';
          if(req.body.searchType == cst.SEARCH_CRITERIA_CBP || req.body.searchType == cst.SEARCH_CRITERIA_BBP){
              inReq.userType = "NA";
          }else{
              inReq.userType = req.body.userCategory.split(":")[0];
          }
          inReq.webSecurityRole = req.session.bmfAdminSession.loggedInSapSecurityRole;
        }catch(err){
          LoggerUtil.error("ERROR======>"+err.message)
        }
        return inReq;
    }


    private isUpdatingOwnprofile(searchCategory: string): boolean {

        let isOwnprofile = (searchCategory != undefined)?searchCategory.split(":")[0]:'';
        if(isOwnprofile == "OWN"){return true;}
        return false;
    }


    public getUserDetailsForUpdate(req: any): Promise<any> {

        LoggerUtil.debug('bpnumber in helper:::'+req.body.bpNumber);
        let inReq =  this.populateUserProfileWithBPHierarchyRequest(req);
        var p = new Promise((resolve, reject) => {
          this.manageUserService.getUserProfileWithBPHierarchy(inReq).then(s => {
              var userDtls = new UserDetails();
              let user = new User();
              if(null != s && s.dataAvilableForInput){
                  user = this.populateUserDetails(s)
                  userDtls.user = user;
              }
              if(null != s && undefined != s.asscoiatedAdminProfileDO){
                  userDtls.associatedAdmin = this.populateAssociateAdminDetails(s);
              }
              let isBroker = CommonUtil.isBrokerOrBrokerAssociate(user.webSecurityRole);
              if(CommonUtil.hasAssociations(user.webSecurityRole)){
                  userDtls.mngtBPList = this.populateCustomerList(s,isBroker,user.brokerBPNumber);
              }
              resolve(userDtls);
          })
        })
        return p;
      }

      private populateUserDetails(s: any): User {

          let user = new User();
          try{
            user.firstName = s.userProfileDO.firstName;
            user.lastName = s.userProfileDO.lastName;
            user.ableToPayBills = (s.userProfileDO.billingAce == 'Y')
            user.ableToStartStopService = (s.userProfileDO.startStopAce == 'Y')
            user.altContactPhExtn = s.userProfileDO.altContactPhoneExtn;
            user.altPhoneNum = s.userProfileDO.altrContactPhone;
            user.billingAce = s.userProfileDO.billingAce;
            user.email = s.userProfileDO.emailId;
            user.faxNum = s.userProfileDO.faxNumber;
            user.phoneNum = s.userProfileDO.contactPhone;
            user.phoneNumExtn = s.userProfileDO.contactPhoneExtn;
            user.sapId = s.userProfileDO.sapId;
            user.securityRole = s.userProfileDO.securityRole;
            user.securityRoleDisplayName = s.userProfileDO.userTypeDisplay;
            user.startStopAce = s.userProfileDO.startStopAce;
            user.userName = s.userProfileDO.userName;
            user.userCategory = s.userProfileDO.userCategory;
            user.userType = s.userProfileDO.userType;
            user.webSecurityRole = s.userProfileDO.webSecurityRole;
            user.brokerBPNumber = s.userProfileDO.brokerBPNumber;
          }catch(err){
            LoggerUtil.error("ERROR=======>"+err.message)
          }
          return user;
      }

      private populateAssociateAdminDetails(s: any): User {

          let asssAdmin = new User();
          try{
            asssAdmin.firstName = s.asscoiatedAdminProfileDO.firstName;
            asssAdmin.lastName = s.asscoiatedAdminProfileDO.lastName;
            asssAdmin.userName = s.asscoiatedAdminProfileDO.userName;
            asssAdmin.phoneNum = s.asscoiatedAdminProfileDO.contactPhone;
            asssAdmin.altPhoneNum = s.asscoiatedAdminProfileDO.altrContactPhone;
            asssAdmin.faxNum = s.asscoiatedAdminProfileDO.faxNumber;
            asssAdmin.ableToPayBills = (s.asscoiatedAdminProfileDO.billingAce == 'Y')
            asssAdmin.ableToStartStopService = (s.asscoiatedAdminProfileDO.startStopAce == 'Y')
            asssAdmin.startStopAce = s.asscoiatedAdminProfileDO.startStopAce;
            asssAdmin.billingAce = s.asscoiatedAdminProfileDO.billingAce;
            asssAdmin.email = s.asscoiatedAdminProfileDO.emailId;
            asssAdmin.webSecurityRole = s.asscoiatedAdminProfileDO.webSecurityRole;
            asssAdmin.securityRoleDisplayName = s.asscoiatedAdminProfileDO.userTypeDisplay;
            asssAdmin.securityRole = s.asscoiatedAdminProfileDO.securityRole;
          }catch(err){
            LoggerUtil.error("ERROR=======>"+err.message)
          }
          return asssAdmin;
      }

      private populateCustomerList(s: any, isBroker:boolean, brokerBPNumber) : ManagementBP[]{

          let mngtList = new Array<ManagementBP>();
          try{
              let mngList = s.managementList;
              let rgnList = s.regionList;
              let propList = s.propertyList;
              var addUserHelper = new AddUserHelper();
              mngList.forEach((mng, i) => {
                  let mngBP = new ManagementBP();
                  mngBP.bpNumber = CommonUtil.substringBefore(mng.bpNumber,":")
                  let treeGUID = CommonUtil.substringAfter(mng.bpNumber, ":");
                  mngBP.managementName = mng.bpName;
                  mngBP.selected = mng.agentAssigned;
                  mngBP.strBPAddress = CommonUtil.createBpAddressStrFromObj(mng.bpAdress);
                  mngBP.newlyAddedBP = mng.newlyAddedBP;
                  mngBP.regionList = addUserHelper.getRegionList(rgnList,propList,mng.bpNumber,isBroker,brokerBPNumber,treeGUID);
                  mngtList.push(mngBP);
              })
          }catch(err){
            LoggerUtil.error("ERROR=======>"+err.message)
          }
          return mngtList;
      }

    private populateUserProfileWithBPHierarchyRequest(req: any): UserProfileWithBPHierarchyRequest {
        let inReq = new UserProfileWithBPHierarchyRequest();
        inReq.strUserName = req.body.userName;
        inReq.strPortal = cst.ADMIN_PORTAL;
        inReq.strCompanyCode = cst.GMESS_CC_0270;
        inReq.strLoggedInUserName = req.body.userDetails.loggedInSapUserName;
        return inReq;
    }

    public updateUser(req: any): Promise<any> {

        LoggerUtil.debug('updating user in helper::::'+JSON.stringify(req.body));
        let inReq = this.populateUpdateUserRequest(req);
        var p = new Promise((resolve, reject) => {
            this.manageUserService.updateUser(inReq).then(s => {
                if(undefined != s && s.dataAvailForInput){
                  this.emailHelper.updateUserConfirmEmail(req);
                  LoggerUtil.info("THE EMAIL HAS BEEN SENT ABOUT UPDATE INFORMATION:::::"+req.body.user.email);
                  resolve({userUpdated:true, user:req.body.user, fieldName:req.body.fieldName})
                }else{
                  resolve({userUpdated:false, user:req.body.user})
                }
            });
        });
        return p;
    }

    private populateUpdateUserRequest(req: any): UpdateUserRequest {

        let inReq = new UpdateUserRequest();
        let fieldIndicator: string = "";
        let fieldValue1 = cst.NA;
        let fieldValue2 = cst.NA;
        let fieldToUpdate = req.body.fieldName
        let user = req.body.user
        LoggerUtil.info("UPDATING:::"+fieldToUpdate+":::FOR THE USER:::"+user.userName)
        if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'name')){
            fieldIndicator = "N";
            fieldValue1 = user.firstName;
            fieldValue2 = user.lastName;
        }else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'email')){
            fieldIndicator = "E";
            fieldValue1 = user.email;
        }else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'phone')){
            fieldIndicator = "P";
            fieldValue1 = CommonUtil.getFormattedPhoneNumber(user.phoneNum);
            fieldValue2 = user.phoneNumExtn;
        }else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'altphone')){
            fieldIndicator = "A";
            fieldValue1 = CommonUtil.getFormattedPhoneNumber(user.altPhoneNum);
            fieldValue2 = user.phoneExtnAlt;
        }else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'fax')){
            fieldIndicator = "F";
            fieldValue1 = CommonUtil.getFormattedPhoneNumber(user.faxNum);
        }else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'sapid')){
            fieldIndicator = "SAP";
            fieldValue1 = user.sapId;
        }else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'accpriv')){
            fieldIndicator = "S";
            fieldValue1 = user.billingAce;
            fieldValue2 = user.startStopAce;
        }else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'BRKR_PROP_ACCESS')){
            fieldIndicator = "B";
            fieldValue1 = req.body.billingAce;
            fieldValue2 = req.body.startStopAce;
        }

        inReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
        inReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
        inReq.fieldValue1 = fieldValue1;
        inReq.fieldValue2 = fieldValue2;
        inReq.fieldIndicator = fieldIndicator;
        inReq.bpNumber = CommonUtil.isNotBlank(req.body.bpNumber)?req.body.bpNumber:''
        inReq.strPortal = cst.ADMIN_PORTAL;
        inReq.portal = cst.ADMIN_PORTAL;
        inReq.userName = user.userName;
        return inReq;
    }



    public resetPassword(req:any): Promise<any> {

        let message: string = "E";
        let isInsertResetPwd = false;
        let emailHelper = new EmailHelper();
        let userName = req.body.userName
        let email = req.body.email
        let resetPasswordStatus = "N";
        var p = new Promise((resolve, reject) => {
            this.addTransactionIdForPasswordReset(req, "RP").then(txnId => {
                LoggerUtil.info("TRANSACTION ID:::::"+txnId)
                if(CommonUtil.isNotBlank(txnId)){
                    let resetPwdDtlsReq = new ResetPwdDtlsRequest();
                    resetPwdDtlsReq.txnId = txnId;
                    resetPwdDtlsReq.userName = userName;
                    resetPwdDtlsReq.expirationDate = "3";
                    this.addUserService.insertResetPasswordDtls(resetPwdDtlsReq).then(insertSuccess =>{
                        LoggerUtil.info("PASSWORD RESET INSERTING INTO THE CPDB DATABASE STATUS=="+insertSuccess);
                        if(insertSuccess){
                            this.emailHelper.sendPasswordResetLinkEmail(email, txnId);
                            LoggerUtil.info("SENDING THE RESET PASSWORD LINK FOR THE USERNAME:::"+userName+":::EMAIL::"+email);
                            resetPasswordStatus = "Y"
                        }else{
                            LoggerUtil.info("RESET PASSWORD LINK FOR THE USERNAME NOT SENT:::"+userName+":::CPDB INSERTION FAILED");
                        }
                        resolve({status:resetPasswordStatus});
                    });
                }else{
                  resolve({status:resetPasswordStatus});
                }
            })
          });
        return p;
    }

    public updatePassword(manageUserVO:UserRequest, transactionType:string, req:any):Promise<any>{
    	 LoggerUtil.debug("UPDATING THE PASSWORD FOR THE USERNAME:::::::"+manageUserVO.userName);

    	 let isInsertResetPwd = false;
    	 let sendSts = "N";

       var p = new Promise((resolve, reject) => {
        //  this.addTransactionIdForPasswordReset(req.body.userName)
       })
       return p;
      
      }

      private addTransactionIdForPasswordReset(req:any, transactionType: string): Promise<any> {

         LoggerUtil.debug("UPDATING or RESETTING THE PASSWORD ADDING TRANSACTION ID:::::::"+transactionType)
         let inReq = new AddUserTxnRequest();
   			 inReq.strCompanyCode = cst.GMESS_CC_0270;
   			 inReq.strPortal = cst.ADMIN_TOOL;
   			 inReq.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
   			 inReq.strTransactionType = transactionType;  //RP = sending the password link to the user UP= updating the own password
   			 inReq.strUsername = req.body.userName;
         LoggerUtil.info(JSON.stringify(inReq))
         var p = new Promise((resolve, reject) => {
           this.manageUserService.addUserTransaction(inReq).then(s => {
              if(undefined != s && s.dataAvailForInput){
                  resolve(s.transactionId)
              }else{
                  resolve("")
              }
            });
         });
         return p;
      }

       public removeUser(req:any) :Promise<any>{

         let request = new DeactivateUserRequest();
         request.strCompanyCode = cst.GMESS_CC_0270;
         request.strPortal = cst.ADMIN_TOOL;
         request.strUserName = req.body.userName;
         request.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
         return new Promise((resolve, reject) => {
             this.manageUserService.deActivateUser(request).then (s => {
              if(null != s && undefined != s && s.dataAvailForInput){
                LoggerUtil.debug("SUCCESSFULLY REMOVED USER:::::" + req.body.userName);
                this.emailHelper.deactivateUserConfirmationEmail(req);
                resolve({error:false,transactionNumber:s.transactionId,transDateAndTime:s.transactionDate});
              }else{
                LoggerUtil.debug("FAILED to REMOVE THE USER::::::" +req.body.userName);
                resolve({error:true,errorMsg:"FAILED to REMOVE THE USER"});
              }
             });
         });
      }


      public disassociateUsersToCutomer(req: any): Promise<any> {

          let inReq = new DissociateCustomerFromUserRequest();
          inReq.strCompanyCode = cst.GMESS_CC_0270;
          inReq.strPortal = cst.ADMIN_TOOL;
          inReq.userName = req.body.userName;
          inReq.bpNumberList = req.body.bpNumberList;
          inReq.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
          var p = new Promise((resolve, reject) => {
            this.manageUserService.dissociateCustomerFromUser(inReq).then(s => {
               if(undefined != s && s.dataAvailForInput){
                   resolve({status:'Y'})
               }else{
                 LoggerUtil.info("DISASSOCIATE CUSTOMERS FAILED:::USERNAME:::"+req.body.userName)
                   resolve({status:'N'})
               }
             });
          });
          return p;
      }

      public associateUsersToCustomer(req: any): Promise<any> {

          let inReq:AssociateUser2CustomerRequest = this.populateAssociateUser2CustomerRequest(req);

          var p = new Promise((resolve, reject) => {
            this.manageUserService.associateUserToCustomer(inReq).then(s => {
               if(undefined != s && s.dataAvailForInput){
                   resolve({status:'Y'})
               }else{
                 LoggerUtil.debug("ASSOCIATE USER to CUSTOMERS FAILED:::USERNAME:::"+req.body.userName)
                   resolve({status:'N'})
               }
             });
          });
          return p;
      }

  private populateAssociateUser2CustomerRequest(req:any):AssociateUser2CustomerRequest {

        let bpNumList = new Array<string>();
        let bpNameList = new Array<string>();
        let hierarchyLevelList = new Array<string>();
        let bpAddrList = new Array<string>();
    		let request = new AssociateUser2CustomerRequest();
        let selectedPropList:ManagementBP[] = req.body.customerList;
	      try{
            selectedPropList.forEach((mngemmBP:ManagementBP) => {
              if(mngemmBP.selected){
                  bpNumList.push(mngemmBP.bpNumber);
                  bpNameList.push(mngemmBP.managementName);
                  bpAddrList.push(mngemmBP.strBPAddress);
                  hierarchyLevelList.push(cst.HIERARCHY_LEVEL_MGMT);

              }
              mngemmBP.regionList.forEach((reg:Region) => {
                if(reg.selected && "NO_REGN" != reg.bpNumber){
                  bpNumList.push(reg.bpNumber);
                  bpNameList.push(reg.regionName);
                  hierarchyLevelList.push(cst.HIERARCHY_LEVEL_REGN);
                  bpAddrList.push(reg.strBPAddress);
                }
                reg.propertyList.forEach((prop:Property) => {
                      if(prop.selected){
                        bpNumList.push(prop.bpNumber);
                        bpNameList.push(prop.propertyName);
                        hierarchyLevelList.push(cst.HIERARCHY_LEVEL_PROP);
                        bpAddrList.push(prop.strBPAddress);
                     }
                    });
                });
            });
        		 request.bpNumberList = bpNumList;
        		 request.bpNameList= bpNameList;
        		 request.bpAddressList = bpAddrList;
        		 request.hierarchyLevelList = hierarchyLevelList;
        		 request.strCompanyCode = cst.GMESS_CC_0270;
        		 request.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
        		 request.strPortal = cst.ADMIN_TOOL;
        		 request.userName = req.body.userName;
        }catch (ex) {
      		LoggerUtil.error("ERROR OCCURED WHILE Populating Request for ASSOCIATEUSERSTOCUSTOMERS::", ex.message);
        }
		    return request;
	}


  public changeAdminForAssociate(req:any): Promise<any> {

      let inReq = this.populateChangeAdminForAssociateUserRequest(req);
      var p = new Promise((resolve, reject) => {
        this.manageUserService.changeAdminForAssociate(inReq).then(s => {
           if(undefined != s && s.dataAvailForInput){
               resolve({status:'Y'})
           }else{
             LoggerUtil.debug("CHANGING ADMIN FOR ASSOCIATE FAILED:::USERNAME:::"+req.body.userName)
               resolve({status:'N'})
           }
         });
      });
      return p;
  }


  private populateChangeAdminForAssociateUserRequest(req: any): ChangeAdminForAssociateUserRequest {

      let request = new ChangeAdminForAssociateUserRequest();
      request.adminUserName = req.body.selectedAdmin;
      request.strCompanyCode = cst.GMESS_CC_0270;
      request.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
      request.strPortal = cst.ADMIN_TOOL;
      request.userName = req.body.changingAdminForAssociate;
      return request;
  }

}
