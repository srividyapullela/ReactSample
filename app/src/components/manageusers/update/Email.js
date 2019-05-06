import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import CancelorSave from './CancelorSave'
import ValidateUtil from '../../common/ValidateUtil'
import PropTypes from 'prop-types';


class Email extends React.Component {

  constructor(props){
      super(props)

      let email = this.props.email;
      this.state = {
          email,
          emailToUpdtae:email,
          isEmailAddressValid:true
      }

      this.onUpdate = this.onUpdate.bind(this)
      this.onCancel = this.onCancel.bind(this)
      this.onSave = this.onSave.bind(this)
      this.onEmailChange = this.onEmailChange.bind(this)
  }

  onUpdate(){
      this.setState({enableEditing:true})
      this.props.showUpdateStatus(false,false,undefined)
  }

  onEmailChange(e){
      this.setState({emailToUpdtae:e.target.value})
  }

  onSave(){
    let user = Object.assign({},this.props.user);
    user.email = this.state.emailToUpdtae
    if(ValidateUtil.validateEmail(this.state.emailToUpdtae)){
        this.setState({isEmailAddressValid:true})
        this.props.actions.updateUserDtls({user,fieldName:'email'});
        this.setState({enableEditing:false});
    }else{
        this.setState({isEmailAddressValid:false})
    }
  }

  onCancel(){
      this.setState({isEmailAddressValid:true})
      this.setState({enableEditing:false,emailToUpdtae:this.state.email});
      this.props.showUpdateStatus(false,false,undefined)
  }


  componentWillReceiveProps(nextProps){

      if(this.props.updateUser != nextProps.updateUser){
        let userUpdated = nextProps.updateUser.userUpdated
        let fieldName = nextProps.updateUser.fieldName
        if(userUpdated && fieldName == 'email'){
              let email = nextProps.updateUser.user.email
              this.setState({email,emailToUpdtae:email,updateSuccess:userUpdated})
              this.props.showUpdateStatus(true,userUpdated,fieldName)
        }
      }

      if(this.props.email != nextProps.email){
          this.setState({
              email:nextProps.email,
              emailToUpdtae:nextProps.email
          })
      }
  }

  render(){

    const forUpdate = {save:this.onSave,cancel:this.onCancel}

    return(
      <div className="fullwidth left">
        <form className="lessmargin smallinputinline" name="updateEmailID" id="updateEmailID">
          <div className="label"><label htmlFor="txtEmailAdd">Email:</label></div>
          <div className={`left secondcolumndata displayed ${this.state.enableEditing?'hide':''}`}>
            <div className="data secondcolumndata" id="email">{this.state.email}</div>
            <div className="right">
              <a className="editClick editing" onClick={this.onUpdate}>Update</a>
            </div>
          </div>
          <div className={`secondcolumndata left ${this.state.enableEditing?'':'editable'}`}>
            <div className="data">
              <input type="text" maxLength="80" onChange={this.onEmailChange} value={this.state.emailToUpdtae} className="validate[required,custom[email]]" name="txtEmailAdd" />
              {!this.state.isEmailAddressValid?<p className="redtext">Enter valid email address</p>:""}
            </div>
            <CancelorSave onUpdate={forUpdate} />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({updateUser:state.updateUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

Email.propTypes = {
    email: PropTypes.string.isRequired,
    showUpdateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    updateUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Email)
