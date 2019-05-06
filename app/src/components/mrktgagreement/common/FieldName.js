import React from 'react'
import PropTypes from 'prop-types';

let FieldName = ({ label, value }) =>

<div className="left fullwidth headertextspace">
   <div className="rightcolumnwrapper left">
     {label}:
   </div>
   <div className="left" >
     <div className="data ">{value}</div>
   </div>
</div>

FieldName.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default FieldName
