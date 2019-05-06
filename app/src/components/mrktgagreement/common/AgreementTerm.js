import React from 'react'
import PropTypes from 'prop-types';

let AgreementTerm = ({termValue}) => {

    return(
      <div className="left fullwidth">
          <div className="b left">Agreement Term:</div>&nbsp;&nbsp;{termValue}
      </div>
    )
}

AgreementTerm.propTypes = {
    termValue: PropTypes.string.isRequired
}

export default AgreementTerm
