import * as actionTypes from '../actions/actionTypes';

export default function searchBPReducer(state: any = [], action: any) {

    switch(action.type) {
        case actionTypes.SEARCH_BP_FOR_ASSC_MORE :
        let customerList;
        let brokerName = ""
        if(action.customerList.error){
            customerList = action.customerList
        }else{
            customerList = action.customerList.mngtList;
            brokerName = action.customerList.brokerName
        }
        return {customerList}
        default: return state;
    }
}
