import React from 'react'
import PropTypes from 'prop-types';

let SameAsCheckBox = ({val, onSameAsCheckBox}) => {

    return(
        <div className="left fullwidth">
          <p className="b nomargin">Payment address and phone number</p>
          <div className="left fullwidth">
             <div className="left">
               <input type="checkbox" checked={val == 'P'} onClick={onSameAsCheckBox} value="P" name="physicalAddress" />
               <label className="textlabel" htmlFor="samePhysical">Same as physical address</label>
             </div>
             <div className="left marginlefttwenty">
               <input type="checkbox" checked={val == 'B'} onClick={onSameAsCheckBox} value="B" name="billingAddress" />
               <label className="textlabel" htmlFor="sameBilling">Same as billing address</label>
             </div>
         </div>
       </div>
    )
}

SameAsCheckBox.propTypes = {
    val: PropTypes.string.isRequired,
    onSameAsCheckBox: PropTypes.func.isRequired
}

export default SameAsCheckBox
