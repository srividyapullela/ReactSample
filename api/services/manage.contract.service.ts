import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';


export class ManageContractService extends BaseService{
    
    constructor(){
        super();
    };
    
    public getContractDetails(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_CONTRACT_DETAILS_URL, postData);
    }

    public createUpdateContract(postData:any): Promise<any> {
        return this.restUtil.post(cst.CREATE_UPDATE_CONTRACT_DETAILS_URL, postData);
    }

    
}