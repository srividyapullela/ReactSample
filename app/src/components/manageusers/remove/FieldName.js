import React from 'react'
import PropTypes from 'prop-types';

let FieldName = ({label, value}) => {

    return(
      <div className="left fullwidth contenttitleseperator">
          <div className="label">
            <label>{label}:</label>
          </div>
          <div className="left secondcolumndata">
            {value}
          </div>
      </div>
    )
}

FieldName.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default FieldName
