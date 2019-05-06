import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';

export class AccountManagementService extends BaseService {

    constructor(){
        super();
    }

    public addCollectivesForProperty(postData:any): Promise<any> {
        return this.restUtil.post(cst.ADD_COLLECTIVES_FOR_PROPERTY, postData);
    }

    public listCollectivesForProperty(postData:any): Promise<any> {
        return this.restUtil.post(cst.LIST_COLLECTIVES_FOR_PROPERTY, postData);
    }

    public removeCollectivesForProperty(postData:any): Promise<any> {
        return this.restUtil.post(cst.REMOVE_COLLECTIVES_FOR_PROPERTY, postData);
    }

}