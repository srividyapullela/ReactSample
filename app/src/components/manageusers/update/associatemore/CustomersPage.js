import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as manageUserActions from '../../../../actions/manageUserActions';
import * as addUserActions from '../../../../actions/addUserActions';
import Search from '../../../common/association/Search'
import TableResult from '../../../common/association/TableResult'
import UserInfo from '../../../common/association/userInfo'
import AgentAssociatesModal from '../../../common/association/AgentAssociatesModal'
import Processing from '../../../common/Processing'
import { ErrorBox } from '../../../common/Error'
import CommonUtil from '../../../common/Util'
import Modal from '../../../common/Modal'
import * as _ from 'lodash'

class CustomersPage extends React.Component {

    constructor(props){
        super(props)

        let userDetails = Object.assign({}, this.props.userDetails)

        this.state = {
            user:userDetails.user,
            userCustomerList:userDetails.mngtBPList,
            isProcessing:false,
            bpNumber:'',
            isError:true,
            showCustomerTable:false,
            custList:[],
            securityRole:'',
            isOpen: false,
            agentForModal:{}
        }

        this.onBPSearch = this.onBPSearch.bind(this)
        this.onBPNumberChange = this.onBPNumberChange.bind(this)
        this.onManagementCBox = this.onManagementCBox.bind(this)
        this.onRegionCBox = this.onRegionCBox.bind(this)
        this.onPropertyCBox = this.onPropertyCBox.bind(this)
        this.onAgentAssignedLinkClick = this.onAgentAssignedLinkClick.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.onPropAccesspriv = this.onPropAccesspriv.bind(this)
        this.onAssociatedSelected = this.onAssociatedSelected.bind(this)
    }

    onBPSearch() {
        let bpNumber = this.state.bpNumber
        if(bpNumber == undefined || bpNumber == ''){
            this.setState({isError:false, errorMessage:"Please enter BP Number."})
        }else{
            this.setState({isError:true,isProcessing:true,showCustomerTable:false})
            this.props.actions.searchBPCustomers({bpNumber,securityRole:this.state.user.webSecurityRole})
        }
      }

    onBPNumberChange(event) {
        let bpNumber = event.target.value
        this.setState({bpNumber})
    }

    componentWillReceiveProps(nextProps) {
        var result = nextProps.customerList

        if(!result.error){
          let userCustomerList = _.cloneDeep(this.state.userCustomerList);

          let userBPList = [];
          userCustomerList.forEach(mng => {
              userBPList.push(mng.bpNumber);
              mng.regionList.forEach(region => {
                userBPList.push(region.bpNumber);
                region.propertyList.forEach(prop => {
                    userBPList.push(prop.bpNumber);
                })
              })
          })
          this.setState({isProcessing:false,showCustomerTable:true,custList:result,userBPList})
        }
        if(this.props.asscCustToUserSts != nextProps.asscCustToUserSts){
            if(nextProps.asscCustToUserSts.status == 'Y'){
                this.props.history.push('/admin/manageusers/updateuser/'+this.state.user.userName);
            }else{
                console.log("associating customers to user failed.....")
            }
        }
    }

    onManagementCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        this.setState({custList:CommonUtil.onManagementCBoxAsscMore(custList,e.target.value,this.state.userBPList)})
     }

    onRegionCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        this.setState({custList:CommonUtil.onRegionCBoxAsscMore(custList,e.target.value,this.state.userBPList)})
    }

    onPropertyCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        let securityRole = this.state.securityRole
        this.setState({custList:CommonUtil.onPropertyCBoxAsscMore(custList,e.target.value,securityRole,this.state.userBPList)})
    }

    /*
      This method only for Borker and Broker associate.
     */
    onPropAccesspriv(privType, e){
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

    onAssociatedSelected(customerList){

        if(CommonUtil.isCustomerSelected(customerList,this.state.securityRole)){
            this.setState({isError:true,errorMessage:""})
            this.props.actions.associateCustomersToUserAPI({userName:this.state.user.userName,customerList})
        }else{
            this.setState({isError:false, errorMessage:"Please select atleast one customer."})
        }
    }

    toggleModal(type){
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    onAgentAssignedLinkClick(agent){

        if(agent.agentType == 'EMM'){
            this.props.actions.listEMMAssociatesCall({bpNumber:agent.bpNumber})
        }else{
            this.props.actions.listEMAAssociatesCall({bpNumber:agent.bpNumber})
        }
        this.setState({isOpen:true, agentForModal:agent})
    }

    render() {

        let user = this.state.user

        if(!user){
          return <div></div>
        }

        let webSecurityRole = user.webSecurityRole

        const intOrExt = CommonUtil.getUserCategoryFromWebSecurityRole(webSecurityRole)
        const userInfo = {firstName:user.firstName,lastName:user.lastName,userName:user.userName}

        let heading = <h1>Associate User to Customers</h1>

        let customerList = _.cloneDeep(this.state.custList);

        const searchOptions = {onSearch:this.onBPSearch, bpNumber:this.state.bpNumber, onBPNumberChange:this.onBPNumberChange,userType:webSecurityRole, showCustomerTable:this.state.showCustomerTable}
        const tableRsltOptns = {custList:customerList,userType:webSecurityRole,onManagementCBox:this.onManagementCBox,onRegionCBox:this.onRegionCBox,userCustomerList:this.state.userBPList,
                              onPropertyCBox:this.onPropertyCBox,onAssociatedSelected:this.onAssociatedSelected, onAgentAssignedLinkClick:this.onAgentAssignedLinkClick, onPropAccesspriv: this.onPropAccesspriv}

        return(
            <div>
            <div className="pageHeader">{heading}</div>
            <div className="box">
                <div className="boxtitleseperator">&nbsp;</div>
                <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                    <AgentAssociatesModal onClose={this.toggleModal} asscList={this.props.associates} agent={this.state.agentForModal}/>
                </Modal>
                <UserInfo userInfo={userInfo} subUserType={webSecurityRole} intOrExt={intOrExt} />
                <div className="hr">&nbsp;</div>
                <ErrorBox message={this.state.errorMessage} isError={!this.state.isError}/>
                <Search searchOptions={searchOptions}/>
                {this.state.isProcessing?<Processing />:''}
                {this.state.showCustomerTable?<TableResult tableRsltOptns={tableRsltOptns} />:''}
            </div>
           </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => (
    {userDetails:state.manageUser,
     associates: state.agentAssociates,
     customerList: state.searchCustList.customerList,
     asscCustToUserSts:state.associateCustToUserSts})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(manageUserActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);
