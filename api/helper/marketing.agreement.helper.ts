import { MarketingAgreementService } from './../services/marketing.agreement.service';
import Promise = require('tspromise');
import LoggerUtil from './../logs/log';
import { SearchAgreement, Agreement } from '../model/mrktg.Agreement';
import { GetMarkAgrmDetailsRequest, UpdateMrktAgrmStatusRequest, CreateMrktgAgreementRequest } from '../request/marketing.agreement.request';
import * as _ from "lodash";
import { CommonUtil } from './../util/common.util';
import * as cst from './../util/constant';
import {BpHierarchyDtlsRequest} from'./../request/user.request';
import { PreLoginService } from './../services/prelogin.service';
//import * as moment  from 'moment';
export class MarketingAgreementHelper {


   private marketingAgreementService: MarketingAgreementService;
   private preloginService: PreLoginService;

   constructor() {
         this.marketingAgreementService = new MarketingAgreementService();
         this.preloginService = new PreLoginService();
   }

   public getMrktAgreement(req:any): Promise<any> {

        LoggerUtil.debug('calling getMrktAgreement service with the request::::'+JSON.stringify(req.body));
        var p = new Promise((resolve, reject) => {
            let mrktgReq = new GetMarkAgrmDetailsRequest();
            mrktgReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
            mrktgReq.strBpNumber = req.body.bpNumber;
            mrktgReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
            this.marketingAgreementService.getMrktAgreementDtls(mrktgReq).then(s => {
                var srchAgreement = new SearchAgreement();
                var agrm = new Agreement();
                var status = "";
                var bpNodeGuid = undefined;
                if(undefined != s && s.mrkgAgrmFoundFromDB) {
                    agrm.bpNumber = req.body.bpNumber;
                    agrm.agreementTerm = s.markAgrmDO.numOfMonths;
                    status = "DB";
                    agrm.glNumber=s.markAgrmDO.glnumber;
                    agrm.ioNumber=s.markAgrmDO.ionumber;
                    agrm.active=(_.isEqual(s.markAgrmDO.mrkgAgrmStatus,"A"));
                    req.session.bmfAdminSession.mrkgAgrmStatus = (_.isEqual(s.markAgrmDO.mrkgAgrmStatus,"A"));
                    agrm.customerType = s.markAgrmDO.customerType;
                    agrm.contactStreetNum = this.isNotBlank(s.markAgrmDO.contactStreetNum);
                    agrm.contactStreetName = this.isNotBlank(s.markAgrmDO.contactStreetName);
                    agrm.contactCity = s.markAgrmDO.contactCity;
                    agrm.contactState = s.markAgrmDO.contactState;
                    agrm.contactZipcode = s.markAgrmDO.contactZipcode;
                    agrm.contactPhoneNumber = s.markAgrmDO.phoneNumber;
                    agrm.contactPhExtn = s.markAgrmDO.phoneNumExtn;
                    agrm.contactPOBNum = s.markAgrmDO.contactPOBNum;
                    agrm.contactSuiteNum=s.markAgrmDO.contactSuiteNum;
                    agrm.billingStreetNum = s.markAgrmDO.billingStreetNum;
                    agrm.billingStreetName = s.markAgrmDO.billingStreetName;
                    agrm.billingCity = s.markAgrmDO.billingCity;
                    agrm.billingState = s.markAgrmDO.billingState;
                    agrm.billingZipcode = s.markAgrmDO.billingZipcode;
                    agrm.billingPhoneNumber = s.markAgrmDO.billingPhNumber;
                    agrm.billingPhExtn = s.markAgrmDO.billPhExtn;
                    agrm.billingPOBNum = s.markAgrmDO.billingPOBNum;
                    agrm.billingSuiteNum = s.markAgrmDO.billingSuiteNum;
                    agrm.brand = s.markAgrmDO.brand;
                    agrm.cancellationFee = s.markAgrmDO.cancellationFee;
                    agrm.doorFeeAmount = s.markAgrmDO.flatFeeAmountCode;
                    agrm.doorFeeStructure = s.markAgrmDO.doorTypeStrucType;
                    agrm.endDate = s.markAgrmDO.endDate;
                    agrm.moveInRate1 = s.markAgrmDO.tierFeeMVRate1;
                    agrm.moveInRate2 = s.markAgrmDO.tierFeeMVRate2;
                    agrm.moveInRate3 = s.markAgrmDO.tierFeeMVRate3;
                    agrm.payableTo = s.markAgrmDO.payableTo;
                    agrm.paymentAddressOption = s.markAgrmDO.paymentAddressOption;
                    agrm.paymentCity= s.markAgrmDO.paymentCity;
                    agrm.paymentPhExt = s.markAgrmDO.paymentPhExtn;
                    agrm.paymentState = s.markAgrmDO.paymentState;
                    agrm.paymentPhone = s.markAgrmDO.paymentPhNumber;
                    agrm.paymentPOBNum = s.markAgrmDO.paymentPOBNum;
                    agrm.paymentZipcode = s.markAgrmDO.paymentZipcode;
                    agrm.paymentSuiteNum = s.markAgrmDO.paymentSuiteNum;
                    agrm.paymentStreetNum =  s.markAgrmDO.paymentStreetNum;
                    agrm.paymentStreetName = s.markAgrmDO.paymentStreetName;
                    agrm.startDate =  s.markAgrmDO.startDate;
                    agrm.tier1Fee = s.markAgrmDO.tierFee1;
                    agrm.tier2Fee = s.markAgrmDO.tierFee2;
                    agrm.tier3Fee = s.markAgrmDO.tierFee3;
                    agrm.vendorNumber = s.markAgrmDO.vendorNumber;
                    agrm.mrktgAgreementNum = s.markAgrmDO.contractMarkCode;
                    agrm.businessName = s.markAgrmDO.businessName;
                }else if(undefined != s && s.mrkgAgrmFoundFromCCS){
                    agrm.customerType = s.markAgrmDO.customerType;
                    agrm.bpNumber = req.body.bpNumber;
                    agrm.contactStreetNum = this.isNotBlank(s.markAgrmDO.contactStreetNum);
                    agrm.contactStreetName = this.isNotBlank(s.markAgrmDO.contactStreetName);
                    agrm.contactCity = s.markAgrmDO.contactCity;
                    agrm.contactState = s.markAgrmDO.contactState;
                    agrm.contactZipcode = s.markAgrmDO.contactZipcode;
                    agrm.contactPhoneNumber = s.markAgrmDO.phoneNumber;
                    agrm.contactPhExtn = s.markAgrmDO.phoneNumExtn;
                    agrm.billingStreetNum = s.markAgrmDO.billingStreetNum;
                    agrm.billingStreetName = s.markAgrmDO.billingStreetName;
                    agrm.billingCity = s.markAgrmDO.billingCity;
                    agrm.billingState = s.markAgrmDO.billingState;
                    agrm.billingZipcode = s.markAgrmDO.billingZipcode;
                    agrm.billingPhoneNumber = s.markAgrmDO.billingPhNumber;
                    agrm.billingPhExtn = s.markAgrmDO.billPhExtn;
                    agrm.businessName = s.markAgrmDO.businessName;
                    bpNodeGuid = s.markAgrmDO.bpNodeGuid;
                    status = "CCS";
                }else{
                    LoggerUtil.info("N0 MARKETING AGREEMENT FOUND FOR THE BP NUMBER::::::"+req.body.bpNumber)
                    status = "NOT_FOUND";
                    agrm = null;
                }
                srchAgreement.agreement = agrm;
                srchAgreement.status = status;
                srchAgreement.bpNodeGuid = bpNodeGuid;
                resolve(srchAgreement);
            });
        });
        return p;
    }


    private isNotBlank(inValue): string {
        return (inValue == 'NA')?'':inValue;
    }


   public createMrktAgreement(req:any): Promise<any> {

        let createMktReq = this.getCreateMrktgAgreementRequest(req,"C");
        var p = new Promise((resolve, reject) => {
            this.marketingAgreementService.createMrktAgreement(createMktReq).then(s =>{
              LoggerUtil.debug("Create agreement response========>"+JSON.stringify(s))
                if(undefined != s && s.dataAvailForInput){
                    resolve({confirm:true})
                }else{
                    resolve({confirm:false})
                }
            })
          });
        return p;
      }

      private getCreateMrktgAgreementRequest(req: any, dmlType:string): CreateMrktgAgreementRequest {

          let inReq = new CreateMrktgAgreementRequest();
          try{
            inReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
            inReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
            let ccsInfo = req.body.info
            if(CommonUtil.equalsIgnoreCase(dmlType, cst.CREATE_C)){
                let paymentInfo = req.body.paymentInfo
                let agreementInfo = req.body.agreement
                inReq.updateType = cst.NA;
                inReq.glNumber = agreementInfo.glNumber;
                inReq.ioNumber= agreementInfo.ioNumber;
                inReq.vendorNumber = agreementInfo.vendorNumber;
                inReq.contractMrkAgrmtCode = agreementInfo.mrktgAgreementNum;
                inReq.endDate = agreementInfo.toDate;
                inReq.numOfMonths = agreementInfo.agrTerm;
                inReq.brand = agreementInfo.brand;
                inReq.cancellationFee = agreementInfo.cancellationFee;
                inReq.startDate = agreementInfo.fromDate;

                inReq.payableTo = paymentInfo.payableTo;
                inReq.paymentAddressOption = paymentInfo.paymentAddressOption;
                inReq.paymentCity = paymentInfo.city;
                inReq.paymentState = paymentInfo.state;
                inReq.paymentPOBNum = CommonUtil.isNotBlank(paymentInfo.poBox)?paymentInfo.poBox:'';
                inReq.paymentZipcode = paymentInfo.zipcode;
                inReq.paymentSuiteNum = CommonUtil.isNotBlank(paymentInfo.suiteNum)?paymentInfo.suiteNum:'';
                inReq.paymentStreetNum = paymentInfo.streetNumber;
                inReq.paymentStreetName = paymentInfo.streetName;
                inReq.paymentPhoneExten = CommonUtil.isNotBlank(paymentInfo.extn)?paymentInfo.extn:'';
                inReq.paymentPhoneNumber = paymentInfo.phoneNumber;

                inReq.bpName = req.body.bpName;
                inReq.bpNumber = req.body.bpNumber;
                inReq.strBpNumber = req.body.bpNumber;
                let addr = req.body.address
                inReq.billPhoneExten= CommonUtil.isNotBlank(addr.extn)?addr.extn:'';
                inReq.billPhoneNumber= CommonUtil.isNotBlank(addr.phoneNumber)?addr.phoneNumber:'';
                inReq.billingCity = CommonUtil.isNotBlank(addr.city)?addr.city:'';
                inReq.billingPOBNum = CommonUtil.isNotBlank(addr.poBox)?addr.poBox:'';
                inReq.billingState = CommonUtil.isNotBlank(addr.state)?addr.state:'';
                inReq.billingZipcode = CommonUtil.isNotBlank(addr.zipcode)?addr.zipcode:'';
                inReq.billingSuiteNum = CommonUtil.isNotBlank(addr.suiteNumber)?addr.suiteNumber:'';
                inReq.billingStreetNum = CommonUtil.isNotBlank(addr.streetNumber)?addr.streetNumber:'';
                inReq.billingStreetName = CommonUtil.isNotBlank(addr.streetName)?addr.streetName:'';

                inReq.cntPhoneExten = CommonUtil.isNotBlank(addr.extn)?addr.extn:'';
                inReq.cntPhoneNumber = CommonUtil.isNotBlank(addr.phoneNumber)?addr.phoneNumber:'';
                inReq.contactCity = CommonUtil.isNotBlank(addr.city)?addr.city:'';
                inReq.contactPOBNum = CommonUtil.isNotBlank(addr.poBox)?addr.poBox:'';
                inReq.contactState = CommonUtil.isNotBlank(addr.state)?addr.state:'';
                inReq.contactZipcode = CommonUtil.isNotBlank(addr.zipcode)?addr.zipcode:'';
                inReq.contactSuiteNum = CommonUtil.isNotBlank(addr.suiteNumber)?addr.suiteNumber:'';
                inReq.contactStreetNum = CommonUtil.isNotBlank(addr.streetNumber)?addr.streetNumber:'';
                inReq.contactStreetName = CommonUtil.isNotBlank(addr.streetName)?addr.streetName:'';

                let isFlatFee:boolean = (agreementInfo.doorFeeOption == 'flatfee');
                inReq.tierFee1Amt = isFlatFee?cst.NA:agreementInfo.tier1Fee
                inReq.tierFee2Amt = isFlatFee?cst.NA:agreementInfo.tier2Fee
                inReq.tierFee3Amt = isFlatFee?cst.NA:agreementInfo.tier3Fee
                inReq.tierFee1MyRate = isFlatFee?cst.NA:agreementInfo.moveInRate1
                inReq.tierFee2MyRate = isFlatFee?cst.NA:agreementInfo.moveInRate2
                inReq.tierFee3MyRate = isFlatFee?cst.NA:agreementInfo.moveInRate3
                inReq.flatFeeAmountCode = isFlatFee?agreementInfo.flatFee:cst.NA;
                inReq.doorFeeStructureType = agreementInfo.doorFeeOption;

                inReq.customerType = "MF";
                inReq.dmlType = dmlType;
            }else if(CommonUtil.equalsIgnoreCase(dmlType, cst.UPDATE_U)){
                let paymentInfo = req.body.paymentInfo;
                inReq.dmlType = dmlType;
                inReq.bpName = req.body.bpName;
                inReq.bpNumber = req.body.bpNumber;
                inReq.strBpNumber = req.body.bpNumber;
                if(undefined != paymentInfo && CommonUtil.isNotBlank(paymentInfo.payableTo)){
                    inReq.payableTo = paymentInfo.payableTo;
                    inReq.paymentAddressOption = paymentInfo.paymentAddressOption;
                    inReq.paymentCity = paymentInfo.city;
                    inReq.paymentState = paymentInfo.state;
                    inReq.paymentPOBNum = CommonUtil.isNotBlank(paymentInfo.poBox)?paymentInfo.poBox:'';
                    inReq.paymentZipcode = paymentInfo.zipcode;
                    inReq.paymentSuiteNum = CommonUtil.isNotBlank(paymentInfo.suiteNum)?paymentInfo.suiteNum:'';
                    inReq.paymentStreetNum = paymentInfo.streetNumber;
                    inReq.paymentStreetName = paymentInfo.streetName;
                    inReq.paymentPhoneExten = CommonUtil.isNotBlank(paymentInfo.extn)?paymentInfo.extn:'';
                    inReq.paymentPhoneNumber = paymentInfo.phoneNumber;
            				inReq.updateType = ("BILLINFO");
            			}else{
                    let agreementInfo = req.body.agreement
                    inReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
                    inReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
            				inReq.updateType = ("MRKGINFO");
            				inReq.startDate = agreementInfo.startDate;
            				inReq.doorFeeStructureType = agreementInfo.doorFeeStructure;
                    let isFlatFee:boolean = (agreementInfo.doorFeeStructure == 'flatfee');

                    inReq.tierFee1Amt = isFlatFee?cst.NA:agreementInfo.tier1Fee
                    inReq.tierFee2Amt = isFlatFee?cst.NA:agreementInfo.tier2Fee
                    inReq.tierFee3Amt = isFlatFee?cst.NA:agreementInfo.tier3Fee
                    inReq.tierFee1MyRate = isFlatFee?cst.NA:agreementInfo.moveInRate1
                    inReq.tierFee2MyRate = isFlatFee?cst.NA:agreementInfo.moveInRate2
                    inReq.tierFee3MyRate = isFlatFee?cst.NA:agreementInfo.moveInRate3
                    inReq.flatFeeAmountCode = isFlatFee?agreementInfo.doorFeeAmount:cst.NA;

                    inReq.glNumber = agreementInfo.glNumber;
                    inReq.ioNumber= agreementInfo.ioNumber;
                    inReq.vendorNumber = agreementInfo.vendorNumber;
                    inReq.contractMrkAgrmtCode = agreementInfo.contractAgrmNumber;
                    inReq.endDate = agreementInfo.endDate;
                    inReq.numOfMonths = agreementInfo.agreementTerm;
                    inReq.brand = agreementInfo.brand;
                    inReq.cancellationFee = agreementInfo.cancelFee;
                }
    		        }
              }catch(err){
                 LoggerUtil.error("ERROR=====getCreateMrktgAgreementRequest===="+err.message)
              }
          return inReq;
      }


      public updatemktagreementsts(req:any): Promise<any> {
             LoggerUtil.debug('calling updatemktagreementsts service with the request::::'+JSON.stringify(req.body));

             let inReq = new UpdateMrktAgrmStatusRequest();
             inReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
             inReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
             inReq.bpNumber = req.body.bpNumber;
             inReq.status = req.body.status
             var p = new Promise((resolve, reject) => {
                  this.marketingAgreementService.updatemktagreementsts(inReq).then(s => {
                      if(undefined != s && s.dataAvailForInput){
                          resolve({status:s.dataAvailForInput})
                      }else{
                        resolve({status:false})
                      }
                  })
               });
             return p;
         }

   public updateMarketingAgreement(req:any): Promise<any> {
          LoggerUtil.debug('calling updateMarketingAgreement service with the request::::'+JSON.stringify(req.body));

          let createMktReq = this.getCreateMrktgAgreementRequest(req,"U");
          var p = new Promise((resolve, reject) => {
              this.marketingAgreementService.createMrktAgreement(createMktReq).then(s =>{
                LoggerUtil.info("Update agreement response========>"+JSON.stringify(s))
                  if(undefined != s && s.dataAvailForInput){
                      LoggerUtil.info("Marketing agreement has been updated for the BP NUMBER::::"+createMktReq.bpNumber);
                      resolve({confirm:true})
                  }else{
                     LoggerUtil.info("Updation of marketing agreement failed for the bp::::"+createMktReq.bpNumber);
                      resolve({confirm:false})
                  }
              })
            });
          return p;
      }


  public paymentInfo(req:any,bpNodeGuid:string): Promise<any> {
      LoggerUtil.debug('calling paymentInfo service with the request::::'+JSON.stringify(req.body));


			let mrkgAgreement = new Agreement();
			if(CommonUtil.isNotBlank(bpNodeGuid)){
				let nodeGuidAry = new Array<string>(1);
				nodeGuidAry[0] = bpNodeGuid;
				let request = new BpHierarchyDtlsRequest();
				request.strCompanycode = req.session.bmfAdminSession.loggedInUserCompCode;
				request.propNodeGuidList = (nodeGuidAry);

        var p = new Promise((resolve, reject) => {
            this.preloginService.getBPHierarchyDtls(request).then(s =>{
                if(undefined != s && s.dataAvailForInput && s.hierarchyDtlsList != undefined && s.hierarchyDtlsList.length >0){
                   s.hierarchyDtlsList.forEach(h => {
                    mrkgAgreement.contactCity = (h.mailingAddress.city);
       					    mrkgAgreement.contactPhExtn = (h.primaryContactExtn);
       					    mrkgAgreement.contactPhoneNumber = ((h.primaryContactPhone));
       					    mrkgAgreement.contactPOBNum = (h.mailingAddress.poBox);
       					    mrkgAgreement.contactState = (h.mailingAddress.state);
       					    mrkgAgreement.contactStreetName = (h.mailingAddress.streetName);
       					    mrkgAgreement.contactStreetNum = (h.mailingAddress.streetNumber);
       					    mrkgAgreement.contactZipcode = (h.mailingAddress.zipCode);
       					    mrkgAgreement.contactSuiteNum= (h.mailingAddress.suiteNumber);
       					    mrkgAgreement.billingCity = (h.billingAddress.city);
       					    mrkgAgreement.billingPhExtn = (h.billingtPhoneExtn);
       					    mrkgAgreement.billingPhoneNumber = ((h.billingtPhone));
       					    mrkgAgreement.billingPOBNum = (h.billingAddress.poBox);
       					    mrkgAgreement.billingState = (h.billingAddress.state);
       					    mrkgAgreement.billingStreetName = (h.billingAddress.streetName);
       					    mrkgAgreement.billingStreetNum = (h.billingAddress.streetNumber);
       					    mrkgAgreement.billingSuiteNum = (h.billingAddress.suiteNumber);
       					    mrkgAgreement.billingZipcode = (h.billingAddress.zipCode);

                   });

                }else{
                  LoggerUtil.error("Payment Info not found from CCS BP Hierarchy Dtls call::::");

                }
                resolve(mrkgAgreement);
            });
          });
        return p;

      }
    }

}
