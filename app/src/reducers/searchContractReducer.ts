import * as actionTypes from '../actions/actionTypes';

const initialState = {contract:{}}

export default function searchContractReducer(state: any = [], action: any) {

  switch(action.type) {
        case actionTypes.SEARCH_CONTRACT :
            return Object.assign({}, state, {contract:action.searchContract});
        case actionTypes.SAVE_CONTRACT_INFO :
            return Object.assign({}, state, {contract:action.contractInfo});
        case actionTypes.SAVE_CONTRACT_INFO_TODB :
            return Object.assign({}, state, {contract:action.contractInfo.contract,confirm:action.confirm});
        default: return state;
    }
}
