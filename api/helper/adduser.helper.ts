import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as _ from "lodash";
import * as cst from './../util/constant';
import { CommonUtil } from './../util/common.util';
import { AddUserService } from './../services/adduser.service';
import { ManageUserService } from './../services/manage.user.service';
import { ManageUserHelper } from '../helper/manage.user.helper'
import { PreLoginService } from '../services/prelogin.service';
import { Address, ManagementBP, Region, Property } from '../model/common';
import { User } from '../model/user';
import { SearchBrokerAdminRequest, SearchCustomerAdminRequest, CheckUserExistForSapIdRequest, ValidateUsrNameRequest,
    CreateUsrRequest, AddUserRequest, ResetPwdDtlsRequest, BpDetailsForAgentRequest,GetAllUsersAssociatedToBpRequest,GetAssociatesRequest, BpHierarchyRequest } from '../request/user.request';
import { AddUserTxnRequest } from './../request/addusertxn.request';
import { EmailHelper } from './email.helper';
var unique = require('array-unique');
var StringBuffer = require("stringbuffer");


export class AddUserHelper {

    private addUserService: AddUserService;
    private manageUserService:ManageUserService;
    private preloginService: PreLoginService;


    constructor(){
        this.addUserService = new AddUserService();
        this.manageUserService = new ManageUserService();
        this.preloginService = new PreLoginService();
    }


    public saveUser(req: any): Promise<any> {
        let userInfoVO = req.body.userInfo;
        let selection = req.body.selection;
        let customerList:Array<string> = {...req.body.customerList};
        let createLdapReq = this.getCreateUserInLDAPReq(req);
        var p = new Promise((resolve, reject) => {
            this.addUserService.createUserinLDAP(createLdapReq).then(s => {
                if(null != s && s.bSuccessFlag){
                    LoggerUtil.info("THE USERNAME::::"+req.body.userInfo.userName+"::HAS BEEN VALIDATED AND CREATED IN LDAP:");


                    let addUserReq = this.getAddUserRequest(req);
                    this.addUserService.addUser(addUserReq).then(t => {
                      if(null != t && t.dataAvailForInput){
                          LoggerUtil.debug("The User has been Added in DB and transactionId is :::::"+t.transactionId + " and txnDate is==="+t.transactionDateTime);
                          addUserReq.linkTxnId=t.transactionId;
                           let emailStatus:boolean = this.sendAddUserEmail(addUserReq, req);
                          resolve({error:false,transactionNumber:t.transactionId,transDateAndTime:t.transactionDateTime});
                     }else{
                          resolve({error:true,errmsg:"Error Adding user to the DB"});
                     }
                    });
                }else{
                  LoggerUtil.info("The User has not been Created in DB for the user name:::::"+req.body.userInfo.userName);
                  resolve({error:true,errmsg:"Error adding to LDAP"});
                }
            });
        });
        return p;
    }





    private getCreateUserInLDAPReq(req: any): CreateUsrRequest {

        let createLdapReq = new CreateUsrRequest();
        var userInfo = req.body.userInfo;
        createLdapReq.strFirstName = userInfo.firstName;
        createLdapReq.strCompanyCode = cst.GMESS_CC_0270;
        createLdapReq.strEmailId=userInfo.email;
        createLdapReq.strLDAPOrg=cst.GMESS_LDAP_ORG;
        createLdapReq.strLastName = userInfo.lastName;
        createLdapReq.strPassword ="";
        createLdapReq.strUserName = userInfo.userName;
        createLdapReq.strSSOUserType=cst.GME_SSO_TYPE;
        createLdapReq.strReliantUserType = "";
        createLdapReq.strBpId="";
        createLdapReq.strCAType ="";
        return createLdapReq;
    }

    private getAddUserRequest(req: any): AddUserRequest {

       let addUserReq = new AddUserRequest();
       var userInfo = req.body.userInfo;
       addUserReq.altrContactPhone = CommonUtil.isNotBlank(userInfo.altPhoneNumber)?userInfo.altPhoneNumber:"";
       addUserReq.altrContactPhoneExtn = CommonUtil.isNotBlank(userInfo.extxnAlt)?userInfo.extxnAlt:"";
       addUserReq.strCompanyCode = cst.GMESS_CC_0270;
       addUserReq.firstName = userInfo.firstName;
       addUserReq.lastName = userInfo.lastName;
       addUserReq.userName = userInfo.userName;
       addUserReq.emailId = userInfo.email;
       addUserReq.strPortal = cst.ADMIN_TOOL;
       addUserReq.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
       addUserReq.sapId = CommonUtil.isNotBlank(userInfo.sapId)?userInfo.sapId:"NA";
       addUserReq.contactPhone = CommonUtil.isNotBlank(userInfo.phoneNumber)?CommonUtil.getUnFormattedPhoneNumber(userInfo.phoneNumber):"";
       addUserReq.contactPhoneExtn = CommonUtil.isNotBlank(userInfo.extxn)?userInfo.extxn:"";
       addUserReq.faxNumber = CommonUtil.isNotBlank(userInfo.faxNumber)?CommonUtil.getUnFormattedPhoneNumber(userInfo.faxNumber):"";
       addUserReq.billingAce = userInfo.ableToPayBills?"Y":"N";
       addUserReq.startStopAce = userInfo.ableToStartStopService?"Y":"N";
       if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_INT_ADMIN)){
           addUserReq.webSecurityRole= cst.USERTYPE_SP_INT_ADMIN;
           addUserReq.title = "";
           addUserReq.startStopAce = ("Y");
           addUserReq.billingAce=("N");
       }else if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_INT_AGT_OPREP)){
    			 addUserReq.webSecurityRole= cst.USERTYPE_SP_INT_AGT_OPREP;
    			 addUserReq.strPortal = (cst.USERTYPE_SP_ADMIN_TOOL);
           addUserReq.title = "";
    			 addUserReq.startStopAce = ("Y");
    			 addUserReq.billingAce=("N");
      }else if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_INT_READ_ONLY)){
    			 addUserReq.webSecurityRole=(cst.USERTYPE_SP_INT_READ_ONLY);
           addUserReq.title = "";
    			 addUserReq.startStopAce = ("N");
    			 addUserReq.billingAce=("N");
      }else if((CommonUtil.equalsIgnoreCase(req.body.selection.subUserType,(cst.USERTYPE_INT_AGT_EMM)) ||
          _.isEqual(req.body.selection.subUserType,(cst.USERTYPE_INT_AGT_EMA)))){
    			 addUserReq.startStopAce = ("Y");
    			 addUserReq.billingAce=("N");
			     addUserReq = this.setBPDtlsForRequestBasedonUserType(req,addUserReq,req.body.customerList);
      }else if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_EXT_BROKER)){
          addUserReq = this.setBPDtlsForRequestForBroker(req,addUserReq,req.body.customerList);
      }else if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_EXT_READ_ONLY)){
    			  addUserReq.webSecurityRole=(cst.USERTYPE_SP_EXT_READ_ONLY);
    		    addUserReq =this.setBPDtlsForRequestBasedonUserType(req,addUserReq,req.body.customerList);
  		}else if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_EXT_CA_PM)){
  			  addUserReq.webSecurityRole = (cst.USERTYPE_SP_EXT_CA_PM);
  			  addUserReq = this.setBPDtlsForRequestForCustomerAdmin(req,addUserReq,req.body.customerList);
          addUserReq.startStopAce = ("Y");
          addUserReq.billingAce=("Y");
  		}else if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_EXT_CA_PO)){
  			  addUserReq.webSecurityRole = (cst.USERTYPE_SP_EXT_CA_PO);
  			  addUserReq = this.setBPDtlsForRequestForCustomerAdmin(req,addUserReq,req.body.customerList);
          addUserReq.startStopAce = ("Y");
          addUserReq.billingAce=("Y");
  		}else if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_EXT_BRK_ASC)){
  				addUserReq = this.setBPDtlsForRequestForBrokerAssociate(req,addUserReq,req.body.selAdminAsscList);
      }else if(CommonUtil.equalsIgnoreCase(req.body.selection.subUserType, cst.USERTYPE_EXT_CUS_ASC)){
  			  addUserReq = this.setBPDtlsForRequestForCustomerAssociate(req,addUserReq,req.body.selAdminAsscList);
      }
    	return addUserReq;
  }


  private  setBPDtlsForRequestBasedonUserType( req:any,  addUserReq:AddUserRequest, propList:ManagementBP[]):AddUserRequest{

  LoggerUtil.info("START::AddUserHelper::setBPDtlsForRequestBasedonUserType()>>>>>>");
  let bpNumList = new Array<string>();
  let bpNameList = new Array<string>();
  let hierarchyLevelList = new Array<string>();
  let bpAddrList = new Array<string>();
  let startStopAceList = new Array<string>();
  let billingAceList = new Array<string>();
  let userInfoVO = req.body.userInfo;
  let selection = req.body.selection;

  if(CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_INT_AGT_EMM)){
        addUserReq.webSecurityRole = (cst.USERTYPE_SP_INT_AGT_EMM);
        addUserReq.title = (cst.SALES_EXECUTIVE);
        propList.forEach((mngemmBP:ManagementBP) => {
          if(mngemmBP.selected){
              bpNumList.push(mngemmBP.bpNumber);
              bpNameList.push(mngemmBP.managementName);
              bpAddrList.push(mngemmBP.strBPAddress);
              hierarchyLevelList.push(cst.HIERARCHY_LEVEL_MGMT);
              startStopAceList.push(cst.NA);
              billingAceList.push(cst.NA);
          }
          mngemmBP.regionList.forEach((reg:Region) => {
            if(reg.selected && "NO_REGN" != reg.bpNumber){
              bpNumList.push(reg.bpNumber);
              bpNameList.push(reg.regionName);
              hierarchyLevelList.push(cst.HIERARCHY_LEVEL_REGN);
              bpAddrList.push(reg.strBPAddress);
              startStopAceList.push(cst.NA);
              billingAceList.push(cst.NA);
            }
            reg.propertyList.forEach((prop:Property) => {
                  if(prop.selected){
                    bpNumList.push(prop.bpNumber);
                    bpNameList.push(prop.propertyName);
                    hierarchyLevelList.push(cst.HIERARCHY_LEVEL_PROP);
                    bpAddrList.push(prop.strBPAddress);
                    startStopAceList.push(cst.NA);
                    billingAceList.push(cst.NA);
                  }
                });
            });
        });
      }else if(CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_INT_AGT_EMA)){
        addUserReq.webSecurityRole = (cst.USERTYPE_SP_INT_AGT_EMA);
        addUserReq.title = (cst.ACCOUNT_EXECUTIVE);
        propList.forEach((mngemmBP:ManagementBP) => {
          (mngemmBP.regionList).forEach((reg:Region) => {
            (reg.propertyList).forEach((prop:Property) => {
              if(prop.selected){
                bpNumList.push(prop.bpNumber);
                bpNameList.push(prop.propertyName);
                hierarchyLevelList.push(cst.HIERARCHY_LEVEL_PROP);
                bpAddrList.push(prop.strBPAddress);
                startStopAceList.push(cst.NA);
                billingAceList.push(cst.NA);
              }
            });
          });
        });
      }else if(CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_EXT_BROKER) ||
          CommonUtil.equalsIgnoreCase(selection.subUserType,cst.USERTYPE_EXT_READ_ONLY) ||
          CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_EXT_CA_PO) || CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_EXT_CA_PM) || CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_EXT_BRK_ASC)
          || CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_EXT_CUS_ASC)){
        if(CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_EXT_BROKER) || CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_EXT_BRK_ASC)){


          }else if(CommonUtil.equalsIgnoreCase(selection.subUserType, cst.USERTYPE_EXT_CUS_ASC)){

            propList.forEach((mngemmBP:ManagementBP) => {
              if(mngemmBP.selected){
                  bpNumList.push(mngemmBP.bpNumber);
                  bpNameList.push(mngemmBP.managementName);
                  bpAddrList.push(mngemmBP.strBPAddress);
                  hierarchyLevelList.push(cst.HIERARCHY_LEVEL_MGMT);
                  startStopAceList.push(cst.NA);
                  billingAceList.push(cst.NA);

              }
              mngemmBP.regionList.forEach((reg:Region) => {
                if(reg.selected && "NO_REGN" != reg.bpNumber){

                  bpNumList.push(reg.bpNumber);
                  bpNameList.push(reg.regionName);
                  hierarchyLevelList.push(cst.HIERARCHY_LEVEL_REGN);
                  bpAddrList.push(reg.strBPAddress);
                  startStopAceList.push(cst.NA);
                  billingAceList.push(cst.NA);

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

          }else{

            propList.forEach((mngemmBP:ManagementBP) => {
              if(mngemmBP.selected){
                  bpNumList.push(mngemmBP.bpNumber);
                  bpNameList.push(mngemmBP.managementName);
                  bpAddrList.push(mngemmBP.strBPAddress);
                  hierarchyLevelList.push(cst.HIERARCHY_LEVEL_MGMT);

              }
              mngemmBP.regionList.forEach((reg:Region) => {
                if(reg.selected && "NO_REGN" != reg.bpNumber){
                 if(reg.bokerAssigned){
                  bpNumList.push(reg.bpNumber);
                  bpNameList.push(reg.regionName);
                  hierarchyLevelList.push(cst.HIERARCHY_LEVEL_REGN);
                  bpAddrList.push(reg.strBPAddress);

                 }
                }
                reg.propertyList.forEach((prop:Property) => {
                      if(prop.selected){
                       if(prop.bokerAssigned){
                        bpNumList.push(prop.bpNumber);
                        bpNameList.push(prop.propertyName);
                        hierarchyLevelList.push(cst.HIERARCHY_LEVEL_PROP);
                        bpAddrList.push(prop.strBPAddress);

                      }
                     }
                    });
                });
            });
          }

      }

    LoggerUtil.debug("BP ASSOCIATIONS FOR THIS USER::"+bpNumList+"::::OF SIZE:::::"+bpNumList.length);
    addUserReq.bpNumberList = bpNumList;
    addUserReq.bpNameList = bpNameList;
    addUserReq.bpAddressList = bpAddrList;
    addUserReq.startStopAceList = startStopAceList;
    addUserReq.billingAceList = billingAceList;
    addUserReq.hierarchyLevelList = hierarchyLevelList;
    LoggerUtil.debug("END::AddUserHelper::setBPDtlsForRequestBasedonUserType()>>>>>>");

  return addUserReq;
}

   private setBPDtlsForRequestForCustomerAdmin(req:any,  addUserReq:AddUserRequest, propList:ManagementBP[]): AddUserRequest {

       let bpNumList = new Array<string>();
       let bpNameList = new Array<string>();
       let hierarchyLevelList = new Array<string>();
       let bpAddrList = new Array<string>();
       //let startStopAceList = new Array<string>();
      // let billingAceList = new Array<string>();
       try{
           propList.forEach((mngemmBP:ManagementBP) => {
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
           LoggerUtil.info("BP ASSOCIATIONS FOR THIS USER::"+bpNumList+"::::OF SIZE:::::"+bpNumList.length);
           addUserReq.bpNumberList = bpNumList;
           addUserReq.bpNameList = bpNameList;
           addUserReq.bpAddressList = bpAddrList;
           //addUserReq.startStopAceList = startStopAceList;
           //addUserReq.billingAceList = billingAceList;
           addUserReq.hierarchyLevelList = hierarchyLevelList;
         }catch(err){
           LoggerUtil.error("ERROR======setBPDtlsForRequestForCustomerAdmin===>"+err.message)
         }
       return addUserReq
   }

   private setBPDtlsForRequestForBroker(req:any,  addUserReq:AddUserRequest, propList:ManagementBP[]): AddUserRequest {

       let bpNumList = new Array<string>();
       let bpNameList = new Array<string>();
       let hierarchyLevelList = new Array<string>();
       let bpAddrList = new Array<string>();
       let startStopAceList = new Array<string>();
       let billingAceList = new Array<string>();
       try{
          addUserReq.webSecurityRole=(cst.USERTYPE_SP_EXT_BROKER);
          addUserReq.brokerBPNumber= req.body.enteredBPNumber;
          addUserReq.brokerBPName= req.body.brokerName;
          propList.forEach((mngemmBP:ManagementBP) => {
               bpNumList.push(mngemmBP.bpNumber);
               bpNameList.push(mngemmBP.managementName);
               bpAddrList.push(mngemmBP.strBPAddress);
               hierarchyLevelList.push(cst.HIERARCHY_LEVEL_MGMT);
               startStopAceList.push(cst.NA);
               billingAceList.push(cst.NA);
               mngemmBP.regionList.forEach((reg:Region) => {
                  if(reg.bokerAssigned){
                      bpNumList.push(reg.bpNumber);
                       bpNameList.push(reg.regionName);
                       hierarchyLevelList.push(cst.HIERARCHY_LEVEL_REGN);
                       bpAddrList.push(reg.strBPAddress);
                       startStopAceList.push(cst.NA);
                       billingAceList.push(cst.NA);
                  }
                  reg.propertyList.forEach((prop:Property) => {
                    if(prop.bokerAssigned){
                        bpNumList.push(prop.bpNumber);
                       bpNameList.push(prop.propertyName);
                       hierarchyLevelList.push(cst.HIERARCHY_LEVEL_PROP);
                       bpAddrList.push(prop.strBPAddress);
                       startStopAceList.push(prop.startStopAce);
                       billingAceList.push(prop.billingAce);
                    }
                });
             });
           });
           LoggerUtil.debug("BP ASSOCIATIONS FOR THIS USER::"+bpNumList+"::::OF SIZE:::::"+bpNumList.length);
           addUserReq.bpNumberList = bpNumList;
           addUserReq.bpNameList = bpNameList;
           addUserReq.bpAddressList = bpAddrList;
           addUserReq.startStopAceList = startStopAceList;
           addUserReq.billingAceList = billingAceList;
           addUserReq.hierarchyLevelList = hierarchyLevelList;
         }catch(err){
           LoggerUtil.error("ERROR======setBPDtlsForRequestForBroker===>"+err.message)
         }
       return addUserReq
   }

   private setBPDtlsForRequestForCustomerAssociate(req:any,  addUserReq:AddUserRequest, propList:ManagementBP[]): AddUserRequest {

       let bpNumList = new Array<string>();
       let bpNameList = new Array<string>();
       let hierarchyLevelList = new Array<string>();
       let bpAddrList = new Array<string>();
       let startStopAceList = new Array<string>();
       let billingAceList = new Array<string>();
       try{
          addUserReq.associatedAdminUsername = req.body.selAdminName;
          addUserReq.webSecurityRole = cst.USERTYPE_SP_EXT_CUS_ASC;
          propList.forEach((mngemmBP:ManagementBP) => {
              if(CommonUtil.isNotBlank(mngemmBP.bpNumber) && mngemmBP.bpNumber != "NO_MGMT"){
                    bpNumList.push(mngemmBP.bpNumber);
                    bpNameList.push(mngemmBP.managementName);
                    bpAddrList.push(mngemmBP.strBPAddress);
                    hierarchyLevelList.push(cst.HIERARCHY_LEVEL_MGMT);
                    startStopAceList.push(cst.NA);
                    billingAceList.push(cst.NA);
              }
               mngemmBP.regionList.forEach((reg:Region) => {
                  if(CommonUtil.isNotBlank(reg.bpNumber) && reg.bpNumber != "NO_REGN"){
                    bpNumList.push(reg.bpNumber);
                    bpNameList.push(reg.regionName);
                    hierarchyLevelList.push(cst.HIERARCHY_LEVEL_REGN);
                    bpAddrList.push(reg.strBPAddress);
                    startStopAceList.push(cst.NA);
                    billingAceList.push(cst.NA);
                  }
                  reg.propertyList.forEach((prop:Property) => {
                    if(CommonUtil.isNotBlank(prop.bpNumber) && prop.bpNumber != "NO_PROP"){
                        bpNumList.push(prop.bpNumber);
                        bpNameList.push(prop.propertyName);
                        hierarchyLevelList.push(cst.HIERARCHY_LEVEL_PROP);
                        bpAddrList.push(prop.strBPAddress);
                        startStopAceList.push(prop.startStopAce);
                        billingAceList.push(prop.billingAce);
                    }
                });
             });
           });
           LoggerUtil.debug("BP ASSOCIATIONS FOR THIS USER::"+bpNumList+"::::OF SIZE:::::"+bpNumList.length);
           addUserReq.bpNumberList = bpNumList;
           addUserReq.bpNameList = bpNameList;
           addUserReq.bpAddressList = bpAddrList;
           addUserReq.startStopAceList = startStopAceList;
           addUserReq.billingAceList = billingAceList;
           addUserReq.hierarchyLevelList = hierarchyLevelList;
         }catch(err){
           LoggerUtil.info("ERROR======setBPDtlsForRequestForCustomerAssociate===>"+err.message)
         }
         return addUserReq
   }

   private setBPDtlsForRequestForBrokerAssociate(req:any,  addUserReq:AddUserRequest, propList:ManagementBP[]): AddUserRequest {

       let bpNumList = new Array<string>();
       let bpNameList = new Array<string>();
       let hierarchyLevelList = new Array<string>();
       let bpAddrList = new Array<string>();
       let startStopAceList = new Array<string>();
       let billingAceList = new Array<string>();
       try{
          addUserReq.associatedAdminUsername = req.body.selAdminName;
          addUserReq.webSecurityRole = cst.USERTYPE_SP_EXT_BRK_ASC;
          addUserReq.brokerBPNumber = req.body.enteredBPNumber;
          addUserReq.brokerBPName = req.body.brokerName;
          propList.forEach((mngemmBP:ManagementBP) => {
               bpNumList.push(mngemmBP.bpNumber);
               bpNameList.push(mngemmBP.managementName);
               bpAddrList.push(mngemmBP.strBPAddress);
               hierarchyLevelList.push(cst.HIERARCHY_LEVEL_MGMT);
               startStopAceList.push(cst.NA);
               billingAceList.push(cst.NA);
               mngemmBP.regionList.forEach((reg:Region) => {
                  if(reg.bokerAssigned){
                      bpNumList.push(reg.bpNumber);
                       bpNameList.push(reg.regionName);
                       hierarchyLevelList.push(cst.HIERARCHY_LEVEL_REGN);
                       bpAddrList.push(reg.strBPAddress);
                       startStopAceList.push(cst.NA);
                       billingAceList.push(cst.NA);
                  }
                  reg.propertyList.forEach((prop:Property) => {
                    if(prop.bokerAssigned){
                        bpNumList.push(prop.bpNumber);
                       bpNameList.push(prop.propertyName);
                       hierarchyLevelList.push(cst.HIERARCHY_LEVEL_PROP);
                       bpAddrList.push(prop.strBPAddress);
                       startStopAceList.push(prop.startStopAce);
                       billingAceList.push(prop.billingAce);
                    }
                });
             });
           });
           LoggerUtil.debug("BP ASSOCIATIONS FOR THIS USER::"+bpNumList+"::::OF SIZE:::::"+bpNumList.length);
           addUserReq.bpNumberList = bpNumList;
           addUserReq.bpNameList = bpNameList;
           addUserReq.bpAddressList = bpAddrList;
           addUserReq.startStopAceList = startStopAceList;
           addUserReq.billingAceList = billingAceList;
           addUserReq.hierarchyLevelList = hierarchyLevelList;
         }catch(err){
           LoggerUtil.error("ERROR======setBPDtlsForRequestForBrokerAssociate===>"+err.message)
         }
       return addUserReq
   }


   public searchCustomersByBP(req: any) : Promise<any> {

        let isAgent = CommonUtil.isAgent(req.body.securityRole);
        if(isAgent){
            return this.searchCustomersForAgent(req);
        }else{
            return this.searchCustomersForNonAgent(req);
        }

    }

    private searchCustomersForAgent(req: any): Promise<any> {
        LoggerUtil.debug("SEARCHING CUSTOMER FOR AGENT TYPE:::::"+req.body.securityRole)
        let inReq = new BpDetailsForAgentRequest();
        let bpNumberList = new Array<string>();
        bpNumberList.push(req.body.bpNumber);
        inReq.bpNumberList = bpNumberList;
        inReq.agentType = CommonUtil.getAgentType(req.body.securityRole)
        inReq.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
        inReq.strCompanyCode = cst.GMESS_CC_0270;
        inReq.strPortal = cst.USERTYPE_SP_ADMIN_TOOL;
        return new Promise((resolve,reject) => {
            this.addUserService.getBPDetailsForAgent(inReq).then(s => {
                if(undefined != s && s.dataAvilableForInput){
                    let mngList = s.managementList;
                    let rgnList = s.regionList;
                    let propList = s.propertyList;
                    let mngtList = new Array<ManagementBP>();
                    mngList.forEach((mng, i) => {
                        let mngBP = new ManagementBP();
                        mngBP.bpNumber = CommonUtil.substringBefore(mng.bpNumber,":")
                        mngBP.managementName = mng.bpName;
                        mngBP.strBPAddress = CommonUtil.createBpAddressStrFromObj(mng.bpAdress);
                        mngBP.EMMAssigned = mng.agentAssigned;
                        mngBP.regionList = this.getRegionListForAgent(rgnList,propList,mng.bpNumber,mng.agentAssigned);
                        mngtList.push(mngBP);
                    })
                    resolve({mngtList,brokerName:s.brokerName})
                }else{
                  resolve({error:true,errorMessage:this.parseErrorMessageFromServiceLayer(s.strErrorCode)})
                }
            })
        })
    }

    private searchCustomersForNonAgent(req: any): Promise<any> {
        LoggerUtil.debug("SEARCHING CUSTOMER FOR NON AGENT TYPE:::::"+req.body.securityRole)
        let inReq = new BpHierarchyRequest();
        let bpNumberList = new Array<string>();
        bpNumberList.push(req.body.bpNumber);
        inReq.bpNumberList = bpNumberList;
        inReq.callType = CommonUtil.getCallType(req.body.securityRole)
        inReq.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
        inReq.strCompanyCode = cst.GMESS_CC_0270;
        inReq.strPortal = cst.USERTYPE_SP_ADMIN_TOOL;
        let isBroker = CommonUtil.equalsIgnoreCase(req.body.securityRole,'EXT_BROKER')
        return new Promise((resolve,reject) => {
            this.preloginService.getBPHierarchy(inReq).then(s => {
                if(undefined != s && s.dataAvilableForInput){
                    let mngList = s.managementList;
                    let rgnList = s.regionList;
                    let propList = s.propertyList;
                    let mngtList = new Array<ManagementBP>();
                    mngList.forEach((mng, i) => {
                        if(CommonUtil.isNotBlank(mng.bpNumber)){
                            let mngBP = new ManagementBP();
                            let treeGUID: string = CommonUtil.substringAfter(mng.bpNumber, ":");
                            mngBP.managementName = mng.bpName;
                            mngBP.strBPAddress = CommonUtil.createBpAddressStrFromObj(mng.bpAdress);
                            mngBP.bpNumber = CommonUtil.substringBefore(mng.bpNumber,":")
                            mngBP.regionList = this.getRegionList(rgnList,propList,mng.bpNumber,isBroker,req.body.bpNumber,treeGUID);
                            mngtList.push(mngBP);
                        }
                    })
                    resolve({mngtList,brokerName:s.brokerName})
                }else{
                   resolve({error:true,errorMessage:this.parseErrorMessageFromServiceLayer(s.strErrorCode)})
                }
            });
        });
    }

    private parseErrorMessageFromServiceLayer(errorCode: string): string{

    		if(CommonUtil.equalsIgnoreCase(errorCode, "BRKR")){
    			return cst.BRKR_ERR_MSG;
    		}else if(CommonUtil.equalsIgnoreCase(errorCode, "NON_BRKR")){
    			return cst.NON_BRKR_ERR_MSG;
    		}else{
    			return cst.NO_BP_HIERARCHY_FOUND;
    		}
	}

   private getRegionListForAgent(rgnList:any[], propList:any[], mngBpNumber: string, isMmngmtNodeSelected: boolean): Region[] {

        let regionList = new Array<Region>();
        rgnList.forEach((rgn,i) => {
            if(CommonUtil.equalsIgnoreCase(mngBpNumber, rgn.parentBpNumber)){
                let region = new Region();
                region.bpNumber = CommonUtil.substringBefore(rgn.bpNumber,":");
                region.regionName = rgn.bpName;
                region.bokerAssigned = true;
                region.EMMAssigned = rgn.agentAssigned;
                region.strBPAddress = CommonUtil.createBpAddressStrFromObj(rgn.bpAdress);
                region.propertyList = this.getPropertyListForAgent(propList,rgn.bpNumber);
                regionList.push(region)
            }
        })
        return regionList;
    }

    public getRegionList(rgnList:any[], propList:any[], mngBpNumber: string, isBroker: boolean, enteredBPNumber: string, treeGuid: string): Region[] {

         let regionList = new Array<Region>();
         rgnList.forEach((rgn,i) => {
             if(CommonUtil.equalsIgnoreCase(mngBpNumber, rgn.parentBpNumber)){
                 let region = new Region();
                 region.bpNumber = CommonUtil.substringBefore(rgn.bpNumber,":");
                 region.regionName = rgn.bpName;
                 if(isBroker){
                    region.bokerAssigned = this.getStatusForBrokerAssignedOrNot(enteredBPNumber,rgn.brokerList,treeGuid);
                    region.newlyAddedBP = rgn.newlyAddedBP;
                 }else{
                    region.selected = rgn.agentAssigned;
                 }
                 region.strBPAddress = CommonUtil.createBpAddressStrFromObj(rgn.bpAdress);
                 region.parentBpNumber = mngBpNumber;
                 region.propertyList = this.getPropertyList(propList,rgn.bpNumber,isBroker,enteredBPNumber,region.bokerAssigned,treeGuid,mngBpNumber);
                 regionList.push(region)
             }
         })
         return regionList;
     }


    private getPropertyListForAgent(propList:any[], regionBpNumber: string): Property[] {

        let propertyList = new Array<Property>();
        propList.forEach(prop => {
            if(CommonUtil.equalsIgnoreCase(regionBpNumber, prop.parentBpNumber)){
                let property = new Property();
                property.bpNumber = CommonUtil.substringBefore(prop.bpNumber,":");
                property.propertyName = prop.bpName;
                property.EMAAssigned = prop.agentAssigned;
                property.bokerAssigned = true;
                property.strBPAddress = CommonUtil.createBpAddressStrFromObj(prop.bpAdress)
                propertyList.push(property);
            }
        })
        return propertyList;
    }


    private getPropertyList(propList:any[], regionBpNumber: string, isBroker: boolean, enteredBPNumber: string, brokerAssignedAtRegLevel: boolean,treeGUID: string, mngBpNumber: string): Property[] {

        let propertyList = new Array<Property>();
        propList.forEach(prop => {
            if(CommonUtil.equalsIgnoreCase(regionBpNumber, prop.parentBpNumber)){
                let property = new Property();
                property.bpNumber = CommonUtil.substringBefore(prop.bpNumber,":");
                property.propertyName = prop.bpName;
                property.strBPAddress = CommonUtil.createBpAddressStrFromObj(prop.bpAdress)
                property.newlyAddedBP = prop.newlyAddedBP;
                if(isBroker){
                    property.bokerAssigned = brokerAssignedAtRegLevel?brokerAssignedAtRegLevel:this.getStatusForBrokerAssignedOrNot(enteredBPNumber,prop.brokerList,treeGUID);
                    property.billingAce = CommonUtil.equalsIgnoreCase(prop.billingAce,cst.NA)?cst.NA:(CommonUtil.equalsIgnoreCase(prop.billingAce,cst.YES)?cst.YES:cst.NO)
                    property.startStopAce = CommonUtil.equalsIgnoreCase(prop.startStopAce,cst.NA)?cst.NA:(CommonUtil.equalsIgnoreCase(prop.startStopAce,cst.YES)?cst.YES:cst.NO)
                }else{
                    property.selected = prop.agentAssigned;
                }
                property.EMAAssigned = prop.agentAssigned;
                property.parentBpNumber = CommonUtil.substringBefore(mngBpNumber,":")+":"+regionBpNumber;
                propertyList.push(property);
            }
        })
        return propertyList;
    }


    public searchBrokerAdmins(req: any) : Promise<any> {

        let inReq = new SearchBrokerAdminRequest();
        inReq.searchCriteria = req.body.selection.searchCriteria;
        if(inReq.searchCriteria == cst.SEARCH_CRITERIA_LN){
            inReq.brokerAdminLastname = req.body.selection.searchString;
        }else{
            inReq.brokerBpNumber = req.body.selection.searchString;
        }
        inReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
        inReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
        var p = new Promise((resolve, reject) => {
            this.addUserService.searchBrokerAdmin(inReq).then(s => {
                if(null != s && null != s.brokerAdminList && s.brokerAdminList.length > 0){
                    LoggerUtil.debug("BROKERS ADMINS FOUND FOR THE SEARCH CRITERIA::")
                    resolve(this.populateBrokerAdminList(s));
                }else{
                   LoggerUtil.debug("NO BROKERS FOUND FOR THE SEARCH CRITERIA::")
                   resolve({});
                }
            })
        });
        return p;
    }


    private populateBrokerAdminList(s: any): any {

      let brokerAdmins: any = {};
      try{
          let brokerAdminList = s.brokerAdminList;
          let userNameList = new Array<string>();
          brokerAdminList.forEach((cust:any) => {
              userNameList.push(cust.userName);
          })
          let bpName = "";
          let bpAddress = "";
          userNameList =  unique(userNameList)
          let userList = new Array<User>();
          userNameList.forEach((userName: any) => {
              let businessName = new StringBuffer();
              let user = new User();
              user.userName = userName;
              let bpList = new Array<string>();
              brokerAdminList.forEach((admin:any) => {
                  if(CommonUtil.equalsIgnoreCase(admin.userName,userName)){
                      bpName = admin.bpName;
                      bpAddress = admin.bpAddress;
                      user.firstName = admin.firstName;
                      user.lastName = admin.lastName;
                      user.billingAce = admin.billingAce;
                      user.startStopAce = admin.startStopAce;
                      bpList.push(admin.bpNumber);
                      businessName.append(admin.bpName).append("<br/>");
                    }
              })
              user.businessName = bpName;
              user.bpList = bpList;
              userList.push(user);
          })
          brokerAdmins.bpName = bpName;
          brokerAdmins.bpAddress = bpAddress;
          brokerAdmins.adminList = userList;
        }catch(err){
          LoggerUtil.error("ERROR===============>"+err.message)
        }
        return brokerAdmins;
    }


    public searchCustomerAdmins(req: any) : Promise<any> {

        let inReq = new SearchCustomerAdminRequest();
        inReq.searchCriteria = req.body.selection.searchCriteria;
        if(inReq.searchCriteria == cst.SEARCH_CRITERIA_LN){
            inReq.customerAdminLastname = req.body.selection.searchString;
        }else{
            inReq.bpNumber = req.body.selection.searchString;
        }
        inReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
        inReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
        var p = new Promise((resolve, reject) => {
            this.addUserService.searchCustomerAdmin(inReq).then(s => {
                if(null != s && null != s.customerAdminList && s.customerAdminList.length > 0){
                    LoggerUtil.debug("CUSTOMER ADMINS FOUND FOR THE SEARCH CRITERIA::")
                    resolve(this.populateCustomerAdminList(s));
                }else{
                   LoggerUtil.debug("NO CUSTOMER ADMINS FOUND FOR THE SEARCH CRITERIA::")
                   resolve({});
                }
            })
        });
        return p
    }


    private populateCustomerAdminList(s: any): any {

      let custAdmins: any = {};
      try{
          let custAdminList = s.customerAdminList;
          let userNameList = new Array<string>();
          custAdminList.forEach((cust:any) => {
              userNameList.push(cust.userName);
          })
          let bpName = "";
          let bpAddress = "";
          userNameList =  unique(userNameList)
          let userList = new Array<User>();
          userNameList.forEach((userName: any) => {
              let businessName = new StringBuffer();
              let user = new User();
              user.userName = userName;
              let bpList = new Array<string>();
              custAdminList.forEach((admin:any) => {
                  if(CommonUtil.equalsIgnoreCase(admin.userName,userName)){
                      bpName = admin.bpName;
                      bpAddress = admin.bpAddress;
                      user.firstName = admin.firstName;
                      user.lastName = admin.lastName;
                      user.billingAce = admin.billingAce;
                      user.startStopAce = admin.startStopAce;
                      bpList.push(admin.bpNumber);
                      businessName.append(admin.bpName).append("<br/>");
                    }
              })
              user.businessName = bpName;
              user.bpList = bpList;
              userList.push(user);
          })
          custAdmins.bpName = bpName;
          custAdmins.bpAddress = bpAddress;
          custAdmins.adminList = userList;
        }catch(err){
          LoggerUtil.error("ERROR===============>"+err.message)
        }
        return custAdmins;
    }


    public getAssociates(req: any): Promise<any> {

        let inReq = new GetAssociatesRequest();
        inReq.strPortal = cst.ADMIN_PORTAL;
        inReq.strCompanyCode = cst.GMESS_CC_0270;
        inReq.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
        inReq.bcadminUserName = req.body.userName;
        var p = new Promise((resolve, reject) => {
            this.addUserService.getAssociates(inReq).then(s => {
                var userList = new Array<User>();
                if(undefined != s && s.dataAvailForInput){
                    let asscList = s.associatedUserList;
                    asscList.forEach((assc:any) => {
                        let user = new User();
                        user.firstName = assc.firstName;
                        user.lastName = assc.lastName;
                        user.userName = assc.userName;
                        userList.push(user);
                    })
                }
                resolve(userList)
            })
        })
        return p;
    }


    public isSapIdExistIntheSystem(req: any): Promise<any> {

         let inReq = new CheckUserExistForSapIdRequest();
         inReq.strCompanyCode = cst.GMESS_CC_0270;
         inReq.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
         inReq.sapId = req.body.sapId;
         inReq.strPortal = cst.ADMIN_TOOL;
         var p = new Promise((resolve, reject) => {
             this.addUserService.isSapIdExistAlreadyForInternalUser(inReq).then(s => {
                  LoggerUtil.info("IS ALREDY SAP ID EXIST IN THE SYSTEM STATUS::::"+s)
                  resolve(s);
             });
         });
         return p;
    }


    public isUsernameExistInLDAP(req: any): Promise<any> {

        let inReq = new ValidateUsrNameRequest();
        inReq.strCompanyCode = cst.GMESS_CC_0270;
        inReq.strLDAPOrg = cst.GMESS_LDAP_ORG;
        inReq.strLoggedInUserName =CommonUtil.getLoggedInUserName(req);
        inReq.strPortal = cst.ADMIN_TOOL;
        inReq.strProviderUrl = "";
        inReq.strSSOUserType = cst.GME_SSO_TYPE;
        inReq.strUserName = req.body.userName
        var p = new Promise((resolve, reject) => {
            this.addUserService.isUserValidatedInLDAP(inReq).then(s => {
                 LoggerUtil.info("IS USER VALIDATED IN THE SYSTEM STATUS::::"+JSON.stringify(s))
                 resolve(s.dataAvailForInput);
            });
        });
        return p;
    }

    private  sendAddUserEmail(addUserRequest:AddUserRequest, req:any):boolean{
		LoggerUtil.debug("START::AddUserHelper::sendAddUserEmail()>>>>>>");

		let emailStatus:boolean = false;
		try {
		 	let addUsrTxnReq = this.populateAddUserTxnRequest(req);
      this.manageUserService.addUserTransaction(addUsrTxnReq).then(s => {

  			if(undefined != s && s.dataAvailForInput && CommonUtil.isNotBlank(s.transactionId)){
  				 let isInsertResetPwd:boolean = false;
           let resetPwdDtlsReq = new ResetPwdDtlsRequest();
           resetPwdDtlsReq.txnId = s.transactionId;
           resetPwdDtlsReq.userName = addUserRequest.userName;
           resetPwdDtlsReq.expirationDate = "3";
  				 this.addUserService.insertResetPasswordDtls(resetPwdDtlsReq).then(t =>{
              if(t){
                LoggerUtil.debug("insertResetPasswordDtls resp is=="+t);
                  isInsertResetPwd = true;
              }
              if(isInsertResetPwd){
                LoggerUtil.debug("Start Sending Email...");
                try{
        					addUserRequest.linkTxnId = (s.transactionId);
                  let emailHelperVal = new EmailHelper();
        					emailHelperVal.addUserConfirmEmail(addUserRequest,req);
        					emailHelperVal.addUserConfirmAdminEmail(addUserRequest,req);
                }catch(e){
                    LoggerUtil.error("Exception when sending email..."+e.message);

                }
      				}else{
      				LoggerUtil.debug("ADD USER TRANSACTION FOR RESETING PASSWORD FAILS::::");
      			}
          });
        }
     });

  }catch (e) {
			LoggerUtil.error("Error occured while sending user email:::", e.message);
			return false;
		}

		LoggerUtil.debug("End::AddUserHelper::sendAddUserEmail()>>>>>>");
		return emailStatus;
	}

  private  populateAddUserTxnRequest(request:any):any{

  		let req = new AddUserTxnRequest();
  		req.strCompanyCode =(cst.GMESS_CC_0270);
  		req.strPortal = (cst.ADMIN_TOOL);
  		req.strLoggedInUserName = (request.session.bmfAdminSession.loggedInSapUserName);
  		req.strTransactionType = ("RP");  //RP = sending the password link to the user UP= updating the own password
  		req.strUsername = (request.body.userInfo.userName);
  		return req;
	}

  public listEMMAssociates(req:any): Promise<any>{
      return this.getAscociatedUsers(req,'EMM');
  }

  public listEMAAssociates(req:any): Promise<any>{
      return this.getAscociatedUsers(req,'EMA');
  }

  private getAscociatedUsers(req: any, agentType: string) :Promise<any>{

     LoggerUtil.debug("THE BP NUMBER:::::::::"+req.body.bpNumber);
     let userList = new Array<User>();
     let request = new GetAllUsersAssociatedToBpRequest();
     request.bpNumber = req.body.bpNumber;
     request.strPortal = cst.ADMIN_TOOL;
     request.strCompanyCode = cst.GMESS_CC_0270;
     request.strLoggedInUserName = CommonUtil.getLoggedInUserName(req);
     var p = new Promise((resolve, reject) => {
         this.addUserService.getAllUsersAssociatedToBP(request).then(s => {
            resolve(this.populateAssociateList(s, agentType));
          });
      });
     return p;
  }


private populateAssociateList(s: any, agentType): User[]{

    let userList = new Array<User>();
    try{
      if(undefined !=s && null !=s.associatedUsersList && s.associatedUsersList.length >0){
         s.associatedUsersList.forEach((associate:any) => {
           let user = new User();
           user.firstName= associate.firstName;
           user.lastName = (associate.lastName);
           user.userName = (associate.userName);
           user.securityRole = (associate.securityRole);
           user.userType=(associate.userCategory);
           user.securityRoleDisplayName=(associate.userTypeDisplay);
           if(agentType == associate.userTypeDisplay){
              userList.push(user);
           }
         });
        }
    }catch(err){
      LoggerUtil.error("ERROR=======>"+err.message)
    }
    return userList;
}

public getAscociatedUsersForCustAdmin(userName:string,req:any):Promise<any>{

   LoggerUtil.debug("THE USERNAME:::::::::"+userName);
  let userList = new Array<User>();
   let request = new GetAssociatesRequest();
   request.bcadminUserName = (userName);
   request.strPortal = (cst.ADMIN_TOOL);
   request.strCompanyCode = cst.GMESS_CC_0270;
   request.strLoggedInUserName = (CommonUtil.getLoggedInUserName(req));

   var p = new Promise((resolve, reject) => {
       this.addUserService.getAssociates(request).then(s => {

         if(undefined !=s && null !=s.associatedUsersList && s.associatedUsersList.length >0){
            s.associatedUsersList.forEach((associate:any) => {
              let user = new User();
              user.firstName= associate.firstName;
              user.lastName = (associate.lastName);
              user.userName = (associate.userName);
              userList.push(user);
            resolve(userList);
             });
           }
        });
    });
   return p;

 }

 private  getStatusForBrokerAssignedOrNot(enteredBrokerNumber:string, brokerList:Array<string>, treeGUID:string):boolean{

      let status: boolean = false
      try{
      	 let brokerBPList = (null != brokerList)?brokerList:new Array<string>();
        	if(CommonUtil.isNotBlank(enteredBrokerNumber)){
              brokerBPList.forEach((brokerBP:string) => {
      	    		let brokerBPNum = brokerBP.substring(brokerBP.lastIndexOf("!")+1,brokerBP.lastIndexOf(":"));
      	    		let brokerTreeGuid = brokerBP.split("#").pop();
      	    		if(CommonUtil.equalsIgnoreCase(brokerBPNum, enteredBrokerNumber) && CommonUtil.equalsIgnoreCase(treeGUID, brokerTreeGuid)){
      	    			   status = true;
      	    		}
    	    	});
        	}else{
        		 status = true;
        	}
        }catch(err){
          LoggerUtil.error("ERROR======getStatusForBrokerAssignedOrNot====>"+err.message)
        }
    	  return status;
    }



	private searchBrokerAdminList(searchString:string,  searchCriteria:string, req:any):Promise<any>{
		LoggerUtil.debug("START::AddUserHelper::searchBrokerAdminList()>>>>>>");

		let userList = new Array<User>();
    let userNameList = new Array<string>();

		let request:SearchBrokerAdminRequest = this.populateSearchBrokerAdminRequest(searchCriteria,searchString, req);
    var p = new Promise((resolve, reject) => {
        this.addUserService.searchBrokerAdmin(request).then(s => {

          if(undefined !=s && null !=s.brokerAdminList && s.brokerAdminList.length >0){
             s.brokerAdminList.forEach((brokerAdmin:any) => {
               userNameList.push(brokerAdmin.userName);
              resolve(userNameList);
          });
            }
         });
     });
    return p;

	}


	private  populateSearchBrokerAdminRequest( searchCriteria:string, searchString:string, req:any):SearchBrokerAdminRequest{

		let request = new SearchBrokerAdminRequest();
		if(CommonUtil.equalsIgnoreCase(cst.SEARCH_CRITERIA_LN,searchCriteria)){
			request.brokerAdminLastname = (searchString);
		}else{
			request.brokerBpNumber = (searchString);
		}
		request.strCompanyCode = (cst.GMESS_CC_0270);
		request.strPortal = (cst.ADMIN_TOOL);
		request.searchCriteria=(searchCriteria);
		request.strLoggedInUserName = (CommonUtil.getLoggedInUserName(req));
		return request;
	}

  public listSelectedAdminCustomers(req: any): Promise<any> {

      LoggerUtil.debug("SELECTED ADMIN:::::"+req.body.userName)
      var p = new Promise((resolve, reject) => {
        var manageUserHelper = new ManageUserHelper();
          manageUserHelper.getUserDetailsForUpdate(req).then(s => {
              resolve(s.mngtBPList)
          })
      })
      return p;
  }

}
