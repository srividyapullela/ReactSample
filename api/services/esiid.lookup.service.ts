import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { RestUtil } from './../services/rest.util';
import { BaseService } from './base.service';


export class EsiidLookupService extends BaseService {
    
   constructor(){
        super();
    }
    
    public lookUpESIIDByAddress(postData:any): Promise<any> {
        return this.restUtil.post(cst.ESIID_LOOKUP_BY_ADDR_URL, postData);
    }
}