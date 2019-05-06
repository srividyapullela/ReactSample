import React from 'react';
import Modal from '../common/Modal'
import Editmodal from './EditModal'
import DeleteModal from './DeleteModal'
import PropTypes from 'prop-types';

class EditorDelete extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
        modalType: ""
      };

      this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(type){
    //console.log("type:::"+type);
    this.setState({
      isOpen: !this.state.isOpen,modalType:type
    });
  }


render() {

  const { offer, onDeleteOffer, onEditOffer } = this.props

  let returnMessage;
  const inactiveMessage = <div>
                          <span className="greyText">Edit</span>
                          <span className="verticalseperator">&nbsp;</span>
                          <span className="greyText">Delete</span></div>

  const activeMessage = <div>
                          <a className="hide modal2">OpenPopup</a>
                          <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                              {this.state.modalType == 'E'?<Editmodal onClose={this.toggleModal} onEditOffer={onEditOffer} offer={offer}/>:
                                      <DeleteModal onClose={this.toggleModal} offer={offer} onDeleteOffer={onDeleteOffer}/>}
                          </Modal>
                          <a className="editOfferLink" onClick={() => this.toggleModal('E')}>
                          Edit</a> <span className="verticalseperator">&nbsp;</span>
                          <a onClick={() => this.toggleModal('D')} className="modal3">
                          Delete</a>
                        </div>

  if(offer.status == "I"){
      returnMessage = inactiveMessage
  }else{
      returnMessage = activeMessage
  }

  return(
    <div>
      {returnMessage}
    </div>
  );
}
}

EditorDelete.propTypes = {
    offer: PropTypes.object.isRequired,
    onDeleteOffer: PropTypes.func.isRequired,
    onEditOffer: PropTypes.func.isRequired
}

export default EditorDelete
