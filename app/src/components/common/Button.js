import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

let CustomButton = ({buttonAttributes}) => {

    const { link, name, handleSubmit, formValidated, from, disabled } = buttonAttributes

    return (
        <div className="right movetitledown">
            <button type="button" onClick={handleSubmit} disabled={disabled} className="controlText-A myaccount-btn b_submit1">{name}<span></span></button>
            {formValidated && (<Redirect to={from || link}/>)}
       </div>
    )
}

CustomButton.propTypes = {
    buttonAttributes: PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        formValidated: PropTypes.bool.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        from: PropTypes.string,
        disabled: PropTypes.bool
   })
}

export default CustomButton
