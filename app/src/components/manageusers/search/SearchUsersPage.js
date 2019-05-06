import React from 'react';
import SearchUsersBy from './SearchUsersBy'
import CustomerBPSearch from './CustomerBPSearch'
import BrokerBPSearch from './BrokerBPSearch'
import LastNameSearch from './LastNameSearch'
import Result from './Result'
import * as conts from '../../common/constants'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ErrorBox } from '../../common/Error'
import * as manageUserActions from '../../../actions/manageUserActions';
import { Link } from 'react-router-dom';
import Processing from '../../common/Processing'
import * as stateInfo from '../../../store/stateInfo'
import CommonUtil from '../../common/Util';
import PropTypes from 'prop-types';

class SearchUsersPage extends React.Component {

    constructor(props){
        super(props);

        this.state = this.getInitialState()

        this.onSelectionChange = this.onSelectionChange.bind(this)
        this.search = this.search.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.onLastNameChange = this.onLastNameChange.bind(this)
        this.onSecurityRoleChange = this.onSecurityRoleChange.bind(this)
        this.onBPNumberChange = this.onBPNumberChange.bind(this)
        this.validateSelection = this.validateSelection.bind(this)
        this.onUserSelectFromUserList = this.onUserSelectFromUserList.bind(this)
        this.onResetPasswordClick = this.onResetPasswordClick.bind(this)
        this.onUpdateUserClick = this.onUpdateUserClick.bind(this)
        this.getInitialState = this.getInitialState.bind(this)
    }

    getInitialState(){

        const loggedInSecurityRole = stateInfo.getLoggedInSecurityRole();
        const hideInternal = CommonUtil.isAgentAMMorEMA(loggedInSecurityRole) || CommonUtil.isAgentOPSREP(loggedInSecurityRole)
        let userCategory = hideInternal?"BRK_ADM:E":"NA:ALL"

        return {
            selection:{searchType: "LN",searchString:"",userCategory},
            selectedUserForUpdate:{},
            resetPswdMessage:'',
						isAjaxCalled: false,
            isOpen: false,
            isError:false,
            isSelectUserErr:false,
            errorMessage:'Please complete the form',
            userSelectErrMsg:'Please select one user.',
            isProcessing:false,
            showUserResult:false,
            hideInternal
        }
    }

    onSelectionChange(event) {
        let selection = this.state.selection
        selection.searchType = event.target.value
        this.setState({selection:selection,showUserResult:false})
    }

    onLastNameChange(event){
        var selection = this.state.selection
        selection.searchString = event.target.value
        this.setState({selection:selection})
    }

    onSecurityRoleChange(event) {
        var selection = this.state.selection
        selection.userCategory = event.target.value
        this.setState({selection:selection})
    }

    onBPNumberChange(event){
        var selection = this.state.selection
        selection.searchString = event.target.value
        this.setState({selection:selection})
    }

    onUserSelectFromUserList(user) {
        let selectedUser = user;
        this.setState({selectedUserForUpdate:selectedUser})
    }

    search(e){
        this.setState({isSelectUserErr:false});
        if(e.charCode == 13 || e.charCode == undefined){
            if(this.validateSelection()){
                this.setState({isError:false,isProcessing:true});
                //console.log(this.state.selection)
                this.props.actions.getUsers(this.state.selection);
                this.setState({isAjaxCalled:true});
            }else{
                this.setState({isError:true});
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props.actions.saveDetailsForChangingAdmin(undefined)

        if(this.props.userList != nextProps.userList){
            this.setState({isProcessing:false,showUserResult:true,isError:false})
        }else{
            if(!nextProps.resetPassword){
              this.setState(this.getInitialState())
            }
        }
    }

    validateSelection() {
        let selection = this.state.selection
        if(selection.searchType == 'LN'){
            if(selection.searchString == "" || selection.searchString == undefined){
                return false;
            }
        }
        if(selection.searchType == 'CBP' || selection.searchType == 'BBP'){
            if(selection.searchString == "" || selection.searchString == undefined){
                return false;
            }
        }
        return true;
    }

    onResetPasswordClick(){
        let userName = this.state.selectedUserForUpdate.userName
        let email = this.state.selectedUserForUpdate.email
        if(userName == undefined || userName == ''){
            this.setState({isSelectUserErr:true});
        }else{
            this.setState({isSelectUserErr:false});
            let inData = {userName, email}
            this.props.actions.sendResetPassword(inData);
            this.toggleModal()
        }
    }

    onUpdateUserClick(){
        let userName = this.state.selectedUserForUpdate.userName
        if(userName == undefined || userName == ''){
            this.setState({isSelectUserErr:true});
        }else{
            this.setState({isSelectUserErr:false});
            //this.props.actions.getUserDetails({userName});
            this.props.history.push('/admin/manageusers/updateuser/'+userName);
        }

    }


    toggleModal(){
        this.props.actions.emptyResetPassword()
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){

        const lastNameOptions = {lastName:this.state.selection.searchString,onLastNameChange:this.onLastNameChange,userCategory:this.state.selection.userCategory,
                                onSearch:this.search, options:conts.userTypeOptions,onSecRoleChange:this.onSecurityRoleChange,hideInternal:this.state.hideInternal}

        const bpOptions = {onSearch:this.search, onBPNumberChange:this.onBPNumberChange, bpNumber:this.state.selection.bpNumber}

        const resultOptions = {searchResult:this.props.userList,toggleModal:this.toggleModal,isOpen:this.state.isOpen,
                                resetPswdMessage:this.props.resetPassword, onUserSelectFromUserList:this.onUserSelectFromUserList,
                                  onResetPasswordClick:this.onResetPasswordClick, selectedUser:this.state.selectedUserForUpdate, onUpdateUserClick:this.onUpdateUserClick}


        return(
            <div>
             <div className="pageHeader">
                       <h1>Search Users</h1>
                </div>
            <div className="box">
              <div className="left fullwidth">

                <Link to="/admin/adduser/selectusertype">
              	   <a className="ctrls colorblue right movetitledown">Add New User<span></span></a>
                 </Link>
              </div>
              	<div className="boxtitleseperator left fullwidth">&nbsp;</div>
                <ErrorBox message={this.state.errorMessage} isError={this.state.isError}/>
              	<div id="headingError" className="status-message">&nbsp;</div>

              	<div id="mnguserssearch" className="left fullwidth" >
              		 <SearchUsersBy options={conts.manageUsersOptions} searchType={this.state.selection.searchType} onSelectionChange={this.onSelectionChange}/>
              	   {this.state.selection.searchType == 'CBP'?<CustomerBPSearch bpOptions={bpOptions}/>:""}
                   {this.state.selection.searchType == 'BBP'?<BrokerBPSearch bpOptions={bpOptions}/>:""}
              	</div>
                {this.state.selection.searchType == 'LN'?<LastNameSearch lastNameOptions={lastNameOptions}/>:""}

                {this.state.isAjaxCalled?
  								<div id="searchResult" className="movedown15 left fullwidth">
                    <ErrorBox message={this.state.userSelectErrMsg} isError={this.state.isSelectUserErr}/>
                    {this.state.isProcessing?<Processing />:''}
                    {this.state.showUserResult?<Result resultOptions={resultOptions}/>:''}
                </div>:""}
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({userList: state.manageUser, resetPassword:state.resetPassword})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

SearchUsersPage.propTypes = {
    actions: PropTypes.func.isRequired,
    userList: PropTypes.arrayOf(PropTypes.object).isRequired,
    resetPassword: PropTypes.object.isRequired,
    history: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsersPage)
