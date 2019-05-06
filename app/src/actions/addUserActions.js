import * as actionTypes from './actionTypes';
import UserService from '../services/userService';

export const saveSelection = (selection) => {
    return(
      {type:actionTypes.SAVE_SELECTION, selection:{selection}}
    )
}

export const saveUserInfo = (userInfo) => ({type:actionTypes.SAVE_USERINFO, userInfo})
export const saveUserInfoOnVerifyPage = (userInfo) => ({type:actionTypes.SAVE_USER_INFO_ON_VERIFYPAGE, userInfo})
export const saveCustomerList = (customerList) => ({type:actionTypes.SAVE_CUSTOMER_LIST, customerList})

export const saveUser = (data,userInfo) => (
    {type:actionTypes.SAVE_USERINFO_TO_DB, customerList:userInfo.customerList,
      selAdminAsscList:userInfo.selAdminAsscList,confirmation:{data}
    })

export function saveUserInfoToDB(userInfo) {
    return function(dispatch) {
        return UserService.saveUser(userInfo).then(data => {
            dispatch(saveUser(data,userInfo));
        });
    }
}

export const searchBP = (data,enteredBPNumber) => {return({type:actionTypes.SEARCH_BP, custList:{data},enteredBPNumber})}

export function searchBPCustomers(inData) {
    return function(dispatch) {
        return UserService.searchBP(inData).then(data => {
            let enteredBPNumber = inData.bpNumber
            dispatch(searchBP(data,enteredBPNumber));
        });
    }
}

export const searchBrokers = (data) => ({type:actionTypes.SEARCH_BROKERS, brktList:{data}})

export function listBrokers(selection) {
    return function(dispatch) {
        return UserService.searchBrokers({selection}).then(data => {
            console.log(data)
            dispatch(searchBrokers(data));
        });
    }
}

export const searchCustomers = (data) => ({type:actionTypes.SEARCH_CUSTOMERS, custList:{data}})

export function listCustomers(selection) {
    return function(dispatch) {
        return UserService.searchCustomers({selection}).then(data => {
            dispatch(searchCustomers(data));
        });
    }
}

export const searchBrokerAssociates = (data) => ({type:actionTypes.SEARCH_BROKER_ASSOCIATES, brkrAsscList:{data}})

export function listBrokerAssociates(broker) {
    return function(dispatch) {
        return UserService.searchBrokerAssociates({broker}).then(data => {
            dispatch(searchBrokerAssociates(data));
        });
    }
}

export const verifySapId = (isFound) => ({type:actionTypes.IS_SAPID_EXIST_IN_SYSTEM, isFound:{sapId:isFound}})

export function isSapIdExistInSystem(sapId) {
    return function(dispatch) {
        return UserService.isSapidExistInSystem({sapId}).then(data => {
            dispatch(verifySapId(data));
        });
    }
}

export const verifyUserName = (isFound) => ({type:actionTypes.IS_USERNAME_EXIST_IN_SYSTEM, isFound:{username:isFound}})

export function isUsernameExistInSystem(userName) {
    return function(dispatch) {
        return UserService.isUserNameExistInSystem({userName}).then(data => {
            dispatch(verifyUserName(data));
        });
    }
}

export const listEMMAssociates =  (data) => ({type:actionTypes.LIST_EMM_ASSOCIATES, emmdata:data})

export function listEMMAssociatesCall(inData) {
    return function(dispatch) {
        return UserService.listEMMAssociates(inData).then(data => {
            dispatch(listEMMAssociates(data));
        });
    }
}

export const listEMAAssociates =  (data) => ({type:actionTypes.LIST_EMA_ASSOCIATES, emadata:data})

export function listEMAAssociatesCall(inData) {
    return function(dispatch) {
        return UserService.listEMAAssociates(inData).then(data => {
            dispatch(listEMAAssociates(data));
        });
    }
}

export const listAdminAssociates = (data) => ({type:actionTypes.LIST_ADMIN_ASSOCIATES, admindata:data})

export function listAdminAssociatesCall(inData) {
    return function(dispatch) {
        return UserService.listAdminAssociates(inData).then(data => {
            dispatch(listAdminAssociates(data));
        });
    }
}

export const saveSelectedAdmin = (selAdminName) => ({type:actionTypes.SAVE_SELECTED_ADMIN, selAdminName})

export const getSelAdminCustomers = (selAdminList) => ({type:actionTypes.GET_SELECTED_ADMIN_CUSTOMERS, selAdminList})

export function getSelAdminCustomersCall(inData) {
    return function(dispatch) {
        return UserService.getSelectedAdminCustomers(inData).then(data => {
            dispatch(getSelAdminCustomers(data));
        });
    }
}

export const saveCustomerListForAssociteMore = (customerList) => ({type:actionTypes.SAVE_CUST_LIST_FOR_ASSC_MORE, payload:customerList})
export const deleteCustomerListForAssociteMore = () => ({type:actionTypes.DELETE_CUST_LIST_FOR_ASSC_MORE})
//This method is to save customer access priveleges for cuatomer associate from verofication page
export const saveBillingAccessForCustAssociate = (payload) => ({type:actionTypes.SAVE_BILLING_ACCESS_PRIV_FOR_CUST_ASSOCIATE, payload})
export const saveStartStopAccessForCustAssociate = (payload) => ({type:actionTypes.SAVE_STARTSTOP_ACCESS_PRIV_FOR_CUST_ASSOCIATE, payload})
