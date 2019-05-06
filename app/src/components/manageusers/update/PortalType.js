import React from 'react'
import PropTypes from 'prop-types';

let PortalType = ({userType}) => {

    return(
      <div className="left fullwidth contenttitleseperator">
        <div className="label">
          <label>Internal/External:</label>
        </div>
        <div className="left secondcolumndata">
            <div className="data secondcolumndata">{userType}</div>
        </div>
      </div>
    )
}

PortalType.propTypes = {
    userType: PropTypes.string.isRequired
}

export default PortalType
