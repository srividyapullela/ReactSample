
export class Agreement {

    bpNumber: string;
    vendorNumber: string;
    mrktgAgreementNum: string;
    doorFeeStructure: string;
    doorFeeAmount: string;
    tier1Fee: string;
    tier2Fee: string;
    tier3Fee: string;
    moveInRate1: string;
    moveInRate2: string;
    moveInRate3: string;
    startDate: string;
    endDate: string;
    agreementTerm: string;
    cancellationFee: string;
    brand: string;
    ioNumber: string;
    glNumber: string;
    contactStreetNum: string;
    contactStreetName: string;
    contactCity: string;
    contactState: string;
    contactZipcode: string;
    contactPOBNum: string;
    contactSuiteNum: string;
    contactPhoneNumber: string;
    contactPhExtn: string;
    paymentStreetAddr: string;
    paymentPhoneNumber: string;
    paymentPhExtn: string;
    billingStreetNum: string;
    billingStreetName: string;
    billingCity: string;
    billingState: string;
    billingZipcode: string;
    billingPOBNum: string;
    billingSuiteNum: string;
    billingPhoneNumber: string;
    billingPhExtn: string;
    businessName: string;
    payableTo: string;
    active: boolean = false;
    customerType: string;

    //for update payment info
    paymentStreetNum: string;
    paymentStreetName: string;
    paymentCity: string;
    paymentState: string;
    paymentZipcode: string;
    paymentPhone: string;
    paymentPhExt: string;
    paymentPOBNum: string;
    paymentSuiteNum: string;
    paymentAddressOption: string;
}

export class SearchAgreement {

   agreement: Agreement;
   status: string;
   bpNodeGuid: string;
}
