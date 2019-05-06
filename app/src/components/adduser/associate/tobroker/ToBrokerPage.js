import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../../actions/addUserActions';
import Search from './Search'
import { ErrorBox } from '../../../common/Error'
import Processing from '../../../common/Processing'
import SearchResult from './SearchResult'
import PropTypes from 'prop-types';

class ToBrokerPage extends React.Component {

      constructor(props){
          super(props)

          this.state= {
              selection:{searchCriteria:"LN", searchString:""},
              isSearchStrErr: false,
              isProcessing:false,
              showBrokerTable:false,
              isBrokerModalOpen:false,
              selectedBroker: undefined,
              errorMessage:"",
              isRadioNotSelected:false,
              changeAssociateAdmin:this.props.changeAssociateAdmin
          }

          this.onSearch = this.onSearch.bind(this)
          this.onChangeSearchString = this.onChangeSearchString.bind(this)
          this.onChangeSearchCriteria = this.onChangeSearchCriteria.bind(this)
          this.onBrokerLinkClick = this.onBrokerLinkClick.bind(this)
          this.onBrokerRadioChange = this.onBrokerRadioChange.bind(this)
          this.onAssociateToBrokerBtn = this.onAssociateToBrokerBtn.bind(this)
          this.toggleModal = this.toggleModal.bind(this)
      }

      onSearch(e){
          if(e.charCode == 13 || e.charCode == undefined){
            let selection = this.state.selection
            if(selection.searchString == '' || selection.searchString == undefined){
                this.setState({isSearchStrErr:true,errorMessage:"Please enter search criteria."})
            }else{
                this.setState({isSearchStrErr:false,isProcessing:true,showBrokerTable:false, errorMessage:""})
                this.props.actions.listBrokers(selection)
            }
          }
      }

      onChangeSearchString(event) {
          let selection = this.state.selection
          selection.searchString = event.target.value
          this.setState({selection})
      }

      onChangeSearchCriteria(event){
          let selection = this.state.selection
          selection.searchCriteria = event.target.value
          this.setState({selection})
          this.setState({showBrokerTable:false})
      }

      onBrokerLinkClick(admin){
          console.log("admin:::"+admin.userName)
          this.props.actions.listAdminAssociatesCall({userName:admin.userName})
          this.setState({isBrokerModalOpen:true})
      }

      componentWillReceiveProps(nextProps) {
          this.setState({isProcessing:false,showBrokerTable:true})
      }

      toggleModal(){
        this.setState({
          isBrokerModalOpen: !this.state.isBrokerModalOpen
        });
      }

      onBrokerRadioChange(e){
         this.setState({selectedBroker:e.target.value, isRadioNotSelected:false})
      }

      /*
        This page can be used for both add user flow and manage user while changing customer admin for the associate
       */
      onAssociateToBrokerBtn(userType){
          let selectedBroker = this.state.selectedBroker
          if(selectedBroker == undefined){
              this.setState({isRadioNotSelected:true,errorMessage:"Please Select atleast one Broker."})
          }else{
              this.setState({isRadioNotSelected:false,errorMessage:""})
              let changeAssociatedAdmin = this.state.changeAssociateAdmin;
              if(undefined != changeAssociatedAdmin && undefined != changeAssociatedAdmin.details){
                  this.props.history.push('/admin/manageusers/updateuser/'+this.state.selectedBroker)
              }else{
                  this.props.actions.saveSelectedAdmin(this.state.selectedBroker);
                  this.props.actions.getSelAdminCustomersCall({userName:this.state.selectedBroker})
                  this.props.history.push('/admin/adduser/enteruserinfo/'+'EXT_BRK_ASC')
              }
          }
      }

      render(){

          let user = this.props.addUserObj.user

          if(!user){
            return <div></div>
          }

          let selection = user.selection

          const searchOptions = {onSearch:this.onSearch, onChangeSearchCriteria:this.onChangeSearchCriteria, onChangeSearchString:this.onChangeSearchString
                                  ,searchString:this.state.searchString}

          const searchRsltOptions = {searchCriteria:this.state.selection.searchCriteria, brkrDetails:user.brkrList, onBrokerLinkClick:this.onBrokerLinkClick,
                                      isBrokerModalOpen:this.state.isBrokerModalOpen, toggleModal:this.toggleModal, asscList:this.props.adminAssociates, userType:selection.subUserType, onBrokerRadioChange:this.onBrokerRadioChange,
                                        onAssociateToBrokerBtn:this.onAssociateToBrokerBtn}

          return(
          <div>
              <div className="pageHeader">
                   <h1>Associate to Broker</h1>
              </div>
            <div className="box">

                <div className="boxtitleseperator"></div>
                <ErrorBox message={this.state.errorMessage} isError={this.state.isSearchStrErr || this.state.isRadioNotSelected}/>
                <Search searchOptions={searchOptions}/>
                {this.state.isProcessing?<Processing />:''}
                {this.state.showBrokerTable?<SearchResult searchRsltOptions={searchRsltOptions} />:''}
            </div>
          </div>
          )
      }
}

const mapStateToProps = (state, ownProps) => ({
    addUserObj: state.addUser,
    adminAssociates: state.adminAssociates,
    changeAssociateAdmin: state.changeAssociateAdmin
  })
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(ToBrokerPage);
