import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';

/*
*This means that you cannot use super on member properties. Instead you should just use 'this'
*Notice since there is only one this shared between the Base and the Child class you need to use different method names.
*/
export class AddUserService extends BaseService {

    constructor(){
        super();
    }

    public addUser(postData:any): Promise<any> {
        return this.restUtil.post(cst.ADD_USER_URL, postData);
    }

    public getAllUsersAssociatedToBP(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_USERS_ASSOC_TO_BP_URL, postData);
    }

    public getAssociates(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_ASSOCIATES_URL, postData);
    }

    public searchBrokerAdmin(postData:any): Promise<any> {
        return this.restUtil.post(cst.SEARCH_BRKR_ADMIN_URL, postData);
    }

    public searchCustomerAdmin(postData:any): Promise<any> {
        return this.restUtil.post(cst.SEARCH_CUST_ADMIN_URL, postData);
    }

    public getBPDetailsForAgent(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_BP_DTLS_FOR_AGENT_URL, postData);
    }

    public isSapIdExistAlreadyForInternalUser(postData:any): Promise<any> {
        return this.restUtil.post(cst.IS_USER_EXIST_FOR_SAPID_URL, postData);
    }

    public isUserValidatedInLDAP(postData: any): Promise<any> {
        return this.restUtil.post(cst.IS_USER_VALIDATED_IN_LDAP_URL, postData);
    }

    public createUserinLDAP(postData:any): Promise<any> {
        return this.restUtil.post(cst.CREATE_USER_IN_LDAP_URL, postData);
    }

    public insertResetPasswordDtls(postData:any): Promise<any> {
        return this.restUtil.post(cst.INSERT_RESET_PWD_DTLS_URL, postData);
    }

}
