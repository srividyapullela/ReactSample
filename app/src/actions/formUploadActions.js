import * as actionTypes from './actionTypes';
import FormUploadService from '../services/formUploadService';

export function uploadForm(form,data) {
    return { type:actionTypes.FORM_UPLOAD, result: form };
}

export function formUpload(form) {
    return function(dispatch) {
        return FormUploadService.uploadForm(form).then(data => {
            if(data != undefined){dispatch(uploadForm(form,data));}
            else{dispatch(uploadForm(form,{}));}
        }).catch(e =>{
            console.log("error::::"+e);
            dispatch(uploadForm(form,e));
        });
    }
}
