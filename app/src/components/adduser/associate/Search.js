import React from 'react'
import CommonUtil from '../../common/Util'
import Cancel from '../../common/Cancel'
import PropTypes from 'prop-types';

let Search = ({searchOptions, enteredBPNumber}) => {

    const { onSearch, bpNumber, onBPNumberChange, userType, showCustomerTable } = searchOptions
    const isBroker = CommonUtil.isUserBroker(userType)

    if(undefined != enteredBPNumber){
        onSearch()
    }

    return(
      <div id="searchUsrFrm">
          <div className="left fullwidth movetitledown">
            <div className="left">
              <label htmlFor="bpNumb">{isBroker?'Broker BP#':'BP#'}</label>
              <input type="text" value={bpNumber} onKeyPress={onSearch} pattern="[0-9]*" className="validate[required] widefield"  onChange={onBPNumberChange} name="bpNumb" id="bpNumb" maxLength="10"/>
            </div>
            <div className="left marginlefttwenty movetitledown">
              <button className="left controlText-B" id="serachButton" onClick={onSearch} type="button">Search</button>
            </div>
          </div>
          {!showCustomerTable?
            <div className="mT2p">
              <Cancel />
          </div>:''}
      </div>
    )
}

Search.propTypes = {
    searchOptions: PropTypes.object.isRequired,
    enteredBPNumber: PropTypes.string.isRequired
}

export default Search
