import React from 'react'
import PropTypes from 'prop-types';

let MrktgAgrmNumber = ({onChangeFieldValue, mrktgAgreementNum}) => {

    return(
      <div className="left fullwidth">
        <label htmlFor="contractNum">Contract/Marketing Agreement Number:</label>
      <input type="text" name="contractAgrmtNum" value={mrktgAgreementNum} onChange={(e) => onChangeFieldValue(e,'cnumber')} maxLength="12" className="validate[required] wideField"/>
      </div>
    )
}

MrktgAgrmNumber.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    mrktgAgreementNum: PropTypes.string.isRequired
}

export default MrktgAgrmNumber
