import React from 'react'
import PropTypes from 'prop-types';

let DisassociateErrorModal = ({dissOptions}) => {

    const { onClose, onDiassociateCustomers, modalMessage, bpNumberList } = dissOptions

    return(
      <div>
        <div className="M-heading"><h3>Disassociate Customers</h3></div>
            <div className="M-content">
              <div>{modalMessage}</div>
            <div className="handle">
                <button className="left controlText-B" onClick={onClose} id="backButton" type="button">Cancel</button>
                {bpNumberList.length >0?
                <button className="right controlText-A" onClick={() => onDiassociateCustomers(bpNumberList)} type="button">Disassociate Customers<span></span></button>:''}
           </div>
        </div>
      </div>
    );
}

DisassociateErrorModal.propTypes = {
    dissOptions: PropTypes.shape({
        modalMessage: PropTypes.string.isRequired,
        bpNumberList: PropTypes.arrayOf(PropTypes.string).isRequired,
        onDiassociateCustomers: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
   })
}

export default DisassociateErrorModal
