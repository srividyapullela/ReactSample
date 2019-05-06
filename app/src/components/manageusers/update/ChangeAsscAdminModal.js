import React from 'react'
import CommonUtil from '../../common/Util'
import PropTypes from 'prop-types';

let ChangeAsscAdminModal = ({changeAsscOptions}) => {

    const { onClose, onChangeAssociateAdmin, securityRole } = changeAsscOptions

    let heading, content, buttonText;

    if(CommonUtil.isUserCustAssociate(securityRole)){
        heading = "Change Associated Admin"
        content = "Are you sure you want to move this associated user under another admin user? Doing so will change this user's associated customers."
        buttonText = "Change Associated Admin"
    }else{
        heading = "Change Associated Broker"
        content = "Are you sure you want to move this associated user under another broker user? Doing so will change this user's associated customers."
        buttonText = "Change Associated Broker"
    }

    return(
      <div>
        <div className="M-heading"><h3>{heading}</h3></div>
            <div className="M-content">
              <div>{content}</div>
            <div className="handle">
                <button className="left controlText-B" onClick={onClose} id="backButton" type="button">Cancel</button>
                <button className="right controlText-A" onClick={() => onChangeAssociateAdmin()} type="button">{buttonText}<span></span></button>
           </div>
        </div>
      </div>
    );
}

ChangeAsscAdminModal.propTypes = {
  changeAsscOptions: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
      onChangeAssociateAdmin: PropTypes.func.isRequired,
      securityRole: PropTypes.string.isRequired
  })
}

export default ChangeAsscAdminModal
