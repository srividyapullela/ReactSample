export interface MarketAgreement {

    agreementInfo:AgreementInfo;
    paymentInfo: PaymentInfo;
    bpNumber: string;
    active: string;
}

export class UpdateMarketAgreement implements MarketAgreement {

    agreementInfo:AgreementInfo;
    paymentInfo: PaymentInfo;
    bpNumber: string;
    active: string;
}

export class AgreementInfo implements AgreementInfoI {

    vendorNumber: string;
    contractAgrmNumber: string;
    doorFeeStructure: string;
    doorFeeAmount: string;
    startDate: string;
    endDate: string;
    agreementTerm: string;
    cancelFee: string;
    brand: string;
    ioNumber: string;
    glNumber: string;
    tier1Fee: string;
    tier2Fee: string;
    tier3Fee: string;
    moveInRate1: string;
    moveInRate2: string;
    moveInRate3: string;
}

interface AgreementInfoI {

    vendorNumber: string;
    contractAgrmNumber: string;
    doorFeeStructure: string;
    doorFeeAmount: string;
    startDate: string;
    endDate: string;
    agreementTerm: string;
    cancelFee: string;
    brand: string;
    ioNumber: string;
    glNumber: string;
    tier1Fee: string;
    tier2Fee: string;
    tier3Fee: string;
    moveInRate1: string;
    moveInRate2: string;
    moveInRate3: string;
}

export class PaymentInfo {

    billingAddress: BillingAddress;
    paymentAddress: PaymentAddress;
    payableTo: string;
    paymentAddressOption: string;
}

export class BillingAddress {

    billingAddress: Address;
    phoneNumber: string;
    extn: string;
}

export class PaymentAddress {

    paymentAddress: Address;
    phoneNumber: string;
    extn: string;
}

export class Address {

    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipcode: string;
    suiteNumber: string;
    poBox: string;
  
}
