import React from 'react'
import PropTypes from 'prop-types';

let Agreement = ({result, buttomValue, onButtonClick}) => {

  const { address, bpName } = result

  const streetAddress = ('' != address.streetNumber)?
          address.streetNumber+' '+address.streetName:"POB Num : "+address.poBox;
  const contactSuiteNum = (undefined != address.suiteNumber)?"Suite :"+address.suiteNumber:''


  return(
    <div className="left fullwidth">
			<div className="left fullwidth">
					<div className="left fullwidth">
						<div className="b">{bpName}</div>
					</div>
					<div className="left fullwidth">
            {streetAddress}
            {contactSuiteNum}
					<br/> {address.city}, {address.contactState} {address.zipcode}</div>
			</div>
			<div className="left fullwidth movetitledown">
        <button className="left controlText-A" onClick={onButtonClick} type="button">{buttomValue}<span></span></button>
			</div>
		</div>
  )
}

Agreement.propTypes = {
    result: PropTypes.shape({
        address: PropTypes.object.isRequired,
        bpName: PropTypes.string.isRequired
    }),
    buttomValue: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired
}

export default Agreement
