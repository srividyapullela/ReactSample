import React from 'react'
import PropTypes from 'prop-types';

let BPDetails = ({bpDetails}) => {

    if(bpDetails.bpName == "" || bpDetails.bpName == undefined){
        return <div></div>
    }

    return(
        <div className="left fullwidth">
      		<div className="left fullwidth">
      			<div className="label">Business Name or DBA:</div>
      			<div  className="data leftcolumnwrapper">
      				{bpDetails.bpName}
      			</div>
      		</div>
    		  <div className="left fullwidth">
    			  <div className="label">Address:</div>
      			<div className="data leftcolumnwrapper">
      				<div>{bpDetails.bpAddress}</div>
      		  </div>
    		 </div>
  	    </div>
    )
}

BPDetails.propTypes = {
    bpDetails: PropTypes.shape({
        bpName: PropTypes.string.isRequired,
        bpAddress: PropTypes.string.isRequired
    })
}

export default BPDetails
