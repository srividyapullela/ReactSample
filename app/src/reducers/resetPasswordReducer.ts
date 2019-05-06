import * as actionTypes from '../actions/actionTypes';

const initialState: any = {status: undefined}

export default function resetPasswordReducer(state: any = initialState, action: any) {

    switch(action.type) {
        case actionTypes.RESET_PASSWORD: return {...state,...{status:action.resetPassword.status}}
        case actionTypes.EMPTY_RESET_PASSWORD: return {...state,...{status:undefined}}
        default: return state;
    }
}
