import React from 'react'
import CommonUtil from '../../common/Util'
import PropTypes from 'prop-types';

let UserInfo = ({ intOrExt,subUserType,userInfo }) => {

    const securityRole = CommonUtil.getSecurityRoleDisplayName(subUserType)
    const userType = CommonUtil.getUserTypeDisplayName(subUserType)

    return(
      <div className="left fullwidth contenttitleseperator">
        <div className="spcfifty left" id="businfo">
            <div className="full paddingt">
                <div className="label spcfifty">Internal / External:</div>
                <div className="spcfortyeight right">{intOrExt}</div>
            </div>
            <div className="full paddingt">
              <div className="label spcfifty"> Security Role:</div>
              <div className="spcfortyeight right">{securityRole}</div>
            </div>
            {CommonUtil.showUserType(subUserType)?
              <div className="full paddingt">
                <div className="label spcfifty"> User Type:</div><div className="spcfortyeight right">
                    {userType}
                </div>
              </div>:''}
        </div>
        <div className="spcfifty right" id="coninfo">
          <div className="full paddingt">
              <div className="label spcfifty"> Name:</div>
              <div className="spcfortyeight right">{userInfo.firstName} {userInfo.lastName}</div>
          </div>
          <div className="full paddingt">
              <div className="label spcfifty"> Username:</div>
              <div className="spcfortyeight right">{userInfo.userName}</div>
          </div>
        </div>
      </div>
    )
}

UserInfo.propTypes = {
    intOrExt: PropTypes.string.isRequired,
    subUserType: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
    })
}

export default UserInfo
