
export class Address {

    constructor(streetNum: string, streetName: string, city: string, state: string, zipcode: string) {
        this.streetNum = streetNum;
        this.streetName = streetName;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;

    }
    streetName: string;
    streetNum: string;
    state: string;
    city: string;
    poBox: string;
    zipcode: string;
}


export class ManagementBP {

    managementName: string;
    address: Address;
    regionList: Region[];
    userType: string;
    bpNumber: string;
    strBPAddress: string;
    EMMAssigned: boolean = false;
    selected: boolean = false;
    newlyAddedBP: boolean = false;
    selectedOnUpdatePage: boolean = false;
}

export class Region {

    regionName: string;
    address: Address;
    propertyList: Property[];
    userType: string;
    bpNumber: string;
    strBPAddress: string;
    EMMAssigned: boolean = false;
    selected: boolean = false;
    newlyAddedBP: boolean = false;
    bokerAssigned: boolean = false;
    selectedOnUpdatePage: boolean = false;
    parentBpNumber: string;
}

export class Property {

    propertyName: string;
    address: Address;
    strBPAddress: string;
    bpNumber: string;
    EMAAssigned: boolean = false;
    selected: boolean = false;
    selectedOnUpdatePage: boolean = false;
    //for adding broker only
    bokerAssigned: boolean = false;
    startStopAce: string;
    billingAce: string;
    newlyAddedBP: boolean = false;
    //added for collective cotract account changes. Y/N
    hasCAAAccounts: string;
    caaBPList: string[];
    parentBpNumber: string;

}
