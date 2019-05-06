import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import CancelorSave from './CancelSave'
import ValidateUtil from '../../common/ValidateUtil'
import PropTypes from 'prop-types';

class Name extends React.Component {

    constructor(props){
        super(props)

        let userInfo = Object.assign({},this.props.userInfo);
        this.state = {
            userInfo,
            firstNameToUpdate:userInfo.firstName,
            lastNameToUpdate:userInfo.lastName,
        }

        this.onUpdate = this.onUpdate.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onFirstNameChange = this.onFirstNameChange.bind(this)
        this.onLastNameChange = this.onLastNameChange.bind(this)
    }

    onUpdate(){
        this.setState({enableEditing:true})
    }

    onFirstNameChange(e){
        this.setState({firstNameToUpdate:ValidateUtil.onlyLetters(e.target.value)})
    }

    onLastNameChange(e){
        this.setState({lastNameToUpdate:ValidateUtil.onlyLetters(e.target.value)})
    }

    onSave(){
      let userInfo = this.state.userInfo;
      userInfo.firstName = this.state.firstNameToUpdate
      userInfo.lastName = this.state.lastNameToUpdate
      let verifyObj = {type:'name',value1:this.state.firstNameToUpdate,value2:this.state.lastNameToUpdate}
      this.props.actions.saveUserInfoOnVerifyPage(verifyObj);
      this.setState({enableEditing:false,userInfo});
    }

    onCancel(){
      this.setState({enableEditing:false,firstNameToUpdate:this.state.userInfo.firstName,lastNameToUpdate:this.state.userInfo.lastName});
    }

    render(){

        const forUpdate = {save:this.onSave,cancel:this.onCancel}

        return(
          <div className="left fullwidth contenttitleseperator">
            <form name="updateUsrName" id="updateUsrName">
            <div className="label">
              <label htmlFor="firstnameDisplay">Name:</label>
            </div>
            <div className={`left secondcolumndata displayed ${this.state.enableEditing?'hide':''}`} >
              <div className="data secondcolumndata" id="fullname">{this.state.userInfo.firstName}  {this.state.userInfo.lastName}</div>
              <div className="right">
                <a className="editClick editing" onClick={this.onUpdate}>Update</a>
              </div>
            </div>
            <div className={`secondcolumndata left ${this.state.enableEditing?'':'editable'}`}>
              <div className="data">
                <div className="left fullwidth">
                  <div className="left fullwidth">
                    <label className="textlabel" htmlFor="firstname">First Name</label><span>*</span>
                  </div>
                  <div className="left fullwidth">
                    <input type="text" maxLength="50" value={this.state.firstNameToUpdate} onChange={this.onFirstNameChange} className="validate[required] filterAlpha" name="firstname" />
                  </div>
                </div>
                <div className="left">
                  <div className="left fullwidth">
                    <label className="textlabel" htmlFor="lastname">Last Name</label><span>*</span>
                  </div>
                  <div className="left fullwidth">
                    <input type="text" maxLength="50" value={this.state.lastNameToUpdate} onChange={this.onLastNameChange} className="validate[required] filterAlpha" name="lastname" />
                  </div>
                </div>
              </div>
              <CancelorSave onUpdate={forUpdate} />
            </div>
          </form>
        </div>
        );
      }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

Name.propTypes = {
    userInfo: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Name)
