import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FormUploadPage from '../formupload/FormUploadPage';
import UploadConfirmationPage from '../formupload/UploadConfirmationPage';
import PropTypes from 'prop-types';

const FormUploadLayout = ({ match }) => {
    //console.log("path in formupload layout:::"+match.path);
    return(
        <div className="">
            <Switch>
                <Route exact path={`${match.path}/upload`} component={FormUploadPage} />
                <Route path={`${match.path}/confirm`} component={UploadConfirmationPage} />
            </Switch>
        </div>
    )}

FormUploadLayout.propTypes = {
    match: PropTypes.any.isRequired
}

export default FormUploadLayout
