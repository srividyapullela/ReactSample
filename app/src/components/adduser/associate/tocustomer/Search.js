import React from 'react'
import PropTypes from 'prop-types';

let Search = ({searchOptions}) => {

    const { onSearch, onChangeSearchCriteria, onChangeSearchString, searchString } = searchOptions

    return(
        <div className="left fullwidth" >
           <div className="left">
            <label className="displayinline" htmlFor="searchBy">Search customer admins by:</label>
            <select id="searchBy" onChange={onChangeSearchCriteria} name="searchBy">
              <option value="LN">Last Name</option>
              <option value="BP">Customer BP#</option>
            </select>
           </div>
           <div id="textBoxContainer">
             <div className="left aLM">
              <div className="left">
                <label hmtlFor="searchString" className="hide">Last Name</label>
                <input type="text" onKeyPress={onSearch} className="validate[required]" onChange={onChangeSearchString} value={searchString} name="searchString" id="searchString"/>
              </div>
             </div>
             <div className="left aLM">
              <button className="left controlText-B ajaxIt1 b_submit" onClick={onSearch} type="button">Search</button>
             </div>
           </div>
        </div>
     )
}

Search.propTypes = {
    searchOptions: PropTypes.object.isRequired
}

export default Search
