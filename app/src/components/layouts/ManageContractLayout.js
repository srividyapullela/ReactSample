import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MngContractSearchPage from '../managecontract/search/MngContractSearchPage'
import AddContractInfoPage from '../managecontract/addcontract/AddContractInfoPage'
import AddConfirmPage from '../managecontract/addcontract/confirm/ConfirmPage'
import UpdateContractPage from '../managecontract/updatecontract/UpdateContractPage'
import UpdateConfirmPage from '../managecontract/updatecontract/confirm/ConfirmPage'
import PropTypes from 'prop-types';

const ManageContractLayout = ({ match }) => {
    //console.log("path in formupload layout:::"+match.path);
    return(
        <div className="">
            <Switch>
                <Route exact path={`${match.path}/searchcustomers`} component={MngContractSearchPage} />
                <Route path={`${match.path}/addContract/confirm`} component={AddConfirmPage} />
                <Route path={`${match.path}/addContract`} component={AddContractInfoPage} />
                <Route path={`${match.path}/updateContract/confirm`} component={UpdateConfirmPage} />
                <Route path={`${match.path}/updateContract`} component={UpdateContractPage} />
            </Switch>
        </div>
    )}

ManageContractLayout.propTypes = {
    match: PropTypes.any.isRequired
}

export default ManageContractLayout
