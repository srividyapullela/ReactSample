import * as actionTypes from '../actions/actionTypes';

export default function esiidLookupReducer(state:any = [], action:any) {

    switch(action.type) {
        case actionTypes.ESIID_LOOK_UP :
            return action.esiidList
        default:
            return state;
    }
}
