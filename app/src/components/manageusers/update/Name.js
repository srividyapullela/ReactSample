import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import CancelorSave from './CancelorSave'
import PropTypes from 'prop-types';

class Name extends React.Component {

    constructor(props){
        super(props)
        let firstName = this.props.firstName;
        let lastName = this.props.lastName;
        this.state = {
            firstName,
            lastName,
            firstNameToUpdate:firstName,
            lastNameToUpdate:lastName,
        }

        this.onUpdate = this.onUpdate.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onFirstNameChange = this.onFirstNameChange.bind(this)
        this.onLastNameChange = this.onLastNameChange.bind(this)
    }

    onUpdate(e){
        this.setState({enableEditing:true, faxNumber:e.target.value})
        this.props.showUpdateStatus(false,false,undefined)
    }

    onFirstNameChange(e){
        this.setState({firstNameToUpdate:e.target.value})
    }

    onLastNameChange(e){
        this.setState({lastNameToUpdate:e.target.value})
    }

    onSave(){
      let user = Object.assign({},this.props.user);
      user.firstName = this.state.firstNameToUpdate
      user.lastName = this.state.lastNameToUpdate
      this.props.actions.updateUserDtls({user,fieldName:'name'});
      this.setState({enableEditing:false});
    }

    onCancel(){
      this.setState({enableEditing:false,firstNameToUpdate:this.state.firstName,lastNameToUpdate:this.state.lastName});
      this.props.showUpdateStatus(false,false,undefined)
    }

    componentWillReceiveProps(nextProps){

      if(this.props.updateUser != nextProps.updateUser){
          let userUpdated = nextProps.updateUser.userUpdated
          let fieldName = nextProps.updateUser.fieldName
          if(userUpdated && fieldName == 'name'){
                let firstName = nextProps.updateUser.user.firstName
                let lastName = nextProps.updateUser.user.lastName
                this.setState({firstName,lastName,firstNameToUpdate:firstName,lastNameToUpdate:lastName,updateSuccess:userUpdated})
                this.props.showUpdateStatus(true,userUpdated,fieldName)
          }
      }

      if(this.props.firstName != nextProps.firstName || this.props.lastName != nextProps.lastName){
          this.setState({
              firstName:nextProps.firstName,
              lastName:nextProps.lastName,
              firstNameToUpdate:nextProps.firstName,
              lastNameToUpdate:nextProps.lastName,
          })
      }
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
              <div className="data secondcolumndata" id="fullname">{this.state.firstName}  {this.state.lastName}</div>
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

const mapStateToProps = (state) => ({updateUser:state.updateUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

Name.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    showUpdateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    updateUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Name)
