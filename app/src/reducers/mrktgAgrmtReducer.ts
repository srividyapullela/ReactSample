import * as actionTypes from '../actions/actionTypes';
import { UpdateMarketAgreement, AgreementInfo, PaymentInfo, Address } from '../models/markagrm.model';

const initialState: any = {
    bpNumber: '',
    agreementInfo: undefined,
    paymentInfo: undefined,
    active: undefined
}

export default function reducer(state = initialState, action: any) {

  switch(action.type) {
        case actionTypes.SEARCH_MRKTG_AGREEMENT: return setSearchResultInState(action.searchAgreement, state)
        case actionTypes.UPDATE_MRKTG_AGREEMENT: return getUpdatedMarketingAgreement(action.dataIn,action.dataOut,state)
        case actionTypes.SAVE_MRKTG_AGREEMENT:   return Object.assign({}, state, {mrktgagrm:{}});
        case actionTypes.CREATE_MRKTG_AGREEMENT:
            return Object.assign({}, state, {mrktgagrm:{agreement:state.mrktgagrm.agreement,paymentInfo:state.mrktgagrm.paymentInfo, confirm:action.createAgreement}});
        case actionTypes.SAVE_AGRM_FROM_ENTER_PAGE:
            return Object.assign({}, state, {mrktgagrm:{agreement:action.agreementInfo, paymentInfo:state.mrktgagrm}});
        case actionTypes.SAVE_AGRM_FROM_PAY_PAGE:
            return Object.assign({}, state, {mrktgagrm:{agreement:state.mrktgagrm.agreement,paymentInfo:action.paymentInfo}});
        default: return state;
    }
}

const getUpdatedMarketingAgreement = (inputData:any, dataOut:any, state:any) => {
    let agreement = state.data.agreementInfo
    let paymentInfo = state.data.paymentInfo

    if(inputData.updateType == 'A'){
        agreement = inputData.agreement
    }
    if(inputData.updateType == 'P'){
        paymentInfo = inputData.paymentInfo
    }
    return Object.assign({}, state, {mrktgagrm:{agreement,paymentInfo, confirm:dataOut.confirm}});
}

const setSearchResultInState = (result:any, state:any) => {
    let returnState = Object.assign({}, state)
    if(undefined != result && null != result && undefined != result.agreement && null != result.agreement){
      returnState.bpNumber = result.agreement.bpNumber
      let rslt = getSearchResult(result)
      returnState.data = rslt[0]
      returnState.error = rslt[1]
      returnState.active = result.agreement.active
    }else{
       returnState.error = true;
    }
    return Object.assign({}, state, returnState)
}

const getSearchResult = (result:any) => {
    let agreement = result.agreement
    let addr: any = new Address()
    let status = result.status
    let error = false
    let bpName = ''
    if(status  == 'NOT_FOUND'){
        error = true
    }else{

        addr.streetNumber = agreement.contactStreetNum
        addr.streetName = agreement.contactStreetName
        addr.city = agreement.contactCity
        addr.state = agreement.contactState
        addr.zipcode = agreement.contactZipcode
        addr.suiteNumber = agreement.contactSuiteNum
        addr.poBox = agreement.contactPOBNum
        addr.phoneNumber = agreement.contactPhoneNumber
        addr.extn = agreement.contactPhExtn
        bpName = agreement.businessName
    }
    return [{status, address: addr, bpName,
                agreementInfo:getAgreementInfo(agreement),
                paymentInfo:getPaymentInfo(agreement)},error];
}

const getAgreementInfo = (agreement:any) => {
    console.log(agreement)
    let agrmInfo = new AgreementInfo();
    agrmInfo.vendorNumber = agreement.vendorNumber;
    agrmInfo.contractAgrmNumber = agreement.mrktgAgreementNum;
    agrmInfo.doorFeeStructure = agreement.doorFeeStructure;
    agrmInfo.doorFeeAmount = agreement.doorFeeAmount;
    agrmInfo.startDate = agreement.startDate;
    agrmInfo.endDate = agreement.endDate;
    agrmInfo.agreementTerm = agreement.agreementTerm;
    agrmInfo.cancelFee = agreement.cancellationFee;
    agrmInfo.brand = agreement.brand;
    agrmInfo.ioNumber = agreement.ioNumber;
    agrmInfo.glNumber = agreement.glNumber;
    agrmInfo.tier1Fee = agreement.tier1Fee;
    agrmInfo.tier2Fee = agreement.tier2Fee;
    agrmInfo.tier3Fee = agreement.tier3Fee;
    agrmInfo.moveInRate1 = agreement.moveInRate1;
    agrmInfo.moveInRate2 = agreement.moveInRate2;
    agrmInfo.moveInRate3 = agreement.moveInRate3;
    return agrmInfo;
}

const getPaymentInfo = (agreement:any) => {

    let payInfo = new PaymentInfo();
    let pAddr: any = new Address();
    pAddr.streetNumber = agreement.paymentStreetNum
    pAddr.streetName = agreement.paymentStreetName
    pAddr.city = agreement.paymentCity
    pAddr.state = agreement.paymentState
    pAddr.zipcode = agreement.paymentZipcode
    pAddr.suiteNumber = agreement.paymentSuiteNum
    pAddr.poBox = agreement.paymentPOBNum
    pAddr.phoneNumber = agreement.paymentPhone
    pAddr.extn = agreement.paymentPhExt
    payInfo.paymentAddress = pAddr;
    let bAddr: any = new Address();
    bAddr.streetNumber = agreement.contactStreetNum
    bAddr.streetName = agreement.contactStreetName
    bAddr.city = agreement.contactCity
    bAddr.state = agreement.contactState
    bAddr.zipcode = agreement.contactZipcode
    bAddr.suiteNumber = agreement.contactSuiteNum
    bAddr.poBox = agreement.contactPOBNum
    bAddr.phoneNumber = agreement.contactPhoneNumber
    bAddr.extn = agreement.contactPhExtn
    payInfo.billingAddress = bAddr;
    payInfo.payableTo = agreement.payableTo;
    payInfo.paymentAddressOption = agreement.paymentAddressOption
    return payInfo;
}
