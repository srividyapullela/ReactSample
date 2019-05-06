import React from 'react';
import PropTypes from 'prop-types';

export let CustomRadio = (props) => {

    return (
        <div className={props.divClassName}>
            <input type="radio"  id={props.value} checked={props.checked}
            className={props.inputClassName}	name={props.name} value={props.value}
            onClick={props.onUserRadioChange}/>
            <label htmlFor={props.value} className={props.labelClassName}>{props.text}</label>
        </div>
    )
}

CustomRadio.propTypes = {
    divClassName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    inputClassName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onUserRadioChange: PropTypes.func.isRequired,
    labelClassName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}
