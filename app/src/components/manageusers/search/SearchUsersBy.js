import React from 'react'
import PropTypes from 'prop-types';

let SearchUsersBy = ({options, onSelectionChange, searchType}) => {

  const selOptions = options.map((el) => (
      <option key={el.value} selected={searchType == el.value} value={el.value}>{el.label}</option>
  ));

    return(
      <div className="">
        <label className="displayinline" htmlFor="searchBy">Search users by:</label>
         <select id="searchBy" onChange={onSelectionChange} name="searchBy">
           {selOptions}
         </select>
      </div>
    );
}

SearchUsersBy.propTypes = {
    options: PropTypes.arrayOf(PropTypes.any).isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    searchType: PropTypes.string.isRequired
}

export default SearchUsersBy
