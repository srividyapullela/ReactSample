import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';


export class MarketingAgreementService extends BaseService{
    
    constructor(){
        super();
    };
    
    public createMrktAgreement(postData:any): Promise<any> {
        return this.restUtil.post(cst.CREATE_MKT_AGREEMENT_URL, postData);
    }
    
    public getMrktAgreementDtls(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_MARKETING_AGGREMENT_URL, postData);
    }

    public updatemktagreementsts(postData:any): Promise<any> {
        return this.restUtil.post(cst.UPDATE_MKT_AGGMENT_STATUS_URL, postData);
    }

}