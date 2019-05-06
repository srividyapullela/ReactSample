import React from 'react'
import PropTypes from 'prop-types';

let Status = ({ status, onStatusChange }) => {

    return(
      <div className="left fullwidth movetitledown prvlgHolder">
          <div className="left">
              <input type="radio" checked={status == 'A'} onChange={onStatusChange} name="changePrevillage" value="A" className="validate[reqRadio[1]]"/>
              <label htmlFor="activate" className="displayinline">Activate</label>
          </div>
          <div className="left leftMarginSpace">
               <input type="radio" checked={status == 'I'} onChange={onStatusChange} name="changePrevillage" value="I" />
               <label htmlFor="deactivate" className="displayinline">Deactivate</label>
          </div>
      </div>
    )
}

Status.propTypes = {
    status: PropTypes.string.isRequired,
    onStatusChange: PropTypes.func.isRequired
}

export default Status
