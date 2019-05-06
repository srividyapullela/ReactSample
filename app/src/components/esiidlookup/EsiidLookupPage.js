import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ESIIDListResult from './EsiidListResult'
import SelectLookupTask from './SelectLookupTask'
import UploadServiceAddress from './UploadServiceAddr'
import EnterServiceAddress from './EnterServiceAddr'
import * as esiidLookupActions from '../../actions/esiidLookupActions'
import Processing from '../common/Processing'
import { ErrorBox } from '../common/Error'
import CommonUtil from '../common/Util'
import * as _ from 'lodash'
import PropTypes from 'prop-types';

class ESIIDLookupPage extends React.Component {

		constructor(props) {
        super(props);
        this.state = this.getInitialState()

				this.onUserRadioChange = this.onUserRadioChange.bind(this);
				this.search = this.search.bind(this);
				this.onAdd = this.onAdd.bind(this)
				this.onRemove = this.onRemove.bind(this)
				this.onAddressChange = this.onAddressChange.bind(this)
				this.validateForm = this.validateForm.bind(this)
				this.onUploadServiceAddr = this.onUploadServiceAddr.bind(this)
				this.onUploadSearch = this.onUploadSearch.bind(this)
				this.getInitialState = this.getInitialState.bind(this)
		}

		getInitialState(){
				return {
							selection:{lookupType: "upload"},
							isAjaxCalled: false,
							count:1,
							isError:false,
							isProcessing:false,
							showResult:false,
							currentAddress:{},
							serviceAddrList:[],
							fileName:''
					}
		}

    onUserRadioChange(event){
				let selection = this.state.selection
        selection.lookupType = event.target.value;
        this.setState({selection:selection,currentAddress:{},isAjaxCalled:false, isError: false,serviceAddrList:[],count:1});
    }

		onAdd(count){
				this.setState({count:count+1})
				let serviceAddrList = _.cloneDeep(this.state.serviceAddrList)
				if(!CommonUtil.isServcieAddrEmpty(this.state.currentAddress,serviceAddrList)){
						serviceAddrList.push(this.state.currentAddress)
				}
				this.setState({serviceAddrList,currentAddress:{}})
		}

		onRemove(count,index){
				let serviceAddrList = _.cloneDeep(this.state.serviceAddrList)
				if(!CommonUtil.isServcieAddrEmpty(this.state.currentAddress,serviceAddrList)){
						serviceAddrList.push(this.state.currentAddress)
				}
				serviceAddrList = serviceAddrList.filter((addr,i) =>  (i != index-1))
				this.setState({count:count-1,currentAddress:{},serviceAddrList})
		}

		/*
			This search is only for service address upload
		 */
		onUploadSearch(){
				this.setState({showResult:false}) //hiding the table for every search
				if(this.state.serviceAddrList.length == 0){
						this.setState({isError:true, errorMessage:"Upload Service Addresses is required field. We are allowing these file types only: 1)csv"})
				}else{
						this.setState({isProcessing:true,showResult:false,isAjaxCalled:true})
						this.setState({isError:false, errorMessage:""})
						this.props.actions.lookupESIIDsByAddr({serviceAddressList:this.state.serviceAddrList});
						this.setState({serviceAddrList:[]}) //emptying the address list after the call.
				}
		}

		/*
			This search is only for manual entry search
		 */
		search(){
				let serviceAddrList = _.cloneDeep(this.state.serviceAddrList)
				if(!CommonUtil.isServcieAddrEmpty(this.state.currentAddress,serviceAddrList)){
						serviceAddrList.push(this.state.currentAddress)
				}
				this.setState({serviceAddrList})
				if(this.validateForm(serviceAddrList)){
						this.setState({isError:false})
						this.setState({isProcessing:true,showResult:false})
						this.props.actions.lookupESIIDsByAddr({serviceAddressList:serviceAddrList});
						this.setState({isAjaxCalled:true});
						//this.setState({serviceAddrList:[]});//emptying the address list after the call.
				}else{
						this.setState({isError:true, errorMessage:"StreetNumber and StreetName is required for the search. Please enter required fields."})
				}
    }

		validateForm(serviceAddrList){
				if(serviceAddrList.length == 0){
						return false;
				}
				return true
		}

		onAddressChange(e, fieldName){

				var addr = this.state.currentAddress
				if(fieldName == 'SNB') addr.streetNumber = e.target.value;
				if(fieldName == 'SNM') addr.streetName = e.target.value;
				if(fieldName == 'UN') addr.unitNumber = e.target.value;
				if(fieldName == 'C') addr.city = e.target.value;
				if(fieldName == 'Z') addr.zipcode = e.target.value;
				this.setState({currentAddress:addr})
		}

		componentWillReceiveProps(nextProps) {
				if(this.props.esiidList != nextProps.esiidList){
						this.setState({isProcessing:false,showResult:true})
				}else{
						this.setState(this.getInitialState())
				}
		}

		onUploadServiceAddr(fileData,fileName){
				let addrList =  CommonUtil.convertCSVDataToArray(fileData).data;
				let serviceAddrList = [];
				if(!CommonUtil.checkFileType(fileName,'csv')){
						this.setState({isError:true,errorMessage:"Please upload only csv files."})
				}else{
						this.setState({isError:false,errorMessage:""})
						addrList.forEach(addrAry => {
								var addr = {}
								addr.streetNumber = undefined != addrAry[0]?addrAry[0].trim():''
								addr.streetName = undefined != addrAry[1]?addrAry[1].trim():''
								addr.unitNumber = undefined != addrAry[2]?addrAry[2].trim():''
								addr.city = undefined != addrAry[3]?addrAry[3].trim():''
								addr.zipcode = undefined != addrAry[5]?addrAry[5].trim():''
								if(!(addrAry[0] == "streetNumber" || addrAry[0] == "Street Number")) {
										serviceAddrList.push(addr)
								}
						})
						this.setState({serviceAddrList, fromUpload:true,fileName})
			}
		}

    render(){

				const heading = <h1>Service Addresses</h1>

				const uploadSrvAdrOpts = {lookup:this.onUploadSearch, onUploadServiceAddr:this.onUploadServiceAddr,fileName:this.state.fileName}
				const enterSrvAdrOpts = {lookup:this.search, onAdd:this.onAdd,onAddressChange:this.onAddressChange,srvcAddrCount:this.state.count,onRemove:this.onRemove}

        return(
        <div>
					<div className="pageHeader">
                        {heading}
                </div>
            <div className="box">

							<div className="boxtitleseperator">&nbsp;</div>
							<ErrorBox message={this.state.errorMessage} isError={this.state.isError}/>
							<SelectLookupTask lookupType={this.state.selection.lookupType} onUserRadioChange={this.onUserRadioChange}/>
							{this.state.selection.lookupType == 'upload'?<UploadServiceAddress uploadSrvAdrOpts={uploadSrvAdrOpts}/>:""}
							{this.state.selection.lookupType == 'serviceAdd'?<EnterServiceAddress enterSrvAdrOpts={enterSrvAdrOpts}/>:""}

							{this.state.isAjaxCalled?
								<div id="searchResult" className="movedown15 left fullwidth">
									{this.state.isProcessing?<Processing />:''}
									{this.state.showResult?<ESIIDListResult esiidList={this.props.esiidList}/>:''}
								</div>:""}
						</div>
		</div>
        );
    }
}

const mapStateToProps = (state) => ({esiidList: state.esiidLookup})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(esiidLookupActions, dispatch)})

ESIIDLookupPage.propTypes = {
		esiidList: PropTypes.arrayOf(PropTypes.object).isRequired,
		actions: PropTypes.any.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ESIIDLookupPage)
