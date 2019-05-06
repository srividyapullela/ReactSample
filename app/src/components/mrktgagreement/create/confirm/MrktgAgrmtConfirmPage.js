import React from 'react'
import { connect } from 'react-redux'
import AddressInfo from '../../common/AddressInfo'
import FieldName from '../../common/FieldName'
import TieredFee from '../common/TieredFee'
import CommonUtil from '../../../common/Util'
import PropTypes from 'prop-types';

let MrktgAgrmtConfirmPage = ({confirmInfo}) => {

    if(!confirmInfo.mrktgagrm){
      return <div></div>
    }

    const address = confirmInfo.data.address
    const bpName = confirmInfo.data.bpName
    const agreement = confirmInfo.mrktgagrm.agreement
    const paymentInfo = confirmInfo.mrktgagrm.paymentInfo
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

    return(
    <div>
            <div className="pageHeader">
                       <h1>Marketing Agreement - Confirmation</h1>
                </div>
      <div className="box">

        <div className="boxtitleseperator">&nbsp;</div>
          <AddressInfo address={address} bpName={bpName}/>
        	<div className="left fullwidth">
        			<div className="left fullwidth">
        				<div className="rightcolumnwrapper b movetitledown left">Marketing Agreement Information</div>
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


const mapStateToProps = (state) => ({confirmInfo: state.marketAgreement})

MrktgAgrmtConfirmPage.propTypes = {
    confirmInfo: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(MrktgAgrmtConfirmPage)
