import { Request, Response, NextFunction} from 'express';
import LoggerUtil from '../logs/log';
import { PreloginHelper } from './../helper/prelogin.helper';
import { LoggedInUserDtls } from './../model/loggedinuser.details';

export class PreLoginController {

    preloginHelper: PreloginHelper;
    constructor(){
        this.preloginHelper = new PreloginHelper();
    }

    public test(req: Request, res: Response) {
        return res.json("test")
    }

    public getUserDetailsForSapId(req: Request, res: Response, next: NextFunction) {

        var sapId: string = req.body.sapId;
        let preloginHelper = new PreloginHelper();
        LoggerUtil.debug('SAP ID FOR THE USER LOGIN ID:::::::'+sapId);
        let loggedInUserDtls: LoggedInUserDtls = new LoggedInUserDtls();
        if(req.session && null != req.session.bmfAdminSession){
          LoggerUtil.info('FOUND SESSION::::::GETTING DETAILS FROM SESSION::');
          loggedInUserDtls = {...req.session.bmfAdminSession};
          loggedInUserDtls.isUserValid = (loggedInUserDtls.loggedInSapUserName != undefined);
          res.json(loggedInUserDtls);
        }else{
          LoggerUtil.info('NO SESSION FOUND::::::GETTING DETAILS FROM SERVICE::');
          preloginHelper.getUserDetailsFromSapId(sapId).then(s => {
              if(null != s && s.dataAvailForInput){
                  LoggerUtil.debug("FOUND SAP USER DETAILS FOR::"+sapId);
                  req.session.bmfAdminSession = preloginHelper.getBMFAdminSession(s,sapId);
                  loggedInUserDtls = {...req.session.bmfAdminSession};
                  loggedInUserDtls.isUserValid = (loggedInUserDtls.loggedInSapUserName != undefined);
              }else{
                  LoggerUtil.debug("GETTING SAP USER DETAILS FAILED::::FOUND NULL OBJECT:::FOR::"+sapId);
              }
              res.json(loggedInUserDtls);
          });
        }
    }


}
