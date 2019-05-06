import React from 'react'
import PropTypes from 'prop-types';

let Phone = ({onChangeFieldValue, phoneNumber, extxn}) => {

    return(
      <div className="left rightcolumnwrapper">
          <label htmlFor="phoneNumber">Phone</label>
          <p className="noformmargin">
            <span className="twotextboxes">
                <input name="phoneNumber" pattern="[0-9.]+" value={phoneNumber} maxLength="10" placeholder="(___) xxx-xxxx" onChange={(e) => onChangeFieldValue(e,'phone')} type="text"/>
                <input name="extxn" value={extxn} maxLength="4" placeholder="xxxx" onChange={(e) => onChangeFieldValue(e,'extn')} type="text" className="subinput aLM"/>
            </span>
          </p>
        </div>
    )
}

Phone.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    extxn: PropTypes.string.isRequired
}

export default Phone
