import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';


export class LDAPService extends BaseService {

    constructor(){
        super();
    };

    public validateUserName(postData:any): Promise<any> {
        return this.restUtil.post(cst.CREATE_OFFER_URL, postData);
    }

    public updatePassword(postData:any): Promise<any> {
        return this.restUtil.post(cst.DELETE_OFFER_URL, postData);
    }

    public updateEmailAddress(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_OFFER_URL, postData);
    }

    public createUser(postData:any): Promise<any> {
        return this.restUtil.post(cst.CREATE_USER_IN_LDAP_URL, postData);
    }

    public deleteBMFUser(postData:any): Promise<any> {
        return this.restUtil.post(cst.UPDATE_OFFER_URL, postData);
    }
}
