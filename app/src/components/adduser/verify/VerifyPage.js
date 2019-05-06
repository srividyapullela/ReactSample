import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import ReadOnlyField from './ReadOnlyField'
import Name from './Name'
import UserName from './UserName'
import Email from './Email'
import Phone from './Phone'
import AltPhone from './AltPhone'
import Fax from './Fax'
import BillingAce from './BillingAce'
import StartStopAce from './StartStopAce'
import Cancel from '../../common/Cancel'
import CommonUtil from '../../common/Util'
import Associations from './associations/Associations'
import DisassociateErrorModal from '../../common/DisassociateErrorModal'
import Modal from '../../common/Modal'
import * as _ from 'lodash'
import PropTypes from 'prop-types';

class VerifyPage extends React.Component {

    constructor(props) {
        super(props)

        let user = Object.assign({}, this.props.addUserObj.user)
        this.state = {
            user:user,
            editing:false,
            fieldName:"",
            updateSuccess: false,
            securityRole:user.selection.subUserType,
            custList: user.customerList,
            selAdminCustList: user.selAdminAsscList,
            brokerLinkCollapsed:true,
            brokerLinkBpNumbers:[]
        }

        this.onCancel = this.onCancel.bind(this)
        this.onUpdateField = this.onUpdateField.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onFinish = this.onFinish.bind(this)
        this.onDiassociateCustomers = this.onDiassociateCustomers.bind(this)
        this.onManagementCBox = this.onManagementCBox.bind(this)
        this.onRegionCBox = this.onRegionCBox.bind(this)
        this.onPropertyCBox = this.onPropertyCBox.bind(this)
        this.onAssociateMoreCustomers = this.onAssociateMoreCustomers.bind(this)
        this.onPropAccesspriv = this.onPropAccesspriv.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.diassociateCustomers = this.diassociateCustomers.bind(this)
        this.toggleBrokerLink = this.toggleBrokerLink.bind(this)
        this.setUserInfo = this.setUserInfo.bind(this)
    }

    setUserInfo(userInfo){
        let user = this.state.user
        user.userInfo = userInfo
        this.setState({user})
    }
    onUpdateField(field) {
      this.setState({editing:true,fieldName:field,updateClicked:true});
    }

    onFieldChange(e, field){
        let user = _.cloneDeep(this.state.user);
        if(field == 'email'){user.userInfo.email = e.target.value;}
        this.setState({user})
    }

    onSave(){
      //console.log('cancel field:::clicked::'+field);
      this.setState({editing:false,saveClicked:true});
    }

    onCancel(){
      //console.log('cancel field:::clicked::'+field);
      this.setState({editing:false,cancelClicked:true});
    }

    onFinish(){
        let user = _.cloneDeep(this.state.user);
        if(this.state.securityRole == 'EXT_BRK_ASC' || this.state.securityRole == 'EXT_CUS_ASC'){
            user.selAdminAsscList = this.state.selAdminCustList
        }else{
            user.customerList = this.state.custList
        }
        console.log(user)
        this.props.actions.saveUserInfoToDB(user);
        this.props.history.push('/admin/adduser/confirm');
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.addUserObj != nextProps.addUserObj){
           this.setState({user:nextProps.addUserObj.user})
        }
    }

    onManagementCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        this.setState({custList:CommonUtil.onManagementCBoxOnVerify(custList,e.target.value)})
    }

    onRegionCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        this.setState({custList:CommonUtil.onRegionCBoxOnVerify(custList,e.target.value)})
    }

    onPropertyCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        let securityRole = this.state.securityRole
        this.setState({custList:CommonUtil.onPropertyCBoxOnVerify(custList,e.target.value,securityRole)})
    }

    onAssociateMoreCustomers(){
        this.props.actions.saveCustomerListForAssociteMore(this.state.custList);
        this.props.history.push("/admin/adduser/associate")
    }

    diassociateCustomers(){
        let custList = _.cloneDeep(this.state.custList);
        let bpNumberList = []

        custList.forEach(mng => {
            if(mng.verifySelected) bpNumberList.push(mng.bpNumber)
            mng.regionList.forEach(rgn => {
                if(rgn.verifySelected) bpNumberList.push(rgn.bpNumber)
                rgn.propertyList.forEach(prop => {
                    if(prop.verifySelected) bpNumberList.push(prop.bpNumber)
                })
            })
        })

        if(bpNumberList.length == 0){
            this.setState({dcBpNumberList:[]})
            this.setState({dcModalMessage:"Select at least one Business partner."})
        }else if(bpNumberList.length > 0){
            this.setState({dcBpNumberList:bpNumberList})
            this.setState({dcModalMessage:"Are you sure you want to disassociate these customers from this user ?"})
        }
        this.toggleModal()
    }
    /*
      This is for removing the customer list from this page from disassociate modal window.
      if all customers are all selected redirect the page to search page.
     */
    onDiassociateCustomers(){

        let custList = _.cloneDeep(this.state.custList);
        custList.forEach(mng => {
            mng.selected = (mng.verifySelected)?(!mng.verifySelected):mng.selected
            mng.verifySelected = (mng.verifySelected)?!mng.verifySelected:mng.verifySelected
            mng.regionList.forEach(rgn => {
                rgn.selected = (rgn.verifySelected)?(!rgn.verifySelected):rgn.selected
                rgn.verifySelected = (rgn.verifySelected)?!rgn.verifySelected:rgn.verifySelected
                rgn.propertyList.forEach(prop => {
                    prop.selected = (prop.verifySelected)?(!prop.verifySelected):prop.selected
                    prop.verifySelected = (prop.verifySelected)?!prop.verifySelected:prop.verifySelected
                })
            })
        })
        this.toggleModal()
        this.setState({custList, dcBpNumberList:[]})
        if(!CommonUtil.isCustomerSelected(custList)){
            this.props.history.push("/admin/adduser/associate")
        }
    }

    /*
      This method only for Borker and Broker associates.
      editing the access priveleges at property level in the table only for Broker and Broker associate.
     */
    onPropAccesspriv(privType, e){
        let securityRole = this.state.securityRole;
        //console.log(securityRole)
        if(securityRole == 'EXT_BRK_ASC'){
            let selAdminList = _.cloneDeep(this.state.selAdminCustList)
            selAdminList.forEach(mng => {
              mng.regionList.forEach(rgn => {
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == e.target.value){
                          prop.startStopAce = (privType == 'S')?(e.target.checked?'Y':'N'):prop.startStopAce;
                          prop.billingAce = (privType == 'B')?(e.target.checked?'Y':'N'):prop.billingAce;
                      }
                  })
              })
            })
            this.setState({selAdminCustList:selAdminList})
        }else{
          let customerList = _.cloneDeep(this.state.custList);
          customerList.forEach(mng => {
              mng.regionList.forEach(rgn => {
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == e.target.value){
                          prop.startStopAce = (privType == 'S')?(e.target.checked?'Y':'N'):prop.startStopAce;
                          prop.billingAce = (privType == 'B')?(e.target.checked?'Y':'N'):prop.billingAce;
                      }
                  })
              })
          })
          this.setState({custList:customerList})
        }


    }

    toggleModal(){
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    toggleBrokerLink(brokerLinkBpNumber, toOpenLink){
        let brokerLinkBpNumbers = _.cloneDeep(this.state.brokerLinkBpNumbers)
        if(toOpenLink){
            brokerLinkBpNumbers.push(brokerLinkBpNumber);
        }else{
            brokerLinkBpNumbers = brokerLinkBpNumbers.filter((bpNumber) => brokerLinkBpNumber != bpNumber)
        }
        this.setState({
          brokerLinkBpNumbers,
          brokerLinkCollapsed: !this.state.brokerLinkCollapsed
        });
    }

    render(){

        if(!this.state.user){
          return <div></div>
        }

        const heading = <h1>Add User - Verification</h1>

        const updateFields = {update:this.onUpdateField,save:this.onSave,cancel:this.onCancel,onFieldChange:this.onFieldChange,
                              fieldName:this.state.fieldName,editing:this.state.editing,updateSuccess:this.state.updateSuccess,setUserInfo:this.setUserInfo}

        const user = this.state.user
        let userInfo = user.userInfo
        let selection = user.selection
        let custList = this.state.custList
        let selAdminAsscList = this.state.selAdminCustList

        const intOrExt = selection.userType == 'internal'?'Internal':'External';
        const securityRole = selection.subUserType;
        const isUserHasAssoications = CommonUtil.isUserHasAssociations(securityRole)
        const isAssociatesAdding = CommonUtil.isAssociatesAdding(securityRole)
        const isCustomerAdmin = CommonUtil.isUserCustomerAdmin(securityRole)

        const tableRsltOptns = {custList:custList,securityRole:securityRole,onManagementCBox:this.onManagementCBox,onRegionCBox:this.onRegionCBox,toggleBrokerLink:this.toggleBrokerLink,
          brokerLinkBpNumbers:this.state.brokerLinkBpNumbers,brokerLinkCollapsed:this.state.brokerLinkCollapsed,onPropertyCBox:this.onPropertyCBox, selAdminAsscList:selAdminAsscList, onAssociateMoreCustomers: this.onAssociateMoreCustomers, onPropAccesspriv: this.onPropAccesspriv}

        const dissOptions = {onClose:this.toggleModal,bpNumberList:this.state.dcBpNumberList,onDiassociateCustomers:this.onDiassociateCustomers,modalMessage:this.state.dcModalMessage }

        return(
        <div>
            <div className="pageHeader">
                     {heading}
            </div>
          <div className="box">
            <form name="verifyInfo" id="verifyInfo" className="contenttitleseperator">
                <div className="boxtitleseperator">&nbsp;</div>
                <ReadOnlyField label="Internal/External" value={intOrExt}/>
                <ReadOnlyField label="Security Role" value={CommonUtil.getSecurityRoleDisplayName(securityRole)}/>
                {CommonUtil.showUserType(securityRole)?<ReadOnlyField label="User Type" value={CommonUtil.getUserTypeDisplayName(selection.subUserType)}/>:""}
                <Name forUpdate={updateFields} userInfo={userInfo}/>
                <UserName forUpdate={updateFields} userInfo={userInfo}/>
                <Email forUpdate={updateFields} userInfo={userInfo}/>
                <Phone forUpdate={updateFields} userInfo={userInfo}/>
                <AltPhone forUpdate={updateFields} userInfo={userInfo}/>
                <Fax forUpdate={updateFields} userInfo={userInfo}/>
                {CommonUtil.ableToAccessPriv(securityRole)?
                  [<BillingAce key="billingace" isCustomerAdmin={isCustomerAdmin} ableToPayBills={userInfo.ableToPayBills}/>,
                <StartStopAce key="startstopace" isCustomerAdmin={isCustomerAdmin} ableToStartStopService={userInfo.ableToStartStopService}/>]:''}
            </form>
            <div className="hr">&nbsp;</div>
            {isUserHasAssoications?<Associations tableRsltOptns={tableRsltOptns} />:''}
            <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                <DisassociateErrorModal dissOptions={dissOptions} />
            </Modal>
            <div className="handle">
              <Cancel />
                {isUserHasAssoications && !CommonUtil.isUserBroker(securityRole) && !isAssociatesAdding?<button name="disAsstUserBtn" onClick={this.diassociateCustomers} className="left controlText-B modal1 moreLeftSpace" type="button">Disassociate Customers</button>:''}
                <button type="button" id="userinfoctnbtn" onClick={this.onFinish} className="right controlText-A">Finish<span></span></button>
            </div>
          </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({addUserObj: state.addUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

VerifyPage.propTypes = {
    addUserObj: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPage);
