import React from 'react'
import Calendar from './Calendar'
import PropTypes from 'prop-types';

let ToDate = ({handleDateChange, selectedDate, startDate, minDate}) => {

    return(
      <div className="left margtop cardselectboxspace">
        <label htmlFor="searchFromdate"></label>
        <Calendar handleDateChange={handleDateChange} minDate={minDate} selectedDate={selectedDate} startDate={startDate}/>
      </div>
    )
}

ToDate.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    minDate: PropTypes.string.isRequired
}

export default ToDate
