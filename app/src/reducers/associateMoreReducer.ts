import * as actionTypes from '../actions/actionTypes';

export default function associateMoreReducer(state:any = [], action:any) {

    switch(action.type) {
        case actionTypes.DELETE_CUST_LIST_FOR_ASSC_MORE: return Object.assign({}, state, {customerList:undefined});
        case actionTypes.SAVE_CUST_LIST_FOR_ASSC_MORE: return Object.assign({}, state, {customerList:action.payload});
        case actionTypes.DISASSOCIATE_CUST_FROM_USER: return Object.assign({}, state, {status:action.payload});
        default:return state;
    }
}
