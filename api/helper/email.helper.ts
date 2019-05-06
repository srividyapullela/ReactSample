import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { CommonUtil } from './../util/common.util';
import { EmailService } from './../services/email.service';
import {EmailRequest } from './../request/email.request';
import {AddUserRequest } from './../request/user.request';
import {EmailDO } from './../model/emaildo';
import * as emailcst from './../util/emailconstants';
import * as _ from "lodash";

export class EmailHelper {

  private emailService: EmailService;

  constructor() {
        this.emailService = new EmailService();
  }

    public sendEmail(req: any): Promise<any> {
      LoggerUtil.debug('Calling sendEmail service with the request::::'+JSON.stringify(req));
      let emailReq = new EmailRequest();
      let emailResp = new EmailDO();
      emailReq.companyCode = cst.GMESS_CC_0270;
      emailReq.externalId = req.externalId;
      emailReq.toEmailList = req.toEmailList;
      emailReq.subject = "";
      emailReq.propertyList = req.propertyList;
      emailReq.templateType = req.templateType;
      emailReq.languageCode = "EN";
      emailReq.brandName = cst.GME_BRAND_NAME;
        var p = new Promise((resolve, reject) => {

            this.emailService.sendEmail(emailReq).then(t =>{
                  if(undefined != t && (t.resultcode == 0 || t.resultdescription == "Success")){
                      emailResp.resultcode = t.resultcode;
                      emailResp.resultdescription = t.resultdescription;
                      emailResp.errorcode = t.resultcode;
                      emailResp.errordescription =t.errordescription;
                  }else{
                    LoggerUtil.error("Error sending email");
                  }
            });
             resolve(emailResp);
        });

        return p;
    }

    public addUserConfirmEmail(addUserVO:AddUserRequest, req:any) {
    LoggerUtil.debug("Sending Email for :::ADD_USER_CONFIRMATION::::::::");
		let status = false;
		let subject:string;
		let emailAddress = req.body.userInfo.email;
    let emailReq = new EmailRequest();

		let logonLink = cst.BMF_FIRST_TIME_SET_PASSWORD+"/"+addUserVO.linkTxnId;
    try {
      emailReq.externalId = emailcst.ADD_USER_CONFIRMATION_EXTERNAL_ID;
      emailReq.templateType = emailcst.TEMPLATE_HTML;
      emailReq.toEmailList.push(emailAddress);
      emailReq.propertyList.push("LOGIN_LINK:"+logonLink);

    } catch (e) {
      LoggerUtil.error("Failed to send addUserConfirmEmail::::::: with exception + "+ e.message);
    }

      this.sendEmail(emailReq).then(t =>{
        if(undefined != t)
           LoggerUtil.info("Email Sending response is == " +t);
      });

	}


  public addUserConfirmAdminEmail(addUserVO:any, req:any) {

    let status = false;
		let subject:string = "";
		let emailAddress: string;
    let emailReq = new EmailRequest();
		if(null != req.session.bmfAdminSession){
			emailAddress = req.session.bmfAdminSession.loggedInSapEmailId;
		}
    emailReq.externalId = emailcst.ADD_USER_CONFIRMATION_ADMIN_EXTERNAL_ID;
    emailReq.templateType = emailcst.TEMPLATE_HTML;
    emailReq.toEmailList.push(emailAddress);
    emailReq.propertyList.push(emailcst.PM_CUSTOMER_NAME+":"+addUserVO.firstName,emailcst.PM_CUSTOMER_FULLNAME+":"+addUserVO.firstName + " " + addUserVO.lastName);

    try {
      this.sendEmail(emailReq).then(t =>{
        if(undefined != t)
           LoggerUtil.info("Email Sending response is == " +t);
      });
		} catch (e) {
			LoggerUtil.error("Failed to send addUserConfirmAdminEmail::::::: with exception + "+ e.message);
		}

	}

	public updateUserConfirmEmail(req:any) {
    let emailReq = new EmailRequest();
   try{
    let status = false;
    let subject:string = "";
    let updateuservo = req.body.user;
    LoggerUtil.info("User Info ==="+req.body.user.email)
    let emailAddress=  updateuservo.email;

		let name = updateuservo.firstName+" "+updateuservo.lastName;
		let phNumberExt = CommonUtil.isNotBlank(updateuservo.phoneNumExtn)?updateuservo.phoneNumExtn.replace("extn", ""):"";
		let altNumberExt = CommonUtil.isNotBlank(updateuservo.phoneExtnAlt)?updateuservo.phoneExtnAlt.replace("extn", ""):"";
		let phNumber = CommonUtil.formatPhoneNumberForEmail(updateuservo.phoneNum,phNumberExt);
    let altPhoneNumber = CommonUtil.formatPhoneNumberForEmail(updateuservo.altPhoneNum,altNumberExt);
    let faxNumber = CommonUtil.formatPhoneNumberForEmail(updateuservo.faxNum,undefined);
		let emailId = updateuservo.email;
		let sapId = updateuservo.sapId;

    let sapIdClassHide = "display:none"
    let sapIdClassShow = "display:block"

    let fieldToUpdate = req.body.fieldName;

		if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'name'))
			name = "<b>"+name+"</b>";
		else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'email'))
			emailId= "<b>"+emailId+"</b>";
		else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'phone'))
			phNumber = "<b>"+(CommonUtil.isNotBlank(phNumber)?(phNumber):cst.NOT_PROVIDED)+"</b>";
		else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'altphone'))
			altPhoneNumber = "<b>"+(CommonUtil.isNotBlank(altPhoneNumber)?altPhoneNumber:cst.NOT_PROVIDED)+"</b>";
		else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'fax'))
			faxNumber =  "<b>"+(CommonUtil.isNotBlank(faxNumber)?faxNumber:cst.NOT_PROVIDED)+"</b>";
		else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'sapid')){
		    sapId =  "<b>"+(CommonUtil.isNotBlank(sapId)?sapId:cst.NOT_APPLICABLE)+"</b>";
		}else if(CommonUtil.equalsIgnoreCase(fieldToUpdate,'accpriv')){

		}
    let sapIdClass= "hide";
    let accessPrivStr = this.getAccessPrivInfo(updateuservo);

    emailReq.externalId = emailcst.UPDATE_USER_CONFIRMATION_EXTERNAL_ID;
    emailReq.templateType = emailcst.TEMPLATE_HTML;
    emailReq.toEmailList.push(emailAddress);
    emailReq.propertyList.push(emailcst.PM_CUSTOMER_FULLNAME+":"+name,
                               emailcst.PM_CUSTOMER_NAME+":"+updateuservo.userName,
                               emailcst.PM_UPDATE_NAME+":"+name ,
                               emailcst.PM_UPDATE_PHNUM+":"+phNumber,
                               emailcst.PM_UPDATE_ALTPHNUM+":"+altPhoneNumber,
                               emailcst.PM_UPDATE_FAXNUM+":"+faxNumber,
                               emailcst.PM_UPDATE_EMAIL+":"+emailId,
                               emailcst.PM_UPDATE_USERNAME+":"+updateuservo.userName,
                               emailcst.PM_SAPID_HIDE+":"+CommonUtil.isNotBlank(updateuservo.sapId)?sapIdClassShow:sapIdClassHide,
                               emailcst.PM_UPDATE_SAPID+":"+ sapId,
                               emailcst.PM_ACCESSPRIV_INFO+":"+ accessPrivStr);

      } catch (e) {
        LoggerUtil.error("Error in updateUserConfirmEmail::::::: + "+ e.message);
      }

      this.sendEmail(emailReq).then(t =>{
        if(undefined != t)
           LoggerUtil.info("Email Sending response is == " +t);
      });

	}

  private getAccessPrivInfo(manageUserVO:any):string {
		LoggerUtil.debug("WEB SECURITY ROLE:::::::"+manageUserVO.webSecurityRole);
     var StringBuffer = require("stringbuffer");
		 let accessPrivInfo = new StringBuffer();
		 let webSecurityRole = manageUserVO.webSecurityRole;
		accessPrivInfo.append("<tr><td valign='top' width='15%'>Access privileges:</td><td width='60%'><table><tr><td>");
		if(_.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_CA_PO) || _.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_CA_PM)){
			accessPrivInfo.append("Transactional access"
					+ "</td></tr><tr><td>");
			accessPrivInfo.append("&nbsp;&nbsp;"+"-able to request start and stop"
					+ "</td></tr><tr><td>");
			accessPrivInfo.append("&nbsp;&nbsp;"+"-able to pay bills"
					+ "</td></tr></table></td></tr>");
		}else if(_.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_CUS_ASC)){
			accessPrivInfo.append("Transactional access"
					+ "</td></tr><tr><td>");
			accessPrivInfo.append("&nbsp;&nbsp;"+"-Can start/stop: <b>"+(_.isEqual(manageUserVO.startStopAce, cst.YES)?cst.YES_TXT:cst.NO_TXT)
						+ "</b></td></tr><tr><td>");
			accessPrivInfo.append("&nbsp;&nbsp;"+"-Can pay bills: <b>"+(_.isEqual(manageUserVO.billingAce, cst.YES)?cst.YES_TXT:cst.NO_TXT)
							+ "</b></td></tr></table></td></tr>");
		}else if(_.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_BROKER) || _.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_BRK_ASC)){
			let logonLink = cst.GMESS_HOST_INFO;
			LoggerUtil.info("getting the link::::::"+logonLink);
			accessPrivInfo.append("<a href='"+logonLink+"'>Log in</a>"+" to SimpleSource to view permissions for each property."
					+ "</td></tr></table></td></tr>");
		}else{
			accessPrivInfo.append("Administrative Access"
					+ "</b></td></tr></table></td></tr><b>");
		}
		return accessPrivInfo.toString();

	}


  public  updatePasswordEmail(req:any, userName:string){


    let subject:string = "";
    let emailReq = new EmailRequest();
    let emailAddress ="";
    try {
        if(null != req.session.bmfAdminSession){
    			emailAddress = req.session.bmfAdminSession.loggedInSapEmailId;
    		}
        emailReq.externalId = emailcst.UPDATE_PASSWORD_CONFIRMATION_EXTERNAL_ID;
        emailReq.templateType = emailcst.TEMPLATE_HTML;
        emailReq.toEmailList.push(emailAddress);
        emailReq.propertyList.push(emailcst.PM_CONFIRMATION_NUM+":"+"",
                                   emailcst.PM_EMAIL_ADDRESS+":"+"",
                                   emailcst.PM_GREETING_NAME+":"+"",
                                   emailcst.PM_USER_NAME+":"+userName,
                                   emailcst.PM_TELEPHONE_NUM+":"+"");
     } catch (e) {
 			LoggerUtil.error("Error in updatePasswordEmail()::: + "+ e.message);
 		 }

        this.sendEmail(emailReq).then(t =>{
          if(undefined != t){
             LoggerUtil.debug("Email Sending response is == " +t);
           }else{
             LoggerUtil.error("Failed to send updatePasswordEmail::::::: with exception + ");
           }
        });

  	}


  	public sendPasswordResetLinkEmail(emailAddress:string, txnId:string) {

      let status = false;
      let subject:string = "";
      let emailReq = new EmailRequest();
  		let logonLink = cst.BMF_FIRST_TIME_SET_PASSWORD+"/"+txnId;
      try {
        emailReq.externalId = emailcst.RESET_PASSWORD_EXTERNAL_ID;
        emailReq.templateType = emailcst.TEMPLATE_HTML;
        emailReq.toEmailList.push(emailAddress);
        emailReq.propertyList.push(emailcst.PM_LOGIN_LINK+":"+"<p><a href='"+logonLink+"'>"+logonLink+"</a></p>");

        this.sendEmail(emailReq).then(t =>{
          if(undefined != t)
             LoggerUtil.debug("Email Sending response is == " +t);
        });
      } catch (e) {
        LoggerUtil.error("Failed to send Reset Password:::::::  with exception + "+ e.message);
      }

  	}

    public  deactivateUserConfirmationEmail(req:any):boolean {

      LoggerUtil.info("START::EmailHelper::deactivateUserConfirmationEmail()>>>>>>");
  		let status:boolean = false;
      let emailReq = new EmailRequest();
      let subject = ""; //Already set in email template
  		try {
        let emailAddress = req.body.userDetails.email;
        let userFullName = req.body.userDetails.firstName+" "+req.body.userDetails.lastName;
        emailReq.externalId = emailcst.REMOVE_USER_CONFIRMATION_EXTERNAL_ID;
        emailReq.templateType = emailcst.TEMPLATE_HTML;
        emailReq.toEmailList.push(emailAddress);
        emailReq.propertyList.push(emailcst.PM_USER_FULLNAME+":"+userFullName);
  		} catch (ex) {
  			LoggerUtil.error("FAILED TO SEND REMOVE USER EMAIL CONFIRMATION EMAIL::::::::::",ex);
  		}
      this.sendEmail(emailReq).then(t =>{
            if(undefined != t)
               LoggerUtil.info("Email Sending response is == " +t.resultdescription);
               status = CommonUtil.equalsIgnoreCase(t.resultdescription,"Success");
        });

  		LoggerUtil.info("The Email status for external id:::REMOVE_USER_CONFIRMATION_EXTERNAL_ID:::::" + status);
  		return status;
   }


}
