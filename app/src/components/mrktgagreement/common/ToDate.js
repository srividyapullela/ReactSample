import React from 'react'
import Calendar from './Calendar'
import PropTypes from 'prop-types';

let ToDate = ({handleDateChange, selectedDate, startDate}) => {

    return(
      <div className="left margtop cardselectboxspace">
        <label  htmlFor="todate">End Date</label>
        <Calendar handleDateChange={handleDateChange} selectedDate={selectedDate} startDate={startDate}/>
      </div>
    )
}

ToDate.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired
}

export default ToDate
