import { BaseRequest } from './base.request';
import * as cst from './../util/constant';

export class CollectiveAccountRequest extends BaseRequest {

    constructor(){
        super();
    }

    caaBPList: string[];
}

export class CollectiveCA {

    actualBpNumber: string;
    propertyBpNumber: string;
    caaNumber: string;
    caaName: string;
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipcode: string;
}

export class AddCollectiveAccountRequest extends BaseRequest {

    constructor(){
        super();
    }
    
    userName: string;
    caaList: CollectiveCA[];
}


export class DissociateCollectiveRequest extends BaseRequest {

    constructor(){
        super();
    }
    
    userName: string;
    bpNumberList: string[];
}