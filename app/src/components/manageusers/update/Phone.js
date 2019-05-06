import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import CancelorSave from './CancelorSave'
import CommonUtil from '../../common/Util'
import ValidateUtil from '../../common/ValidateUtil'
import PropTypes from 'prop-types';

class Phone extends React.Component {

    constructor(props){
        super(props)

        let phoneNum = this.props.phoneNum;
        let phoneNumExtn = this.props.phoneNumExtn;
        this.state = {
            phoneNum,
            phoneNumExtn,
            phoneNumToUpdate:phoneNum,
            phoneNumExtnToUpdate:phoneNumExtn,
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
      user.phoneNum = this.state.phoneNumToUpdate
      user.phoneNumExtn = this.state.phoneNumExtnToUpdate
      this.props.actions.updateUserDtls({user,fieldName:'phone'});
      this.setState({enableEditing:false});
    }

    onCancel(){
      this.setState({enableEditing:false,phoneNumToUpdate:this.state.phoneNum,phoneNumExtnToUpdate:this.state.phoneNumExtn});
      this.props.showUpdateStatus(false,false,undefined)
    }

    componentWillReceiveProps(nextProps){

        if(this.props.updateUser != nextProps.updateUser){
            let userUpdated = nextProps.updateUser.userUpdated
            let fieldName = nextProps.updateUser.fieldName
            if(userUpdated && fieldName == 'phone'){
                  let phoneNum = nextProps.updateUser.user.phoneNum
                  let phoneNumExtn = nextProps.updateUser.user.phoneNumExtn
                  this.setState({phoneNum,phoneNumExtn,phoneNumToUpdate:phoneNum,phoneNumExtnToUpdate:phoneNumExtn,updateSuccess:userUpdated})
                  this.props.showUpdateStatus(true,userUpdated,fieldName)
            }
        }

        if(this.props.phoneNum != nextProps.phoneNum || this.props.phoneNumExtn != nextProps.phoneNumExtn){
            this.setState({
              phoneNum:nextProps.phoneNum,
              phoneNumExtn:nextProps.phoneNumExtn,
              phoneNumToUpdate:nextProps.phoneNum,
              phoneNumExtnToUpdate:nextProps.phoneNumExtn,
            })
        }
    }

    render(){

        const forUpdate = {save:this.onSave,cancel:this.onCancel}
        let phone = CommonUtil.getPhoneDisplay(this.state.phoneNum,this.state.phoneNumExtn)

        return(
          <div className="fullwidth left">
            <form className="lessmargin smallinputinline" name="updatePhonenum">
              <div className="label"><label htmlFor="phonenumber">Phone:</label></div>
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

const mapStateToProps = (state) => ({updateUser:state.updateUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

Phone.propTypes = {
    phoneNum: PropTypes.string.isRequired,
    phoneNumExtn: PropTypes.string.isRequired,
    showUpdateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    updateUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone)
