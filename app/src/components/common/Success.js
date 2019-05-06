import React from 'react';
import PropTypes from 'prop-types';

export let SuccessBox = ({message}) => {

    return (
      <div className="successbox">
          {message}
      </div>
    )
}

SuccessBox.propTypes = {
    message: PropTypes.string.isRequired
}
