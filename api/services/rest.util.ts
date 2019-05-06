import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import {CommonUtil} from './../util/common.util';
import { ServiceError } from './../model/error';


export class RestUtil {

    public post(url:string, postData:any): Promise<any> {
        var p = new Promise((resolve, reject) => {
                request.post(url, this.getOptions(postData), (err, response, data) => {
                    if(err){
                        LoggerUtil.error(err.toString());
                        resolve(this.getErrorObj(2,err.toString));
                    }
                    var data = CommonUtil.isJSONString(data)?JSON.parse(data):{};
                    if(undefined != response && response.statusCode == 200 && data.error == undefined){
                        var resBody = JSON.parse(response.body);
                        resolve(resBody);
                    }else{
                        LoggerUtil.error(data.error);
                        resolve(this.getErrorObj(2,data.error));
                    }
                });
            });
        return p;
    }


    public postFile(url:string, postData:any): Promise<any> {
        var p = new Promise((resolve, reject) => {
                request.post(url, this.getFileOptions(postData), (err, response, data) => {
                    if(err){
                        LoggerUtil.error(err.toString());
                        resolve(this.getErrorObj(2,err.toString));
                    }
                    var data = CommonUtil.isJSONString(data)?JSON.parse(data):{};
                    if(undefined != response && response.statusCode == 200 && data.error == undefined){
                        var resBody = JSON.parse(response.body);
                        resolve(resBody);
                    }else{
                        LoggerUtil.error(data.error);
                        resolve(this.getErrorObj(2,data.error));
                    }
                });
            });
        return p;
    }




    public get(url:string): Promise<any> {
        var p = new Promise((resolve, reject) => {
                request.get(url, this.getOptions(null), (err, response, data) => {
                    if(err){
                        LoggerUtil.error(err.toString());
                        resolve(this.getErrorObj(2,err.toString));
                    }
                    var data = CommonUtil.isJSONString(data)?JSON.parse(data):{};
                    if(response.statusCode == 200 && data.error == undefined){
                        var resBody = JSON.parse(response.body);
                        LoggerUtil.debug('Response from Rest Call is::::::'+resBody);
                        resolve(resBody);
                    }else{
                        LoggerUtil.error(data.error);
                        resolve(this.getErrorObj(2,data.error));
                    }
                });
            });
        return p;
    }


    public getErrorObj(errCode:number, errMsg: string): ServiceError{

        var error  = new ServiceError();
        error.errorCode = errCode;
        error.errorMessage = JSON.stringify(errMsg);
        return error;
    }

    private getOptions(postData: any): request.CoreOptions {
        var headers: request.Headers = {"content-type":"application/json"};
        var options: request.CoreOptions;
        if(null != postData){
            options = {body:JSON.stringify(postData)};
            options.headers = headers;
        }else{
            options = {};
        }
        return options;
    }

    private getFileOptions(postData: any): request.CoreOptions {
        var headers: request.Headers = {};
        var options: request.CoreOptions;
        options = {body:postData};
        options.headers = headers;
        return options;
    }

}
