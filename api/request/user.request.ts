import { BaseRequest } from './../request/base.request';

export class UserRequest{

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
  password:string;

    bpNumber : string;
    bcadminUserName : string;
    brokerAdminLastname: string;
    brokerBpNumber: string;
    searchCriteria: string;
    customerAdminLastname:string;
    bpNumberList:string[];
    bpNameList:string[];
    bpAddressList:string[];
    hierarchyLevelList:string[];
    startStopAceList:string[];
    billingAceList:string[];
    agentType: string;
    fieldIndicator:string;
    fieldValue1:string;
    fieldValue2:string;
    portal:string;
    strUserName:string;
    strCallType:string;
    searchString:string;
    adminUserName:string;
    strTransactionType:string;
    strVUEEmailOne:string;
    strVUEEmailTwo:string;
    strVUEESIID:string;
    strVUEPropertyName:string;
    strVUEUnit:string;
    strVUEUnitType:string;
    strVUEUnitThreshold:string;
    strVUEStreetAddress:string;
    strVUECity:string;
    strVUEState:string;
    strVUEZipcode:string;
    strActivityPerformed:string;
    strActivityType:string;
}

class Address{
 streetName : string;
 streetNum: string;
 state: string;
 city: string;
 poBox: string;
 zipcode: string;

}


export class GetUserDtlsFromSapIDRequest extends BaseRequest {

     constructor(sapId: string){
         super();
         this.sapId = sapId;
         this.strCompanyCode= "0270";
     }
     sapId: string;
}

export class SearchBrokerAdminRequest extends BaseRequest {

      brokerAdminLastname: string;
      brokerBpNumber: string;
      searchCriteria: string;
}

export class SearchCustomerAdminRequest extends BaseRequest {

      customerAdminLastname: string;
      bpNumber: string;
      searchCriteria: string;
}

export class SearchUsersForUpdateRequest extends BaseRequest {

      searchString: string;
      searchCriteria: string;
      webSecurityRole: string;
      userCategory: string;
      userType: string;
}

export class CheckUserExistForSapIdRequest extends BaseRequest {

    sapId: string;
}

export class ValidateUsrNameRequest extends BaseRequest {

    strLDAPOrg: string;
    strUserName: string;
    strProviderUrl: string;
    strCompanyCode: string;
    strSSOUserType: string;
}

export class CreateUsrRequest extends BaseRequest {

    strEmailId: string;
    strFirstName: string;
    strLastName: string;
    strPassword: string;
    strUserName: string;
    strSSOUserType: string;
    strLDAPOrg: string;
    strCompanyCode: string;
    strReliantUserType: string;
    strBpId:string;
    strCAType:string;
    strProviderUrl:string;
}

export class AddUserRequest extends BaseRequest {

    altrContactPhone: string;
    altrContactPhoneExtn: string;
    associatedAdminUsername: string;
    billingAce: string;
    billingAceList: string[];
    bpAddressList: string[];
    bpNameList: string[];
    bpNumberList: string[];
    brokerBPName: string;
    brokerBPNumber: string;
    contactPhone: string;
    contactPhoneExtn: string;
    emailId: string;
    faxNumber: string;
    firstName: string;
    hierarchyLevelList: string[];
    lastName: string;
    sapId: string;
    startStopAce: string;
    startStopAceList: string[];
    title: string;
    userName: string;
    webSecurityRole: string;
    linkTxnId:string;
}

export class ResetPwdDtlsRequest extends BaseRequest{
  txnId: string;
  userName: string;
  expirationDate:string;

}

export class BpDetailsForAgentRequest extends BaseRequest {

    bpNumberList: string[];
    agentType: string;
}

export class BpHierarchyRequest extends BaseRequest {

    bpNumberList: string[];
    federalTaxIdList : string[];
    callType: string;
    strCompanycode:string;
}

export class BpHierarchyDtlsRequest extends BaseRequest {

    propNodeGuidList: string[];
    strLoggedInUserName: string;
    strCompanycode:string;
}


export class GetAllUsersAssociatedToBpRequest extends BaseRequest{

  bpNumber:string;
}

export class GetAssociatesRequest extends BaseRequest{
     bcadminUserName:string;
}

export class UserProfileWithBPHierarchyRequest extends BaseRequest {
    strUserName: string;
}


export class UpdateUserRequest extends BaseRequest {
    userName: string;
    fieldIndicator: string;
    fieldValue1: string;
    fieldValue2: string;
    portal: string;
    bpNumber: string;
}


export class DeactivateUserRequest extends BaseRequest{

      strUserName:string;

  }

export class DissociateCustomerFromUserRequest extends BaseRequest {
    userName: string;
    bpNumberList: string[];
}

export class AssociateUser2CustomerRequest extends BaseRequest {
    userName: string;
    bpAddressList: string[];
    bpNameList:string[];
    bpNumberList:string[];
    hierarchyLevelList:string[];

}

export class ChangeAdminForAssociateUserRequest extends BaseRequest {
    userName: string;
    adminUserName: string;
}
