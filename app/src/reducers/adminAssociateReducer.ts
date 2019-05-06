import * as actionTypes from '../actions/actionTypes';

export default function adminAssociateReducer(state:any = [], action:any) {

    switch(action.type) {
        case actionTypes.LIST_ADMIN_ASSOCIATES :return action.admindata
        default:return state;
    }
}
