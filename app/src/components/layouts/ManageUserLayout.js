import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchUsersPage from '../manageusers/search/SearchUsersPage'
import UpdateUserPage from '../manageusers/update/UpdateUserPage'
import CustomersPage from '../manageusers/update/associatemore/CustomersPage'
import ConfirmationPage from '../manageusers/remove/ConfirmationPage'
import PropTypes from 'prop-types';


const ManageUserLayout = ({ match }) => {
    //console.log("path in formupload layout:::"+match.path)
    return(
        <div className="">
            <Switch>
                <Route exact path={`${match.path}/searchusers`} component={SearchUsersPage} />
                <Route exact path={`${match.path}/updateuser/associatemore`} component={CustomersPage} />
                <Route exact path={`${match.path}/updateuser/:userName`} component={UpdateUserPage} />
                <Route exact path={`${match.path}/removeuser/confirm`} component={ConfirmationPage} />
            </Switch>
        </div>
    )}

ManageUserLayout.propTypes = {
    match: PropTypes.any.isRequired
}

export default ManageUserLayout
