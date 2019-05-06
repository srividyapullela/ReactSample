import React from 'react'
import PropTypes from 'prop-types';

let DisplayName = (props) => {

    const { onChangeDisplayname, displayName, onUpload } = props

    return(
      <div className="left aLM">
          <label htmlFor="displayName">Display Name</label>
          <input onKeyPress={onUpload} type="text" onChange={onChangeDisplayname} className="largetext validate[required] wideField" value={displayName} name="displayName"></input>
      </div>
    )
}

DisplayName.propTypes = {
    onChangeDisplayname: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    onUpload: PropTypes.func.isRequired
}

export default DisplayName
