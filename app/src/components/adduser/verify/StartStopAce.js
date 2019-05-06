import React from 'react'
import CancelSave from './CancelSave'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import ReactHover from 'react-hover';
import PropTypes from 'prop-types';

class StartStopAce  extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            ableToStartStopService: this.props.ableToStartStopService
        }

        this.onStartStopAccessChange = this.onStartStopAccessChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onUpdateField = this.onUpdateField.bind(this)
    }

    onSave(){
       let inData = {ableToStartStopService:this.state.ableToStartStopService}
       this.props.actions.saveStartStopAccessForCustAssociate(inData)
       this.setState({editing:false});
    }

    onStartStopAccessChange(e){
        this.setState({ableToStartStopService:e.target.checked})
    }

    onCancel(){
       this.setState({editing:false});
    }

    onUpdateField() {
      this.setState({editing:true});
    }

    render(){

        const { isCustomerAdmin } = this.props
        const forUpdate = {cancel:this.onCancel, save:this.onSave}
        const optionsCursorTrueWithMargin  = {
         followCursor:false,
         shiftX: 20,
         shiftY: 0
       }
        let result
        if(isCustomerAdmin){
            result =  <div className="data secondcolumndata" id="stopServiceTxt">
                         <ReactHover
                            options={ optionsCursorTrueWithMargin }>
                            <ReactHover.Trigger type='trigger'>
                            {this.state.ableToStartStopService || isCustomerAdmin?'Yes':'No'}<img className="tip1" src={require('../../../images/public/icon_img_asterisk.png')}/>
                            </ReactHover.Trigger>
                            <ReactHover.Hover type='hover'>
                              <div className="popupBox tipbox tip1 ">
                                <div className="t-heading">
                                  <div className="t-caret"></div>
                                  <h5>Access Privileges</h5>
                                  <img className="close-it " src={require('../../../images/public/btn_close_popup.png')} alt="Close tip"/>
                                </div>
                                <div className="t-content">
                                     <p>Customer Admin inherently has the ability to pay bills and perform start/stop transactions</p>
                                </div>
                              </div>
                            </ReactHover.Hover>
                       </ReactHover>
                     </div>
        }else{
            result = <div className="data secondcolumndata" id="stopServiceTxt">
              {this.state.ableToStartStopService || isCustomerAdmin?'Yes':'No'}
            </div>
        }
        return(
          <div className="fullwidth left">
            <div className="status-message"></div>
            <div className="label"><label htmlFor="faxNumber">Can Start / Stop Service:</label></div>
            <div className={`left secondcolumndata displayed ${this.state.editing?'hide':''}`}>
                {result}
                {!isCustomerAdmin?<div className="right">
                  <a className="editClick editing" onClick={this.onUpdateField}>Update</a>
                  </div>:''}
            </div>
            <div className={`secondcolumndata left ${this.state.editing?'':'editable'}`}>
              <div className="data ">
                <input type="checkbox" onChange={this.onStartStopAccessChange} id="startServ" checked={this.state.ableToStartStopService} name="startServ" />
                <label htmlFor="startServ" className="displayinline">Able to Start / Stop Service</label>
              </div>
              <CancelSave onUpdate={forUpdate} />
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({addUserObj: state.addUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

StartStopAce.propTypes = {
    actions: PropTypes.func.isRequired,
    ableToStartStopService: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.bool.isRequired
    ]),
    isCustomerAdmin: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StartStopAce);
