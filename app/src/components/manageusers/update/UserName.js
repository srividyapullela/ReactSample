import React from 'react'
import PropTypes from 'prop-types';

let UserName = ({userName}) => {

    return(
        <div className="left fullwidth">
          <form className="lessmargin smallinputinline" name="updateUsrName" id="updateUsrName">
            <div className="status-message hide"></div>
            <div className="label">
              <label>Username:</label>
            </div>
            <div className="left secondcolumndata displayed">
                <div className="data secondcolumndata" id="usrName">{userName}</div>
            </div>
        </form>
      </div>
    );
}

UserName.propTypes = {
    userName: PropTypes.string.isRequired
}

export default UserName
