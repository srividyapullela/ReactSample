import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { CommonUtil } from './../util/common.util';
import { AccountManagementService } from './../services/accountMngmt.service';
import { CollectiveAccountRequest, AddCollectiveAccountRequest, DissociateCollectiveRequest } from './../request/accountMngmt.request';

export class  AccountManagementHelper {

    private accountMngmtService: AccountManagementService;
    constructor(){
        this.accountMngmtService = new AccountManagementService();
    }

    public addCollectivesForProperty(): Promise<any> {
        var addCollAccReq = new AddCollectiveAccountRequest();
        return this.accountMngmtService.addCollectivesForProperty(addCollAccReq);
    }

}