import * as actionTypes from './actionTypes'
import ManageContractService from '../services/manageCntrtService'

export function searchContract(data) {
    return { type:actionTypes.SEARCH_CONTRACT, searchContract: data };
}

export function getContract(bpNumber) {
    return function(dispatch) {
        return ManageContractService.searchContract(bpNumber).then(data => {
            dispatch(searchContract(data));
        });
    }
}

export function saveContractInfo(data) {
    return { type:actionTypes.SAVE_CONTRACT_INFO, contractInfo: data };
}

export function saveContractInfoDB(contractInfo, data){
  return { type:actionTypes.SAVE_CONTRACT_INFO_TODB, contractInfo, confirm: data };
}

export function saveContract(inData) {
    return function(dispatch) {
        return ManageContractService.saveContract(inData).then(data => {
            dispatch(saveContractInfoDB(inData, data));
        });
    }
}

export function updateContractInfoDB(contract,data){
    return { type:actionTypes.UPDATE_CONTRACT_INFO_TODB, contract,confirm: data };
}

export function updateContract(inData) {
    return function(dispatch) {
        return ManageContractService.updateContract({contract:inData}).then(data => {
            dispatch(updateContractInfoDB(inData,data));
        });
    }
}


function getUpdatedValues(oldData, updData) {
    var data = Object.assign({},oldData);
    if(undefined != updData.customerStatus){data.customerStatus = updData.customerStatus}
    return data;
}
