import React from 'react'
import PropTypes from 'prop-types';

let ReadOnlyField = ({label, value}) => {

    return(
      <div className="left fullwidth contenttitleseperator">
          <div className="label">
            <label htmlFor="usernameform">{label}:</label>
          </div>
          <div className="left secondcolumndata">
              <div className="data secondcolumndata">{value}</div>
          </div>
      </div>
    )
}

ReadOnlyField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default ReadOnlyField
