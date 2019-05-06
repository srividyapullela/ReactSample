import * as actionTypes from './actionTypes'
import ManageUserService from '../services/manageUserService'
import UserService from '../services/userService'

const searchUsers = (data) => ({type:actionTypes.SEARCH_USERS, userList: data })

export function getUsers(dataIn) {
    return function(dispatch) {
        return ManageUserService.searchUsers(dataIn).then(data => {
            dispatch(searchUsers(data));
        });
    }
}

const userDetails = (data) => ({type:actionTypes.USER_DETAILS, userDtls: data})

export function getUserDetails(dataIn) {
    return function(dispatch) {
        return ManageUserService.getUserDetails(dataIn).then(data => {
            dispatch(userDetails(data));
        });
    }
}

const userUpdate = (data) => ({type:actionTypes.USER_UPDATE, updateUser: data })

export function updateUserDtls(dataIn) {
  console.log(dataIn)
    return function(dispatch) {
        return ManageUserService.updateUser(dataIn).then(data => {
            dispatch(userUpdate(data));
        });
    }
}

const viewAssociates = (data) => ({type:actionTypes.VIEW_ASSOCIATES, viewAssociates: data})

export function getAssociates(dataIn) {
    return function(dispatch) {
        return UserService.listAdminAssociates(dataIn).then(data => {
            dispatch(viewAssociates(data));
        });
    }
}

const resetPassword = (data) => ({type:actionTypes.RESET_PASSWORD, resetPassword: data})

export const emptyResetPassword = () => ({type:actionTypes.EMPTY_RESET_PASSWORD})

export function sendResetPassword(dataIn) {
    return function(dispatch) {
        return ManageUserService.sendResetPassword(dataIn).then(data => {
              dispatch(resetPassword(data));
        });
    }
}

const removeUser = (userDetails,data) => ({type:actionTypes.REMOVE_USER, userDetails,removeUser: data})

export function removeUserDetails(dataIn, userName) {
    return function(dispatch) {
        return ManageUserService.removeUser({userName}).then(data => {
              dispatch(removeUser(dataIn, data));
        });
    }
}

const disassociateCustomersFromUser = (data) => ({type:actionTypes.DISASSOCIATE_CUST_FROM_USER, userDetails, payload:data})

export function disassociateCustomersFromUserAPI(dataIn) {
    return function(dispatch) {
        return ManageUserService.disassociateCustomersFromUser(dataIn).then(data => {
              let outData = {bpNumberList:dataIn.bpNumberList, status:data.status}
              dispatch(disassociateCustomersFromUser(outData));
        });
    }
}

export const saveUserDetailsForAsscMore = (data) => ({type:actionTypes.SAVE_USER_DTLS_FOR_ASSOCIATE_MORE, payload:data})

export const searchBP = (data,enteredBPNumber) => {return({type:actionTypes.SEARCH_BP_FOR_ASSC_MORE, customerList:data})}

export function searchBPCustomers(inData) {
    return function(dispatch) {
        return UserService.searchBP(inData).then(data => {
            let enteredBPNumber = inData.bpNumber
            dispatch(searchBP(data,enteredBPNumber));
        });
    }
}

export const associateCustomersToUser = (status) => {return({type:actionTypes.ASSOCIATE_CUSTOMERS_TO_USER, status})}

export function associateCustomersToUserAPI(inData) {
    return function(dispatch) {
        return ManageUserService.associateCustomersToUser(inData).then(data => {
            dispatch(associateCustomersToUser(data));
        });
    }
}

export const saveDetailsForChangingAdmin = (details) => {return ({type:actionTypes.SAVE_DETAILS_FOR_CHANGING_ADMIN,payload:details})}

export const changeAdminForAssociate = (data, inData) => {return ({type:actionTypes.CHANGE_ADMIN_FOR_ASSOCIATE,payload:{...data,...{associateUserName:inData.associateUserName}}})}

export function changeAdminForAssociateAPI(inData) {
    return function(dispatch) {
        return ManageUserService.changeAdminForAssociate(inData).then(data => {
            dispatch(changeAdminForAssociate(data,inData));
        });
    }
}

/* these methods are duplicate of add user functions */
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
/* these methods are duplicate of add user functions */
