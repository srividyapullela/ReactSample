import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import CancelorSave from './CancelorSave'
import PropTypes from 'prop-types';
import CommonUtil from '../../common/Util'
import ValidateUtil from '../../common/ValidateUtil'

class AltPhone extends React.Component {


      constructor(props){
          super(props)

          let altPhoneNum = this.props.altPhoneNum;
          let altPhoneNumExtn = this.props.altPhoneNumExtn;
          this.state = {
              altPhoneNum,
              altPhoneNumExtn,
              phoneNumToUpdate:altPhoneNum,
              phoneNumExtnToUpdate:altPhoneNumExtn,
          }

          this.onUpdate = this.onUpdate.bind(this)
          this.onCancel = this.onCancel.bind(this)
          this.onSave = this.onSave.bind(this)
          this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this)
          this.onPhoneAltChange = this.onPhoneAltChange.bind(this)
      }

      onUpdate(){
          this.setState({enableEditing:true})
          this.props.showUpdateStatus(false,false,undefined)
      }

      onPhoneNumberChange(e){
          this.setState({phoneNumToUpdate:ValidateUtil.onlyNumbers(e.target.value)})
      }

      onPhoneAltChange(e){
          this.setState({phoneNumExtnToUpdate:ValidateUtil.onlyNumbers(e.target.value)})
      }

      onSave(){
        let user = Object.assign({},this.props.user);
        user.altPhoneNum = this.state.phoneNumToUpdate
        user.phoneExtnAlt = this.state.phoneNumExtnToUpdate
        this.props.actions.updateUserDtls({user,fieldName:'altphone'});
        this.setState({enableEditing:false});
      }

      onCancel(){
        this.setState({enableEditing:false,phoneNumToUpdate:this.state.altPhoneNum,phoneNumExtnToUpdate:this.state.altPhoneNumExtn});
        this.props.showUpdateStatus(false,false,undefined)
      }

      componentWillReceiveProps(nextProps){

          if(this.props.updateUser != nextProps.updateUser){
              let userUpdated = nextProps.updateUser.userUpdated
              let fieldName = nextProps.updateUser.fieldName
              if(userUpdated && fieldName == 'altphone'){
                    let altPhoneNum = nextProps.updateUser.user.altPhoneNum
                    let altPhoneNumExtn = nextProps.updateUser.user.phoneExtnAlt
                    this.setState({altPhoneNum,altPhoneNumExtn,phoneNumToUpdate:altPhoneNum,phoneNumExtnToUpdate:altPhoneNumExtn,updateSuccess:userUpdated})
                    this.props.showUpdateStatus(true,userUpdated,fieldName)
                }
          }

          if(this.props.altPhoneNum != nextProps.altPhoneNum || this.props.altPhoneNumExtn != nextProps.altPhoneNumExtn){
              this.setState({
                altPhoneNum:nextProps.altPhoneNum,
                altPhoneNumExtn:nextProps.altPhoneNumExtn,
                phoneNumToUpdate:nextProps.altPhoneNum,
                phoneNumExtnToUpdate:nextProps.altPhoneNumExtn,
              })
          }
      }


    render() {

        const forUpdate = {save:this.onSave,cancel:this.onCancel}
        //console.log("----------"+this.state.altPhoneNum)
        let altPhone = CommonUtil.getPhoneDisplay(this.state.altPhoneNum,this.state.altPhoneNumExtn)

        return(
          <div className="fullwidth left">
            <form className="lessmargin smallinputinline" name="updateAaltphone">
              <div className="label"><label htmlFor="altphonenumber">Alt Phone:</label></div>
            <div className={`left secondcolumndata displayed ${this.state.enableEditing?'hide':''}`}>
                <div className="data secondcolumndata" id="altPhNum" name="altPhNum">
                  {altPhone}
              </div>
                <div className="right">
                  <a className="editClick editing" onClick={this.onUpdate}>Update</a>
                </div>
              </div>
              <div className={`widthSixtyFive left ${this.state.enableEditing?'':'editable'}`}>
                <div className="data">
                  <p className="nomargin">
                    <span className="twotextboxes">
                      <input type="text" maxLength="10" value={this.state.phoneNumToUpdate} onChange={this.onPhoneNumberChange} name="altphonenumber" className="validate[custom[phoneNumberDigits]]" />
                      <label htmlFor="altPhoneExtn" className="textlabel">extn</label>
                    <input type="text" maxLength="4" value={this.state.phoneNumExtnToUpdate} onChange={this.onPhoneAltChange} id="altextn" name="altPhoneExtn"  className="subinput validate[funcCall[phoneExtnNumber]] confField[altphonenumber]" />
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

const mapStateToProps = (state) => ({updateUser:state.updateUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

AltPhone.propTypes = {
    altPhoneNum: PropTypes.string.isRequired,
    altPhoneNumExtn: PropTypes.string.isRequired,
    showUpdateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    updateUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AltPhone)
