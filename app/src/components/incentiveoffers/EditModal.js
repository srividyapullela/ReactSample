import React from 'react';
import * as offerActions from './../../actions/offerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ErrorBox } from './../common/Error';
import FromDate from './save/FromDate'
import ToDate from './save/ToDate'
import moment from 'moment';
import PropTypes from 'prop-types';


class EditPromocodeForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            offerCodeOld:this.props.offer.offerCode,
            offerCodeNew:this.props.offer.offerCode,
            cutomerTypeNew:'MF',
            cutomerTypeOld:'MF',
            startDate:'',
            selFromDate: moment(this.props.offer.validFrom).format("MM/DD/YYYY"),
            selToDate: moment(this.props.offer.validTo).format("MM/DD/YYYY"),
            errorMessage:'',
            isError:false,
            minDate: moment(this.props.offer.validFrom,"MM/DD/YYYY")
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.handleFromDate = this.handleFromDate.bind(this)
        this.handleToDate = this.handleToDate.bind(this)
        this.save = this.save.bind(this)
        this.onPromocodeChange = this.onPromocodeChange.bind(this)
    }

    /*minDate should be set for not to show previous dates on ToDate
      for example if fromDate is 9 toDate should not show dates before 9
    */
    handleFromDate(date) {
        let selDate = moment(date).format("MM/DD/YYYY")
        this.setState({startDate:date,selFromDate:selDate,minDate:date});
    }

    handleToDate(date) {
        let selDate = moment(date).format("MM/DD/YYYY")
        this.setState({startDate: date,selToDate:selDate,maxDate:date});
    }

    onPromocodeChange(event){
        this.setState({offerCodeNew:event.target.value})
    }

    /*onCustomerTypeChange(event){
        let offer = this.state.offer
        offer.customerType = event.target.value
        this.setState({offer})
    }*/

    toggleModal(){
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    save(){
        let offer = {}
        offer.customerType ="MF";
        offer.offerCodeNew = this.state.offerCodeNew
        offer.offerCodeOld = this.state.offerCodeOld
        offer.validFrom = this.state.selFromDate
        offer.validTo = this.state.selToDate
        offer.customerTypeNew = this.state.customerTypeNew
        offer.customerTypeOld = this.state.customerTypeOld
        let errorMessage = "";

        if(offer.offerCodeNew == undefined || offer.offerCodeNew == "") errorMessage += "Please enter offer code. "
        if(offer.validFrom == undefined || offer.validFrom == "") errorMessage += "Please enter from date. "
        if(offer.validTo == undefined || offer.validTo == "") errorMessage += "Please enter to date. "
        if(errorMessage == undefined || errorMessage == ""){
            this.setState({errorMessage,isError:false})
            this.props.actions.editOfferCall(offer)
        }else{
            this.setState({errorMessage,isError:true})
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.incentiveOffer != nextProps.incentiveOffer){
            this.props.onClose()
        }
    }

    render(){

        const { onClose } = this.props

        let message;
        /*
        let modalMessage;
        if(undefined != incentiveOffer.editOfferStatus && incentiveOffer.editOfferStatus.status == "F"){
            modalMessage = <b>Invalid promo code. Please check promo code and try again.</b>
        }else if(undefined != incentiveOffer.editOfferStatus && incentiveOffer.editOfferStatus.status == "YES"){
            modalMessage = <b>Offer Successfully Created</b>
        }else{
            modalMessage = <b>Offer Already Exists, Create A New Offer.</b>
        }
        */

        return (
            <form>
            {message}
            <ErrorBox message={this.state.errorMessage} isError={this.state.isError}/>
            <div>
              <div className="M-heading"><h1>Edit Offer</h1></div>
              <div id="headingError"><div id="headingError-H" className="normalText"></div><ul></ul></div>
              <div className="M-content">
                  <form name="createOfferFrm" id="createOfferFrm">

                <div className="left fullwidth">
                  <div className="left fullwidth movetitledown">
                    <div className="left halfwidth">
                      <label htmlFor="editOfferCode">Promo Code</label>
                    <input type="text" className="validate[required]" name="editOfferCode" maxLength = "8" onChange={this.onPromocodeChange} value={this.state.offerCodeNew}></input>
                    </div>
                  </div>
                  <div className="inlineBlock leftcolumntitlewrapper pL20 movetitledown">
                      <div className="inlineBlock">
                          <FromDate handleDateChange={this.handleFromDate} maxDate={this.state.maxDate} startDate={moment(this.state.selFromDate,"MM/DD/YYYY")} selectedDate={this.state.selFromDate}/>
                          <div className="left margtop cardselectboxspace">&#150;</div>
                          <ToDate handleDateChange={this.handleToDate} minDate={this.state.minDate} startDate={moment(this.state.selToDate,"MM/DD/YYYY")} selectedDate={this.state.selToDate}/>
                      </div>
                  </div>
                  <div className="handle">
                    <button type="button" id="backButton" onClick={onClose} className="left controlText-B">Cancel</button>
                    <button type="button" id="saveofferAjax" onClick={this.save} name="saveofferAjax" className="controlText-A search_arrow saLM">Save promo code</button>
                 </div>
                </div>
                </form>
              </div>
            </div>
          </form>
      );
 }
}

const mapStateToProps = (state) => ({incentiveOffer: state.incentiveOffer})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(offerActions, dispatch)})

EditPromocodeForm.propTypes = {
    offer: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    onEditOffer: PropTypes.func.isRequired,
    incentiveOffer: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPromocodeForm)
