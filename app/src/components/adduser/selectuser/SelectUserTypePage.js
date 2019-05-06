import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import CustomButton from '../../common/Button';
import { CustomRadio }  from '../../common/Radio';
import * as consts from '../../common/constants'
import UserTypes from './UserTypes'
import { ErrorBox } from '../../common/Error'
import CommonUtil from '../../common/Util'
import UserTypeModal from './UserTypeModal'
import Modal from '../../common/Modal'
import * as stateInfo from '../../../store/stateInfo'
import PropTypes from 'prop-types';


class SelectUserTypePage extends React.Component {

    constructor(props) {

        super(props);
        this.state = this.getInitialState()

        this.onUserRadioChange = this.onUserRadioChange.bind(this)
        this.onUserTypeChange = this.onUserTypeChange.bind(this)
        this.onSubUserTypeChange = this.onSubUserTypeChange.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getInitialState = this.getInitialState.bind(this)
    }

    getInitialState(){
        return {
              selection:{userType: "", subUserType:"", enableSubType:false},
              isOpen: false,
              isError:false,
              formValidated:false
        }
    }

    onUserRadioChange(event){
        let selection = this.state.selection
        selection.userType = event.target.value;
        selection.enableSubType = false;
        this.setState({selection:selection});
    }

    onUserTypeChange(event){
        let selection = this.state.selection
        selection.subUserType = event.target.value;
        (event.target.value == 'CA' || event.target.value == 'A')
          ?selection.enableSubType=true:selection.enableSubType = false;
        this.setState({selection:selection});
    }

    onSubUserTypeChange(event){
        let selection = this.state.selection
        selection.subUserType = event.target.value;
        this.setState({selection:selection});
    }

    handleSubmit(){
        let selection = this.state.selection;
        if(selection.userType != "" && selection.subUserType != "" &&
              selection.subUserType != "A" && selection.subUserType != "CA"){
            this.setState({isError:false, formValidated:true});
            this.props.actions.saveSelection(this.state.selection);
        }else{
            this.setState({isError:true,formValidated:false});
        }
    }

    componentWillReceiveProps(){
        this.setState(this.getInitialState())
    }

    toggleModal(type){
      if(type != 'Customer Admin' && type != 'Agent'){
         this.setState({isOpen: !this.state.isOpen,modalClickedUserType:type});
      }
    }

    render(){
      const forModal = {isOpen:this.state.isOpen, toggleModal:this.toggleModal}
      const heading = <h1>Add User - Select  UserType</h1>
      const { from } = this.props.location.state || '/'
      const errorMessage = "Please select user type."

      let link;
      const userType = this.state.selection.subUserType
      if(userType == 'EXT_BRK_ASC'){
          link = '/admin/adduser/associate/tobroker'
      }else if(userType == 'EXT_CUS_ASC'){
          link = '/admin/adduser/associate/tocustomer'
      }else{
          link = '/admin/adduser/enteruserinfo/'+userType
      }

      let loggedInSecurityRole = stateInfo.getLoggedInSecurityRole();
      const showInternal = CommonUtil.showInternal(loggedInSecurityRole)
      const dontShowExtReadOnly = CommonUtil.dontShowExtReadOnly(loggedInSecurityRole)

      const ButtonAttributes = {handleSubmit:this.handleSubmit,name:'Continue',
      link:link,formValidated:this.state.formValidated,from:from}

      return(
            <div>
            <div className="pageHeader">
                  {heading}
            </div>
           <div className="box">
             <div className="boxtitleseperator">&nbsp;</div>
              <ErrorBox message={errorMessage} isError={this.state.isError}/>
                <form name="selectUserFrm" id="selectUserFrm" method="post">
                    <div id="rootContainer">
                        {showInternal?
                        <CustomRadio checked={this.state.selection.userType == 'internal'} inputClassName="validate[reqRadio[1]]" labelClassName="textlabel displayinline"
                                     onUserRadioChange={this.onUserRadioChange} value="internal" text="Internal User" />:''}
                                   {this.state.selection.userType == 'internal'?<UserTypes forModal={forModal} dontShowExtReadOnly={dontShowExtReadOnly} typeUsers={consts.internalTypeUsers} enableSubType={this.state.selection.enableSubType}
                              onUserTypeChange={this.onUserTypeChange} onSubUserTypeChange={this.onSubUserTypeChange}/>:""}

                        <CustomRadio checked={this.state.selection.userType == 'external'} inputClassName="validate[reqRadio[1]]" labelClassName="textlabel displayinline"
                                     onUserRadioChange={this.onUserRadioChange} value="external" text="External User" />
                        {this.state.selection.userType == 'external'?<UserTypes forModal={forModal} dontShowExtReadOnly={dontShowExtReadOnly} typeUsers={consts.externalTypeUsers} enableSubType={this.state.selection.enableSubType}
                              onUserTypeChange={this.onUserTypeChange} onSubUserTypeChange={this.onSubUserTypeChange}/>:""}
                    </div>
                    <CustomButton buttonAttributes={ButtonAttributes}/>
                     <Modal show={forModal.isOpen} onClose={forModal.toggleModal}>
                        <UserTypeModal heading={this.state.modalClickedUserType} onClose={forModal.toggleModal}/>
                    </Modal>
                </form>
            </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

SelectUserTypePage.propTypes = {
    actions: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(SelectUserTypePage)
