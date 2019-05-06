import React from 'react'
import * as conts from '../../common/constants'
import PropTypes from 'prop-types';

let PaymentAddress = ({payAddrOptns}) => {

    const { address, val, onPaymentAddrChange, paymentInfo } = payAddrOptns

    let streetNumber, streetName, city, state, zipcode, suiteNum, poBox,phoneNumber,extn
    if(val == 'P'){
        streetNumber = address.streetNumber
        streetName = address.streetName
        city = address.city
        state = address.state
        zipcode = address.zipcode
        suiteNum = undefined != address.suiteNumber?address.suiteNumber:''
        poBox = undefined != address.poBox?address.poBox:''
        phoneNumber = undefined == address.phoneNumber?'':address.phoneNumber
        extn = undefined == address.extn?'':address.extn
    }else if(val == 'B'){
        streetNumber = address.streetNumber
        streetName = address.streetName
        city = address.city
        state = address.state
        zipcode = address.zipcode
        suiteNum = undefined != address.suiteNumber?address.suiteNumber:''
        poBox = undefined != address.poBox?address.poBox:''
        phoneNumber = undefined == address.phoneNumber?'':address.phoneNumber
        extn = undefined == address.extn?'':address.extn
    }else{
        streetNumber = undefined == paymentInfo.streetNumber?'':paymentInfo.streetNumber
        streetName = undefined == paymentInfo.streetName?'':paymentInfo.streetName
        city = undefined == paymentInfo.city?'':paymentInfo.city
        state = undefined == paymentInfo.state?'':paymentInfo.state
        zipcode = undefined == paymentInfo.zipcode?'':paymentInfo.zipcode
        suiteNum = undefined == paymentInfo.suitNumber?'':paymentInfo.suitNumber
        poBox = undefined == paymentInfo.poBox?'':paymentInfo.poBox
        phoneNumber = undefined == paymentInfo.phoneNumber?'':paymentInfo.phoneNumber
        extn = undefined == paymentInfo.extn?'':paymentInfo.extn
    }

    //console.log(zipcode)

    const selOptions = conts.usstates.map((el) => (
        <option key={el} selected={el == state} value={el}>{el}</option>
    ));

    return(
      <div className="left fullwidth billData">
        <div className="left fullwidth">
          <div className="secoundcolumndata left">
            <div className="left wrapDivContent">
              <label htmlFor="streetNum">Street Number</label>
              <input type="text" onChange={(e) => onPaymentAddrChange(e,'snumber')} value={streetNumber} maxLength="40" className="validate[required] mediumtext" name="paymentStreetNum" />
            </div>
            <div className="left aLM">
              <label htmlFor="streetName">Street Name</label>
            <input type="text" onChange={(e) => onPaymentAddrChange(e,'sname')} value={streetName} maxLength="40" className="validate[required] mdInptField" name="paymentStreetName" />
            </div>
          </div>
          <div className="left aLM">
             <div className="left">
              <label htmlFor="suiteNum">Suite #</label>
              <input type="text" value={suiteNum}  onChange={(e) => onPaymentAddrChange(e,'suit')} className="mediumtext" id="suiteNum" name="suiteNum" />
             </div>
             <div className="left leftMarginSpace">
              <label htmlFor="pobox">PO Box</label>
            <input type="text" value={poBox} onChange={(e) => onPaymentAddrChange(e,'pobox')} className="mediumtext" id="pobox" name="pobox" />
             </div>
          </div>
        </div>

        <div className="left fullwidth">
          <div className="secoundcolumndata left">
            <div className="left ">
              <label htmlFor="city">City</label>
            <input type="text" value={city} onChange={(e) => onPaymentAddrChange(e,'city')} maxLength="40" className="validate[required] mdInptField" id="city" name="paymentCity" />
            </div>
            <div className="left marginlefttwenty">
              <label htmlFor="state">State</label>
            <select className="validate[required]" onChange={(e) => onPaymentAddrChange(e,'state')} name="paymentState">
              <option value="">Select One</option>
              {selOptions}
              </select>
            </div>
          </div>
          <div className="left marginlefttwenty">
            <label htmlFor="zipcode">Zip Code</label>
            <input type="text" value={zipcode} onChange={(e) => onPaymentAddrChange(e,'zip')} maxLength="5" className="validate[required,custom[zip5]] filterNumberOnly" id="zipcode" name="paymentZipcode" />
          </div>
        </div>
        <div className="left fullwidth">
          <div className="left">
            <p className="nomargin">
              <span className="twotextboxes">
                  <label htmlFor="phonenumber">Phone number</label>
                <input type="text" name="paymentPhone" onChange={(e) => onPaymentAddrChange(e,'phone')} className="validate[custom[phoneNumberDigits]]" placeholder="(___) xxx-xxxx" value={phoneNumber} maxLength="10" />
                <input type="text" name="paymentPhExt" onChange={(e) => onPaymentAddrChange(e,'extn')} className="filterNumberOnly subinput aLM validate[funcCall[phoneExtnNumber]] confField[phonenumber]" placeholder="xxxx" value={extn} maxLength="4" />
              </span>
            </p>
          </div>
        </div>
      </div>
    )
}

PaymentAddress.propTypes = {
    payAddrOptns: PropTypes.object.isRequired
}

export default PaymentAddress
