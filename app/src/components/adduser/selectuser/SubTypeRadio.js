import React from 'react'
import PropTypes from 'prop-types';

let SubTypeRadio = ({enableSubType, onSubUserTypeChange, forModal, value, userType}) => {

    const disabled = enableSubType?'':'disabled'

    return(
      <div>
          <input type="radio" id={value} className="agntClass" onClick={onSubUserTypeChange} name="intSubCustType" value={value} disabled={disabled} />
          <label htmlFor={value} className="displayinline agntClass">
            <a onClick={() => forModal.toggleModal(userType)} className="modal3">{userType}</a>
          </label>
      </div>
    );
}

SubTypeRadio.propTypes = {
    enableSubType: PropTypes.bool.isRequired,
    onSubUserTypeChange: PropTypes.func.isRequired,
    forModal: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired
}

export default SubTypeRadio
