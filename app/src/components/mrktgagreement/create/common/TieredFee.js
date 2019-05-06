import React from 'react'
import PropTypes from 'prop-types';

let TieredFee = ({agreement}) =>

  <div>
    <div className="left fullwidth headertextspace">
      <div className="rightcolumnwrapper left">Tier 1 Fee Amount:</div>
      <div className="left" ><div className="data">${agreement.tier1Fee} per unit for {agreement.moveInRate1}</div></div>
    </div>
    <div className="left fullwidth headertextspace">
      <div className="rightcolumnwrapper left">Tier 2 Fee Amount:</div>
      <div className="left" ><div className="data">${agreement.tier2Fee} per unit for {agreement.moveInRate2}</div></div>
    </div>
    <div className="left fullwidth headertextspace">
      <div className="rightcolumnwrapper left">Tier 3 Fee Amount:</div>
      <div className="left" ><div className="data">${agreement.tier3Fee} per unit for {agreement.moveInRate3}</div></div>
    </div>
  </div>

TieredFee.propTypes = {
    agreement: PropTypes.shape({
        tier1Fee: PropTypes.string.isRequired,
        tier2Fee: PropTypes.string.isRequired,
        tier3Fee: PropTypes.string.isRequired,
        moveInRate1: PropTypes.string.isRequired,
        moveInRate2: PropTypes.string.isRequired,
        moveInRate3: PropTypes.string.isRequired,
    })
}

export default TieredFee
