import * as actionTypes from '../actions/actionTypes';
import { FormUpload } from '../models'

const initialState:any = {result:{displayName:"",promocode:"", fileName:""}}
export default function formUploadReducer(state = initialState, action:any) {

    switch(action.type) {
        case actionTypes.FORM_UPLOAD: return Object.assign({}, state, {result:getFormUploadDetails(action.result)});
        default:return state;
    }
}

const getFormUploadDetails = (inData: any): FormUpload  => {
    let formUpload = new FormUpload();
    try{
        formUpload.promocode = inData.promoCode;
        formUpload.displayName = inData.displayName;
        formUpload.fileName = inData.fileName;
    }catch(err){
        console.log("ERROR====getFormUploadDetails>>>>>"+err.message)
    }
    return formUpload;
}
