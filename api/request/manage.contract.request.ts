import {  ServiceAreaPromoDO } from '../model/contract';

export class ManageContractRequest{


  strCompanyCode:string;
  strPortal:string;
  strLoggedInUserName:string;
  relationshipId:string;
	bpName:string;
	bpStreetNumber:string;
	bpStreetName:string;
	bpPoBox:string;
	bpCity:string;
	bpState:string;
	bpZipCode:string;
	bpAccountCategory:string;
	taxExemption:string;
	csaStatus:string;
	csaNumber:string;
	terms:string;
	depositAmount:string;
	contractExpDate:string;
	customerStatus:string;
  serviceAreaPromoList: ServiceAreaPromoDO[] = new Array<ServiceAreaPromoDO>();

}

export class ContractRequest {

    strLoggedInUserName:string;
    strCompanycode:string;
    relationshipId: string;

}
 export class CreateUpdateContractRequest extends ManageContractRequest{
   constructor(){
       super();
   }
 }
