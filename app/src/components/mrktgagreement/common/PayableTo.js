import React from 'react'
import PropTypes from 'prop-types';

let PayableTo = ({onPaymentAddrChange, payableTo}) => {

    return(
      <div className="left fullwidth">
        <label htmlFor="payableto">Payable to:</label>
        <input type="text" name="payableTo" value={payableTo} onChange={(e) => onPaymentAddrChange(e,'payto')} className="validate[required] wideField"/>
      </div>
    )
}

PayableTo.propTypes = {
    onPaymentAddrChange: PropTypes.func.isRequired,
    payableTo: PropTypes.string.isRequired
}

export default PayableTo
