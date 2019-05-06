import React from 'react'
import PropTypes from 'prop-types';

let LastNameSearch = ({lastNameOptions}) => {

    const { options, onSearch, userCategory, onLastNameChange, lastName, onSecRoleChange, hideInternal } = lastNameOptions

    const userTypeOptions = options.map((el) => {
        let elVal = el.value.split(":")
        let elVal1 = elVal[0]
        let elVal2 = elVal[1]
        if(hideInternal){
            if(!(elVal1 == 'NA' || elVal2 == 'I' || elVal1 == 'OA') || elVal1 == 'OWN'){
                return <option key={el.value} selected={userCategory == el.value} value={el.value}>{el.label}</option>
            }
        }else{
           return <option key={el.value} selected={userCategory == el.value} value={el.value}>{el.label}</option>
        }
    });

    return(
      <div id="searchUsrFrm">
        <div className="left fullwidth movetitledown" id="lastNameContainer">
          <div className="left lastnamecls">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" onKeyPress={onSearch} className="" value={lastName} onChange={onLastNameChange} name="lastName" id="lastName"/>
          </div>
          <div className="left marginlefttwenty">
            <label  htmlFor="searchBy">Security Role / User Type</label>
            <select id="searchBy" name="searchByOpt" onChange={onSecRoleChange} className="largetext">
                {userTypeOptions}
            </select>
          </div>
          <div className="left marginlefttwenty movetitledown">
          <button className="left controlText-A searchbutton b_submit ajaxIt2" onClick={onSearch} id="serachButton" type="button">Search</button>
        </div>
        </div>
      </div>
    );
}

LastNameSearch.propTypes = {
    lastNameOptions: PropTypes.shape({
        options: PropTypes.arrayOf(PropTypes.any),
        onSearch: PropTypes.func.isRequired,
        userCategory: PropTypes.string.isRequired,
        onLastNameChange: PropTypes.func.isRequired,
        lastName: PropTypes.string.isRequired,
        onSecRoleChange: PropTypes.func.isRequired,
        hideInternal: PropTypes.bool.isRequired
    })
}

export default LastNameSearch
