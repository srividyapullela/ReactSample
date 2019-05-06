import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EnterUserInfoPage from '../adduser/userinfo/EnterUserInfoPage';
import SelectUserTypePage from '../adduser/selectuser/SelectUserTypePage';
import VerifyPage from '../adduser/verify/VerifyPage';
import ConfirmPage from '../adduser/confirm/ConfirmPage';
import CustomersPage from '../adduser/associate/CustomersPage'
import ToCustomerAdminPage from '../adduser/associate/tocustomer/ToCustomerAdminPage'
import ToBrokerPage from '../adduser/associate/tobroker/ToBrokerPage'
import PropTypes from 'prop-types';

const AddUserLayout = ({ match }) => {
    //console.log("path in adduser layout:::"+match.path);
    return(
        <div className="left fullwidth">
            <Switch>
                <Route exact path={`${match.path}/selectusertype`} component={SelectUserTypePage} />
                <Route path={`${match.path}/enteruserinfo/:userType`} component={EnterUserInfoPage} />
                <Route path={`${match.path}/associate/tocustomer`} component={ToCustomerAdminPage} />
                <Route path={`${match.path}/associate/tobroker`} component={ToBrokerPage} />
                <Route path={`${match.path}/associate`} component={CustomersPage} />
                <Route path={`${match.path}/verify`} component={VerifyPage} />
                <Route path={`${match.path}/confirm`} component={ConfirmPage} />
            </Switch>
        </div>
    )}

AddUserLayout.propTypes = {
    match: PropTypes.any.isRequired
}

export default AddUserLayout
