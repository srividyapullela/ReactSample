import React from 'react'
import PropTypes from 'prop-types';

let UserName = ({verifyUsername, onChangeFieldValue, userName}) => {

    return(
      <div>
        <div id="validateusernameerrormessage" className="status-message hide"></div>
        <div id="sapiderrormessage" className="status-message hide"></div>
        <div className="left rightcolumnwrapper">
          <div className="fullwidth nomargininherit">
              <div className="left">
                <label htmlFor="userName">Username</label>
              </div>
              <div className="left">*</div>
            </div>
            <div className="left fullwidth">
                <input name="userName" value={userName} maxLength="50" onBlur={verifyUsername} onChange={(e) => onChangeFieldValue(e,'uname')} type="text"/>
            </div>
        </div>
      </div>
    )
}

UserName.propTypes = {
    verifyUsername: PropTypes.func.isRequired,
    onChangeFieldValue: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired
}

export default UserName
