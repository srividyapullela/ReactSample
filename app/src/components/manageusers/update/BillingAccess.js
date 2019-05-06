import React from 'react'
import CancelSave from './CancelSave'
import { bindActionCreators } from 'redux'
import CommonUtil from '../../common/Util'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import PropTypes from 'prop-types';

class BillingAce  extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            billingAce: this.props.billingAce,
            startStopAce: this.props.startStopAce
        }

        this.onBillingAccessChange = this.onBillingAccessChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onUpdateField = this.onUpdateField.bind(this)
    }

    onSave(){
      let user = Object.assign({},this.props.user);
      user.billingAce = this.state.billingAce
      user.startStopAce = this.state.startStopAce
      this.props.actions.updateUserDtls({user,fieldName:'accpriv'});
      this.setState({editing:false});
    }

    onBillingAccessChange(e){
        this.setState({billingAce:e.target.checked?'Y':'N'})
    }

    onCancel(){
       this.setState({editing:false});
    }

    onUpdateField() {
      this.props.showUpdateStatus(false,false,undefined)
      this.setState({editing:true});
    }

    componentWillReceiveProps(nextProps){
        let userUpdated = nextProps.updateUser.userUpdated
        let fieldName = nextProps.updateUser.fieldName
        if(userUpdated && fieldName == 'accpriv'){
            let billingAce = nextProps.updateUser.user.billingAce
            this.setState({billingAce,updateSuccess:userUpdated})
            this.props.showUpdateStatus(true,userUpdated,fieldName)
        }

        if(this.props.billingAce != nextProps.billingAce || this.props.startStopAce != nextProps.startStopAce){
            this.setState({
              billingAce: nextProps.billingAce,
              startStopAce: nextProps.startStopAce
            })
        }
    }

    render(){

        const { securityRole } = this.props
        const forUpdate = {cancel:this.onCancel, save:this.onSave}
        const isCustomerAdmin = CommonUtil.isUserCustomerAdmin(securityRole)
        const ableToPayBills = this.state.billingAce == 'Y'

        return(
          <div className="fullwidth left">
            <div className="status-message"></div>
            <div className="label"><label htmlFor="faxNumber">Can pay bills:</label></div>
          <div className={`left secondcolumndata displayed ${this.state.editing?'hide':''}`}>
                <div className="data secondcolumndata" id="paybillTxt">
                  {ableToPayBills || isCustomerAdmin?'Yes':'No'}
                </div>
                {!isCustomerAdmin?<div className="right">
                  <a className="editClick editing" onClick={this.onUpdateField}>Update</a>
                </div>:''}
            </div>
            <div className={`secondcolumndata left ${this.state.editing?'':'editable'}`}>
              <div className="data ">
                <input type="checkbox" onChange={this.onBillingAccessChange} id="payBill" checked={ableToPayBills} name="payBill" />
                <label htmlFor="payBill" className="displayinline">Able to Pay Bills</label>
              </div>
              <CancelSave onUpdate={forUpdate} />
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({updateUser:state.updateUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

BillingAce.propTypes = {
    billingAce: PropTypes.string.isRequired,
    startStopAce: PropTypes.string.isRequired,
    securityRole: PropTypes.string.isRequired,
    showUpdateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    updateUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingAce)
