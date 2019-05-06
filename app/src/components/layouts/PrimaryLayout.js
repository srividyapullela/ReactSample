import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdleTimer from 'react-idle-timer';
import Header from '../common/header.js'
import Footer from '../common/footer.js'
import OverviewPage from '../overview/OverviewPage'
import AddUserLayout from './AddUserLayout'
import ManageUserLayout from './ManageUserLayout'
import ManageContractLayout from './ManageContractLayout'
import IncentiveOfferPage from '../incentiveoffers/IncentiveOfferPage'
import FormUploadLayout from './FormUploadLayout'
import ESIIDLookupPage from '../esiidlookup/ESIIDLookupPage'
import MrktgAgreementLayout from './MrktgAgrmtLayout'
import PropTypes from 'prop-types';

class PrimaryLayout extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            timeout:1000 * 60 * 15
        }

        this.idleTimeout = this.idleTimeout.bind(this)
        this.onActive = this.onActive.bind(this)
    }

    idleTimeout(){
        //console.log("timed out:::"+this.state.timeout)
        localStorage.clear();
        this.props.history.push('/');
    }

    onActive(){
        //console.log("on active:::"+this.state.timeout)
    }

    render(){

      const { match } = this.props
      const indelTimerRef = "idleTimer"

      return(

          <IdleTimer
              ref={indelTimerRef}
              element={document}
              activeAction={this.onActive}
              idleAction={this.idleTimeout}
              timeout={this.state.timeout}
              format="MM-DD-YYYY HH:MM:ss.SSS">

              <div className="pageContainer">
                  <Header />
                  <Switch>
                      <Route path={`${match.path}/overview`} exact component={OverviewPage} />
                      <Route path={`${match.path}/adduser`} component={AddUserLayout} />
                      <Route path={`${match.path}/manageusers`} component={ManageUserLayout} />
                      <Route path={`${match.path}/marketingagreements`} component={MrktgAgreementLayout} />
                      <Route path={`${match.path}/managecontract`} component={ManageContractLayout} />
                      <Route path={`${match.path}/incentiveoffers/manage`} component={IncentiveOfferPage} />
                      <Route path={`${match.path}/formupload`} component={FormUploadLayout} />
                      <Route path={`${match.url}/lookup/esiid`} component={ESIIDLookupPage} />
                  </Switch>
                   <Footer />
              </div>
          </IdleTimer>
      )
   }

 }

 PrimaryLayout.propTypes = {
     match: PropTypes.any.isRequired,
     history: PropTypes.func.isRequired
 }

export default PrimaryLayout
