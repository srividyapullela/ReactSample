import * as actionTypes from '../actions/actionTypes';

export default function deleteOfferReducer(state:any = [], action: any) {

    switch(action.type) {
        case actionTypes.DELETE_OFFER: return action.deleteStatus
        default:return state;
    }
}
