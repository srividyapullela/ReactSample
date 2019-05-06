import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import CancelorSave from './CancelSave'
import CommonUtil from '../../common/Util'
import ValidateUtil from '../../common/ValidateUtil'
import PropTypes from 'prop-types';

class Fax extends React.Component {

  constructor(props){
      super(props)

      let userInfo = Object.assign({},this.props.userInfo);
      this.state = {
          userInfo,
          faxNumberToUpdate:userInfo.faxNumber
      }

      this.onUpdate = this.onUpdate.bind(this)
      this.onCancel = this.onCancel.bind(this)
      this.onSave = this.onSave.bind(this)
      this.onFaxNumChange = this.onFaxNumChange.bind(this)
  }

  onUpdate(){
      this.setState({enableEditing:true})
  }

  onFaxNumChange(e){
      this.setState({faxNumberToUpdate:ValidateUtil.onlyNumbers(e.target.value)})
  }

  onSave(){
    let userInfo = this.state.userInfo
    userInfo.faxNumber = this.state.faxNumberToUpdate
    let verifyObj = {type:'fax',value:this.state.faxNumberToUpdate}
    this.props.actions.saveUserInfoOnVerifyPage(verifyObj);
    this.setState({enableEditing:false,userInfo});
  }

  onCancel(){
     this.setState({enableEditing:false,faxNumberToUpdate:this.state.faxNumber});
  }


  render(){

      const forUpdate = {save:this.onSave,cancel:this.onCancel}
      const faxNum = CommonUtil.getPhoneDisplay(this.state.userInfo.faxNumber,undefined)
      const faxVal = this.state.faxNumberToUpdate

      return(
        <div className="fullwidth left">
          <form className="lessmargin smallinputinline" method="post">
            <div className="label"><label htmlFor="faxnumber">Fax:</label></div>
          <div className={`left secondcolumndata displayed ${this.state.enableEditing?'hide':''}`}>
              <div className="data secondcolumndata" id="faxNum">
                  {faxNum}
              </div>
              <div className="right">
                <a className="editClick editing" onClick={this.onUpdate}>Update</a>
              </div>
            </div>
            <div className={`secondcolumndata left ${this.state.enableEditing?'':'editable'}`}>
              <div className="data ">
                <input type="text" maxLength="10" onChange={this.onFaxNumChange} value={faxVal} name="faxnumber" className="validate[custom[phoneNumberDigits]]" />
              </div>
              <CancelorSave onUpdate={forUpdate} />
            </div>
          </form>
        </div>
      )
  }

}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

Fax.propTypes = {
    userInfo: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Fax)
