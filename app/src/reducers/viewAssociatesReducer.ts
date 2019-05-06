import * as actionTypes from '../actions/actionTypes';

export default function viewAssociatesReducer(state: any = [], action: any){

  switch(action.type) {
      case actionTypes.VIEW_ASSOCIATES: return action.viewAssociates
      default: return state;
  }
}
