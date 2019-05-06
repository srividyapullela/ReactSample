import React from 'react'
import CancelSave from './CancelSave'
import CommonUtil from '../../common/Util'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import PropTypes from 'prop-types';

class StartStopAce  extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            billingAce: this.props.billingAce,
            startStopAce: this.props.startStopAce
        }

        this.onStartStopAccessChange = this.onStartStopAccessChange.bind(this)
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

    onStartStopAccessChange(e){
        this.setState({startStopAce:e.target.checked?'Y':'N'})
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
        const ableToStartStopService = this.state.startStopAce == 'Y'

        return(
          <div className="fullwidth left">
            <div className="status-message"></div>
            <div className="label"><label htmlFor="faxNumber">Can Start / Stop Service:</label></div>
            <div className={`left secondcolumndata displayed ${this.state.editing?'hide':''}`}>
                <div className="data secondcolumndata" id="stopServiceTxt">
                  {ableToStartStopService || isCustomerAdmin?'Yes':'No'}
                </div>
                {!isCustomerAdmin?<div className="right">
                  <a className="editClick editing" onClick={this.onUpdateField}>Update</a>
                  </div>:''}
            </div>
            <div className={`secondcolumndata left ${this.state.editing?'':'editable'}`}>
              <div className="data ">
                <input type="checkbox" onChange={this.onStartStopAccessChange} id="startServ" checked={ableToStartStopService} name="startServ" />
                <label htmlFor="startServ" className="displayinline">Able to Start / Stop Service</label>
              </div>
              <CancelSave onUpdate={forUpdate} />
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({updateUser:state.updateUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

StartStopAce.propTypes = {
    billingAce: PropTypes.string.isRequired,
    startStopAce: PropTypes.string.isRequired,
    securityRole: PropTypes.string.isRequired,
    showUpdateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    updateUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(StartStopAce)
