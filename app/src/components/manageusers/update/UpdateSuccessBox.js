import React from 'react';
import StatusMessage from './StatusMessage'
import PropTypes from 'prop-types';

let UpdateSuccessBox = ({updateSuccess, fieldName}) => {

    if(undefined == updateSuccess){
      return <div></div>
    }

    const message = <StatusMessage updateSuccess={updateSuccess} fieldName={fieldName}/>
    const statusClass = updateSuccess?'successMsg':'errorMsg'

    return (
      <div className={`status-message ${statusClass}`}>
          {message}
      </div>
    )
}

UpdateSuccessBox.propTypes = {
    updateSuccess: PropTypes.bool.isRequired,
    fieldName: PropTypes.string.isRequired
}

export default UpdateSuccessBox
