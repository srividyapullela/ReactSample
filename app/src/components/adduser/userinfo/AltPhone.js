import React from 'react'
import PropTypes from 'prop-types';

let AltPhone = ({onChangeFieldValue, altPhoneNumber, extxnAlt}) => {

    return(
      <div className="left">
        <label htmlFor="altPhoneNumber">Alt Phone </label>
        <p className="noformmargin">
          <span className="twotextboxes">
            <input name="altPhoneNumber" value={altPhoneNumber} maxLength="10" placeholder="(___) xxx-xxxx" onChange={(e) => onChangeFieldValue(e,'altphone')} type="text"/>
          <input name="extxnAlt" value={extxnAlt} maxLength="4" placeholder="xxxx" onChange={(e) => onChangeFieldValue(e,'altextn')} type="text" className="subinput aLM"/>
          </span>
        </p>
      </div>
    )
}

AltPhone.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    altPhoneNumber: PropTypes.string.isRequired,
    extxnAlt: PropTypes.string.isRequired
}

export default AltPhone
