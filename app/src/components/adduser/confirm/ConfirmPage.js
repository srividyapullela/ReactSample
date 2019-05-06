import React from 'react';
import { connect } from 'react-redux'
import FieldName from './FieldName'
import CommonUtil from '../../common/Util'
import { ErrorBox } from '../../common/Error'
import Associations from './associations/Associations'
import * as _ from 'lodash'
import PropTypes from 'prop-types';

class ConfirmPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {brokerLinkCollapsed:true,brokerLinkBpNumbers:[]}

        this.toggleBrokerLink = this.toggleBrokerLink.bind(this)
    }

    toggleBrokerLink(brokerLinkBpNumber, toOpenLink){
        let brokerLinkBpNumbers = _.cloneDeep(this.state.brokerLinkBpNumbers)
        if(toOpenLink){
            brokerLinkBpNumbers.push(brokerLinkBpNumber);
        }else{
            brokerLinkBpNumbers = brokerLinkBpNumbers.filter((bpNumber) => brokerLinkBpNumber != bpNumber)
        }
        this.setState({
          brokerLinkBpNumbers,
          brokerLinkCollapsed: !this.state.brokerLinkCollapsed
        });
    }

    render(){

        if(!this.props.addUserObj.user.confirmation){
          return <div></div>
        }

        const user = this.props.addUserObj.user
        let userInfo = user.userInfo
        let custList = user.customerList
        let selection = user.selection
        let selAdminAsscList = user.selAdminAsscList
        let confirmation = user.confirmation

        const intOrExt = selection.userType == 'internal'?'Internal':'External';
        const securityRole = selection.subUserType;
        const isUserHasAssoications = CommonUtil.isUserHasAssociations(securityRole)
        const isCustomerAdmin = CommonUtil.isUserCustomerAdmin(securityRole)
        const name = userInfo.firstName+' '+userInfo.lastName
        const phone = CommonUtil.getPhoneDisplay(userInfo.phoneNumber,userInfo.extxn)
        const altPhone = CommonUtil.getPhoneDisplay(userInfo.altPhoneNumber,userInfo.extxnAlt)
        const fax = CommonUtil.getPhoneDisplay(userInfo.faxNumber,undefined)

        const heading = <h1>Add User - Confirmation</h1>

        const userSuccess = (confirmation) => {

            if(!confirmation.error){
               return(
                   <div>
                     <div className="boxtitleseperator">&nbsp;</div>
                     <div>
                       <p>The user was successfully added to the system. Please print this page for your records. An email has been sent to the user that contains their username and a link to create a password to log onto the system.</p>
                     </div>
                     <div className="movetitledown"><h3>Request Details</h3></div>
                     <FieldName label="Submitted on" value={confirmation.transDateAndTime}/>
                     <FieldName label="Transaction number" value={confirmation.transactionNumber}/>
                   </div>
               )
            }else{
              //console.log("in erro")
               return(
                  <ErrorBox message="Unable to add user at this time. please try again." isError={true}/>
               )
            }
        }

        const asscOptions = {securityRole,custList,selAdminAsscList,brokerLinkBpNumbers:this.state.brokerLinkBpNumbers,brokerLinkCollapsed:this.state.brokerLinkCollapsed,toggleBrokerLink:this.toggleBrokerLink}

        return(
        <div>
                <div className="pageHeader">
                        {heading}
                </div>
          <div className="box">

            {userSuccess(confirmation)}
            <FieldName label="Internal/External" value={intOrExt}/>
            <FieldName label="Security Role" value={CommonUtil.getSecurityRoleDisplayName(securityRole)}/>
            {CommonUtil.showUserType(securityRole)?<FieldName label="User Type" value={CommonUtil.getUserTypeDisplayName(selection.subUserType)}/>:""}
            <FieldName label="Name" value={name}/>
            <FieldName label="Username" value={userInfo.userName}/>
            <FieldName label="Email" value={userInfo.email}/>
            <FieldName label="Phone Number" value={phone}/>
            <FieldName label="Alt Phone Number" value={altPhone}/>
            <FieldName label="Fax Number" value={fax} />
            {CommonUtil.ableToAccessPriv(securityRole)?
              [<FieldName key="canpaybills" label="Can pay bills" value={userInfo.ableToPayBills || isCustomerAdmin?'Yes':'No'}/>,
              <FieldName  key="canstartstop" label="Can Start / Stop Service" value={userInfo.ableToStartStopService || isCustomerAdmin?'Yes':'No'}/>]
              :''}
            <div className="hr">&nbsp;</div>
            {isUserHasAssoications?<Associations asscOptions={asscOptions}/>:''}
          </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({addUserObj: state.addUser})

ConfirmPage.propTypes = {
    addUserObj: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(ConfirmPage);
