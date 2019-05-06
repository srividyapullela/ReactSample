import React from 'react'
import PropTypes from 'prop-types';

let PhysicalAddress = ({address, phoneNumber, extn}) => {

    const streetAddress = ('' != address.streetNumber)?
            address.streetNumber+' '+address.streetName:"POB Num : "+address.poBox;
    const contactSuiteNum = (undefined != address.suiteNumber)?"Suite :"+address.suiteNumber:''

    const contactPhone = phoneNumber+(extn != undefined)?'Extn '+extn:''

    return(
      <div className="left halfwidth">
          <div className="left fullwidth">
            <div className="label">Physical Address</div>
            <div className="data">
              {streetAddress}
              {contactSuiteNum}
              {address.city}, {address.contactState} {address.zipcode}
            </div>
          </div>
          <div className="left fullwidth"> <br/>{contactPhone}</div>
      </div>
    )
}

PhysicalAddress.propTypes = {
    address: PropTypes.object.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    extn: PropTypes.string.isRequired
}

export default PhysicalAddress
