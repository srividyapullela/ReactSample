import { IncentiveOfferService } from './../services/incentive.offer.service';
import Promise = require('tspromise');
import LoggerUtil from './../logs/log';
import { Request } from 'express';
import { CreateOfferRequest, DeleteOfferRequest,
    UpdateOfferRequest, GetOfferRequest } from './../request/incentive.offer.request';
import { CommonUtil } from './../util/common.util';
import { Offer } from './../model/incentive.offer';
import { CommonUtilityHelper } from './../helper/commonUtility.helper'
import * as cst from './../util/constant';

export class IncentiveOfferHelper {

    private incentiveOfferService: IncentiveOfferService;
    constructor() {
        this.incentiveOfferService = new IncentiveOfferService();
    }

    public createOffer(req:Request): Promise<any> {
        LoggerUtil.debug('calling createOffer service with the request::::'+JSON.stringify(req.body));
        return this.incentiveOfferService.createOffer(this.getCreateOfferRequest(req));
    }

    private getOfferRequest(req: Request){

        let createOfferReq = new CreateOfferRequest();
        createOfferReq.customerType = req.body.customerType;
        createOfferReq.offerCode = req.body.offerCode;
        createOfferReq.validFrom = req.body.fromDate;
        createOfferReq.validTo = req.body.toDate;
        createOfferReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
        createOfferReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
        return createOfferReq;
    }

    private getCreateOfferRequest(req: Request){

        let offerReq = new GetOfferRequest();
        offerReq.customerType = req.body.customerType;
        offerReq.offerCode = req.body.offerCode;
        offerReq.validFrom = req.body.fromDate;
        offerReq.validTo = req.body.toDate;
        offerReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
        offerReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
        return offerReq;
    }

    public getStatusForCreateOffer(s: any): string {
        if(null != s && s.dataAvailForInput){
            return "YES";
        }else{
            if(CommonUtil.isNotBlank(s.sqlErrorMessage) && s.sqlErrorCode != 0){
                return "F";
            }else{
                return "NO";
            }
        }
    }

    public deleteOffer(req:Request): Promise<any> {
        let delOffrReq = new DeleteOfferRequest();
        delOffrReq.customerType = req.body.customerType;
        delOffrReq.offerCode = req.body.offerCode;
        delOffrReq.strCompanyCode = req.session.bmfAdminSession.loggedInUserCompCode;
        delOffrReq.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
        LoggerUtil.debug('calling deleteOffer service with the request::::'+JSON.stringify(delOffrReq));
        var p = new Promise((resolve, reject) => {
            this.incentiveOfferService.deleteOffer(delOffrReq).then(s => {
                resolve({status:s.dataAvailForInput?'Y':'N', offerCode:req.body.offerCode})
            });
        });
        return p;

    }

    public getOffer(req:Request): Promise<any> {
        LoggerUtil.debug('calling getOffer service with the request::::'+JSON.stringify(req.body));
        return this.incentiveOfferService.getOffer(this.getOfferRequest(req));
    }

    public getOfferListFromResponse(s: any): Offer[] {

        let offrArray = new Array<Offer>();
        if(null != s && s.dataAvailForInput && null != s.offerList && s.offerList.length >0 ){
            offrArray = [...s.offerList];
        }
        return offrArray;
    }

    public updateOffer(req:any): Promise<any> {
        LoggerUtil.debug('calling updateOffer service with the request::::'+JSON.stringify(req.body));
        return this.incentiveOfferService.updateOffer(this.populateUpdateOfferRequest(req));
    }

    public populateUpdateOfferRequest(req:any):UpdateOfferRequest{

       let request = new UpdateOfferRequest();
        try{
            request.offerCodeOld= req.body.offerCodeOld;
      			request.offerCodeNew = req.body.offerCodeNew;
      			request.customerTypeOld = "MF";
      			request.cutomerTypeNew = "MF";
      			request.validFrom = req.body.validFrom;
      			request.validTo = req.body.validTo;
      			request.strLoggedInUserName = req.session.bmfAdminSession.loggedInSapUserName;
      			request.strCompanyCode = cst.GMESS_CC_0270;
      			request.strPortal = cst.ADMIN_TOOL;
        }catch(e){
          LoggerUtil.error("Error in populateUpdateOfferRequest():::"+e.message)
        }
        return request;
    }
}
