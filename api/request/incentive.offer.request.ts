import { BaseRequest } from './../request/base.request';

export class IncentiveOfferRequest {
    
    offerCode:string;
	customerType:string;
	validFrom:string;
	validTo:string;
    strCompanyCode:string;
    strPortal:string;
    strLoggedInUserName:string;
    offerCodeOld:string;
	offerCodeNew:string;
	customerTypeOld:string;
	cutomerTypeNew:string;
}

export class CreateOfferRequest extends BaseRequest {

	constructor(){
		super();
	}
	
	offerCode: string;
	customerType: string;
	validFrom: string;
	validTo: string;
}

export class DeleteOfferRequest extends BaseRequest {

	constructor(){
		super();
	}
	offerCode: string;
	customerType: string;
}

export class UpdateOfferRequest extends BaseRequest {

	constructor(){
		super();
	}
	offerCodeOld: string;
	offerCodeNew: string;
	customerTypeOld: string;
	cutomerTypeNew: string;
	validFrom: string;
	validTo: string;
}

export class GetOfferRequest extends BaseRequest {

	constructor(){
		super();
	}
	offerCode: string;
	customerType: string;
	validFrom: string;
	validTo: string;
}