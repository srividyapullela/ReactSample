import * as actionTypes from './actionTypes';
import ESIIDLookupService from '../services/esiidLookupService';

export function lookupESIIDs(data) {
    return { type:actionTypes.ESIID_LOOK_UP, esiidList: data };
}

export function lookupESIIDsByAddr(addresses) {
    return function(dispatch) {
        return ESIIDLookupService.lookupESIIDs(addresses).then(data => {
            dispatch(lookupESIIDs(data));
        });
    }
}
