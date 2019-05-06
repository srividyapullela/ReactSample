import React from 'react'

let Tooltip = () => {

  return(
      <div className="popupBox tipbox tip1 hide">
				<div className="t-heading">
					<div className="t-caret"></div>
					<h5>Access Privileges</h5>
					<img className="close-it hide" src={require('../../images/public/btn_close_popup.png')} alt="Close tip"/>
				</div>
				<div className="t-content">
           <p>Customer Admin inherently has the ability to pay bills and perform start/stop transactions</p>
				</div>
			</div>
    )
}

export default Tooltip
