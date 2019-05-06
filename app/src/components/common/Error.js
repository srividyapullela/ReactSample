import React from 'react';
import PropTypes from 'prop-types';

export let ErrorBox = ({message, isError}) => {

    const errorStyle = {display:'none'}

    return (
      <div id="headingError" className="status-message blockelement" style={isError?{}:errorStyle}>
        <div id="headingError-H" className="normalText">
            {message}
        </div>
      </div>
    )
}

ErrorBox.propTypes = {
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired
}
