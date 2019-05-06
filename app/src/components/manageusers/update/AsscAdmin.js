import React from 'react'
import CommonUtil from '../../common/Util'
import PropTypes from 'prop-types';

let AsscAdmin = ({changeAssociatedAdmin, associatedAdmin, securityRole}) => {

    let isUserCustAssociate = CommonUtil.isUserCustAssociate(securityRole);
    let fullName = (undefined != associatedAdmin.firstName || undefined != associatedAdmin.lastName)
            ?associatedAdmin.firstName+" "+associatedAdmin.lastName:"";

    return(
      <div className="left fullwidth contenttitleseperator">
        <div className="label">
          {isUserCustAssociate?<label>Associated Admin:</label>:<label>Associated Broker:</label>}
        </div>
        <div className="left secondcolumndata">
            <div className="data">
                {fullName}
            </div>
            <div id="changeAdminLinkDiv" className="right">
              <a className="modal4" onClick={changeAssociatedAdmin}>
                  {isUserCustAssociate?'Change Associated Admin':'Change Associated Broker'}
              </a>
            </div>
          </div>
        </div>
    );
}

AsscAdmin.propTypes = {
    changeAssociatedAdmin: PropTypes.func.isRequired,
    associatedAdmin: PropTypes.object.isRequired,
    securityRole: PropTypes.string.isRequired
}

export default AsscAdmin
