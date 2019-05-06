import { Address } from './common';

export class SearchContract {
    contract: Contract;
    status: string;
}

export class Contract {

    businessName: string;
	  bpName: string;
	  relationshipId: string;
	  bmfContractId: string;
	  bpAccountCategory: string;
	  serviceArea: string;
	  taxExemptSts: string;
	  terms: string;
	  depositAmount: string;
	  contractExpDate: string;
	  customerStatus: string;
	  customerStatusFlag: string;
	  promoCode: Promocode ;
	  csaStatus: CSAStatus ;
	  address: Address ;
	  serviceAreaDisplay: string;
	  creationDate: string;
	  lastUpdateDate: string;
    status: string;
}

export class Promocode {
    tempCode: string;
	  permCode: string;
}

export class CSAStatus {
    csaNumber: string;
    csaStatus: string;
    creationDate: string;
    lastUpdateDate: string;
}

export class ServiceAreaPromoDO {

    serviceAreaDisplay: string;
    tempPromoCode: string;
    permPromoCode:string;
    serviceArea:string;
}
