import React from 'react'
import PropTypes from 'prop-types';

let FlatFee = ({ onChangeFieldValue, fee }) => {

    return(
      <div className="left fullwidth marginlefttwenty " id="feeAmountDiv">
        <label htmlFor="feeAmnt">Fee amount Per Unit:</label>
        <input type="text" name="feeAmtPerUnit" onChange={(e) => onChangeFieldValue(e,'flatfee')} placeholder="000.00" value={fee} className="validate[required,custom[Min3dig], custom[dollarsAndCents]] filterNumeric"/>
      </div>
    )
}

FlatFee.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    fee: PropTypes.string.isRequired
}

export default FlatFee
