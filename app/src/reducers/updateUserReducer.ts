import * as actionTypes from '../actions/actionTypes';

export default function updateUserReducer(state: any = [], action: any) {

    switch(action.type) {
      case actionTypes.USER_UPDATE: return action.updateUser
        default: return state;
    }
}
