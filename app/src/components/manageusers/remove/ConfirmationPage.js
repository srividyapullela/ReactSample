import React from 'react'
import FieldName from './FieldName'
import { connect } from 'react-redux'
import CommonUtil from '../../common/Util'
import { ErrorBox } from '../../common/Error'
import Print from '../../common/Print'
import moment from 'moment';
import PropTypes from 'prop-types';

class ConfirmationPage extends React.Component {

      constructor(props){
          super(props)
      }

      render(){

          const removeUser = this.props.removeUser
          if(!removeUser.userDetails){
              return <div></div>
          }
          const user = removeUser.userDetails.user

          //const isUserHasAssociations = CommonUtil.isUserHasAssociations(user.webSecurityRole)
          const phone = CommonUtil.getPhoneDisplay(user.phoneNum,user.phoneNumExtn)
          const altPhone = CommonUtil.getPhoneDisplay(user.altPhoneNum,user.altContactPhExtn)
          const fax = CommonUtil.getPhoneDisplay(user.faxNum,undefined)
          const name = user.firstName+" "+user.lastName
          const submittedOn = moment(new Date()).format("MM/DD/YYYY h:mm a")

          const heading = <h1>Remove User Confirmation</h1>

          const removeSuccess = (confirmation) => {

              if(!confirmation.error){
                 return(
                     <div>
                       <div className="boxtitleseperator">&nbsp;</div>
                       <div>
                         <p>The user was successfully removed from the system. Please print this page for your records.</p>
                       </div>
                       <div className="movetitledown"><h3>Request Details</h3></div>
                       <FieldName label="Submitted on" value={confirmation.transDateAndTime}/>
                       <FieldName label="Transaction number" value={confirmation.transactionNumber}/>
                     </div>
                 )
              }else{
                 return(
                    <ErrorBox message="Unable to remove user at this time. please try again." isError={true}/>
                 )
              }
          }

          return(
            <div>
              <div className="pageHeader">{heading}</div>
              <div className="box">
                {removeSuccess(removeUser.confirmation)}
                <FieldName label="Internal/External" value={CommonUtil.getUserCategory(user.userCategory)}/>
                <FieldName label="Security Role" value={user.securityRole}/>
                <FieldName label="User Type" value={user.securityRoleDisplayName}/>
                <FieldName label="Name" value={name}/>
                <FieldName label="Username" value={user.userName}/>
                <FieldName label="Phone Number" value={phone}/>
                <FieldName label="Alt Phone Number" value={altPhone}/>
                <FieldName label="Fax Number" value={fax}/>
                <FieldName label="Submitted on" value={submittedOn}/>
                <div className="hr">&nbsp;</div>
                <div className="tableMsgHolder hide left fullwidth">&nbsp;</div>
                <Print/>
              </div>
             </div>
          )
      }
}

const mapStateToProps = (state) => ({removeUser: state.removeUser})

ConfirmationPage.propTypes = {
    removeUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(ConfirmationPage)
