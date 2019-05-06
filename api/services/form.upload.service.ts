import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';


export class FormUploadService extends BaseService {

    constructor(){
        super();
    };

    public uploadForm(postData:any): Promise<any> {
        return this.restUtil.postFile(cst.FORM_UPLOAD_URL, postData);
    }

}
