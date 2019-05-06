import React from 'react'
import PropTypes from 'prop-types';

let SecurityRole = ({securityRole, viewAssociates, showViewAsscLink}) => {

    return(
      <div className="left fullwidth contenttitleseperator">
        <div className="label">
          <label>Security Role:</label>
        </div>
        <div className="left secondcolumndata">
            <div className="data secondcolumndata">{securityRole}</div>
            {showViewAsscLink?
              <div className="right">
                <a className="modal5" onClick={viewAssociates}>View Associates</a>
              </div>
            :""}
        </div>
      </div>
    );
}

SecurityRole.propTypes = {
    securityRole: PropTypes.string.isRequired,
    viewAssociates: PropTypes.func.isRequired,
    showViewAsscLink: PropTypes.bool.isRequired
}

export default SecurityRole
