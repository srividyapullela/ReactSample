import React from 'react'
import UserTypeRadio from './UserTypeRadio'
import SubTypeRadio from './SubTypeRadio'
import PropTypes from 'prop-types';

let UserTypes = ({typeUsers,forModal, onUserTypeChange, onSubUserTypeChange, enableSubType,dontShowExtReadOnly}) => {

  let types = typeUsers.map((userType) => {
    if(userType.subTypes.length == 0){
        if(userType.value == 'EXT_READ_ONLY'){
            if(dontShowExtReadOnly) return '';
        }
        return(<UserTypeRadio key={userType.value} forModal={forModal} value={userType.value} userType={userType.userType} onUserTypeChange={onUserTypeChange}/>)
      }else{
        return(
            <div key={userType.value}>
                <UserTypeRadio forModal={forModal} key={userType.value} value={userType.value} userType={userType.userType} onUserTypeChange={onUserTypeChange}/>
                <div id="agentTypes" className="marginlefttwenty">
                    {userType.subTypes.map((subType) => <SubTypeRadio key={subType.value} forModal={forModal} value={subType.value} userType={subType.userType} onSubUserTypeChange={onSubUserTypeChange} enableSubType={enableSubType}/>)}
                </div>
            </div>
          )
      }
    });
    return(
        <div id="internalTypes" className="marginlefttwenty">
            {types}
        </div>
    );
}

UserTypes.propTypes = {
    typeUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
    forModal: PropTypes.object.isRequired,
    onUserTypeChange: PropTypes.func.isRequired,
    onSubUserTypeChange: PropTypes.func.isRequired,
    enableSubType: PropTypes.bool.isRequired,
    dontShowExtReadOnly: PropTypes.bool.isRequired
}

export default UserTypes
