import React from 'react'
import CustomImage from './CustomImage'
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

let Calendar = (props) => {

      const { startDate, handleDateChange, selectedDate, minDate, maxDate } = props

      return(
          <div>
            <DatePicker customInput={<CustomImage handleDateChange={handleDateChange}
                        selectedDate={selectedDate}
                        startDate={startDate}/>}
                        selected={startDate}
                        onChange={handleDateChange}
                        minDate={minDate}
                        maxDate={maxDate}
                        />
          </div>
      )
}

Calendar.propTypes = {
    startDate: PropTypes.string.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired
}

export default Calendar
