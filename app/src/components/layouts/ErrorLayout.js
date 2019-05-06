import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../common/header'
import ErrorPage from '../error/ErrorPage'
import PropTypes from 'prop-types';

const ErrorLayout = ({ match }) => {
    //console.log("path in formupload layout:::"+match.path);
    return(
        <div className="">
            <Header fromErrorLayout={true}/>
            <Switch>
                <Route exact path={`${match.path}/invalidSapid/:msgType`} component={ErrorPage} />
            </Switch>
        </div>
    )}

ErrorLayout.propTypes = {
    match: PropTypes.any.isRequired
}

export default ErrorLayout
