import * as actionTypes from '../actions/actionTypes';

export default function removeUserReducer(state: any = [], action: any) {

    switch(action.type) {
        case actionTypes.REMOVE_USER : return {confirmation:action.removeUser,userDetails:action.userDetails}
        default: return state;
    }
}
