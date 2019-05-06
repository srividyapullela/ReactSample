import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import CancelorSave from './CancelorSave'
import PropTypes from 'prop-types';
import CommonUtil from '../../common/Util'
import ValidateUtil from '../../common/ValidateUtil'

class Fax extends React.Component {

  constructor(props){
      super(props)

      let faxNumber = this.props.faxNum;
      this.state = {
          faxNumber,
          faxNumberToUpdate:faxNumber
      }

      this.onUpdate = this.onUpdate.bind(this)
      this.onCancel = this.onCancel.bind(this)
      this.onSave = this.onSave.bind(this)
      this.onFaxNumChange = this.onFaxNumChange.bind(this)
  }

  onUpdate(){
      this.setState({enableEditing:true})
      this.props.showUpdateStatus(false,false,undefined)
  }

  onFaxNumChange(e){
      this.setState({faxNumberToUpdate:ValidateUtil.onlyNumbers(e.target.value)})
  }

  onSave(){
    let user = Object.assign({},this.props.user);
    user.faxNum = this.state.faxNumberToUpdate
    this.props.actions.updateUserDtls({user,fieldName:'fax'});
    this.setState({enableEditing:false});
  }

  onCancel(){
    this.setState({enableEditing:false,faxNumberToUpdate:this.state.faxNumber});
    this.props.showUpdateStatus(false,false,undefined)
  }

  componentWillReceiveProps(nextProps){

      if(this.props.updateUser != nextProps.updateUser){
        let userUpdated = nextProps.updateUser.userUpdated
        let fieldName = nextProps.updateUser.fieldName
        if(userUpdated && fieldName == 'fax'){
              let faxNumber = nextProps.updateUser.user.faxNum
              this.setState({faxNumber,faxNumberToUpdate:faxNumber,updateSuccess:userUpdated})
              this.props.showUpdateStatus(true,userUpdated,fieldName)
          }
      }

      if(this.props.faxNum != nextProps.faxNum){
          this.setState({
            faxNumber:nextProps.faxNum,
            faxNumberToUpdate:nextProps.faxNum
          })
      }
  }

  render(){

      const forUpdate = {save:this.onSave,cancel:this.onCancel}
      const faxNum = CommonUtil.getPhoneDisplay(this.state.faxNumber,undefined)
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

const mapStateToProps = (state) => ({updateUser:state.updateUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

Fax.propTypes = {
    faxNum: PropTypes.string.isRequired,
    showUpdateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    updateUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Fax)
