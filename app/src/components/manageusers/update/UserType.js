import React from 'react'
import PropTypes from 'prop-types';

let UserType = ({securityRoleDisplayName}) => {

    return(
      <div className="left fullwidth contenttitleseperator">
        <div className="label">
          <label>User Type:</label>
        </div>
        <div className="left secondcolumndata">
            <div className="data secondcolumndata">
              {securityRoleDisplayName != ''?securityRoleDisplayName:'NA'}
            </div>
        </div>
      </div>
    );
}

UserType.propTypes = {
    securityRoleDisplayName: PropTypes.string.isRequired
}

export default UserType
