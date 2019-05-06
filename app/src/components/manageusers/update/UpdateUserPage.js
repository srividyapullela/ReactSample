import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../actions/manageUserActions';
import Heading from './Heading'
import PortalType from './PortalType'
import SecurityRole from './SecurityRole'
import AsscAdmin from './AsscAdmin'
import UserType from './UserType'
import Name from './Name'
import UserName from './UserName'
import Email from './Email'
import Phone from './Phone'
import AltPhone from './AltPhone'
import Fax from './Fax'
import SapId from './SapId'
import BillingAccess from './BillingAccess'
import StartStopAce from './StartStopAce'
import Password from './Password'
import Modal from '../../common/Modal'
import ResetPasswordModal from '../common/ResetPasswordModal'
import RemoveUserModal from './RemoveUserModal'
import ChangeAsscAdminModal from './ChangeAsscAdminModal'
import ViewAssociatesModal from './ViewAssociatesModal'
import DisassociateErrorModal from './DisassociateErrorModal'
import CommonUtil from '../../common/Util'
import Cancel from '../../common/Cancel'
import UpdateSuccessBox from './UpdateSuccessBox'
import Associations from './associations/Associations'
import * as _ from 'lodash'
import PropTypes from 'prop-types';

class UpdateUserPage extends React.Component {

    constructor(props){
        super(props)
        let userName = this.props.match.params.userName
        this.props.actions.getUserDetails({userName});

        /* code check for whether changing admin or not */
        let changingAssociateAdmin = this.props.changeAssociateAdmin
        let isAdminChangingForAssociate = (undefined != changingAssociateAdmin && undefined != changingAssociateAdmin.details)
        /* code check for whether changing admin or not */
        this.state = {
            changingAdminFromUpdatePage:"N",
            showChnageAdminLink:true,
            showUserType:true,
            showSapId:true,
            showPayBills:true,
            updatingOwnProfile:true,
            showNoLinks:true,
            securityRole:'CA',
            showAsscMoreCustomers:true,
            userDetails:{},
            isOpen: false,
            modalType: "",
            showUpdateBox:false,
            lastNameForUpdate:"",
            userName:userName,
            brokerPropAccessPriv:{type:'E'},
            isAdminChangingForAssociate
        }

        this.viewAssociates = this.viewAssociates.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.onRemoveUser = this.onRemoveUser.bind(this)
        this.onResetPasswordClick = this.onResetPasswordClick.bind(this)
        this.showUpdateStatus = this.showUpdateStatus.bind(this)
        this.onDiassociateCustomers = this.onDiassociateCustomers.bind(this)
        this.onManagementCBox = this.onManagementCBox.bind(this)
        this.onRegionCBox = this.onRegionCBox.bind(this)
        this.onPropertyCBox = this.onPropertyCBox.bind(this)
        this.disassociateCustomers = this.disassociateCustomers.bind(this)
        this.onAssociateUserNameClick = this.onAssociateUserNameClick.bind(this)
        this.onBrokerPropAccessPriv = this.onBrokerPropAccessPriv.bind(this)
        this.onBrkrPropAccessChange = this.onBrkrPropAccessChange.bind(this)
        this.getAccessPrivilegesForBrokerProperty = this.getAccessPrivilegesForBrokerProperty.bind(this)
        this.onAssociateMoreLink = this.onAssociateMoreLink.bind(this)
        this.changeAssociatedAdmin = this.changeAssociatedAdmin.bind(this)
        this.onChangeAssociateAdmin = this.onChangeAssociateAdmin.bind(this)
        this.onAdminChangeFinish = this.onAdminChangeFinish.bind(this)
        this.emptyResetPassword = this.emptyResetPassword.bind(this)
    }

    viewAssociates(){
        this.toggleModal('VA');
        this.props.actions.getAssociates({userName:this.state.userName});
    }

    onRemoveUser(){
        this.props.actions.removeUserDetails(this.state.userDetails, this.state.userDetails.user.userName)
        this.props.history.push("/admin/manageusers/removeuser/confirm")
        this.toggleModal('RU')
    }

    //this is for opening a modal window
    changeAssociatedAdmin(){
        this.toggleModal('CAD')
    }

    //this is for click in the modal window
    onChangeAssociateAdmin(){
        let changingAdminFrom = this.state.userDetails.associatedAdmin.userName;
        let changingAdminForAssociate = this.state.userDetails.user;
        this.props.actions.saveDetailsForChangingAdmin({changingAdminFrom,changingAdminForAssociate})
        if(CommonUtil.isUserCustAssociate(changingAdminForAssociate.webSecurityRole)){
            this.props.history.push("/admin/adduser/associate/tocustomer")
        }else{
            this.props.history.push("/admin/adduser/associate/tobroker")
        }
    }

    onAdminChangeFinish(){
       let selectedAdmin = this.state.userDetails.user.userName
       let associateUserName = this.props.changeAssociateAdmin.details.changingAdminForAssociate.userName
       //this.props.actions.saveDetailsForChangingAdmin(undefined)
       this.props.actions.changeAdminForAssociateAPI({selectedAdmin,changingAdminForAssociate:associateUserName})
       //this.props.history.push('/admin/manageusers/updateuser/'+associateUserName)
    }

    onAssociateUserNameClick(userName){
        this.props.history.push('/admin/manageusers/updateuser/'+userName)
    }

    onAssociateMoreLink(){
        this.props.actions.saveUserDetailsForAsscMore(this.state.userDetails)
        this.props.history.push('/admin/manageusers/updateuser/associatemore')
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.userDetails != nextProps.userDetails){
            let userDetails = nextProps.userDetails
            this.setState({userDetails});
        }

        if(this.props.disassociatestatus != nextProps.disassociatestatus){
            if(nextProps.disassociatestatus.status == 'Y'){
                let bpNumberList = nextProps.disassociatestatus.bpNumberList;
                let userDetails = _.cloneDeep(this.state.userDetails);
                let mngBPList = userDetails.mngtBPList;
                mngBPList.forEach(mng => {
                    if(bpNumberList.includes(mng.bpNumber)) mng.selected = false;
                    mng.regionList.forEach(rgn => {
                        if(bpNumberList.includes(rgn.bpNumber)) rgn.selected = false;
                        rgn.propertyList.forEach(prop => {
                            if(bpNumberList.includes(prop.bpNumber)) prop.selected = false;
                        })
                    })
                })
                userDetails.mngtBPList = mngBPList;
                this.setState({userDetails})
            }
            this.toggleModal();
        }

        if(this.props.updateUser != nextProps.updateUser){
            if(nextProps.updateUser.fieldName == 'BRKR_PROP_ACCESS'){
              let brkrPriv = Object.assign({},this.state.brokerPropAccessPriv)
              brkrPriv.showUpdateStatusBox = true;
              if(!nextProps.updateUser.userUpdated){
                  brkrPriv.errMessage = "Access privelages update failed."
                  brkrPriv.isError = true;
                  this.setState({userDetails:this.props.userDetails,brokerPropAccessPriv:brkrPriv})
                }else{
                  brkrPriv.errMessage = "updated Access Privileges successfully."
                  brkrPriv.isError = false;
                  this.setState({brokerPropAccessPriv:brkrPriv})
                }
            }else if(nextProps.updateUser.fieldName == 'email'){
                if(nextProps.updateUser.userUpdated){
                    let userDetails = _.cloneDeep(this.state.userDetails);
                    userDetails.user.email = nextProps.updateUser.user.email;
                    this.setState({userDetails})
                }
            }
        }

        if(this.props.match.params.userName != nextProps.match.params.userName){
            if(this.state.isOpen)this.toggleModal();
            this.props.actions.getUserDetails({userName:nextProps.match.params.userName});
        }

        //changing admin finish call
        if(this.props.changeAssociateAdmin != nextProps.changeAssociateAdmin){
            if(undefined != nextProps.changeAssociateAdmin.status && nextProps.changeAssociateAdmin.status == "Y"){
                this.setState({isAdminChangingForAssociate:false})
                let associateUserName = this.props.changeAssociateAdmin.details.changingAdminForAssociate.userName
                this.props.history.push('/admin/manageusers/updateuser/'+associateUserName)
            }
        }
    }

    disassociateCustomers(){
        this.setState({dcBpNumberList:[]})
        this.setState({dcModalMessage:""})
        let userDetails = _.cloneDeep(this.state.userDetails);
        let bpNumberList = [];
        let customerCount = 0;
        userDetails.mngtBPList.forEach(mng => {
            customerCount++
            if(mng.selectedOnUpdatePage) bpNumberList.push(mng.bpNumber);
            mng.regionList.forEach(rgn => {
              customerCount++
                if(rgn.selectedOnUpdatePage) bpNumberList.push(rgn.bpNumber);
                rgn.propertyList.forEach(prop => {
                  customerCount++
                  if(prop.selectedOnUpdatePage) bpNumberList.push(prop.bpNumber);
                })
            })
        })
        if(bpNumberList.length == 0){
            this.setState({dcBpNumberList:[]})
            this.setState({dcModalMessage:"Select at least one Business partner."})
        }else if(bpNumberList.length == customerCount){
            this.setState({dcBpNumberList:[]})
            this.setState({dcModalMessage:"Cannot delete all business partner accounts. User should have atleast one business partner account associated."})
        }else if(bpNumberList.length > 0){
            this.setState({dcBpNumberList:bpNumberList})
            this.setState({dcModalMessage:"Are you sure you want to disassociate these customers from this user ?"})
        }
        this.toggleModal('DC');
    }

    onDiassociateCustomers(bpNumberList){
        let userDetails = _.cloneDeep(this.state.userDetails);
        this.props.actions.disassociateCustomersFromUserAPI({bpNumberList,userName:userDetails.user.userName})
    }

    onManagementCBox(e){
        let userDetails = _.cloneDeep(this.state.userDetails);
        userDetails.mngtBPList = CommonUtil.onMngmtCBoxOnUpdatePage(userDetails.mngtBPList,e.target.value);
        this.setState({userDetails})
    }

    onRegionCBox(e){
        let userDetails = _.cloneDeep(this.state.userDetails);
        userDetails.mngtBPList = CommonUtil.onRegionCBoxOnUpdatePage(userDetails.mngtBPList,e.target.value);
        this.setState({userDetails})
    }

    onPropertyCBox(e){
        let userDetails = _.cloneDeep(this.state.userDetails);
        let securityRole = this.state.securityRole
        userDetails.mngtBPList = CommonUtil.onPropCBoxOnUpdatePage(userDetails.mngtBPList,e.target.value,securityRole);
        this.setState({userDetails})
    }

    showUpdateStatus(showUpdateBox,updateSuccess,fieldName){
        this.setState({showUpdateBox,updateSuccess,fieldName})
    }

    onResetPasswordClick(){
      let user = this.state.userDetails.user
      let inData = {userName:user.userName,email:user.email}
      this.props.actions.sendResetPassword(inData);
    }
    //to avoid multiple emails sent
    emptyResetPassword(){
      this.props.actions.emptyResetPassword();
    }

    /*
        accessType = B(pay bill) or S(start/stop)
        editType = E - pencil icon clicked for edit
               S - Save icon clicked
               C - Cancel icon clicked
        This is for on click of any icon either edit,save,cancel
     */
    onBrokerPropAccessPriv(accessPrivObj){
        let editType = accessPrivObj.editType;
        let accessType = accessPrivObj.accessType;
        let brkrPriv = Object.assign({},this.state.brokerPropAccessPriv)
        brkrPriv.editing = (editType == 'E')?true:false;
        brkrPriv.editType = editType;
        brkrPriv.editingAccessType = accessType;
        brkrPriv.clickedPropBpNumber = accessPrivObj.bpNumber;
        brkrPriv.showUpdateStatusBox = false;
        this.setState({brokerPropAccessPriv:brkrPriv})
        if(editType == 'S'){
            let bpNumber = accessPrivObj.bpNumber;
            let acc = this.getAccessPrivilegesForBrokerProperty(bpNumber)
            let user = this.state.userDetails.user;
            this.props.actions.updateUserDtls({user,bpNumber,startStopAce:acc.startStopAce,billingAce:acc.billingAce,fieldName:'BRKR_PROP_ACCESS'});
        }
    }

    /*
      This method is for changing the yes to no or checkbox change
     */
    onBrkrPropAccessChange(e,bpNumber,accessType) {
        let userDetails = _.cloneDeep(this.state.userDetails)
        let mngList = userDetails.mngtBPList;
        mngList.forEach(mng => {
           mng.regionList.forEach(rgn => {
               rgn.propertyList.forEach(prop => {
                   if(prop.bpNumber == bpNumber){
                        prop.startStopAce = (accessType == 'S')?(e.target.checked?'Y':'N'):prop.startStopAce;
                        prop.billingAce = (accessType == 'B')?(e.target.checked?'Y':'N'):prop.billingAce;
                   }
               })
           })
        })
        userDetails.mngtBPList = mngList;
        this.setState({userDetails})
      }

    getAccessPrivilegesForBrokerProperty(bpNumber){

        let startStopAce, billingAce;
        this.state.userDetails.mngtBPList.forEach(mng => {
           mng.regionList.forEach(rgn => {
               rgn.propertyList.forEach(prop => {
                   if(prop.bpNumber == bpNumber){
                        billingAce = prop.billingAce;
                        startStopAce = prop.startStopAce;
                   }
               })
           })
        })
        return {startStopAce,billingAce}
    }


    toggleModal(type){
      if(this.state.modalType == 'RP'){
          this.emptyResetPassword();
      }
      this.setState({
        isOpen: !this.state.isOpen,modalType:type
      });
    }

    render(){

      if(!this.state.userDetails.user){
        return <div></div>
      }

      let { user, mngtBPList, associatedAdmin } = this.state.userDetails

      if(this.state.isAdminChangingForAssociate){
          user = this.props.changeAssociateAdmin.details.changingAdminForAssociate
          associatedAdmin = this.state.userDetails.user
      }

      const tableRsltOptns = {securityRole:user.webSecurityRole, custList:mngtBPList,onManagementCBox:this.onManagementCBox,onRegionCBox:this.onRegionCBox,onBrkrPropAccessChange:this.onBrkrPropAccessChange,
                            onPropertyCBox:this.onPropertyCBox, onBrokerPropAccessPriv:this.onBrokerPropAccessPriv, brokerPropAccessPriv:this.state.brokerPropAccessPriv, onAssociateMoreLink:this.onAssociateMoreLink,
                            isAdminChangingForAssociate:this.state.isAdminChangingForAssociate}

      const isUserHasAssociations = CommonUtil.isUserHasAssociations(user.webSecurityRole)
      const intOrExt = CommonUtil.getUserCategoryFromWebSecurityRole(user.webSecurityRole)
      const showViewAsscLink = CommonUtil.showAssociatesLink(user.webSecurityRole)
      const showAssociatedAdmin = CommonUtil.showAssociateAdmin(user.webSecurityRole)
      const showSapId = CommonUtil.showSapIdOnUpdatePage(user.webSecurityRole)
      const showAccessPriv = CommonUtil.showAccessPrivOnUpdatePage(user.webSecurityRole)
      const updatingOwnProfile = false
      //if user is Customer Associate or Broker Associate
      const isUserAnyAssc = (CommonUtil.isUserBroker(user.webSecurityRole) || CommonUtil.isUserCustAssociate(user.webSecurityRole))
      const isUserBroker = CommonUtil.isUserBroker(user.webSecurityRole)
      //const fullName = user.firstName+" "+user.lastName
      let userTypeResult="";
      if(!isUserBroker){
         userTypeResult= <UserType securityRoleDisplayName={CommonUtil.getUserTypeDisplayNameStr(user.securityRoleDisplayName)} />
      }
      const getModal = (modalType) => {
          if(modalType == 'RP'){ //RP -- Reset Password
            if(this.props.resetPassword.status == undefined){
                this.onResetPasswordClick()
            }
            return <ResetPasswordModal user={user} email={user.email} message={this.props.resetPassword} onClose={this.toggleModal}/>
          }else if(modalType == 'RU') { //RP -- Remove User
            return <RemoveUserModal onClose={this.toggleModal} onRemoveUser={this.onRemoveUser}/>
          }else if(modalType == 'VA') { //VA -- View Associates
            return <ViewAssociatesModal onClose={this.toggleModal} onAssociateUserNameClick={this.onAssociateUserNameClick} asscList={this.props.viewAssociates}/>
          }else if(modalType == 'DC') { //DC -- Disassociate Customers
            const dissOptions = {onClose:this.toggleModal,bpNumberList:this.state.dcBpNumberList,onDiassociateCustomers:this.onDiassociateCustomers,modalMessage:this.state.dcModalMessage }
            return <DisassociateErrorModal dissOptions={dissOptions} />
          }else if(modalType == 'CAD') { //CAD -- Change Associate Admin
            const changeAsscOptions = {onClose:this.toggleModal,onChangeAssociateAdmin:this.onChangeAssociateAdmin,securityRole:user.webSecurityRole}
            return <ChangeAsscAdminModal changeAsscOptions={changeAsscOptions} />
          }
      }

      return(
          <div>
              <div className="pageHeader">
                       <Heading changingAdminFromUpdatePage={this.state.isAdminChangingForAssociate}/>
                </div>
          <div className="box">
            {this.state.showUpdateBox?<UpdateSuccessBox updateSuccess={this.state.updateSuccess} fieldName={this.state.fieldName}/>:''}
            <div className="boxtitleseperator">&nbsp;</div>
            <div id="headingError" className="status-message">&nbsp;</div>
            <PortalType userType={intOrExt}/>
            <SecurityRole securityRole={user.securityRole} viewAssociates={this.viewAssociates} showViewAsscLink={showViewAsscLink} />
            {showAssociatedAdmin?<AsscAdmin associatedAdmin={associatedAdmin} securityRole={user.webSecurityRole} changeAssociatedAdmin={this.changeAssociatedAdmin} />:''}
            {userTypeResult}
            <Name firstName={user.firstName} lastName={user.lastName} user={user} showUpdateStatus={this.showUpdateStatus}/>
            <UserName userName={user.userName} />
            <Email email={user.email} user={user} showUpdateStatus={this.showUpdateStatus}/>
            <Phone phoneNum={user.phoneNum} phoneNumExtn={user.phoneNumExtn} user={user} showUpdateStatus={this.showUpdateStatus}/>
            <AltPhone altPhoneNum={user.altPhoneNum} altPhoneNumExtn={user.altContactPhExtn} user={user} showUpdateStatus={this.showUpdateStatus}/>
            <Fax faxNum={user.faxNum} user={user} showUpdateStatus={this.showUpdateStatus}/>
            {showSapId?<SapId sapId={user.sapId} user={user}  showUpdateStatus={this.showUpdateStatus}/>:''}
            {showAccessPriv?<BillingAccess showUpdateStatus={this.showUpdateStatus} user={user} startStopAce={user.startStopAce} billingAce={user.billingAce} securityRole={user.webSecurityRole} />:''}
            {showAccessPriv?<StartStopAce showUpdateStatus={this.showUpdateStatus} user={user} billingAce={user.billingAce} startStopAce={user.startStopAce} securityRole={user.webSecurityRole} />:''}
            {updatingOwnProfile?<Password />:''}
            {!this.state.isAdminChangingForAssociate?
              <div className="left fullwwidth contenttitleseperator">
            		<div className="left">
            			<button className="left controlText-B modal1" onClick={() => this.toggleModal('RP')} id="resetPwdBtn1" type="button">Reset Password</button>
            		</div>
            		<div className="left leftMarginSpace">
            			<button id="removeUSR" name="removeUSR" onClick={() => this.toggleModal('RU')} className="left controlText-B b_submit modal2" type="button">Remove User</button>
            		</div>
    	        </div>
              :""}
            <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                {getModal(this.state.modalType)}
            </Modal>
            {this.state.brokerPropAccessPriv.showUpdateStatusBox?<UpdateSuccessBox updateSuccess={!this.state.brokerPropAccessPriv.isError} fieldName="accpriv"/>:""}
            {isUserHasAssociations?<Associations tableRsltOptns={tableRsltOptns}/>:''}
            {this.state.isAdminChangingForAssociate?
              <div className="handle">
                  <Cancel/>
                <button type="button" onClick={this.onAdminChangeFinish} className="right controlText-A b_submit">Finish<span></span></button>
              </div>:
              <div className="handle">
  					      {isUserHasAssociations && (!isUserAnyAssc)?<button name="disAsstUserBtn" onClick={this.disassociateCustomers} className="left controlText-B modal1 moreLeftSpace" type="button">Disassociate Customers</button>:''}
              </div>
            }
          </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    updateUser:state.updateUser,
    userDetails: state.manageUser,
    viewAssociates:state.viewAssociates,
    resetPassword:state.resetPassword,
    disassociatestatus:state.associateMoreCustomers.status,
    changeAssociateAdmin: state.changeAssociateAdmin
  })
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

UpdateUserPage.propTypes = {
    match: PropTypes.any.isRequired,
    resetPassword: PropTypes.object.isRequired,
    changeAssociateAdmin: PropTypes.object.isRequired,
    viewAssociates: PropTypes.func.isRequired,
    userDetails: PropTypes.object.isRequired,
    updateUser: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
    disassociatestatus: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserPage)
