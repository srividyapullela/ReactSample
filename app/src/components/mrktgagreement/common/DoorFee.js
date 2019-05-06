import React from 'react'
import FlatFee from './FlatFee'
import TieredFee from './TieredFee'
import PropTypes from 'prop-types';

let DoorFee = ({doorFeeOptions}) => {

    const { onDoorFeeChange, doorFeeOption, onChangeFieldValue, doorFeeAmount, tierFee1, tierFee2, tierFee3, moveInRate1, moveInRate2, moveInRate3 } = doorFeeOptions
    const tierFeeOptions = { tierFee1, tierFee2, tierFee3, moveInRate1,moveInRate2, moveInRate3, onChangeFieldValue }
    const flatFeeChecked = (doorFeeOption == 'flatfee')
    const tieredFeeChecked = (doorFeeOption == 'tieredfee')

    return(
      <div className="left fullwidth">
        <p className="b nomargin">Door Fee:</p>
          <div className="left fullwidth">
            <div className="left fullwidth">
              <input type="radio" onClick={onDoorFeeChange} checked={flatFeeChecked} className="validate[reqRadio[1]]"  value="flatfee" name="feeOption" id="flatFee" />
              <label className="textlabel" htmlFor="flatFee">Flat Fee</label>
            </div>
            {doorFeeOption == 'flatfee'?<FlatFee onChangeFieldValue={onChangeFieldValue} fee={doorFeeAmount}/>:''}
          </div>

          <div className="left fullwidth">
            <div className="left fullwidth">
              <input type="radio" onClick={onDoorFeeChange} checked={tieredFeeChecked} value="tieredfee" name="feeOption" id="tiredFee" />
              <label className="textlabel" htmlFor="tiredFee">Tiered Fee</label>
            </div>
            {doorFeeOption == 'tieredfee'?<TieredFee tierFeeOptions={tierFeeOptions}/>:''}
          </div>
        </div>
    )
}

DoorFee.propTypes = {
    doorFeeOptions: PropTypes.object.isRequired
}

export default DoorFee
