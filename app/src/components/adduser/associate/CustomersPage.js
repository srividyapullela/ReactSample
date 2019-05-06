import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import Search from './Search'
import TableResult from './TableResult'
import UserInfo from './userInfo'
import Processing from '../../common/Processing'
import { ErrorBox } from '../../common/Error'
import CommonUtil from '../../common/Util'
import Modal from '../../common/Modal'
import AgentAssociatesModal from './AgentAssociatesModal'
import * as _ from 'lodash'
import PropTypes from 'prop-types';

class CustomersPage extends React.Component {

    constructor(props){
        super(props)

        let user = Object.assign({}, this.props.addUserObj.user)
        //this customer list is from verify page, if exits merge with the actual search customer list.
        //merging customers from verify page
        let mergeCustResult = this.mergeCustomerListFromVerifyPage([]);
        this.state = {
            user:user,
            isProcessing:false,
            bpNumber:user.enteredBPNumber,
            enteredBPNumber:user.enteredBPNumber,
            isError:true,
            showCustomerTable:false,
            securityRole:user.selection.subUserType,
            isOpen: false,
            agentForModal:{},
            brokerLinkCollapsed:true,
            associtaeMoreCustomersExist:mergeCustResult.associtaeMoreCustomersExist,
            custList:mergeCustResult.customerList,
            brokerLinkBpNumbers:[]
        }


        this.onBPSearch = this.onBPSearch.bind(this)
        this.onBPNumberChange = this.onBPNumberChange.bind(this)
        this.onManagementCBox = this.onManagementCBox.bind(this)
        this.onRegionCBox = this.onRegionCBox.bind(this)
        this.onPropertyCBox = this.onPropertyCBox.bind(this)
        this.onContinue = this.onContinue.bind(this)
        this.onAgentAssignedLinkClick = this.onAgentAssignedLinkClick.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.onPropAccesspriv = this.onPropAccesspriv.bind(this)
        this.toggleBrokerLink = this.toggleBrokerLink.bind(this)
        this.mergeCustomerListFromVerifyPage = this.mergeCustomerListFromVerifyPage.bind(this)
    }

    onBPSearch(e) {
        if(undefined == e || (e.charCode == 13 || e.charCode == undefined)){
          let bpNumber = this.state.bpNumber
          if(bpNumber == undefined || bpNumber == ''){
              this.setState({isError:false, errorMessage:"Please enter BP Number."})
          }else{
              this.setState({isError:true,isProcessing:true,showCustomerTable:false})
              this.props.actions.searchBPCustomers({bpNumber,securityRole:this.state.user.selection.subUserType})
          }
        }
        this.setState({enteredBPNumber:undefined})
    }

    onBPNumberChange(event) {
        let bpNumber = event.target.value
        this.setState({bpNumber})
    }

    //this customer list is from verify page, if exits merge with the actual search customer list.
    //merging customers from verify page
    mergeCustomerListFromVerifyPage(customerList){

        let associateMoreCustList = _.cloneDeep(this.props.asscMoreCutomers);
        let associtaeMoreCustomersExist = false;
        if(undefined != associateMoreCustList.customerList){
            customerList = CommonUtil.mergeCustomers(customerList, associateMoreCustList.customerList)
            associtaeMoreCustomersExist = true;
        }
        return {customerList,associtaeMoreCustomersExist}
    }

    componentWillReceiveProps(nextProps) {
        var result = nextProps.addUserObj.user.custList
        if(!result.error){
          result.forEach(mng => {
              mng.regionList.forEach(rgn => {
                  rgn.propertyList.forEach(prop => {prop.startStopAce = 'Y';})
              })
          })
        }

        let mergeCustResult = this.mergeCustomerListFromVerifyPage(result);
        this.setState({isProcessing:false,showCustomerTable:true,custList:mergeCustResult.customerList,
          associtaeMoreCustomersExist:mergeCustResult.associtaeMoreCustomersExist})
    }

    onManagementCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        this.setState({custList:CommonUtil.onManagementCBox(custList,e.target.value)})
     }

    onRegionCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        this.setState({custList:CommonUtil.onRegionCBox(custList,e.target.value)})
    }

    onPropertyCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        let securityRole = this.state.securityRole
        this.setState({custList:CommonUtil.onPropertyCBox(custList,e.target.value,securityRole)})
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

    onContinue(customerList){
        if(CommonUtil.isCustomerSelected(customerList,this.state.securityRole)){
            this.setState({isError:true,errorMessage:""})
            this.props.actions.saveCustomerList(customerList);
            this.props.history.push("/admin/adduser/verify")
        }else{
            this.setState({isError:false, errorMessage:"Please select atleast one customer."})
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

        let userInfo = user.userInfo
        let selection = user.selection

        const intOrExt = selection.userType == 'internal'?'Internal':'External'

        let heading = <h1>Associate User to Customers</h1>
        if(selection.subUserType == 'EXT_BROKER'){
            heading = <h1>Broker Access Privileges</h1>
        }


        let customerList = _.cloneDeep(this.state.custList);
        const associtaeMoreCustomersExist = this.state.associtaeMoreCustomersExist

        const searchOptions = {onSearch:this.onBPSearch, bpNumber:this.state.bpNumber, onBPNumberChange:this.onBPNumberChange,userType:selection.subUserType, showCustomerTable:this.state.showCustomerTable}
        const tableRsltOptns = {custList:customerList,userType:selection.subUserType,onManagementCBox:this.onManagementCBox,onRegionCBox:this.onRegionCBox,toggleBrokerLink:this.toggleBrokerLink,
                                brokerLinkBpNumbers:this.state.brokerLinkBpNumbers,brokerLinkCollapsed:this.state.brokerLinkCollapsed,onPropertyCBox:this.onPropertyCBox,onContinue:this.onContinue, onAgentAssignedLinkClick:this.onAgentAssignedLinkClick, onPropAccesspriv: this.onPropAccesspriv}

        return(
            <div>
            <div className="pageHeader">{heading}</div>
            <div className="box">
                <div className="boxtitleseperator">&nbsp;</div>
                <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                    <AgentAssociatesModal onClose={this.toggleModal} asscList={this.props.associates} agent={this.state.agentForModal}/>
                </Modal>
                <UserInfo userInfo={userInfo} subUserType={selection.subUserType} intOrExt={intOrExt} />
                <div className="hr">&nbsp;</div>
                <ErrorBox message={this.state.errorMessage} isError={!this.state.isError}/>
                <Search enteredBPNumber={this.state.enteredBPNumber} searchOptions={searchOptions}/>
                {this.state.isProcessing?<Processing />:''}
                {this.state.showCustomerTable || associtaeMoreCustomersExist?<TableResult tableRsltOptns={tableRsltOptns} />:''}
            </div>
           </div>
        )
    }

}

const mapStateToProps = (state) => ({addUserObj: state.addUser, associates: state.agentAssociates, asscMoreCutomers:state.associateMoreCustomers})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

CustomersPage.propTypes = {
    addUserObj: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
    asscMoreCutomers: PropTypes.object.isRequired,
    associates: PropTypes.any.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);
