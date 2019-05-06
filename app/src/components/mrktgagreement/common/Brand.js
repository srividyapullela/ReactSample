import React from 'react'
import PropTypes from 'prop-types';

let Brand = ({onChangeFieldValue, brand, IONumber, GLNumber}) => {

    return(
      <div className="left fullwidth">
        <div className="left fullwidth">
            <div className="dividethreecolumnmargin left">
              <label htmlFor="brand1">Brand</label>
              <input type="text" name="brand" onChange={(e) => onChangeFieldValue(e,'brand')} value={brand} className="validate[required] mediumField"/>
            </div>
            <div className="dividethreecolumnmargin left">
              <label htmlFor="ionumber1">IO Number</label>
              <input type="text" name="IONumber" onChange={(e) => onChangeFieldValue(e,'inumber')} maxLength="10" value={IONumber} className="validate[required] mediumField"/>
            </div>
            <div className="left">
              <label htmlFor="glnumber1">GL Number</label>
              <input type="text" name="GLNumber" onChange={(e) => onChangeFieldValue(e,'gnumber')} maxLength="10" value={GLNumber} className="validate[required] mediumField"/>
            </div>

          </div>
      </div>
    )
}

Brand.propTypes = {
    onChangeFieldValue: PropTypes.func.isRequired,
    brand: PropTypes.string.isRequired,
    IONumber: PropTypes.string.isRequired,
    GLNumber: PropTypes.string.isRequired
}

export default Brand
