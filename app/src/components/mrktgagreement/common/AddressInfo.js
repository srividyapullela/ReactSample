import React from 'react'
import PropTypes from 'prop-types';

let AddressInfo = ({address, bpName}) =>

      <div className="left fullwidth">
          <div className="left fullwidth">
            <div className="b">{bpName}</div>
          </div>
          <div className="left fullwidth">
            {address.streetNumber} {address.streetName},
          <br/>{address.city} {address.state} {address.zipcode}</div>
      </div>

AddressInfo.propTypes = {
    address: PropTypes.shape({
        streetNumber: PropTypes.string,
        streetName: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        zipcode: PropTypes.string,
    }).isRequired,
    bpName: PropTypes.string.isRequired
}

export default AddressInfo
