import * as actionTypes from '../actions/actionTypes';

export default function listOfferReducer(state:any = [], action:any) {

    console.log(action)
    
    switch(action.type) {
        case actionTypes.LIST_OFFERS :return action.listOfferDtls
        default:return state;
    }
}
