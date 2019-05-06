import React from 'react'
import PropTypes from 'prop-types';

let SapId = ({verifySapId, onChangeFieldValue, sapId}) => {

    return(
      <div className="left">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="sapId">SAP ID</label>
            </div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
              <input name="sapId" value={sapId} maxLength="10" onBlur={verifySapId} onChange={(e) => onChangeFieldValue(e,'sapid')} type="text" className="morewidth size200"/>
          </div>
      </div>
    )
}

SapId.propTypes = {
    verifySapId: PropTypes.func.isRequired,
    onChangeFieldValue: PropTypes.func.isRequired,
    sapId: PropTypes.string.isRequired
}

export default SapId
