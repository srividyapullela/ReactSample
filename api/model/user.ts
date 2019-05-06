import { Address } from './common';

export class User {

    firstName: string;
    lastName: string;
    userName: string;
    securityRole: string;
    userCategory: string;
    securityRoleDisplayName: string;
    userType: string;
    bpList: string[];
    billingAce: string;
    startStopAce: string;
    licenseNum: string;
    email: string;
    phoneNum: string;
    phoneNumExtn: string;
    altPhoneNum: string;
    altContactPhExtn: string;
    faxNum: string;
    businessName: string;
    address: Address;
    ableToPayBills: boolean;
    ableToStartStopService: boolean;
    webSecurityRole: string;
    brokerBPNumber: string;
    sapId: string;
}
