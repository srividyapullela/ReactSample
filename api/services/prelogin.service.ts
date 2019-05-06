import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';


export class PreLoginService extends BaseService {

    constructor(){
        super();
    };

    public getUserDtlsFromSapId(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_USERS_PROFILE_WITH_SAPID_URL, postData);
    }

    public getBPHierarchy(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_BP_HIERARCHY_URL, postData);
    }

    public getBPHierarchyDtls(postData:any): Promise<any> {
        return this.restUtil.post(cst.GET_BP_HIERARCHY_DTLS_URL, postData);
    }
}
