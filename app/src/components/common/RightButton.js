import React from 'react'
import PropTypes from 'prop-types';

let RightButton = ({text, onClickFunc}) => {

    return(
      <div className="handle">
           <button className="right controlText-A" onClick={onClickFunc} type="button">{text}<span></span></button>
      </div>
    )
}

RightButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClickFunc: PropTypes.func.isRequired
}

export default RightButton
