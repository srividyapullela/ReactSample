import * as actionTypes from '../actions/actionTypes';

let initialState:any = {user:{selection:{},userInfo:{},customerList:[],confirmation:{},selAdminAsscList:{}}}

export default function addUserReducer(state=initialState, action: any){

    let returnObj = {}
    let userInfo;
    switch(action.type) {
        case actionTypes.SAVE_SELECTION:  return Object.assign({}, state, {
          user:{selection:action.selection.selection}
        });
        case actionTypes.SAVE_USERINFO:
            returnObj = {user:{userInfo:action.userInfo,selection:state.user.selection,selAdminAsscList:state.user.selAdminAsscList,selAdminName:state.user.selAdminName}}
            return Object.assign({}, state, returnObj);
        case actionTypes.SAVE_CUSTOMER_LIST :
            returnObj = {user:{userInfo:state.user.userInfo,selection:state.user.selection, customerList:action.customerList,
              brokerName:state.user.brokerName, enteredBPNumber:state.user.enteredBPNumber,selAdminName:state.user.selAdminName}}
            return Object.assign({}, state, returnObj);
        case actionTypes.SAVE_BILLING_ACCESS_PRIV_FOR_CUST_ASSOCIATE:
            userInfo = Object.assign({},state.user.userInfo)
            userInfo.ableToPayBills = action.payload.ableToPayBills
            returnObj = {user:{userInfo:userInfo,selection:state.user.selection, selAdminAsscList:state.user.selAdminAsscList,selAdminName:state.user.selAdminName}}
        return Object.assign({}, state, returnObj);
        case actionTypes.SAVE_STARTSTOP_ACCESS_PRIV_FOR_CUST_ASSOCIATE:
            userInfo = Object.assign({},state.user.userInfo)
            userInfo.ableToStartStopService = action.payload.ableToStartStopService
            returnObj = {user:{userInfo:userInfo,selection:state.user.selection, selAdminAsscList:state.user.selAdminAsscList,selAdminName:state.user.selAdminName}}
        return Object.assign({}, state, returnObj);
        case actionTypes.SAVE_USER_INFO_ON_VERIFYPAGE:
            returnObj = {user:{userInfo:getUserInfoForVerifyPage(state.user.userInfo,action.userInfo),selection:state.user.selection,customerList:action.customerList,
              selAdminAsscList:action.selAdminAsscList}}
            return Object.assign({}, state, returnObj);
        case actionTypes.SAVE_USERINFO_TO_DB:
            returnObj = {user:{userInfo:state.user.userInfo,selection:state.user.selection,customerList:action.customerList,
              selAdminAsscList:action.selAdminAsscList, confirmation:action.confirmation.data}}
            return Object.assign({}, state, returnObj);
        case actionTypes.SEARCH_BP:
            let custList;
            let brokerName = ""
            if(action.custList.data.error){
                custList = action.custList.data
            }else{
                custList = action.custList.data.mngtList;
                brokerName = action.custList.data.brokerName
            }
            returnObj = {user:{userInfo:state.user.userInfo,selection:state.user.selection,
              custList:custList,brokerName:brokerName, enteredBPNumber:action.enteredBPNumber}}
            return Object.assign({}, state, returnObj);
        case actionTypes.SEARCH_BROKERS:
            returnObj = {user:{selection:state.user.selection,brkrList:action.brktList.data}}
            return Object.assign({}, state, returnObj);
        case actionTypes.SEARCH_CUSTOMERS:
            returnObj = {user:{selection:state.user.selection,custList:action.custList.data}}
            return Object.assign({}, state, returnObj);
        case actionTypes.SAVE_SELECTED_ADMIN:
            returnObj = {user:{selection:state.user.selection,selAdminName:action.selAdminName}}
            return Object.assign({}, state, returnObj);
        case actionTypes.GET_SELECTED_ADMIN_CUSTOMERS:
            returnObj = {user:{selection:state.user.selection,selAdminName:state.user.selAdminName, selAdminAsscList:action.selAdminList}}
            return Object.assign({}, state, returnObj);
        default: return state;
    }
}

const getUserInfoForVerifyPage = (info:any,verifyObj:any) => {

    let userInfo = Object.assign({},info)
    if(verifyObj.type == 'email'){userInfo.email = verifyObj.value}
    if(verifyObj.type == 'fax'){userInfo.faxNumber = verifyObj.value}
    if(verifyObj.type == 'username'){userInfo.userName = verifyObj.value}
    if(verifyObj.type == 'phone'){userInfo.phoneNumber = verifyObj.value1;userInfo.extxn = verifyObj.value2;}
    if(verifyObj.type == 'altphone'){userInfo.altPhoneNumber = verifyObj.value1;userInfo.extxnAlt = verifyObj.value2;}
    if(verifyObj.type == 'sap'){userInfo.sapId = verifyObj.value}
    if(verifyObj.type == 'name'){userInfo.firstName = verifyObj.value1;userInfo.lastName = verifyObj.value2}
    return userInfo;
}
