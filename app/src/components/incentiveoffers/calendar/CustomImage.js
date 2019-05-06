import React from 'react'
import PropTypes from 'prop-types';

let CustomImage = ({onClick, selectedDate}) => {

    return(
        <div className="relative">
          <input type="text" value={selectedDate} placeholder="mm/dd/yyyy" className="calendarTextBox" />
          <img onClick={onClick} alt="servicestartdate" src={require('../../../images/public/ico-cal.png')} id="servicestartcal" className="calendarIcon"/>
        </div>
    )
}

CustomImage.propTypes = {
    onClick: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired
}

export default CustomImage
