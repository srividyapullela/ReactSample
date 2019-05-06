import React from 'react'
import PropTypes from 'prop-types';

let Email = ({onChangeFieldValue, email, reemail}) => {

    return(
      <div className="left fullwidth">
        <div className="left rightcolumnwrapper">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="email">Email</label>
            </div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
              <input name="email" value={email} maxLength="80" placeholder="smith@email.com" onChange={(e) => onChangeFieldValue(e,'email')} type="text" className="morewidth size200"/>
          </div>
        </div>
        <div className="left ">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="reemail">Retype Email</label></div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
              <input name="reemail" value={reemail} maxLength="80" placeholder="smith@email.com" onChange={(e) => onChangeFieldValue(e,'reemail')} autoComplete="off" type="text" className="morewidth size200"/>
          </div>
        </div>
    </div>
    )
}

Email.propTypes = {
   onChangeFieldValue: PropTypes.func.isRequired,
   email: PropTypes.string.isRequired,
   reemail: PropTypes.string.isRequired
}

export default Email
