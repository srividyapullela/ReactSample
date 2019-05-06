import React from 'react'
import PropTypes from 'prop-types';

let CancelSave = ({onUpdate}) => {

    const { cancel, save, fieldName } = onUpdate

    return(
      <div className="right movetitledown">
        <a onClick={() => save(fieldName)} className="saveData" data-Field="Fullname">Save</a>
        &nbsp;<span className="verticalseperator">&nbsp;</span>&nbsp;
        <a onClick={() => cancel(fieldName)} className="a-cancel">Cancel</a>
      </div>
    )
}

CancelSave.propTypes = {
    onUpdate: PropTypes.object.isRequired
}

export default CancelSave
