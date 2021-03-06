import React from 'react'
import Calendar from './Calendar'
import PropTypes from 'prop-types';

let FromDate = ({handleDateChange, selectedDate, startDate, maxDate}) => {

    return(
      <div className="left">
        <label htmlFor="searchFromdate">Valid From</label>
        <Calendar handleDateChange={handleDateChange} selectedDate={selectedDate} maxDate={maxDate} startDate={startDate}/>
      </div>
    )
}

FromDate.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired
}

export default FromDate
