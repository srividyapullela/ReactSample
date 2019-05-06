import * as actionTypes from '../actions/actionTypes';
import { LoggedInUser } from '../models/login/loggedInUser.model'

export default function userLoginReducer(state: any = [], action: any) {

    switch(action.type) {
        case actionTypes.USER_LOGIN : return getLoggedInUserDetails(action.userDetails)
        default: return state;
    }
}

const getLoggedInUserDetails = (userDetails: any) => {
    let loggedInUser = new LoggedInUser();
    try{
      loggedInUser.companyCode = userDetails.loggedInUserCompCode;
      loggedInUser.email = userDetails.loggedInSapEmailId;
      loggedInUser.empSapId = userDetails.empSapId;
      loggedInUser.firstName = userDetails.loggedInSapFirstName;
      loggedInUser.isValid = userDetails.isUserValid;
      loggedInUser.lastName = userDetails.loggedInSapLastName;
      loggedInUser.securityRole = userDetails.loggedInSapSecurityRole;
      loggedInUser.status = userDetails.loggedInSapStatus;
      loggedInUser.userName = userDetails.loggedInSapUserName
    }catch(err){
        console.log("ERROR====getLoggedInUserDetails>>>>>>"+err.message)
    }
    return loggedInUser;
}
