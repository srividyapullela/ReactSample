import React from 'react'
import PropTypes from 'prop-types';

let SaveModal = ({onClose, message}) => {

  return(
    <div>
      <div className="M-heading"></div>
      <div className="M-content">
        <div id="saveofferresult" className="resultInfo">{message}</div>
          <div className="handle centertext">
            <button type="button" id="backButton" onClick={onClose} className="left controlText-B close-it">
              Ok
            </button>
          </div>
			</div>
    </div>
  );
}

SaveModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
}

export default SaveModal
