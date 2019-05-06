import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';


export class IncentiveOfferService extends BaseService {
    
    constructor(){
        super();
    };
    
    public createOffer(postData:any): Promise<any> {
        return this.restUtil.post(cst.CREATE_OFFER_URL, postData);
    }

    public deleteOffer(postData:any): Promise<any> {
        return this.restUtil.post(cst.DELETE_OFFER_URL, postData);
    }

    public getOffer(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_OFFER_URL, postData);
    }

    public updateOffer(postData:any): Promise<any> {
        return this.restUtil.post(cst.UPDATE_OFFER_URL, postData);
    }
}