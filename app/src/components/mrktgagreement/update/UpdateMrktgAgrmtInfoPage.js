import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import PropTypes from 'prop-types';

class UpdateMrktgAgrmtInfoPage extends React.Component {

    constructor(props){
        super(props)
        let agreement = Object.assign({},this.props.marketAgrmt.data.agreementInfo)
        const bpNumber = this.props.marketAgrmt.bpNumber
        const bpName = this.props.marketAgrmt.data.bpName

        this.state = {
            agreement: agreement,
            doorFeeOption:agreement,
            isError:false,
            errorMessage:"",
            startDate: '',
    				selFromDate:moment(agreement.startDate, 'YYYY-MM-DD').format("MM/DD/YYYY"),
    				selToDate:moment(agreement.endDate, 'YYYY-MM-DD').format("MM/DD/YYYY"),
            termValue:"calculated based on start and end date",
            bpNumber,
            bpName
        }

        this.onDoorFeeChange = this.onDoorFeeChange.bind(this)
        this.onChangeFieldValue = this.onChangeFieldValue.bind(this)
        this.onSave = this.onSave.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleFromDate = this.handleFromDate.bind(this)
        this.handleToDate = this.handleToDate.bind(this)
        this.calculateDiffDates = this.calculateDiffDates.bind(this)
    }

    handleFromDate(date) {
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
                this.setState({isTermErr:true,termValue:"",termErrMsg:"To continue processing your request, the Marketing Agreement Term end date must be at least one month then the start date."})
            }else{
                let agreement = this.state.agreement
                agreement.agreementTerm = diff
                this.setState({isTermErr:false,termValue:diff+' Months',agreement})
            }
        }
    }

    onDoorFeeChange(e){
        let val = e.target.value
        let agreement = this.state.agreement
        agreement.doorFeeStructure = val
        this.setState({doorFeeStructure:val, agreement})
    }

    onChangeFieldValue(event, name){
        let agreement = this.state.agreement
        let val = event.target.value
        if(name == 'vnumber'){agreement.vendorNumber = val}
        if(name == 'cnumber'){agreement.contractAgrmNumber = val}
        if(name == 'cfee'){agreement.cancelFee = val}
        if(name == 'brand'){agreement.brand = val}
        if(name == 'inumber'){agreement.ioNumber = val}
        if(name == 'gnumber'){agreement.glNumber = val}
        if(name == 'flatfee'){agreement.doorFeeAmount = val}
        if(name == 'tf1'){agreement.tier1Fee = val}
        if(name == 'tf2'){agreement.tier2Fee = val}
        if(name == 'tf3'){agreement.tier3Fee = val}
        if(name == 'mr1'){agreement.moveInRate1 = val}
        if(name == 'mr2'){agreement.moveInRate2 = val}
        if(name == 'mr3'){agreement.moveInRate3 = val}
        this.setState({agreement})
    }

    onSave(){
        if(!this.validateForm()){
            this.setState({isError:true, errorMessage:"Please complete the form."})
        }else{
            let agreement = this.state.agreement
            let startDateVal =(undefined != agreement.fromDate)?agreement.fromDate:moment(agreement.startDate, "YYYY-MM-DD").format("MM/DD/YYYY")
            let endDateVal =(undefined != agreement.toDate)?agreement.toDate:moment(agreement.endDate, "YYYY-MM-DD").format("MM/DD/YYYY")

            agreement.startDate = startDateVal
            agreement.endDate = endDateVal
            this.setState({isError:false, errorMessage:""})
            const dataIn = {updateType:"A",agreement,bpNumber:this.state.bpNumber,bpName:this.state.bpName}
            this.props.actions.updateMarketingAgreement(dataIn)
            this.props.history.push("/admin/marketingagreements/update/confirm")
        }
    }

    validateForm(){
        let agrmt = this.state.agreement
        if(undefined == agrmt.vendorNumber || undefined == agrmt.contractAgrmNumber || undefined == agrmt.cancelFee ||
            undefined == agrmt.glNumber || undefined == agrmt.ioNumber || undefined == agrmt.brand || undefined == agrmt.startDate ||
              undefined == agrmt.endDate || undefined == agrmt.doorFeeStructure){

            return false
        }
        if(undefined != agrmt.doorFeeStructure){
            if(agrmt.doorFeeStructure == 'flatfee'){
                if(undefined == agrmt.doorFeeAmount) return false;
            }else{
              if(agrmt.tier1Fee == undefined || agrmt.tier2Fee == undefined || agrmt.moveInRate1 == undefined || agrmt.moveInRate2 == undefined){

                return false;
              }
            }
        }
        return true
    }

    render() {

      if(!this.state.agreement){
        return <div></div>
      }

      const agreement = this.state.agreement

      const doorFeeOptions = {doorFeeOption:agreement.doorFeeStructure, onDoorFeeChange:this.onDoorFeeChange,onChangeFieldValue:this.onChangeFieldValue,
          doorFeeAmount:agreement.doorFeeAmount == 'NA'?"000.00":agreement.doorFeeAmount,
          tierFee1:agreement.tier1Fee == 'NA'?"000.00":agreement.tier1Fee,
          tierFee2:agreement.tier2Fee == 'NA'?"000.00":agreement.tier2Fee,
          tierFee3:agreement.tier3Fee == 'NA'?"000.00":agreement.tier3Fee,
          moveInRate1:agreement.moveInRate1,moveInRate2:agreement.moveInRate2,moveInRate3:agreement.moveInRate3}

      return(
          <div>
            <div className="pageHeader">
                           <h1>Marketing Agreement</h1>
                      </div>
              <div className="box">

                <div className="boxtitleseperator">&nbsp;</div>
                <ErrorBox message={this.state.errorMessage} isError={this.state.isError}/>
                <form name="createMarktAgrFrm" id="createMarktAgrFrm" method="post">
                    <div className="clear"></div>
                    <div className="b">
                      {agreement.businessName}
                    </div>
                    <VendorNumber onChangeFieldValue={this.onChangeFieldValue} vendorNumber={agreement.vendorNumber}/>
                    <MrktgAgrmNumber onChangeFieldValue={this.onChangeFieldValue} mrktgAgreementNum={agreement.contractAgrmNumber}/>
                    <DoorFee doorFeeOptions={doorFeeOptions} onChangeFieldValue={this.onChangeFieldValue}/>
                    <ErrorBox message={this.state.termErrMsg} isError={this.state.isTermErr}/>
                    <div className="left">
                        <FromDate handleDateChange={this.handleFromDate} startDate={this.state.startDate} selectedDate={this.state.selFromDate}/>
                        <div className="left margtop"><span className="greywhiteboxadjacent">&#150;</span></div>
                        <ToDate handleDateChange={this.handleToDate} startDate={this.state.startDate} selectedDate={this.state.selToDate}/>
                    </div>
                    <AgreementTerm termValue={this.state.termValue}/>
                    <CancellationFee onChangeFieldValue={this.onChangeFieldValue} cancellationFee={agreement.cancelFee}/>
                    <Brand onChangeFieldValue={this.onChangeFieldValue} brand={agreement.brand} IONumber={agreement.ioNumber} GLNumber={agreement.glNumber}/>
                    <div className="handle">
                        <Cancel />
                        <button type="button" onClick={this.onSave} className="right controlText-A">Save<span></span></button>
                    </div>
                  </form>
              </div>
          </div>
      );
    }
}

const mapStateToProps = (state) => ({marketAgrmt: state.marketAgreement})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(mrktgAgrmtActions, dispatch)})

UpdateMrktgAgrmtInfoPage.propTypes = {
    history: PropTypes.func.isRequired,
    actions: PropTypes.func.isRequired,
    marketAgrmt: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMrktgAgrmtInfoPage)
