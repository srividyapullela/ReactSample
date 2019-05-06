import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import * as mrktgAgrmtActions from '../../../actions/mrktgAgmtActions';
import PhysicalAddress from '../common/PhysicalAddress'
import BillingAddress from '../common/BillingAddress'
import PayableTo from '../common/PayableTo'
import SameAsCheckBox from '../common/SameAsCheckBox'
import PaymentAddress from '../common/PaymentAddress'
import { ErrorBox } from '../../common/Error'
import Cancel from '../../common/Cancel'

class PaymentInfoPage extends React.Component {

    constructor(props){
        super(props)

        this.state={
          sameAsCheckBoxVal:'',
          paymentInfo:{},
          payableTo:'',
          phoneNumber:'',
          extn:''
        }

        this.onContinue = this.onContinue.bind(this)
        this.onSameAsCheckBox = this.onSameAsCheckBox.bind(this)
        this.onPaymentAddrChange = this.onPaymentAddrChange.bind(this)
        this.getPaymentAddress = this.getPaymentAddress.bind(this)
    }

    onContinue(){
        let checkBoxVal = this.state.sameAsCheckBoxVal
        if(checkBoxVal == 'P' || checkBoxVal == 'B'){
            this.getPaymentAddress(checkBoxVal)
        }
        if(!this.validateForm()){
          this.setState({isError:true, errorMessage:"Please complete the form. All fields are required."})
        }else{
          this.setState({isError:false, errorMessage:""})
          this.props.actions.saveInfoFromPayPage(this.state.paymentInfo)
          this.props.history.push("/admin/marketingagreements/verify")
        }
    }

    validateForm(){
        if(undefined == this.state.payableTo || '' == this.state.payableTo){
            return false
        }
        let paymentInfo = this.state.paymentInfo
        if(paymentInfo.streetNumber == undefined || paymentInfo.streetName == undefined || paymentInfo.city == undefined
          || paymentInfo.state == undefined || paymentInfo.zipcode == undefined){
            return false;
        }
        return true
    }

    getPaymentAddress(val){
        let paymentInfo = this.state.paymentInfo
        let address = this.props.marketAgrmt.data.address
        if(val == 'P'){
            paymentInfo.paymentAddressOption = "samePhysical"
            paymentInfo.streetNumber = address.streetNumber
            paymentInfo.streetName = address.streetName
            paymentInfo.city = address.city
            paymentInfo.state = address.state
            paymentInfo.zipcode = address.zipcode
            paymentInfo.suiteNum = undefined != address.suiteNumber?address.suiteNumber:''
            paymentInfo.poBox = undefined != address.poBox?address.poBox:''
            paymentInfo.phoneNumber = undefined != address.phoneNumber?address.phoneNumber:''
            paymentInfo.extn = undefined != address.extn?address.extn:''
        }else if(val == 'B'){
            paymentInfo.paymentAddressOption = "sameBilling"
            paymentInfo.streetNumber = address.streetNumber
            paymentInfo.streetName = address.streetName
            paymentInfo.city = address.city
            paymentInfo.state = address.state
            paymentInfo.zipcode = address.zipcode
            paymentInfo.suiteNum = undefined != address.suiteNumber?address.suiteNumber:''
            paymentInfo.poBox = undefined != address.poBox?address.poBox:''
            paymentInfo.phoneNumber = undefined != address.phoneNumber?address.phoneNumber:''
            paymentInfo.extn = undefined != address.extn?address.extn:''
        }
        this.setState({paymentInfo})
    }

    onPaymentAddrChange(e, name){
        let paymentInfo = this.state.paymentInfo
        if(name == 'payto') {
          paymentInfo.payableTo = e.target.value
          this.setState({payableTo:e.target.value})
        }
        if(name == 'snumber') paymentInfo.streetNumber = e.target.value
        if(name == 'sname') paymentInfo.streetName = e.target.value
        if(name == 'suit') paymentInfo.suitNumber = e.target.value
        if(name == 'pobox') paymentInfo.poBox = e.target.value
        if(name == 'city') paymentInfo.city = e.target.value
        if(name == 'state') paymentInfo.state = e.target.value
        if(name == 'zip') paymentInfo.zipcode = e.target.value
        if(name == 'phone') paymentInfo.phoneNumber = e.target.value
        if(name == 'extn') paymentInfo.extn = e.target.value
        this.setState({paymentInfo})
    }

    onSameAsCheckBox(e){
        if(e.target.checked){
          this.setState({sameAsCheckBoxVal:e.target.value})
        }else{
          this.setState({sameAsCheckBoxVal:'',paymentInfo:{}})
        }
    }

    render(){

        const marketAgrmt = this.props.marketAgrmt
        const bpName = marketAgrmt.data.bpName

        if(!bpName){
          return <div></div>
        }

        const address = marketAgrmt.data.address

        const payAddrOptns = {address,val:this.state.sameAsCheckBoxVal,
              onPaymentAddrChange:this.onPaymentAddrChange,paymentInfo:this.state.paymentInfo}

        const heading = <h1>Payment Information</h1>

        return(
          <div>
           <div className="pageHeader">
                       {heading}
                </div>
          <div className="box">

              <div className="boxtitleseperator">&nbsp;</div>
              <ErrorBox message={this.state.errorMessage} isError={this.state.isError}/>
              <div id="headingError"></div>
              <div className="label">
                  {bpName}
              </div>
              <form name="paymentInfo" id="paymentInfo">
  	             <div className="left fullwidth movetitledown">
  		               <div className="spcseventy">
                       <PhysicalAddress address={address}/>
                       <BillingAddress address={address}/>
                     </div>
                </div>
                <PayableTo onPaymentAddrChange={this.onPaymentAddrChange} payableTo={this.state.payableTo}/>
                <SameAsCheckBox onSameAsCheckBox={this.onSameAsCheckBox} val={this.state.sameAsCheckBoxVal}/>
                <PaymentAddress payAddrOptns={payAddrOptns} />
                <div className="handle">
          				<Cancel/>
          				<button type="button" onClick={this.onContinue} className="right controlText-A">Continue<span></span></button>
          			</div>
              </form>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => ({marketAgrmt: state.marketAgreement})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(mrktgAgrmtActions, dispatch)})

PaymentInfoPage.propTypes = {
    history: PropTypes.func.isRequired,
    actions: PropTypes.func.isRequired,
    marketAgrmt: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfoPage)
