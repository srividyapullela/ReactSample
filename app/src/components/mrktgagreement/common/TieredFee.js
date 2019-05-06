import React from 'react'
import * as conts from '../../common/constants'
import PropTypes from 'prop-types';

let TiredFee = ({tierFeeOptions}) => {

    const { onChangeFieldValue, tierFee1, tierFee2, tierFee3, moveInRate1, moveInRate2, moveInRate3 } = tierFeeOptions

    const selOptions = (opt) => conts.tierFeeOptions.map((el) => (
        <option key={el} selected={opt == el} value={el}>{el}</option>
    ));

    return(
      <div className="left fullwidth marginlefttwenty mediuminput" id="tiredFeeAmountDiv">
       <div className="left fullwidth">
        <div className="dividethreecolumnmargin left">
          <label htmlFor="tier1Fee">Tier 1 Fee Amount:</label>
          <input type="text" name="tire1FeeAmount" onChange={(e) => onChangeFieldValue(e,'tf1')} value={tierFee1} className="validate[required] filterNumeric"/>
        </div>
        <div className="dividethreecolumnmargin left margtop">
          <span className="greywhiteboxadjacent">Per Unit For</span>
        </div>
        <div className="dividethreecolumnmargin left">
          <label htmlFor="move1per">Move-in Rate %</label>
          <select onChange={(e) => onChangeFieldValue(e,'mr1')} name="moveinRate1" className="validate[required]">
              <option value="">Select rate</option>
              {selOptions(moveInRate1)}
          </select>
        </div>
      </div>
      <div className="left fullwidth">
        <div className="dividethreecolumnmargin left">
          <label htmlFor="tier2Fee">Tier 2 Fee Amount:</label>
          <input type="text" name="tire2FeeAmount" onChange={(e) => onChangeFieldValue(e,'tf2')} value={tierFee2} className="validate[required] filterNumeric"/>
        </div>
        <div className="dividethreecolumnmargin left margtop">
          <span className="greywhiteboxadjacent">Per Unit For</span>
        </div>
        <div className="dividethreecolumnmargin left">
          <label htmlFor="move2per">Move-in Rate %</label>
          <select onChange={(e) => onChangeFieldValue(e,'mr2')} name="moveinRate2" className="validate[required]">
            <option value="">Select rate</option>
          {selOptions(moveInRate2)}
          </select>
        </div>
      </div>
      <div className="left fullwidth">
        <div className="dividethreecolumnmargin left">
          <div className="left fullwidth">
            <label htmlFor="tier3Fee">Tier 3 Fee Amount</label>
            <span>(if applicable)</span>
          </div>
          <div className="left">
            <input type="text" name="tire3FeeAmount" onChange={(e) => onChangeFieldValue(e,'tf3')} value={tierFee3} className="filterNumeric"/>
          </div>
        </div>
        <div className="dividethreecolumnmargin left margtop">
          <span className="greywhiteboxadjacent">Per Unit For</span>
        </div>
        <div className="dividethreecolumnmargin left">
          <label htmlFor="move3per">Move-in Rate %</label>
          <select onChange={(e) => onChangeFieldValue(e,'mr3')} name="moveinRate3">
            <option value="">Select rate</option>
          {selOptions(moveInRate3)}
          </select>
        </div>
      </div>
    </div>
    )
}

TiredFee.propTypes = {
    tierFeeOptions: PropTypes.object.isRequired
}

export default TiredFee
