import React from 'react'
import PropTypes from 'prop-types';

let BrokerBPSearch = ({bpOptions}) => {

    const { onSearch, onBPNumberChange, bpNumber } = bpOptions

    return(
        <div id="searchbrkBpFrm">
         <div id="brkbpNoContainer" className="">
           <div className="left aLM">
            <div className="left">
              <label htmlFor="brkBPNo" className="">Broker BP#</label>
              <input type="text" onKeyPress={onSearch} className="validate[required]" onChange={onBPNumberChange} maxLength="10" name="brkBPNo" value={bpNumber} id="brkBPNo"/>
            </div>
           </div>
           <div className="left aLM">
            <button className="left searchbutton controlText-A b_submit ajaxIt3" onClick={onSearch} value={bpNumber} id="brkSerachButton" type="button">Search</button>
           </div>
         </div>
       </div>
    );
}

BrokerBPSearch.propTypes = {
    bpOptions: PropTypes.shape({
        onSearch: PropTypes.func.isRequired,
        onBPNumberChange: PropTypes.func.isRequired,
        bpNumber: PropTypes.string.isRequired
    })
}

export default BrokerBPSearch
