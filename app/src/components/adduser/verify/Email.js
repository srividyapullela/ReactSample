import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import CancelorSave from './CancelSave'
import PropTypes from 'prop-types';

class Email extends React.Component {

  constructor(props){
      super(props)

      let userInfo = Object.assign({},this.props.userInfo);
      this.state = {
          userInfo,
          emailToUpdtae:userInfo.email
      }

      this.onUpdate = this.onUpdate.bind(this)
      this.onCancel = this.onCancel.bind(this)
      this.onSave = this.onSave.bind(this)
      this.onEmailChange = this.onEmailChange.bind(this)
  }

  onUpdate(){
      this.setState({enableEditing:true})
  }

  onEmailChange(e){
      this.setState({emailToUpdtae:e.target.value})
  }

  onSave(){
      let userInfo = this.state.userInfo
      userInfo.email = this.state.emailToUpdtae
      let verifyObj = {type:'email',value:this.state.emailToUpdtae}
      this.props.actions.saveUserInfoOnVerifyPage(verifyObj);
      this.setState({enableEditing:false,userInfo});
  }

  onCancel(){
    this.setState({enableEditing:false,emailToUpdtae:this.state.email})
  }


  render(){

    const forUpdate = {save:this.onSave,cancel:this.onCancel}

    return(
      <div className="fullwidth left">
        <form className="lessmargin smallinputinline" name="updateEmailID" id="updateEmailID">
          <div className="label"><label htmlFor="txtEmailAdd">Email:</label></div>
          <div className={`left secondcolumndata displayed ${this.state.enableEditing?'hide':''}`}>
            <div className="data secondcolumndata" id="email">{this.state.userInfo.email}</div>
            <div className="right">
              <a className="editClick editing" onClick={this.onUpdate}>Update</a>
            </div>
          </div>
          <div className={`secondcolumndata left ${this.state.enableEditing?'':'editable'}`}>
            <div className="data">
              <input type="text" maxLength="80" onChange={this.onEmailChange} value={this.state.emailToUpdtae} className="validate[required,custom[email]]" name="txtEmailAdd" />
            </div>
            <CancelorSave onUpdate={forUpdate} />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

Email.propTypes = {
    userInfo: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Email)
