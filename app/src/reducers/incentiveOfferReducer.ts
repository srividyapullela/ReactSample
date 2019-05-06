import * as actionTypes from '../actions/actionTypes';

const initialState:any = {saveOfferStatus:{},editOfferStatus:{}}
export default function incentiveOfferReducer(state = initialState, action:any) {

    console.log(action)

    switch(action.type) {
        case actionTypes.SAVE_OFFER : return Object.assign({}, state, {saveOfferStatus:action.offerDtls})
        case actionTypes.EDIT_OFFER : return Object.assign({}, state, {editOfferStatus:action.editOfferDtls.data,offer:action.editOfferDtls.offer})
        default:return state;
    }
}
