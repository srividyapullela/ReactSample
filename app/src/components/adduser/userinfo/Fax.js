import React from 'react'
import PropTypes from 'prop-types';

let Fax = ({onChangeFieldValue, faxNumber}) => {

    return(
      <div className="left fullwidth">
          <label htmlFor="faxNumber">Fax</label>
          <input name="faxNumber" value={faxNumber} maxLength="10" placeholder="(___) xxx-xxxx" onChange={(e) => onChangeFieldValue(e,'fax')} type="text"/>
      </div>
    )
}

Fax.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    faxNumber: PropTypes.string.isRequired
}

export default Fax
