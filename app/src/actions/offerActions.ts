import * as actionTypes from './actionTypes';
import OfferService from '../services/offerService';
import { Offer } from '../models'

export const createOffer = (offer: any) => ({ type:actionTypes.SAVE_OFFER, offerDtls: offer})

export const createOfferCall = (offer: any) => {
    return function(dispatch: any) {
        return OfferService.createOffer(offer).then(data => dispatch(createOffer(data)));
    }
}

export const editOffer = (data: any,offer: any) => ({ type:actionTypes.EDIT_OFFER, editOfferDtls: {offer,data}});

export const editOfferCall = (offer: any) => {
    return function(dispatch: any) {
        return OfferService.editOffer(offer).then(data => dispatch(editOffer(data,offer)));
    }
}

export const deleteOffer = (data: any) => ({ type:actionTypes.DELETE_OFFER, deleteStatus: data })

export const deleteOfferCall = (offer: any) => {
    return function(dispatch: any) {
        return OfferService.deleteOffer(offer).then(data => dispatch(deleteOffer(data)));
    }
}

export const listOffers = (offerList: Offer[]) => ({ type:actionTypes.LIST_OFFERS, listOfferDtls: offerList });

export const listOffersCall = (offer: any) => {
    return function(dispatch: any) {
        return OfferService.listOffers(offer).then(data => dispatch(listOffers(data)));
    }
}
