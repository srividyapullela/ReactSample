import {Request, Response, NextFunction} from 'express';
import LoggerUtil from './../logs/log';
import { BMFAdminSession } from '../model/bmfAdmin.session'

export class GMESSInterceptor {

    public beforeEachRequest(req: Request, res: Response, next: NextFunction){

        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        LoggerUtil.debug('GMESSInterceptor::request URL:::'+fullUrl+":::::with body::::"+JSON.stringify(req.body));
        if(fullUrl.indexOf("adminAPI") != -1){
            if(fullUrl.indexOf("sapid") != -1){
                LoggerUtil.debug("THIS IS LOGIN URL:::::SETTING SESSION UNDEFINED::::::");
                req.session.bmfAdminSession = undefined;
            }else{
              if(undefined == req.session.bmfAdminSession){
                  LoggerUtil.debug("ADMIN SESSION IS UNDEFINED:::::ADDING USER LOGIN DETAILS FROM CLIENT:::");
                  let bmfAdminSession = new BMFAdminSession();
                  if(undefined != req.body.userDetails){
                      bmfAdminSession.loggedInSapEmailId = req.body.userDetails.email;
                      bmfAdminSession.loggedInSapFirstName = req.body.userDetails.firstName;
                      bmfAdminSession.loggedInSapLastName = req.body.userDetails.lastName;
                      bmfAdminSession.loggedInSapSecurityRole = req.body.userDetails.securityRole;
                      bmfAdminSession.loggedInSapStatus = req.body.userDetails.status;
                      bmfAdminSession.loggedInSapUserName = req.body.userDetails.userName;
                      bmfAdminSession.loggedInUserCompCode = req.body.userDetails.companyCode;
                  }
                  req.session.bmfAdminSession = bmfAdminSession;
              }else{
                  LoggerUtil.debug("ADMIN SESSION IS NOT NULL:::::SKIPPING ADDING USER LOGIN DETAILS FROM CLIENT:::");
              }
            }
        }
        next();
    }

}
