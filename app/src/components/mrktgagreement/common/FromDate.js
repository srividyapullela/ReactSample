import React from 'react'
import Calendar from './Calendar'
import PropTypes from 'prop-types';

let FromDate = ({handleDateChange, selectedDate, startDate}) => {

    return(
      <div className="left">
        <label htmlFor="fromdate">Start Date</label>
        <Calendar handleDateChange={handleDateChange} selectedDate={selectedDate} startDate={startDate}/>
      </div>
    )
}

FromDate.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired
}

export default FromDate
