import * as actionTypes from './actionTypes';
import OfferService from '../services/offerService';

export function createOffer(offer) {
    return { type:actionTypes.SAVE_OFFER, offerDtls: offer};
}

export function createOfferCall(offer) {
    return function(dispatch) {
        return OfferService.createOffer(offer).then(data => {
            dispatch(createOffer(data));
        });
    }
}

export function editOffer(data,offer) {
    return { type:actionTypes.EDIT_OFFER, editOfferDtls: {offer,data} };
}

export function editOfferCall(offer) {
    return function(dispatch) {
        return OfferService.editOffer(offer).then(data => {
            dispatch(editOffer(data,offer));
        });
    }
}

export function deleteOffer(data) {
    return { type:actionTypes.DELETE_OFFER, deleteStatus: data };
}

export function deleteOfferCall(offer) {
    return function(dispatch) {
        return OfferService.deleteOffer(offer).then(data => {
            dispatch(deleteOffer(data));
        });
    }
}

export function listOffers(offerList) {
    return { type:actionTypes.LIST_OFFERS, listOfferDtls: offerList };
}

export function listOffersCall(offer) {
    return function(dispatch) {
        return OfferService.listOffers(offer).then(data => {
            dispatch(listOffers(data));
        });
    }
}
