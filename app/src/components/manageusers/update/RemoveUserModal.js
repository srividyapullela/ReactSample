import React from 'react'
import PropTypes from 'prop-types';

let RemoveUserModal = ({onClose, onRemoveUser}) => {

    return(
      <div>
        <div className="M-heading"><h3>Remove User</h3></div>
            <div className="M-content">
              <div>Are you sure you want to remove this user? All related records will be deleted.</div>
            <div className="handle">
            <button className="left controlText-B" onClick={onClose} id="backButton" type="button">Cancel</button>
            <button className="right controlText-A" onClick={onRemoveUser} type="button">Remove User<span></span></button>
           </div>
        </div>
      </div>
    );
}

RemoveUserModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onRemoveUser: PropTypes.func.isRequired
}

export default RemoveUserModal
