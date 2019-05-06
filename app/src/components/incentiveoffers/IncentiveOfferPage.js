import React from 'react';
import SavePromocode from './save/SavePromocode';
import SearchPromocode from './search/SearchPromocode';
import * as offerActions from '../../actions/offerActions.ts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import SearchResults from './search/SearchResults'
import Processing from '../common/Processing'
import PropTypes from 'prop-types';
import * as _ from 'lodash'

class IncentiveOfferPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = this.getInitialState()
		this.searchPromocode = this.searchPromocode.bind(this)
		this.handleFromDate = this.handleFromDate.bind(this)
		this.handleToDate = this.handleToDate.bind(this)
		this.onDeleteOffer = this.onDeleteOffer.bind(this)
		this.onEditOffer = this.onEditOffer.bind(this)
		this.onPromocodeChange = this.onPromocodeChange.bind(this)
	}

	//this is to show intial state when clicking on the header of the page
	getInitialState(){
			return {
				ajaxSearchCalled: false,
				isError: false,
				startDate:'',
				selFromDate:'',
				selToDate:'',
				isProcessing:false,
				showOffersTable: false,
				offer:{customerType:"MF",offerCode:''},
				searchOfferCode:'',
				isDeleteModalOpen:false,
				deletedOffer:{},
				savePromoInitialState: {
					isOpen: false,
					startDate:'',
					selFromDate:'',
					selToDate:'',
					errorMessage:'',
					isError:false,
					offer:{offerCode:'',toDate:'',fromDate:''}
				}
			}
	}

	searchPromocode() {
			//console.log(this.state.offer)
			this.props.actions.listOffersCall(this.state.offer)
			this.setState({ajaxSearchCalled:true,isProcessing:true, showOffersTable:false, deletedOffer:{}})
	}

	/*searchMinDate should be set for not to show previous dates on ToDate
		for example if fromDate is 9 toDate should not show dates before 9
	*/
	handleFromDate(date) {
		let selDate = moment(date).format("MM/DD/YYYY")
		let offer = this.state.offer
		offer.fromDate = selDate
		this.setState({
      startDate: date,
			selFromDate:selDate,
			searchMinDate:date,
			offer
    });
  }

	handleToDate(date) {
		let selDate = moment(date).format("MM/DD/YYYY")
		let offer = this.state.offer
		offer.toDate = selDate
		this.setState({
      startDate: date,
			selToDate:selDate,
			searchMaxDate:date,
			offer
    });
  }

	onPromocodeChange(event){
			let offer = this.state.offer
			offer.offerCode = event.target.value
			this.setState({offer})
	}

	onCustomerTypeChange(event){
			let offer = this.state.offer
			offer.customerType = event.target.value
			this.setState({offer})
	}

	onDeleteOffer(offer){
			this.props.actions.deleteOfferCall({offerCode:offer.offerCode,customerType:'MF'})
	}

	onEditOffer(offer){
		this.setState({editOffer:offer})
  }


	componentWillReceiveProps(nextProps) {

			if(undefined != this.props.offerList && this.props.offerList != nextProps.offerList){
				this.setState({offerList:nextProps.offerList,isProcessing:false,showOffersTable:true,searchMinDate:''})
			}else if(this.props.isDeletedOffer != nextProps.isDeletedOffer){
					if(nextProps.isDeletedOffer.status == 'Y'){
							let offerList = _.cloneDeep(this.state.offerList);
							let delOfferCode = nextProps.isDeletedOffer.offerCode;
							offerList.forEach(offer => {
									if(offer.offerCode == delOfferCode){
											offer.deletedDate = moment(new Date()).format("MM/DD/YYYY");
											offer.status = "I";
									}
							})
							this.setState({offerList})
					}
			}else if(this.props.incentiveOffer.editOfferStatus != nextProps.incentiveOffer.editOfferStatus){
					if(nextProps.incentiveOffer.editOfferStatus.status == 'YES'){
							let offerList = _.cloneDeep(this.state.offerList);
							let offer = nextProps.incentiveOffer.offer
							let editOfferCode = offer.offerCodeOld;
							offerList.forEach(off => {
									if(off.offerCode == editOfferCode){
											off.offerCode = offer.offerCodeNew
											off.validFrom = offer.validFrom
											off.validTo = offer.validTo
									}
							})
							this.setState({offerList})
					}
			}else{
				this.setState(this.getInitialState())
			}
	}


  render(){

				const heading = <h1>Manage Incentive Offers</h1>

				const searchOptions = {ajaxCalled:this.state.ajaxSearchCalled,selFromDate:this.state.selFromDate,selToDate:this.state.selToDate,minDate:this.state.searchMinDate,
					maxDate:this.state.searchMaxDate, startDate:this.state.startDate, onPromocodeChange:this.onPromocodeChange, onCustomerTypeChange:this.onPromocodeChange, handleFromDate:this.handleFromDate,
						handleToDate:this.handleToDate, searchPromocode:this.searchPromocode,offer:this.state.offer}

				return(
						<div>
							<div className="pageHeader">{heading}</div>
								<div className="box">
										<SavePromocode savePromoInitialState={this.state.savePromoInitialState}/>
										<SearchPromocode searchOptions={searchOptions} />
										{this.state.isProcessing?<Processing />:''}
										{this.state.showOffersTable?<SearchResults offerList={this.state.offerList} onEditOffer={this.onEditOffer} onDeleteOffer={this.onDeleteOffer}/>:''}
								</div>
						</div>
        );
    }
}

IncentiveOfferPage.propTypes = {
		actions: PropTypes.func.isRequired,
		offerList: PropTypes.arrayOf(PropTypes.object),
		isDeletedOffer: PropTypes.object,
		incentiveOffer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({offerList: state.listOffers, isDeletedOffer:state.deleteOffer, incentiveOffer:state.incentiveOffer})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(offerActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(IncentiveOfferPage)
