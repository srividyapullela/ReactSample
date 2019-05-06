import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import CancelorSave from './CancelorSave'
import PropTypes from 'prop-types';
import ValidateUtil from '../../common/ValidateUtil'

class SapId extends React.Component {

    constructor(props){
        super(props)

        let sapId = this.props.sapId;
        this.state = {
            sapId,
            sapIdToUpdate:sapId
        }

        this.onUpdate = this.onUpdate.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onSapIdChange = this.onSapIdChange.bind(this)
    }

    onUpdate(){
        this.setState({enableEditing:true})
        this.props.showUpdateStatus(false,false,undefined)
    }

    onSapIdChange(e){
        let sapIdToUpdate = this.state.sapIdToUpdate
        sapIdToUpdate = ValidateUtil.onlyAplhaNumeric(e.target.value)
        this.setState({sapIdToUpdate})
    }

    onSave(){
      let user = Object.assign({},this.props.user);
      user.sapId = this.state.sapIdToUpdate
      this.props.actions.updateUserDtls({user,fieldName:'sapid'});
      this.setState({enableEditing:false});
    }

    onCancel(){
      this.setState({enableEditing:false,sapIdToUpdate:this.state.sapId});
      this.props.showUpdateStatus(false,false,undefined)
    }

    componentWillReceiveProps(nextProps){

        let userUpdated = nextProps.updateUser.userUpdated
        let fieldName = nextProps.updateUser.fieldName
        if(userUpdated && fieldName == 'sapid'){
              let sapId = nextProps.updateUser.user.sapId
              this.setState({sapId,sapIdToUpdate:sapId,updateSuccess:userUpdated})
              this.props.showUpdateStatus(true,userUpdated,fieldName)
          }
    }

    render(){

        const forUpdate = {save:this.onSave,cancel:this.onCancel}

        //console.log(this.state.sapIdToUpdtae)

        return(
          <div className="fullwidth left">
            <form className="lessmargin smallinputinline" method="post">
                <div className="label"><label htmlFor="sapID">Sap ID<span>:</span></label></div>
              <div className={`left secondcolumndata displayed ${this.state.enableEditing?'hide':''}`}>
                  <div className="data secondcolumndata" id="sapIdStr">{this.state.sapId}</div>
                  <div className="right">
                    <a className="editClick editing" onClick={this.onUpdate}>Update</a>
                  </div>
                </div>
                <div className={`secondcolumndata left ${this.state.enableEditing?'':'editable'}`}>
                  <div className="data ">
                    <input type="text" maxLength="10" value={this.state.sapIdToUpdate}	onChange={this.onSapIdChange} className="validate[required,funcCall]" id="sapID" name="sapID" />
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

SapId.propTypes = {
    sapId: PropTypes.string.isRequired,
    showUpdateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    updateUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SapId)
