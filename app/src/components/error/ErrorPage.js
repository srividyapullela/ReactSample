import React from 'react'
import PropTypes from 'prop-types';

let ErrorPage = ({match}) => {

    let invalidSapId = (match.params.msgType == 'invalidSapId')?true:false
    const sapIdErrMsg = <p>The SAP ID could not be validated. Please submit an IT Incident in Service Now and reference the Application: SAP - CRM (Retail).</p>
    const srvcErrMsg = <p>We&rsquo;re currently experiencing technical difficulties and cannot process your request at this time. Please try again later. We apologize for any inconvenience.</p>
    const heading = <h1>We&rsquo;re Unable to Process Your Request</h1>

    return(
      <div className="box inlineForm">
        {heading}
          <form id="exceptionpage" name= "exceptionpage" method= "post">
            <div className="boxtitleseperator">&nbsp;</div>
            {invalidSapId?sapIdErrMsg:srvcErrMsg}
          </form>
        </div>
    )
}

ErrorPage.propTypes = {
    match: PropTypes.any.isRequired
}

export default ErrorPage
