import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import * as mrktgAgrmtActions from '../../../actions/mrktgAgmtActions';
import VendorNumber from '../common/VendorNumber'
import MrktgAgrmNumber from '../common/MrktgAgrmNumber'
import DoorFee from '../common/DoorFee'
import FromDate from '../common/FromDate'
import ToDate from '../common/ToDate'
import AgreementTerm from '../common/AgreementTerm'
import CancellationFee from '../common/CancellationFee'
import Brand from '../common/Brand'
import { ErrorBox } from '../../common/Error'
import moment from 'moment';
import Cancel from '../../common/Cancel'

class EnterMrktgAgreementPage extends React.Component {

    constructor(props){
        super(props)
        let agreement = Object.assign({},((undefined != this.props.marketAgrmt.mrktgagrm)?(this.props.marketAgrmt.mrktgagrm.agreement):""));
        let doorFeeOption = undefined != agreement.doorFeeOption?agreement.doorFeeOption:""
        this.state = {
            doorFeeOption,
            agreement,
            isError:false,
            errorMessage:"",
            startDate:'',
    				selFromDate:moment().format("MM/DD/YYYY"),
    				selToDate:moment().format("MM/DD/YYYY"),
            termValue:"calculated based on start and end date",

        }

        this.onDoorFeeChange = this.onDoorFeeChange.bind(this)
        this.onChangeFieldValue = this.onChangeFieldValue.bind(this)
        this.onContinue = this.onContinue.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleFromDate = this.handleFromDate.bind(this)
        this.handleToDate = this.handleToDate.bind(this)
        this.calculateDiffDates = this.calculateDiffDates.bind(this)
    }

    handleFromDate(date){
      let selDate = moment(date).format("MM/DD/YYYY")
      let agreement = this.state.agreement
      agreement.fromDate = selDate
      this.calculateDiffDates(selDate, this.state.todate)
  		this.setState({
        startDate: date,
  			selFromDate:selDate,
        agreement
      });
    }

  	handleToDate(date) {
      let selDate = moment(date).format("MM/DD/YYYY")
      let agreement = this.state.agreement
      agreement.toDate = selDate
      this.calculateDiffDates(this.state.selFromDate, selDate)
  		this.setState({
        startDate: date,
  			selToDate:selDate,
        agreement
      });
    }

    calculateDiffDates(fromDate, toDate){

        if(undefined != fromDate && undefined != toDate){
            let fDate =  moment(fromDate, 'MM/DD/YYYY')
            let tDate =  moment(toDate, 'MM/DD/YYYY')
            let diff = tDate.diff(fDate, 'months')
            if(diff < 1){
                this.setState({isTermErr:true,termValue:"",termErrMsg:"To continue processing your request, the Marketing Agreement Term end date must be at least one month than the start date."})
            }else{
                let agreement = this.state.agreement
                agreement.agrTerm = diff
                this.setState({isTermErr:false,termValue:diff+' Months',agreement})
            }
        }
    }

    onDoorFeeChange(e){
        let val = e.target.value
        let agreement = this.state.agreement
        agreement.doorFeeOption = val
        this.setState({doorFeeOption:val, agreement})
    }

    onChangeFieldValue(event, name){
        let agreement = this.state.agreement
        let val = event.target.value
        if(name == 'vnumber'){agreement.vendorNumber = val}
        if(name == 'cnumber'){agreement.mrktgAgreementNum = val}
        if(name == 'cfee'){agreement.cancellationFee = val}
        if(name == 'brand'){agreement.brand = val}
        if(name == 'inumber'){agreement.ioNumber = val}
        if(name == 'gnumber'){agreement.glNumber = val}
        if(name == 'flatfee'){agreement.flatFee = val}
        if(name == 'tf1'){agreement.tier1Fee = val}
        if(name == 'tf2'){agreement.tier2Fee = val}
        if(name == 'tf3'){agreement.tier3Fee = val}
        if(name == 'mr1'){agreement.moveInRate1 = val}
        if(name == 'mr2'){agreement.moveInRate2 = val}
        if(name == 'mr3'){agreement.moveInRate3 = val}
        this.setState({agreement})
    }

    onContinue(){
        if(!this.validateForm() || this.state.isTermErr){
            let errorMessage = "Please complete the form. All fields are required."
            this.setState({isError:!this.state.isTermErr, errorMessage})
        }else{
            this.setState({isError:false, errorMessage:""})
            this.props.actions.saveInfoFromEnterPage(this.state.agreement)
            this.props.history.push("/admin/marketingagreements/enterpaymentinfo")
        }
    }

    validateForm(){
        let agrmt = this.state.agreement
        if(undefined == agrmt.vendorNumber || "" == agrmt.vendorNumber) return false;
        if(undefined == agrmt.mrktgAgreementNum || "" == agrmt.mrktgAgreementNum) return false;
        if(undefined == agrmt.cancellationFee || "" == agrmt.cancellationFee) return false;
        if(undefined == agrmt.glNumber || "" == agrmt.glNumber) return false;
        if(undefined == agrmt.ioNumber || "" == agrmt.ioNumber) return false;
        if(undefined == agrmt.brand || "" == agrmt.brand) return false;
        if(undefined == agrmt.fromDate || "" == agrmt.fromDate) return false;
        if(undefined == agrmt.toDate || "" == agrmt.toDate) return false;
        if(undefined == agrmt.doorFeeOption || "" == agrmt.doorFeeOption) return false;
        if(undefined != agrmt.doorFeeOption){
            if(agrmt.doorFeeOption == 'flatfee'){
                if(undefined == agrmt.flatFee) return false;
            }else{
              if(agrmt.tier1Fee == undefined || agrmt.tier2Fee == undefined || agrmt.moveInRate1 == undefined || agrmt.moveInRate2 == undefined){
                return false;
              }
            }
        }
        return true
    }

    render() {

      const marketAgrmt = this.props.marketAgrmt
      const bpName = marketAgrmt.data.bpName

      if(!bpName){
        return <div></div>
      }

      const doorFeeOptions = {doorFeeOption:this.state.doorFeeOption, onDoorFeeChange:this.onDoorFeeChange,
        onChangeFieldValue:this.onChangeFieldValue,doorFeeAmount:this.state.agreement.flatFee}

      let fromSelDate = undefined == this.state.agreement.fromDate?this.state.selFromDate:this.state.agreement.fromDate
      let toSelDate = undefined == this.state.agreement.toDate?this.state.selToDate:this.state.agreement.toDate

      return(
      <div>
      <div className="pageHeader">
            <h1>Marketing Agreement</h1>
      </div>
        <div className="box">

          <div className="boxtitleseperator">&nbsp;</div>
          <ErrorBox message={this.state.errorMessage} isError={this.state.isError}/>
          <div id="createMarktAgrFrm">
              <div className="clear"></div>
              <div className="b">
                {bpName}
              </div>
              <VendorNumber onChangeFieldValue={this.onChangeFieldValue} vendorNumber={this.state.agreement.vendorNumber}/>
              <MrktgAgrmNumber onChangeFieldValue={this.onChangeFieldValue} mrktgAgreementNum={this.state.agreement.mrktgAgreementNum}/>
              <DoorFee doorFeeOptions={doorFeeOptions} onChangeFieldValue={this.onChangeFieldValue}/>
              <ErrorBox message={this.state.termErrMsg} isError={this.state.isTermErr}/>
              <div className="left">
                  <FromDate handleDateChange={this.handleFromDate} selectedDate={fromSelDate}/>
                  <div className="left margtop"><span className="greywhiteboxadjacent">&#150;</span></div>
                  <ToDate handleDateChange={this.handleToDate} selectedDate={toSelDate}/>
              </div>
              <AgreementTerm termValue={this.state.termValue}/>
              <CancellationFee onChangeFieldValue={this.onChangeFieldValue} cancellationFee={this.state.agreement.cancellationFee}/>
            <Brand onChangeFieldValue={this.onChangeFieldValue} brand={this.state.agreement.brand} IONumber={this.state.agreement.ioNumber} GLNumber={this.state.agreement.glNumber}/>
              <div className="handle">
                  <Cancel/>
                  <button type="button" onClick={this.onContinue} className="right controlText-A b_submit">Continue<span></span></button>
              </div>
            </div>
        </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({marketAgrmt: state.marketAgreement})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(mrktgAgrmtActions, dispatch)})

EnterMrktgAgreementPage.propTypes = {
    history: PropTypes.func.isRequired,
    actions: PropTypes.func.isRequired,
    marketAgrmt: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterMrktgAgreementPage)
