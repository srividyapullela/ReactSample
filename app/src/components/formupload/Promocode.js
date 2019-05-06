import React from 'react'
import PropTypes from 'prop-types';

let Promocode = ({onChangePromocode, promoCode, onUpload}) => {

    return(
      <div className="left">
         <label htmlFor="promoCode">Promo Code</label>
         <input onKeyPress={onUpload} type="text" onChange={(e) => onChangePromocode(e)} className="" value={promoCode} name="promocode"></input>
       </div>
    )
}

Promocode.propTypes = {
    onChangePromocode: PropTypes.func.isRequired,
    promoCode: PropTypes.string.isRequired,
    onUpload: PropTypes.func.isRequired
}

export default Promocode
