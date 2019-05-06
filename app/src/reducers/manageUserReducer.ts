import * as actionTypes from '../actions/actionTypes';

export default function manageUserReducer(state: any = [], action: any) {

    switch(action.type) {
        case actionTypes.SEARCH_USERS : return action.userList
        case actionTypes.USER_DETAILS: return action.userDtls
        case actionTypes.SAVE_USER_DTLS_FOR_ASSOCIATE_MORE: return action.payload
        default: return state;
    }
}
