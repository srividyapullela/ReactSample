import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import { ErrorBox } from '../../common/Error'
import HeadingInfo from './HeadingInfo'
import AccessPriv from './AccessPriv'
import CommonUtil from '../../common/Util'
import ValidateUtil from '../../common/ValidateUtil'
import Cancel from '../../common/Cancel'
import FirstName from './FirstName'
import LastName from './LastName'
import UserName from './UserName'
import SapId from './SapId'
import Email from './Email'
import Phone from './Phone'
import AltPhone from './AltPhone'
import Fax from './Fax'
import PropTypes from 'prop-types';

class EnterUserInfoPage extends React.Component {

    
    constructor(props){
          super(props)
          let user = this.props.addUserObj.user
          let userInfo = undefined != user.userInfo?Object.assign({},user.userInfo):{}
          //console.log(userInfo)
          this.state= {
             user,
             userInfo,
             isFormInvalid: undefined,
             errorMessage: "",
             isSapExistError:false,
             isUserExistError:false,
             validateMessage:"Please complete required fields."
          }

          this.verifySapId = this.verifySapId.bind(this)
          this.verifyUsername = this.verifyUsername.bind(this)
          this.onChangeFieldValue = this.onChangeFieldValue.bind(this)
          this.onUserInfoSubmit = this.onUserInfoSubmit.bind(this)
    }

    verifySapId(event){
        this.props.actions.isSapIdExistInSystem(event.target.value)
    }

    verifyUsername(event){
        this.setState({isUserExistError:false})
        if(event.target.value.length <6){
           this.setState({isUserExistError:true,userExistErrMsg:"Username should be minimum 6 characters."})
        }else{
           this.props.actions.isUsernameExistInSystem(event.target.value)
           this.setState({errorMessage:"This username is not available. Please select another user name."})
        }
    }

    onUserInfoSubmit(){
        let userInfo = this.state.userInfo
        if(this.validateUserForm()){
            this.setState({isFormInvalid:false})
            this.props.actions.saveUserInfo(userInfo);
            let userType = this.props.match.params.userType
            const isUserHasAssc = CommonUtil.isUserHasAssociations(userType)
            const isAssociatesAdding = CommonUtil.isAssociatesAdding(userType)
            let toLink = "/admin/adduser/verify"
            if(isAssociatesAdding){
                toLink = "/admin/adduser/verify"
            }else if(isUserHasAssc){
                this.props.actions.deleteCustomerListForAssociteMore();
                toLink = "/admin/adduser/associate"
            }
            this.props.history.push(toLink);
        }else{
            this.setState({isFormInvalid:true})
        }
    }

    validateUserForm(){

        let userInfo = this.state.userInfo
        this.setState({validateMessage:"Please complete required fields."})
        const showSapId = CommonUtil.showSapId(this.state.user.selection.subUserType)
        if(userInfo.firstName == undefined)return false;
        if(userInfo.lastName == undefined)return false;
        if(userInfo.userName == undefined)return false;
        if(showSapId && userInfo.sapId == undefined)return false;
        if(userInfo.email == undefined)return false;
        if(userInfo.reemail == undefined)return false;
        if(userInfo.email != userInfo.reemail){
            this.setState({validateMessage:"Email address must match in both fields."})
            return false;
        }
        if(this.state.isSapExistError || this.state.isUserExistError) return false;
        let userType = this.props.addUserObj.user.selection.subUserType
        if(CommonUtil.ableToAccessPriv(userType) && !CommonUtil.isUserCustomerAdmin(userType)){
            return (userInfo.ableToPayBills || userInfo.ableToStartStopService)
        }
        return true;
    }


    onChangeFieldValue(event, name){
        let userInfo = this.state.userInfo
        let val = event.target.value
        if(name == 'fname'){userInfo.firstName = ValidateUtil.onlyLetters(val)}
        if(name == 'lname'){userInfo.lastName = ValidateUtil.onlyLetters(val)}
        if(name == 'uname'){userInfo.userName = ValidateUtil.onlyAplhaNumeric(val)}
        if(name == 'sapid'){userInfo.sapId = ValidateUtil.onlyAplhaNumeric(val)}
        if(name == 'email'){userInfo.email = val}
        if(name == 'reemail'){userInfo.reemail = val}
        if(name == 'phone'){userInfo.phoneNumber = ValidateUtil.onlyNumbers(val)}
        if(name == 'extn'){userInfo.extxn = ValidateUtil.onlyNumbers(val)}
        if(name == 'altphone'){userInfo.altPhoneNumber = ValidateUtil.onlyNumbers(val)}
        if(name == 'altextn'){userInfo.extxnAlt = ValidateUtil.onlyNumbers(val)}
        if(name == 'fax'){userInfo.faxNumber = ValidateUtil.onlyNumbers(val)}
        if(name == 'abletopay'){userInfo.ableToPayBills = event.target.checked}
        if(name == 'abletoss'){userInfo.ableToStartStopService = event.target.checked}
        this.setState({userInfo})
    }

    componentWillReceiveProps(nextProps) {
        if(undefined != nextProps.isUser.sapId) {
            let errMsg = "This SAP ID is asscociated with another user. Please try with a different SAP ID."
            this.setState({isSapExistError:nextProps.isUser.sapId,sapUserExistErrMsg:errMsg})
        }
        if(undefined != nextProps.isUser.username) {
            let errMsg = "This username is not available. Please select another user name."
            this.setState({isUserExistError:!nextProps.isUser.username, userExistErrMsg:errMsg})
        }
    }

    render(){

        const { addUserObj } = this.props
        let user = addUserObj.user;

        if(!user.selection){
            return <div></div>
        }

        let userInfo = this.state.userInfo

        const showSapId = CommonUtil.showSapId(user.selection.subUserType)
        const heading = <h1>User Information</h1>
        const accessprivOptions = {onChangeFieldValue:this.onChangeFieldValue,userType:user.selection.subUserType,
              ableToPayBills:this.state.userInfo.ableToPayBills,ableToStartStopService:this.state.userInfo.ableToStartStopService}

        return(
            <div>
            <div className="pageHeader">
                {heading}
            </div>
            <div className="box">

              <div className="boxtitleseperator">&nbsp;</div>
              <div className="left fullwidth textr hint">*Required Fields</div>
              <ErrorBox message={this.state.validateMessage} isError={this.state.isFormInvalid}/>
              <HeadingInfo />
              <form>
                  <div className="left fullwidth formBG">
                      <div className="movetitledown left fullwidth mT20">
                        <FirstName firstName={userInfo.firstName} onChangeFieldValue={this.onChangeFieldValue}/>
                        <LastName lastName={userInfo.lastName} onChangeFieldValue={this.onChangeFieldValue}/>
                      </div>
                      <div className="left fullwidth mT20">
                        <ErrorBox message={this.state.userExistErrMsg} isError={this.state.isUserExistError}/>
                        <ErrorBox message={this.state.sapUserExistErrMsg} isError={this.state.isSapExistError}/>
                        <UserName userName={userInfo.userName} verifyUsername={this.verifyUsername} onChangeFieldValue={this.onChangeFieldValue}/>
                        {showSapId?<SapId sapId={userInfo.sapId} verifySapId={this.verifySapId} onChangeFieldValue={this.onChangeFieldValue}/>:""}
                      </div>
                      <div className="left fullwidth mT20">
                        <Email email={userInfo.email} reemail={userInfo.reemail} onChangeFieldValue={this.onChangeFieldValue}/>
                      </div>
                      <div className="left fullwidth smallinputinline mT20">
                          <Phone extxn={userInfo.extxn} phoneNumber={userInfo.phoneNumber} onChangeFieldValue={this.onChangeFieldValue}/>
                          <AltPhone extxnAlt={userInfo.extxnAlt} altPhoneNumber={userInfo.altPhoneNumber} onChangeFieldValue={this.onChangeFieldValue}/>
                      </div>
                      <div className="left fullwidth smallinputinline mT20">
                          <div className="pL20">
                              <Fax faxNumber={userInfo.faxNumber} onChangeFieldValue={this.onChangeFieldValue}/>
                          </div>
                      </div>
                      <AccessPriv accessprivOptions={accessprivOptions}/>
                  </div>

                  <div className="handle">
                    <Cancel />
                    <button className="right controlText-A" type="button" onClick={this.onUserInfoSubmit}>Continue<span></span></button>
                  </div>
                </form>
            </div>
          </div>
        );
      }
}


/*const submitAndRedirect = (dispatch,values, ownProps) => {
      let userType = ownProps.match.params.userType
      const isUserHasAssc = CommonUtil.isUserHasAssociations(userType)
      const toLink = isUserHasAssc?"/admin/adduser/associate":"/admin/adduser/verify"
      dispatch(addUserActions.saveUserInfo(values));
      ownProps.history.push(toLink);
}*/

const mapStateToProps = (state) => ({addUserObj: state.addUser, isUser: state.isUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

EnterUserInfoPage.propTypes = {
    addUserObj: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
    match: PropTypes.any.isRequired,
    isUser: PropTypes.object.isRequired,

}

export default connect(mapStateToProps, mapDispatchToProps)(EnterUserInfoPage);
