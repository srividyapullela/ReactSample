import React from 'react'
import PropTypes from 'prop-types';

let VendorNumber = ({onChangeFieldValue, vendorNumber}) => {

    return(
      <div className="left fullwidth">
        <label htmlFor="vendorNum">Vendor Number</label>
        <input type="text" name="vendorNumber" maxLength="10" value={vendorNumber} onChange={(e) => onChangeFieldValue(e,'vnumber')} className="validate[required] wideField"/>
      </div>
    )
}

VendorNumber.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    vendorNumber: PropTypes.string.isRequired
}

export default VendorNumber
