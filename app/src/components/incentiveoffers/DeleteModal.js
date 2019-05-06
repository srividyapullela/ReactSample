import React from 'react'
import PropTypes from 'prop-types';

let DeleteModal = props => {

  const { onClose, onDeleteOffer, offer } = props

  return(
    <div>
      <div className="M-heading"><h1>Delete Promo Code</h1></div>
        <div className="M-content">
          <div>Are you sure you want to delete this promo code?</div>
            <div className="handle">
                <button type="button" id="backButton" onClick={onClose} className="left controlText-B">Cancel</button>
                <button type="button" onClick={() => onDeleteOffer(offer)} className="right controlText-A b_submit close-it" id="deletOfferBtn">Delete Offer<span></span></button>
            </div>
				</div>
    </div>
  );
}

DeleteModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onDeleteOffer: PropTypes.func.isRequired,
    offer: PropTypes.object.isRequired
}

export default DeleteModal
