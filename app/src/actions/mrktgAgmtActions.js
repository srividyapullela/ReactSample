import * as actionTypes from './actionTypes'
import MrktgAgreementService from '../services/mrktgAgrmService'

export function searchMrktgAgreement(data) {
    return { type:actionTypes.SEARCH_MRKTG_AGREEMENT, searchAgreement: data };
}

export function getMrktgAgreement(bpNumber) {
    return function(dispatch) {
        return MrktgAgreementService.searchMrktgAgreement(bpNumber).then(data => {
            dispatch(searchMrktgAgreement(data));
        });
    }
}

export function updateMrktgAgreement(dataIn,dataOut) {
    return { type:actionTypes.UPDATE_MRKTG_AGREEMENT, dataOut, dataIn };
}

export function updateMarketingAgreement(dataIn) {
    return function(dispatch) {
        return MrktgAgreementService.updateMrktgAgreement(dataIn).then(data => {
            dispatch(updateMrktgAgreement(dataIn,data));
        });
    }
}

export function updateMrktgAgreementSts(data) {
    return { type:actionTypes.UPDATE_MRKTG_AGREEMENT_STATUS, updateAgreementSts: data };
}

export function updateMarketingAgreementSts(dataIn) {
    return function(dispatch) {
        return MrktgAgreementService.updateMrktgAgreementSts(dataIn).then(data => {
            dispatch(updateMrktgAgreementSts(data));
        });
    }
}

export function createMrktgAgreement(data) {
    return { type:actionTypes.CREATE_MRKTG_AGREEMENT, createAgreement: data };
}

export function createMarketingAgreement(dataIn) {
    return function(dispatch) {
        return MrktgAgreementService.createMrktgAgreement(dataIn).then(data => {
            dispatch(createMrktgAgreement(data));
        });
    }
}

export function saveMrktgAgreement(data) {
    return { type:actionTypes.SAVE_MRKTG_AGREEMENT, agreementInfo: data };
}

export function saveInfoFromEnterPage(data) {
    return { type:actionTypes.SAVE_AGRM_FROM_ENTER_PAGE, agreementInfo: data };
}

export function saveInfoFromPayPage(data) {
    return { type:actionTypes.SAVE_AGRM_FROM_PAY_PAGE, paymentInfo: data };
}
