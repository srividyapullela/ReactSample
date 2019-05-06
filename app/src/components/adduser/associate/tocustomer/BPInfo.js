import React from 'react'
import PropTypes from 'prop-types';

let BPInfo = ({bpName, bpAddress}) => {

    return(
      <div className="left fullwidth">
        <div className="left fullwidth contenttitleseperator">
          <div className="label">
            <label htmlFor="usernameform">Business Name or DBA:</label>
          </div>
          <div className="left secondcolumndata">
              <div className="data secondcolumndata">{bpName}</div>
          </div>
        </div>
        <div className="left fullwidth contenttitleseperator">
          <div className="label">
            <label htmlFor="usernameform">Address:</label>
          </div>
          <div className="left secondcolumndata">
              <div className="data secondcolumndata">{bpAddress}</div>
          </div>
        </div>
      </div>
    )
}

BPInfo.propTypes = {
    bpName: PropTypes.string.isRequired,
    bpAddress: PropTypes.string.isRequired
}

export default BPInfo
