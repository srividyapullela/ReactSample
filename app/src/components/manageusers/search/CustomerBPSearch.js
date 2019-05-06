import React from 'react'
import PropTypes from 'prop-types';

let CustomerBPSearch = ({bpOptions}) => {

    const { onSearch, onBPNumberChange, bpNumber } = bpOptions

    return(
      <div id="searchBpFrm">
         <div id="bpNoContainer" className="">
           <div className="left aLM">
            <div className="left">
              <label htmlFor="custBPNo" className="">Customer BP#</label>
              <input type="text" onKeyPress={onSearch} className="validate[required]" onChange={onBPNumberChange} maxLength="10" name="custBPNo" value={bpNumber} id="custBPNo"/>
            </div>
           </div>
           <div className="left aLM">
            <button className="left searchbutton controlText-A b_submit ajaxIt1" onClick={onSearch} id="custSerachButton" type="button">Search</button>
           </div>
         </div>
       </div>
    );
}

CustomerBPSearch.propTypes = {
    bpOptions: PropTypes.shape({
        onSearch: PropTypes.func.isRequired,
        onBPNumberChange: PropTypes.func.isRequired,
        bpNumber: PropTypes.string.isRequired
    })
}

export default CustomerBPSearch
