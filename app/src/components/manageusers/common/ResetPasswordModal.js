import React from 'react'
import PropTypes from 'prop-types';

let ResetPasswordModal = ({onClose, message, userName, email}) => {

    let returnMsg;
    let status = message.status;
    if(undefined == message){
        return <div></div>
    }
    if(status == 'E'){
        returnMsg = <p>There is no email address associated with this user <b> {userName} </b>. Please update the Email Address.</p>
    }else if(status == 'Y'){
        returnMsg = <p>A password reset link and instructions have been sent to <b>:&nbsp;&nbsp;{email}</b></p>
    }else if(status == 'N'){
        returnMsg = <p>We are unable to process your request at this time. Please try again.</p>
    }

    return(
        <div>
          <div className="M-heading"><h3>Password Reset</h3></div>
	           <div className="M-content">
		       			<div id="rstpswd">{returnMsg}</div>
		       			<div className="handle centertext">
							<button className="right controlText-A close-it" id="backButton" onClick={onClose} type="button">Ok</button>
						 </div>
					</div>
        </div>
    );
}

ResetPasswordModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
}

export default ResetPasswordModal
