import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mrktgAgrmtActions from '../../../actions/mrktgAgmtActions'
import AddressInfo from '../common/AddressInfo'
import FieldName from '../common/FieldName'
import TieredFee from '../create/common/TieredFee'
import CommonUtil from '../../common/Util'
import Status from './Status'
import Processing from '../../common/Processing'
import moment from 'moment'
import PropTypes from 'prop-types';

class UpdateMrktgAgreementPage extends React.Component {

    constructor(props){
        super(props)
        let marketAgrmt = this.props.marketAgrmt
        let status = marketAgrmt.active?'A':'I'
        let isActive = marketAgrmt.active
        let bpNumber = marketAgrmt.bpNumber
        this.state = {
            status,
            isActive,
            bpNumber,
            isProcessing:false,
            showResult:true,
        }

        this.onStatusChange = this.onStatusChange.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
    }

    onStatusChange(e){
        let val = e.target.value
        this.setState({status:val,isProcessing:true,showResult:false})
        this.props.actions.updateMarketingAgreementSts({status:val,bpNumber:this.state.bpNumber})
    }

    onUpdate(e,page){
        if(page == 'P'){
            this.props.history.push('/admin/marketingagreements/update/paymentinfo')
        }else if(page == 'I'){
            this.props.history.push('/admin/marketingagreements/update/info')
        }
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps.status)
        this.setState({isProcessing:false,showResult:true})
        if(nextProps.status.status){
            this.setState({isActive:!this.state.isActive})
        }
    }

    render(){

      const marketAgrmt = this.props.marketAgrmt
      const address = marketAgrmt.data.address
      const bpName = marketAgrmt.data.bpName
      const agreement = marketAgrmt.data.agreementInfo
      const paymentInfo = marketAgrmt.data.paymentInfo
      const paymentAddr = paymentInfo.paymentAddress
      const billingAddr = paymentInfo.billingAddress

      const paymentAddress = CommonUtil.getPaymentAddressFromAgrm(paymentAddr)
      const paymentPhoneNum = CommonUtil.getPaymentPhoneNum(paymentAddr.phoneNumber, paymentAddr.extn)
      const billingAddress = CommonUtil.getPaymentAddressFromAgrm(billingAddr)
      const billingPhoneNum = CommonUtil.getPaymentPhoneNum(billingAddr.phoneNumber, billingAddr.extn)
      const doorFeeOption = agreement.doorFeeStructure
      const doorFeeStructure = doorFeeOption == 'flatfee'?'Flat Fee':'Tiered Fee'
      const isFlatFee = doorFeeOption == 'flatfee'
      const doorFeeAmount = '$'+agreement.doorFeeAmount+"  per home"
      const agrTerm = agreement.agreementTerm+" Months"
      const disableClass = this.state.isActive?'':'greybox'
      const startDate = moment(agreement.startDate, "YYYY-MM-DD").format("MM/DD/YYYY")
      const endDate = moment(agreement.endDate, "YYYY-MM-DD").format("MM/DD/YYYY")
      const cancelFee = '$'+agreement.cancelFee

      return(
        <div>
         <div className="pageHeader">
                     <h1>Marketing Agreement</h1>
                </div>
        <div className="box">

          <div className="boxtitleseperator">&nbsp;</div>
          <AddressInfo address={address} bpName={bpName}/>
          <Status status={this.state.status} onStatusChange={this.onStatusChange}/>
          {this.state.isProcessing?<Processing />:''}
          {this.state.showResult?
            <div className={`left fullwidth mtTwentyFive ${disableClass}`} id="infoHolder">
              <form id="markAgmInfoFrm" name = "markAgmInfo" action="" method = "post">
                  <div className="left fullwidth">
                      <div className="left fullwidth">
                        <div className="rightcolumnwrapper b movetitledown left">Marketing Agreement Information</div>
                        <div className="left leftcolumnwrapper" id="updateMrkAgmInfo" >
                        <div className="right">{this.state.isActive?<a onClick={(e) => {this.onUpdate(e,'I')}}>Update</a>:''}</div></div>
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
              </form>
              <div className="hr">&nbsp;</div>
              <form id="billandpayInfoFrm" name = "billandpayInfoFrm">
                  <div className="left fullwidth ">
                        <div className="left fullwidth">
                          <div className="rightcolumnwrapper b movetitledown left">Billing & Payment Information</div>
                          <div className="left leftcolumnwrapper" id='billandpayInfo'>
                          <div className="right">{this.state.isActive?<a onClick={(e) => {this.onUpdate(e,'P')}}>Update</a>:''}</div></div>
                        </div>
                    </div>
                    <div className="left fullwidth movetitledown provideSpace">
                      <FieldName label="Billing address" value={billingAddress} />
                      <FieldName label="Billing Phone number" value={billingPhoneNum} />
                      <FieldName label="Payments Payable to" value={paymentInfo.payableTo} />
                      <FieldName label="Payment address" value={paymentAddress} />
                      <FieldName label="Payment Phone number" value={paymentPhoneNum} />
                    </div>
              </form>
              <div className="hr">&nbsp;</div>
            </div>:''}
        </div>
      </div>
      );
    }
}


const mapStateToProps = (state) => ({marketAgrmt: state.marketAgreement, status:state.marketAgrmStatus})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(mrktgAgrmtActions, dispatch)})

UpdateMrktgAgreementPage.propTypes = {
    history: PropTypes.func.isRequired,
    actions: PropTypes.func.isRequired,
    marketAgrmt: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMrktgAgreementPage)
