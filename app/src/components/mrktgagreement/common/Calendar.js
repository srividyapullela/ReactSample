import React from 'react'
import CustomImage from '../../incentiveoffers/calendar/CustomImage'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

let Calendar = ({handleDateChange, selectedDate}) => {

      let defaultDate = (undefined == selectedDate || "" == selectedDate)?moment():moment(selectedDate,"MM/DD/YYYY");

      return(
          <div>
            <DatePicker
              date={selectedDate}
              customInput={<CustomImage handleDateChange={handleDateChange} selectedDate={selectedDate} />}
              selected={defaultDate}
              onChange={handleDateChange} />
          </div>
      )
}

Calendar.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired
}

export default Calendar
