import { BaseRequest } from './../request/base.request';

export class MarketingAgreementRequest {

    strCompanyCode:string;
    strPortal:string;
    strLoggedInUserName:string;
    dmlType:string;
  	updateType:string;
  	bpNumber:string;
  	bpName:string;
    vendorNumber:string;
    contractMrkAgrmtCode:string;
    startDate:string;
    endDate:string;
    numOfMonths:string;
    cancellationFee:string;
    doorFeeStructureType:string;
    flatFeeAmountCode:string;
    tierFee1Amt:string;
    tierFee1MyRate:string;
    tierFee2Amt:string;
    tierFee2MyRate:string;
    tierFee3Amt:string;
    tierFee3MyRate:string;
    contactStreetNum:string;
    contactStreetName:string;
    contactCity:string;
    contactState:string;
    contactZipcode:string;
    contactPOBNum:string;
    contactSuiteNum:string;
    billingStreetNum:string;
    billingStreetName:string;
    billingCity:string;
    billingState:string;
    billingZipcode:string;
    billingPOBNum:string;
    billingSuiteNum:string;
    paymentStreetNum:string;
    paymentStreetName:string;
    paymentCity:string;
    paymentState:string;
    paymentZipcode:string;
    paymentPOBNum:string;
    paymentSuiteNum:string;
    cntPhoneNumber:string;
    cntPhoneExten:string;
    billPhoneNumber:string;
    billPhoneExten:string;
    paymentPhoneNumber:string;
    paymentPhoneExten:string;
    payableTo:string;
    ioNumber:string;
    glNumber:string;
    brand:string;
    customerType:string;
    paymentAddressOption:string;
    status:string;
    strBpNumber:string;
    propNodeGuidList:string[];

}

export class GetMarkAgrmDetailsRequest extends BaseRequest {
    strBpNumber: string;
}

export class CreateMrktgAgreementRequest extends MarketingAgreementRequest {
    bpNumber: string;
    strCompanyCode: string;
    strLoggedInUserName: string;
    strPortal: string;
}

export class UpdateMrktAgrmStatusRequest extends BaseRequest {

    status: string;
    bpNumber: string;
}
