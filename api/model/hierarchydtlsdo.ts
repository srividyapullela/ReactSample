import { Address } from './common';

export class HierarchyDtlsDO {

  bpNumber:string;
	bpName:string;
	parentBP:string;
	heirarchyLevel:string;
	bpDescription:string;
	primaryContactTitle:string;
	primaryContactFirstName:string;
	primaryContactLastName:string;
	primaryContactPhone:string;
	primaryContactExtn:string;
	primaryContactAltPhone:string;
	primaryContactFax:string;
	primaryContactEmailAddress:string;
	billingtPhone:string;
	billingtPhoneExtn:string;
	validFromDate:string;
	validToDate:string;
	taxStatus:string;
	fedTaxId:string;
	language:string;
	mailingAddress:Address;
	billingAddress:Address;
	bmfPartnerId:string;
}
