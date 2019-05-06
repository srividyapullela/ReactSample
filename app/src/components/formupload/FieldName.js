import React from 'react'
import PropTypes from 'prop-types';

let FieldName = ({label, value}) => {

    return(
      <div className="left fullwidth">
          <div className="label">
              <label htmlFor="firstnameDisplay">{label}:</label>
          </div>
          <div className="left secondcolumndata displayed">
              <div className="data secondcolumndata">{value}</div>
          </div>
      </div>
    )
}

FieldName.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default FieldName
