import { BaseRequest } from './base.request'

export class EsiidLookupRequest extends BaseRequest{

    esiidList:string[];
	  streetNumberList:string[];
    streetNameList:string[];
	  unitNumberList:string[];
	  cityList:string[];
	  zipcodeList:string[];
}
