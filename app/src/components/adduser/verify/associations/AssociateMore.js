import React from 'react'
import PropTypes from 'prop-types';

let AssociateMore = ({onAssociateMoreCustomers}) => {

    const aStyle = {cursor:'pointer'}

    return(
      <div className="left fullwidth contenttitleseperator">
          <div className="label">Associated Customers</div>
          <div className="left">
              <a className="ctrls colorblue" style={aStyle} id="asscmorecustomers" onClick={onAssociateMoreCustomers}>
                Associate More Customers<span></span>
              </a>
          </div>
      </div>
    )
}

AssociateMore.propTypes = {
    onAssociateMoreCustomers: PropTypes.func.isRequired
}

export default AssociateMore
