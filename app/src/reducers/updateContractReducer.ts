import * as actionTypes from '../actions/actionTypes';

export default function updateContractReducer(state: any = [], action: any) {

    switch(action.type) {
      case actionTypes.UPDATE_CONTRACT_INFO_TODB :
          console.log("in reducer")
          return Object.assign({}, state, {contract:action.contract,confirm:action.confirm});
      default: return state;
    }
}
