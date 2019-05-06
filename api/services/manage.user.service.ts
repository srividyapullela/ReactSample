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
export class ManageUserService extends BaseService {

    constructor(){
        super();
    }

    public updateUser(postData:any): Promise<any> {
        return this.restUtil.post(cst.UPDATE_USER_URL, postData);
    }

    public getUserProfileWithBPHierarchy(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_USER_PROFILE_WITH_BP_HIER_URL, postData);
    }

    public searchUsersForUpdate(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_USERS_FOR_UPDATE_URL, postData);
    }

    public changeAdminForAssociate(postData:any): Promise<any> {
        return this.restUtil.post(cst.CHG_ADMIN_FOR_ASSOC_USER_URL, postData);
    }

    public getUserProfile(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_USER_PROFILE_URL, postData);
    }

    public associateUserToCustomer(postData:any): Promise<any> {
        return this.restUtil.post(cst.ASSOC_USER_TO_CUST_URL, postData);
    }

    public deActivateUser(postData:any): Promise<any> {
        return this.restUtil.post(cst.DEACTIVATE_USER_URL, postData);
    }

    public dissociateCustomerFromUser(postData:any): Promise<any> {
        return this.restUtil.post(cst.DISASSOC_CUST_FROM_USER_URL, postData);
    }

    public addUserTransaction(postData:any): Promise<any> {
        return this.restUtil.post(cst.ADD_USER_TXN_URL, postData);
    }

    public updateBrokerWithNewlyAddedProperties(postData:any): Promise<any> {
        return this.restUtil.post(cst.ADD_USER_TXN_URL, postData);
    }

}
