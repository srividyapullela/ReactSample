import React from 'react'
import PropTypes from 'prop-types';

let LastName = ({onChangeFieldValue, lastName}) => {

    return(
      <div className="left">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="lastName">Last Name</label></div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
            <input name="lastName" maxLength="50" value={lastName} onChange={(e) => onChangeFieldValue(e,'lname')} type="text"/>
          </div>
       </div>
    )
}

LastName.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    lastName: PropTypes.string.isRequired
}

export default LastName
