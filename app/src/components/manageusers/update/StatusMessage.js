import React from 'react'
import PropTypes from 'prop-types';

let StatusMessage = ({updateSuccess, fieldName}) => {

    let fieldMsg = fieldName;
    if(fieldName == 'accpriv'){
        fieldMsg = "access privileges"
    }
    const message =   updateSuccess?`Updated ${fieldMsg} successfully.`
                      :`Update ${fieldMsg} failed. Please try again.`
    return(
        <div>
          {message}
        </div>
    );
}

StatusMessage.propTypes = {
    updateSuccess: PropTypes.bool.isRequired,
    fieldName: PropTypes.string.isRequired
}

export default StatusMessage
