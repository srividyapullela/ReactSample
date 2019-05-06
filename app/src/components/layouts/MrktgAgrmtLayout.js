import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchCustomersPage from '../mrktgagreement/search/SearchCustomersPage'
import EnterMrktgAgrmtPage from '../mrktgagreement/create/EnterMrktgAgrmtPage'
import MrktgAgrmtVerifyPage from '../mrktgagreement/create/verify/MrktgAgrmtVerifyPage'
import MrktgAgrmtConfirmPage from '../mrktgagreement/create/confirm/MrktgAgrmtConfirmPage'
import UpdateMrktgAgreementPage from '../mrktgagreement/update/updateMrktAgrmtPage'
import UpdateMrktgAgrmtInfoPage from '../mrktgagreement/update/UpdateMrktgAgrmtInfoPage'
import UpdatePaymentInfoPage from '../mrktgagreement/update/UpdatePaymentInfoPage'
import UpdateConfirmPage from '../mrktgagreement/update/ConfirmPage'
import PaymentInfoPage from '../mrktgagreement/create/PaymentInfoPage'
import PropTypes from 'prop-types';

const MrktgAgreementLayout = ({ match }) => {
    //console.log("path in formupload layout:::"+match.path);
    return(
        <div className="">
            <Switch>
                <Route exact path={`${match.path}/searchcustomers`} component={SearchCustomersPage} />
                <Route path={`${match.path}/entermrkgagreement`} component={EnterMrktgAgrmtPage} />
                <Route path={`${match.path}/enterpaymentinfo`} component={PaymentInfoPage} />
                <Route path={`${match.path}/update/info`} component={UpdateMrktgAgrmtInfoPage} />
                <Route path={`${match.path}/update/paymentinfo`} component={UpdatePaymentInfoPage} />
                <Route path={`${match.path}/update/confirm`} component={UpdateConfirmPage} />
                <Route path={`${match.path}/update`} component={UpdateMrktgAgreementPage} />
                <Route path={`${match.path}/verify`} component={MrktgAgrmtVerifyPage} />
                <Route path={`${match.path}/confirm`} component={MrktgAgrmtConfirmPage} />
            </Switch>
        </div>
    )}

MrktgAgreementLayout.propTypes = {
    match: PropTypes.any.isRequired
}

export default MrktgAgreementLayout
