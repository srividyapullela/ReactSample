import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import * as mrktgAgrmtActions from '../../../../actions/mrktgAgmtActions'
import AddressInfo from '../../common/AddressInfo'
import FieldName from '../../common/FieldName'
import TieredFee from '../common/TieredFee'
import CommonUtil from '../../../common/Util'
import Cancel from '../../../common/Cancel'

class MrktgAgrmtVerifyPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {

        }

        this.onUpdate = this.onUpdate.bind(this)
        this.onFinish = this.onFinish.bind(this)
    }

    onUpdate(val){
        if(val == 'P'){
            this.props.history.push("/admin/marketingagreements/enterpaymentinfo")
        }else if(val == 'A'){
            this.props.history.push("/admin/marketingagreements/entermrkgagreement")
        }
    }

    onFinish(info){
        //console.log(info)
        this.props.actions.createMarketingAgreement(info)
        this.props.history.push("/admin/marketingagreements/confirm")
    }

    render(){

      const bpNumber = this.props.verifyInfo.bpNumber
      const address = this.props.verifyInfo.data.address
      const bpName = this.props.verifyInfo.data.bpName
      const agreement = this.props.verifyInfo.mrktgagrm.agreement
      const paymentInfo = this.props.verifyInfo.mrktgagrm.paymentInfo
      const paymentAddress = CommonUtil.getPaymentAddress(paymentInfo)
      const paymentPhoneNum = CommonUtil.getPaymentPhoneNum(paymentInfo.phoneNumber, paymentInfo.extn)
      const billingAddress = CommonUtil.getBillingAddress(address)
      const billingPhoneNum = CommonUtil.getPaymentPhoneNum(address.phoneNumber, agreement.extn)
      const doorFeeOption = agreement.doorFeeOption
      const doorFeeStructure = doorFeeOption == 'flatfee'?'Flat Fee':'Tiered Fee'
      const isFlatFee = doorFeeOption == 'flatfee'
      const doorFeeAmount = '$'+agreement.flatFee+"  per home"
      const agrTerm = agreement.agrTerm+" Months"
      const cancelFee = '$'+agreement.cancellationFee

      //This object is created for API call
      const info = {bpNumber,address,bpName,agreement,paymentInfo}

      return(
        <div>
        <div className="pageHeader">
                      <h1>Marketing Agreement - Verification</h1>
                </div>
          <div className="box">

            <div className="boxtitleseperator">&nbsp;</div>
          <AddressInfo address ={address} bpName={bpName}/>
            <form id="markAgmInfoFrm" name = "markAgmInfo" action="" method = "post">
              	<div className="left fullwidth">
              			<div className="left fullwidth">
              				<div className="rightcolumnwrapper b movetitledown left">Marketing Agreement Information</div>
                    <div className="left leftcolumnwrapper" id="updateMrkAgmInfo"><div className="right pointer" onClick={() => this.onUpdate("A")}>Update</div></div>
              			</div>
              	</div>

               <div className="left fullwidth movetitledown provideSpace">
                  <FieldName label="Vendor Number" value={agreement.vendorNumber} />
                  <FieldName label="Contract/Marketing Agreement Number" value={agreement.mrktgAgreementNum} />
                  <FieldName label="Door Fee Structure" value={doorFeeStructure} />
                  {isFlatFee?<FieldName label="Door Fee Amount" value={doorFeeAmount} />:<TieredFee agreement={agreement}/>}
                  <FieldName label="Start Date" value={agreement.fromDate} />
                  <FieldName label="End Date" value={agreement.toDate} />
                  <FieldName label="Agreement Term" value={agrTerm} />
                  <FieldName label="Cancellation Fee" value={cancelFee} />
                  <FieldName label="Brand" value={agreement.brand} />
                  <FieldName label="IO Number" value={agreement.ioNumber} />
                  <FieldName label="GL Number" value={agreement.glNumber} />
               </div>

              <div className="hr">&nbsp;</div>

              <div className="left fullwidth ">
              			<div className="left fullwidth">
              				<div className="rightcolumnwrapper b movetitledown left">Billing & Payment Information</div>
                    <div className="left leftcolumnwrapper" id="billandpayInfo"><div className="right pointer" onClick={() => this.onUpdate("P")}>Update</div></div>
              			</div>
              	</div>

              <div className="left fullwidth movetitledown provideSpace">
                <FieldName label="Billing address" value={billingAddress} />
                <FieldName label="Billing Phone number" value={billingPhoneNum} />
                <FieldName label="Payments Payable to" value={paymentInfo.payableTo} />
                <FieldName label="Payment address" value={paymentAddress} />
                <FieldName label="Payment Phone number" value={paymentPhoneNum} />
              </div>

              <div className="handle">
          				<Cancel />
                <button type="button" id="finishMarktAgreement" onClick={() => this.onFinish(info)} className="right controlText-A">Finish<span></span></button>
              </div>
            </form>
            <div className="hr">&nbsp;</div>
        </div>
      </div>
      )
    }

}


const mapStateToProps = (state) => ({verifyInfo: state.marketAgreement})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(mrktgAgrmtActions, dispatch)})

MrktgAgrmtVerifyPage.propTypes = {
    history: PropTypes.func.isRequired,
    actions: PropTypes.func.isRequired,
    verifyInfo: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MrktgAgrmtVerifyPage)
