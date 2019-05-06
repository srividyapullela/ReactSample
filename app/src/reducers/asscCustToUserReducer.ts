import * as actionTypes from '../actions/actionTypes';

export default function asscCustToUserReducer(state:any = [], action:any) {

    switch(action.type) {
        case actionTypes.ASSOCIATE_CUSTOMERS_TO_USER: return action.status
        default: return state;
    }
}
