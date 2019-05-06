import React from 'react';
import * as offerActions from '../../../actions/offerActions.ts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ErrorBox } from '../../common/Error';
import Modal from '../../common/Modal'
import SaveModal from './SaveModal'
import FromDate from './FromDate'
import ToDate from './ToDate'
import moment from 'moment';
import CommonUtil from '../../common/Util'
import PropTypes from 'prop-types';

class SavePromocodeForm extends React.Component {

    constructor(props){
        super(props)
        this.state = this.props.savePromoInitialState

        this.toggleModal = this.toggleModal.bind(this)
        this.handleFromDate = this.handleFromDate.bind(this)
        this.handleToDate = this.handleToDate.bind(this)
        this.save = this.save.bind(this)
        this.onPromocodeChange = this.onPromocodeChange.bind(this)
        this.onCustomerTypeChange = this.onCustomerTypeChange.bind(this)
    }

      /*minDate should be set for not to show previous dates on ToDate
        for example if fromDate is 9 toDate should not show dates before 9
      */
      handleFromDate(date) {
        let selDate = moment(date).format("MM/DD/YYYY")
        let offer = this.state.offer
        offer.fromDate = selDate
        this.setState({
          startDate: date,
          selFromDate:selDate,
          minDate: date,
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
          maxDate: date,
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

    toggleModal(){
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    save(){
      let offer = this.state.offer
      offer.customerType ="MF";
      let errorMessage = "";

      if(!CommonUtil.isNotBlank(offer.offerCode)) errorMessage += "Please enter offer code. "
      if(!CommonUtil.isNotBlank(offer.fromDate)) errorMessage += "Please enter from date. "
      if(!CommonUtil.isNotBlank(offer.toDate)) errorMessage += "Please enter to date. "

      if(errorMessage == undefined || !CommonUtil.isNotBlank(errorMessage)){
          this.setState({errorMessage,isError:false})
          this.props.actions.createOfferCall(this.state.offer)
      }else{
          this.setState({errorMessage,isError:true})
      }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.incentiveOffer.saveOfferStatus != nextProps.incentiveOffer.saveOfferStatus){
            this.setState({isOpen:true,minDate:''})
        }else{
            this.setState(this.props.savePromoInitialState)
        }
    }

    render(){

        const { incentiveOffer } = this.props

        let message;
        let modalMessage;
        if(undefined != incentiveOffer.saveOfferStatus && incentiveOffer.saveOfferStatus.status == "F"){
            modalMessage = <b>Invalid promo code. Please check promo code and try again.</b>
        }else if(undefined != incentiveOffer.saveOfferStatus && incentiveOffer.saveOfferStatus.status == "YES"){
            modalMessage = <b>Offer Successfully Created</b>
        }else{
          modalMessage = <b>Offer Already Exists, Create A New Offer.</b>
        }

        return (
            <form>
            {message}
            <ErrorBox message={this.state.errorMessage} isError={this.state.isError}/>
            <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                <SaveModal onClose={this.toggleModal} message={modalMessage}/>
            </Modal>
              <h2>Create promo code</h2>
            <div className="formBG mT20">
                    <div className="inlineBlock spcthirtyeight movetitledown">
                          <div className="movetitledown pL20 ">
                              <div className="inlineBlock">
                                  <label htmlFor="offerCode">Promo Code</label>
                                <input name="offerCode" onChange={this.onPromocodeChange} value={this.state.offer.offerCode} maxLength="8" type="text" className="validate[required] twoSeventyTwo"/>
                              </div>
                          </div>
                          <div className="inlineBlock leftcolumntitlewrapper pL20 movetitledown">
                              <div className="inlineBlock">
                                  <FromDate handleDateChange={this.handleFromDate} maxDate={this.state.maxDate} startDate={this.state.startDate} selectedDate={this.state.selFromDate}/>
                                  <div className="left margtop cardselectboxspace">&#150;</div>
                                  <ToDate handleDateChange={this.handleToDate} minDate={this.state.minDate} startDate={this.state.startDate} selectedDate={this.state.selToDate}/>
                              </div>

                          </div>
                    </div>
                  {/*  <div className="inlineBlock vTop movetitledown">
                                  <label htmlFor="custType">Customer Type</label>
                                  <input name="custType" onChange={this.onCustomerTypeChange} type="radio" value="HB" className="validate[reqRadio[1]]"/>
                                  <label htmlFor="builder" className="textlabel displayinline">Builder</label>
                                  <input name="custType" onChange={this.onCustomerTypeChange} type="radio" value="MF" className="validate[reqRadio[1]] aLM"/>
                                  <label htmlFor="multiFamily" className="textlabel displayinline">Multi-Family</label>
                          </div>*/}
                    <div className="movetitledown pL20">
                            <button type="button" id="saveofferAjax" onClick={this.save} name="saveofferAjax" className="controlText-A search_arrow saLM">Save promo code</button>
                    </div>
                </div>
            </form>
        )
  }
}

const mapStateToProps = (state) => ({incentiveOffer: state.incentiveOffer})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(offerActions, dispatch)})

SavePromocodeForm.propTypes = {
    savePromoInitialState: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired,
    incentiveOffer: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePromocodeForm)
