import React from 'react'
import CommonUtil from '../Util'
import Cancel from '../Cancel'
import PropTypes from 'prop-types';

let Search = ({searchOptions}) => {

    const { onSearch, bpNumber, onBPNumberChange, userType, showCustomerTable } = searchOptions
    const isBroker = CommonUtil.isUserBroker(userType)

    return(
      <form name="serachUsrFrm" id="searchUsrFrm" method="post" action="">
          <div className="left fullwidth movetitledown">
            <div className="left">
              <label htmlFor="bpNumb">{isBroker?'Broker BP#':'BP#'}</label>
            <input type="text" pattern="[0-9]*" className="validate[required] widefield"  onChange={onBPNumberChange} name="bpNumb" id="bpNumb" value={bpNumber} maxLength="10"/>
            </div>
            <div className="left marginlefttwenty movetitledown">
              <button className="left controlText-B" id="serachButton" onClick={onSearch} type="button">Search</button>
            </div>
          </div>
          {!showCustomerTable?
            <div className="mT2p">
              <Cancel />
          </div>:''}
      </form>
    )
}

Search.propTypes = {
    searchOptions: PropTypes.shape({
        onSearch: PropTypes.func.isRequired,
        bpNumber: PropTypes.string.isRequired,
        onBPNumberChange: PropTypes.func.isRequired,
        userType: PropTypes.string.isRequired,
        showCustomerTable: PropTypes.bool.isRequired,
    })
}

export default Search
