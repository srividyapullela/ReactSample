import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { CommonUtil } from './../util/common.util';
import { PreLoginService } from './../services/prelogin.service';
import { GetUserDtlsFromSapIDRequest } from './../request/user.request';
import { BMFAdminSession } from './../model/bmfAdmin.session';

export class PreloginHelper {

    private preloginService: PreLoginService;
    constructor(){
        this.preloginService = new PreLoginService();
    }

    public getUserDetailsFromSapId(sapId: string): Promise<any> {
        var req = new GetUserDtlsFromSapIDRequest(sapId);
        return this.preloginService.getUserDtlsFromSapId(req);
    }

    public getSapUserIdInfo(s:any): string {

        return "Username:::"+s.userDtlsDO.userName+" with SAPID "+s.userDtlsDO.sapId+
					" with Security role " + s.userDtlsDO.webSecurityRole;
    }

    public getBMFAdminSession(s:any, inSapId: string): BMFAdminSession {
        var bmfAdminSession = new BMFAdminSession();
        bmfAdminSession.loggedInSapFirstName = s.userDtlsDO.firstName;
        bmfAdminSession.loggedInSapLastName = s.userDtlsDO.lastName;
        bmfAdminSession.loggedInSapStatus = s.userDtlsDO.bmfUserStatus;
        bmfAdminSession.loggedInSapEmailId = s.userDtlsDO.emailId;
        bmfAdminSession.loggedInSapUserName = s.userDtlsDO.userName;
        bmfAdminSession.empSapId = s.userDtlsDO.sapId;
        bmfAdminSession.loggedInUserCompCode = "0270";
        bmfAdminSession.loggedInSapSecurityRole = s.userDtlsDO.webSecurityRole;
        bmfAdminSession.userSapIdInfo = this.getSapUserIdInfo(s);
        return bmfAdminSession;
    }

}
