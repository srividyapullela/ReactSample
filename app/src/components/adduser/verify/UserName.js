import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import CancelorSave from './CancelSave'
import { ErrorBox } from '../../common/Error'
import ValidateUtil from '../../common/ValidateUtil'
import PropTypes from 'prop-types';

class UserName extends React.Component {

    constructor(props){
        super(props)

        let userInfo = Object.assign({},this.props.userInfo);
        this.state = {
            userInfo,
            userNameToUpdtae:userInfo.userName
        }

        this.onUpdate = this.onUpdate.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onUserNameChange = this.onUserNameChange.bind(this)
        this.verifyUsername = this.verifyUsername.bind(this)
    }

    onUpdate(){
        this.setState({enableEditing:true})
    }

    onUserNameChange(e){
        this.setState({userNameToUpdtae:ValidateUtil.onlyAplhaNumeric(e.target.value)})
    }

    verifyUsername(event){
        this.props.actions.isUsernameExistInSystem(event.target.value)
        this.setState({errorMessage:"This username is not available. Please select another user name."})
    }

    onSave(){
      let userInfo = this.state.userInfo
      userInfo.userName = this.state.userNameToUpdtae
      let verifyObj = {type:'username',value:this.state.userNameToUpdtae}
      this.props.actions.saveUserInfoOnVerifyPage(verifyObj);
      this.setState({enableEditing:false,userInfo});
    }

    onCancel(){
      this.setState({enableEditing:false,emailToUpdtae:this.state.email})
    }

    componentWillReceiveProps(nextProps) {
        //console.log("-------")
        //console.log(nextProps.isUser)
        if(undefined != nextProps.isUser.username) {
            let errMsg = "This username is not available. Please select another user name."
            this.setState({isUserExistError:!nextProps.isUser.username, userExistErrMsg:errMsg})
        }
    }

    render(){

      const forUpdate = {save:this.onSave,cancel:this.onCancel}

      return(
        <div className="fullwidth left">
          <form className="lessmargin smallinputinline" name="updateEmailID" id="updateEmailID">
            <div className="label"><label htmlFor="txtEmailAdd">User Name:</label></div>
            <div className={`left secondcolumndata displayed ${this.state.enableEditing?'hide':''}`}>
              <div className="data secondcolumndata" id="email">{this.state.userInfo.userName}</div>
              <div className="right">
                <a className="editClick editing" onClick={this.onUpdate}>Update</a>
              </div>
            </div>
            <div className={`secondcolumndata left ${this.state.enableEditing?'':'editable'}`}>
              <ErrorBox message={this.state.userExistErrMsg} isError={this.state.isUserExistError}/>
              <div className="data">
                <input type="text" maxLength="80" onBlur={this.verifyUsername} onChange={this.onUserNameChange} value={this.state.userNameToUpdtae} className="validate[required,custom[email]]" name="txtEmailAdd" />
              </div>
              <CancelorSave onUpdate={forUpdate} />
            </div>
          </form>
        </div>
      );
    }
  }


const mapStateToProps = (state) => ({isUser: state.isUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

UserName.propTypes = {
    userInfo: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    isUser: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UserName)
