import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { CommonUtil } from './../util/common.util';
import { FormUploadService } from './../services/form.upload.service';
import {FileUploadRequest } from './../request/fileupload.request'


export class FormUploadHelper {

  private formUploadService: FormUploadService;

  constructor() {
        this.formUploadService = new FormUploadService();
  }

    public uploadForm(req: any): Promise<any> {
      
        var request = require('request');
        var fs = require('fs');
        req.body.strCompanycode = cst.GMESS_CC_0270;
        var p = new Promise((resolve, reject) => {

        request.post({
                  uri: cst.FORM_UPLOAD_URL,
                 formData:{
                          "promocode":req.body.promoCode,
                          "fileName":req.body.fileName,
                          "displayName":req.body.displayName,
                          "userName":req.session.bmfAdminSession.loggedInSapUserName,
                          "strCompanycode":cst.GMESS_CC_0270,
                          "strLoggedInUserName":req.session.bmfAdminSession.loggedInSapUserName,
                          "file": new Buffer(req.body.file, 'base64')

                 }

                },
                function (error, response, data) {


                  //LoggerUtil.info("");
                  resolve(true);
            });
        });

        return p;
    }



}
