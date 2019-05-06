import React from 'react'
import PropTypes from 'prop-types';

let CancellationFee = ({onChangeFieldValue, cancellationFee}) => {

    return(
      <div className="left fullwidth">
        <label htmlFor="cancelationFee">Cancellation Fee</label>
      <input type="text" name="cancellationFee" placeholder="000.00" value={cancellationFee}  onChange={(e) => onChangeFieldValue(e,'cfee')}
          className="number-specials validate[required,custom[Min3dig], custom[dollarsAndCents]] filterNumeric mediumField"/>
      </div>
    )
}

CancellationFee.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    cancellationFee: PropTypes.string.isRequired
}

export default CancellationFee
