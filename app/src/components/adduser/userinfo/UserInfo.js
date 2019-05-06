import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types';

let UserInfo = ({label, isLeft, isRequired, name}) => {

    const oneTextBox =  <div className="left fullwidth">
                            <Field name={name} component="input" type="text"/>
                        </div>

    const twoTextBox = <p className="noformmargin">
                          <span className="twotextboxes">
                              <Field name={name} component="input" type="text" placeholder="(___) xxx-xxxx" />
                              <Field name={name} component="input" type="text" placeholder="xxxx" />
                          </span>
                        </p>

    return(
      <div className={`left ${isLeft?'rightcolumnwrapper':''}`}>
        <div className="fullwidth nomargininherit">
          <div className="left">
            <label htmlFor="firstName">{label}</label>
          </div>
          <div className="left">{isRequired?'*':''}</div>
        </div>
        {label == 'Phone' || label == 'Alt Phone'?twoTextBox:oneTextBox}
      </div>
    )
}

UserInfo.propTypes = {
    label: PropTypes.string.isRequired,
    isLeft: PropTypes.bool.isRequired,
    isRequired: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
}

export default UserInfo
