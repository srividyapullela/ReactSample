import * as actionTypes from '../actions/actionTypes';

export default function isUserReducer(state:any = [], action:any) {

    switch(action.type) {
        case actionTypes.IS_SAPID_EXIST_IN_SYSTEM : return action.isFound
        case actionTypes.IS_USERNAME_EXIST_IN_SYSTEM : return action.isFound
        default: return state;
    }
}
