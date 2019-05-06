import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import CancelorSave from './CancelSave'
import CommonUtil from '../../common/Util'
import ValidateUtil from '../../common/ValidateUtil'
import PropTypes from 'prop-types';

class AltPhone extends React.Component {

    constructor(props){
        super(props)

        let userInfo = Object.assign({},this.props.userInfo);
        this.state = {
            userInfo,
            phoneNumToUpdate:userInfo.altPhoneNumber,
            phoneNumExtnToUpdate:userInfo.extxnAlt,
        }

        this.onUpdate = this.onUpdate.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this)
        this.onPhoneAltChange = this.onPhoneAltChange.bind(this)
    }

    onUpdate(){
        this.setState({enableEditing:true})
    }

    onPhoneNumberChange(e){
        this.setState({phoneNumToUpdate:ValidateUtil.onlyNumbers(e.target.value)})
    }

    onPhoneAltChange(e){
        this.setState({phoneNumExtnToUpdate:ValidateUtil.onlyNumbers(e.target.value)})
    }

    onSave(){
      let userInfo = this.state.userInfo
      userInfo.altPhoneNumber = this.state.phoneNumToUpdate
      userInfo.extxnAlt = this.state.phoneNumExtnToUpdate
      let verifyObj = {type:'altphone',value1:this.state.phoneNumToUpdate,value2:this.state.phoneNumExtnToUpdate}
      this.props.actions.saveUserInfoOnVerifyPage(verifyObj);
      this.setState({enableEditing:false,userInfo});
    }

    onCancel(){
      this.setState({enableEditing:false,phoneNumToUpdate:this.state.userInfo.altPhoneNumber,phoneNumExtnToUpdate:this.state.userInfo.extxnAlt});
    }


    render(){

        const forUpdate = {save:this.onSave,cancel:this.onCancel}
        let phone = CommonUtil.getPhoneDisplay(this.state.userInfo.altPhoneNumber,this.state.userInfo.extxnAlt)

        return(
          <div className="fullwidth left">
            <form className="lessmargin smallinputinline" name="updatePhonenum">
              <div className="label"><label htmlFor="phonenumber">Alt Phone:</label></div>
            <div className={`left secondcolumndata displayed ${this.state.enableEditing?'hide':''}`}>
                <div className="data secondcolumndata" id="phNum">
                  {phone}
              </div>
                <div className="right">
                  <a className="editClick editing" onClick={this.onUpdate}>Update</a>
                </div>
              </div>
              <div className={`widthSixtyFive left ${this.state.enableEditing?'':'editable'}`}>
                <div className="data ">
                  <p className="nomargin">
                    <span className="twotextboxes">
                      <input type="text" maxLength="10" value={this.state.phoneNumToUpdate} onChange={this.onPhoneNumberChange} className="validate[custom[phoneNumberDigits]]" name="phonenumber" />
                      <label htmlFor="extn" className="textlabel">extn</label>
                    <input type="text" maxLength="4" value={this.state.phoneNumExtnToUpdate} onChange={this.onPhoneAltChange} name="extn" className="subinput validate[funcCall[phoneExtnNumber]] confField[phonenumber]" />
                    </span>
                  </p>
                 </div>
                <CancelorSave onUpdate={forUpdate} />
              </div>
            </form>
          </div>
        );
      }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

AltPhone.propTypes = {
    userInfo: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(AltPhone)
