import React from 'react'
import { connect } from 'react-redux'
import AddressInfo from '../common/AddressInfo'
import FieldName from '../common/FieldName'
import TieredFee from '../create/common/TieredFee'
import CommonUtil from '../../common/Util'
import PropTypes from 'prop-types';
import { ErrorBox } from '../../common/Error'

let UpdateConfirmPage = ({confirm}) => {


    //console.log(confirm)
    if(!confirm.mrktgagrm){
      return <div></div>
    }

    const marketAgrmt = confirm.mrktgagrm
    const confirmation = marketAgrmt.confirm
    const address = confirm.data.address
    const bpName = confirm.data.bpName
    const agreement = marketAgrmt.agreement
    const paymentInfo = marketAgrmt.paymentInfo
    const paymentAddr = {city: paymentInfo.city,extn: paymentInfo.extn,phoneNumber: paymentInfo.phoneNumber,streetNumber: paymentInfo.streetNumber,
          suiteNumber: paymentInfo.suiteNumber,poBox: paymentInfo.poBox,state:paymentInfo.state,streetName:paymentInfo.streetName,zipcode:paymentInfo.zipcode}

    const billingAddr = confirm.data.paymentInfo.billingAddress

    const paymentAddress = CommonUtil.getPaymentAddressFromAgrm(paymentAddr)
    const paymentPhoneNum = CommonUtil.getPaymentPhoneNum(paymentAddr.phoneNumber, paymentAddr.extn)
    const billingAddress = CommonUtil.getPaymentAddressFromAgrm(billingAddr)
    const billingPhoneNum = CommonUtil.getPaymentPhoneNum(billingAddr.phoneNumber, billingAddr.extn)
    const doorFeeOption = agreement.doorFeeStructure
    const doorFeeStructure = doorFeeOption == 'flatfee'?'Flat Fee':'Tiered Fee'
    const isFlatFee = doorFeeOption == 'flatfee'
    const doorFeeAmount = '$'+agreement.doorFeeAmount+"  per home"
    const agrTerm = agreement.agreementTerm+" Months"
    const startDate = CommonUtil.isNotBlank(agreement.fromDate)?agreement.fromDate:agreement.startDate
    const endDate = CommonUtil.isNotBlank(agreement.toDate)?agreement.toDate:agreement.endDate
    const cancelFee = '$'+agreement.cancelFee

    const errorMessage = "Unable to update marketing agreement. Please try again."

    return(
    <div>
     <div className="pageHeader">
                    <h1>Marketing Agreement - Confirmation</h1>
                </div>
      <div className="box">
        {!confirmation?<ErrorBox message={errorMessage} isError={!confirmation} />:""}
        <div className="boxtitleseperator">&nbsp;</div>
        	<AddressInfo address={address} bpName={bpName}/>
        	<div className="left fullwidth">
        			<div className="left fullwidth">
        				<div className="rightcolumnwrapper b movetitledown left">Marketing Agreement Information</div>
              </div>
        	</div>
          <div className="left fullwidth movetitledown provideSpace">
            <FieldName label="Vendor Number" value={agreement.vendorNumber} />
            <FieldName label="Contract/Marketing Agreement Number" value={agreement.contractAgrmNumber} />
            <FieldName label="Door Fee Structure" value={doorFeeStructure} />
            {isFlatFee?<FieldName label="Door Fee Amount" value={doorFeeAmount} />:<TieredFee agreement={agreement}/>}
            <FieldName label="Start Date" value={startDate} />
            <FieldName label="End Date" value={endDate} />
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
      			</div>
        	</div>

          <div className="left fullwidth movetitledown provideSpace">
            <FieldName label="Billing address" value={billingAddress} />
            <FieldName label="Billing Phone number" value={billingPhoneNum} />
            <FieldName label="Payments Payable to" value={paymentInfo.payableTo} />
            <FieldName label="Payment address" value={paymentAddress} />
            <FieldName label="Payment Phone number" value={paymentPhoneNum} />
          </div>
          <div className="hr">&nbsp;</div>
      </div>
    </div>
    );
}


const mapStateToProps = (state) => ({confirm: state.marketAgreement})

UpdateConfirmPage.propTypes = {
    confirm: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(UpdateConfirmPage)
