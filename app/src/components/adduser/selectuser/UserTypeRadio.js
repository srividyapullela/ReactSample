import React from 'react'
import PropTypes from 'prop-types';

let UserTypeRadio = ({forModal, userType, value, onUserTypeChange}) => {

    return(
      <div>
          <input type="radio" id={value} onClick={onUserTypeChange} className="validate[reqRadio[1]]" name="intCustType" value={value} />
          <label htmlFor={value} className="displayinline">
          <a onClick={() => forModal.toggleModal(userType)} className="modal1">{userType}</a></label>
      </div>
    )
}

UserTypeRadio.propTypes = {
    forModal: PropTypes.object.isRequired,
    userType: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onUserTypeChange: PropTypes.func.isRequired
}

export default UserTypeRadio
