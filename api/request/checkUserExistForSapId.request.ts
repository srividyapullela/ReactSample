import { BaseRequest } from './base.request';
import * as cst from './../util/constant';
import { CommonUtilityHelper } from '../helper/commonUtility.helper';

export class CheckUserExistForSapIdReq extends BaseRequest {

    private commonUtilityHelper: CommonUtilityHelper;

    constructor(sapId: string){
        super();
        this.commonUtilityHelper = new CommonUtilityHelper();
        this.sapId = sapId;
        this.strCompanyCode = '';
        this.strPortal = cst.ADMIN_TOOL;
        this.strLoggedInUserName = this.commonUtilityHelper.getLoggedInUserName();
    }
    sapId: string;
}
