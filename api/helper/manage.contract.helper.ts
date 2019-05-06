import { ManageContractService } from './../services/manage.contract.service';
import Promise = require('tspromise');
import LoggerUtil from './../logs/log';
import { Contract, CSAStatus, SearchContract, Promocode, ServiceAreaPromoDO } from '../model/contract';
import { Address } from '../model/common';
import { ManageContractRequest, ContractRequest } from '../request/manage.contract.request';
import { CreateUpdateContractRequest } from '../request/manage.contract.request';
import * as cst from './../util/constant';
import { CommonUtil } from './../util/common.util';
import * as _ from "lodash";


export class ManageContractHelper {


   private manageContractService: ManageContractService;
   private serviceAreaDetails: Map<String,String>;

   constructor() {
         this.manageContractService = new ManageContractService();
   }


   public getContractDetails(req:any): Promise<any> {
        LoggerUtil.debug('calling getContractDetails service with the request::::'+JSON.stringify(req.body));

        var p = new Promise((resolve, reject) => {
          let contractReq = new ContractRequest();
          contractReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
          contractReq.relationshipId = req.body.bpNumber;
          contractReq.strCompanycode = req.session.bmfAdminSession.loggedInUserCompCode;
          this.manageContractService.getContractDetails(contractReq).then(s => {
              var contract = new Contract();
              try{
                if(s.dataAvilableForInput && s.contractFromDB){
                    var csaStatus = new CSAStatus();
                    csaStatus.creationDate = s.contract.createdDate;
                    csaStatus.csaNumber = s.contract.csaNumber;
                    csaStatus.csaStatus = s.contract.csaStatus;
                    csaStatus.lastUpdateDate = s.contract.updatedDate;
                    contract.address = this.getAddress(s);
                    contract.csaStatus = csaStatus;
                    contract.businessName = s.contract.bpName;
                    contract.bpName = s.contract.bpName;
                    contract.relationshipId = s.contract.relationshipId;
                    contract.bmfContractId = s.contract.bmfContractId;
                    contract.bpAccountCategory = s.contract.customerType;
                    contract.taxExemptSts = s.contract.taxExemption;
                    contract.terms = s.contract.terms;
                    contract.contractExpDate = s.contract.contractExpDate;
                    contract.customerStatus = s.contract.customerStatus;
                    var promocode = new Promocode();
                    if(_.isEqual(cst.USERTYPE_BUILDER,s.contract.customerType)){
  			             LoggerUtil.info("HB contract Details from DB");
                     //TODO: LATER when we integrate Builder Code
                    }else{
                      LoggerUtil.info("HB contract Details from DB");
                      if(undefined != s.contract.serviceAreaPromoList && undefined != s.contract.serviceAreaPromoList[0]){
                          promocode.permCode = s.contract.serviceAreaPromoList[0].permPromoCode;
                          promocode.tempCode = "NA";
                          contract.serviceArea = "NA";
                          contract.serviceAreaDisplay = "NA";
                       }
                    }
                    contract.promoCode = promocode;
                    contract.status = "DB";
                }else if(s.dataAvilableForInput && s.contractFromCCS){
                    contract.relationshipId = req.body.bpNumber;
                    contract.bpAccountCategory = s.contract.customerType;
                    contract.address = this.getAddress(s);
                    contract.businessName = s.contract.bpName;
                    contract.status = "CCS";
                }else{
                    LoggerUtil.info("N0 CONTRACT FOUND FOR THE BP NUMBER::::::"+req.body.bpNumber)
                    contract.relationshipId = req.body.bpNumber;
                    contract.status = "NOT_FOUND";
                }
              }catch(err){
                 LoggerUtil.info("ERROR::::getContractDetails:::"+err.message)
              }
              resolve(contract);
          })
        });
        return p;
    }

    private getAddress(s: any): Address {

        var address = new Address(s.contract.bpStreetNumber, s.contract.bpStreetName,s.contract.bpCity,s.contract.bpState,s.contract.bpZipCode);
        return address;
    }

    public saveContract(req:any): Promise<any> {
        LoggerUtil.debug('calling createUpdateContract service with the request::::'+JSON.stringify(req.body));
        let inReq = this.popolateContractRequestForMFAM(req);
        var p = new Promise((resolve, reject) => {
            this.manageContractService.createUpdateContract(inReq).then(s => {
                if(undefined != s && s.dataAvailForInput){
                    LoggerUtil.info("contract successfully created::::")
                    resolve(true);
                }else{
                    LoggerUtil.info("contract creation failure::::")
                    resolve(false);
                }
            })
        });
        return p;
      }


      private popolateContractRequestForMFAM(req: any): CreateUpdateContractRequest {

        let contractReq = new CreateUpdateContractRequest();
        try{
            contractReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
            contractReq.relationshipId = req.body.contract.relationshipId;
            contractReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
            contractReq.bpAccountCategory = req.body.contract.bpAccountCategory == 'MFAM'?'MF':'HB';
            contractReq.bpCity = req.body.contract.address.city;
            contractReq.bpName=req.body.contract.businessName;
            contractReq.bpPoBox=req.body.contract.address.pobox;
            contractReq.bpState=req.body.contract.address.state;
            contractReq.bpStreetName=req.body.contract.address.streetName;
            contractReq.bpStreetNumber=req.body.contract.address.streetNum;
            contractReq.bpZipCode=req.body.contract.address.zipcode;
            contractReq.contractExpDate=req.body.contract.expiryDate;
            contractReq.strPortal=cst.ADMIN_PORTAL;
            contractReq.taxExemption=req.body.contract.taxExemptSts;
            contractReq.customerStatus= 'Active';
            contractReq.terms = req.body.contract.terms;
            let serviceAreaPromo = new ServiceAreaPromoDO();
            let serviceAreaPromoAry = new Array<ServiceAreaPromoDO>();
            if(CommonUtil.isNotBlank(req.body.contract.promoCode)){
              serviceAreaPromo.permPromoCode = req.body.contract.promoCode;
              serviceAreaPromo.serviceArea = cst.NA;
              serviceAreaPromo.serviceAreaDisplay = cst.NA;
              serviceAreaPromo.tempPromoCode=cst.NA;
              contractReq.serviceAreaPromoList.push(serviceAreaPromo);
              contractReq.bpAccountCategory=cst.MULTIFAMILY;
              contractReq.csaNumber= CommonUtil.isNotBlank(req.body.contract.csaNumber)?req.body.contract.csaNumber:"";
              contractReq.csaStatus = req.body.contract.csaStatus;
            }
          }catch(e){
              LoggerUtil.error("Error=======>"+e)
          }
        return contractReq;
      }


      public updateContract(req:any): Promise<any> {
          LoggerUtil.debug('calling createUpdateContract service with the request::::'+JSON.stringify(req.body));
          let inReq = this.popolateUpdateContractRequestForMFAM(req);
          var p = new Promise((resolve, reject) => {
            this.manageContractService.createUpdateContract(inReq).then(s => {
                  if(undefined != s && s.dataAvailForInput){
                      LoggerUtil.info("contract successfully updated::::")
                      resolve(true);
                  }else{
                      LoggerUtil.info("contract update failure::::")
                      resolve(false);
                  }
              })
          });
          return p;
      }


      private popolateUpdateContractRequestForMFAM(req: any): CreateUpdateContractRequest {

        let contractReq = new CreateUpdateContractRequest();
        try{
            contractReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
            contractReq.relationshipId = req.body.contract.relationshipId;
            contractReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
            contractReq.bpAccountCategory = req.body.contract.bpAccountCategory == 'MFAM'?'MF':'HB';
            contractReq.bpCity = req.body.contract.address.city;
            contractReq.bpName=req.body.contract.businessName;
            contractReq.bpPoBox=req.body.contract.address.pobox;
            contractReq.bpState=req.body.contract.address.state;
            contractReq.bpStreetName=req.body.contract.address.streetName;
            contractReq.bpStreetNumber=req.body.contract.address.streetNum;
            contractReq.bpZipCode=req.body.contract.address.zipcode;
            contractReq.contractExpDate=req.body.contract.expiryDate;
            contractReq.strPortal=cst.ADMIN_PORTAL;
            contractReq.taxExemption=req.body.contract.taxExemptSts;
            contractReq.customerStatus= req.body.contract.customerStatus;
            contractReq.terms = req.body.contract.terms;
            let serviceAreaPromo = new ServiceAreaPromoDO();
            let serviceAreaPromoAry = new Array<ServiceAreaPromoDO>();
            if(undefined != req.body.contract.promoCode){
              serviceAreaPromo.permPromoCode = req.body.contract.promoCode;
              serviceAreaPromo.serviceArea = cst.NA;
              serviceAreaPromo.serviceAreaDisplay = cst.NA;
              serviceAreaPromo.tempPromoCode=cst.NA;
              contractReq.serviceAreaPromoList.push(serviceAreaPromo);
            }
            contractReq.bpAccountCategory=cst.MULTIFAMILY;
            contractReq.csaNumber= CommonUtil.isNotBlank(req.body.contract.csaNumber)?req.body.contract.csaNumber:"";
            contractReq.csaStatus = req.body.contract.csaStatus;
          }catch(e){
                LoggerUtil.error("Error=======>"+e)
          }
        return contractReq;
      }




}
