import React from 'react'

let AssociateMore = ({onAssociateMoreLink}) => {

    return(
      <div className="left fullwidth contenttitleseperator">
          <div className="label">Associated Customers</div>
          <div className="left">
              <a className="ctrls colorblue" id="asscmorecustomers" onClick={onAssociateMoreLink}>
                Associate More Customers<span></span>
              </a>
          </div>
      </div>
    )
}

export default AssociateMore
