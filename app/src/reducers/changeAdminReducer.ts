import * as actionTypes from '../actions/actionTypes';

export default function changeAdminReducer(state:any = [], action: any) {
  
    switch(action.type) {
        case actionTypes.SAVE_DETAILS_FOR_CHANGING_ADMIN: return {details:action.payload}
        case actionTypes.CHANGE_ADMIN_FOR_ASSOCIATE:
          return Object.assign({},state,{status:action.payload.status,associateUserName:action.payload.associateUserName,details:undefined});
        default:return state;
    }
}
