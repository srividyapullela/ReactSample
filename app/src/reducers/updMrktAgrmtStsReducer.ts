import * as actionTypes from '../actions/actionTypes';

export default function updMrktgAgrmtStsReducer(state: any = [], action: any) {

  switch(action.type) {
        case actionTypes.UPDATE_MRKTG_AGREEMENT_STATUS : return action.updateAgreementSts
        default: return state;
    }
}
