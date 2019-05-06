import React from 'react'
import PropTypes from 'prop-types';

let FirstName = ({onChangeFieldValue, firstName}) => {

    return(
      <div className="left rightcolumnwrapper">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
              <input name="firstName" maxLength="50" value={firstName} onChange={(e) => onChangeFieldValue(e,'fname')} type="text"/>
          </div>
      </div>
    )
}

FirstName.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired
}

export default FirstName
