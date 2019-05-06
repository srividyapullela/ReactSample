import React from 'react'
import PropTypes from 'prop-types';

let CancelorSave = ({onUpdate}) => {

    const { cancel, save, fieldName } = onUpdate

    return(
      <div className="right">
        <a onClick={() => save(fieldName)} className="b_submit ajaxIt3" >Save</a>
          &nbsp;<span className="verticalseperator">&nbsp;</span>&nbsp;
        <a onClick={() => cancel(fieldName)} className="a-cancel">Cancel</a>
      </div>
    )
}

CancelorSave.propTypes = {
    onUpdate: PropTypes.shape({
        cancel: PropTypes.func.isRequired,
        save: PropTypes.func.isRequired,
        fieldName: PropTypes.string.isRequired
    })
}

export default CancelorSave
