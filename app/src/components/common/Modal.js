import React from 'react'
import PropTypes from 'prop-types';

class Modal extends React.Component {

  render() {

    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    /*const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };*/

    const modalStyle = {
        backgroundColor: '#FFFFFF',
        borderColor: '#DDDDDD',
        borderRadius: 3,
        height: 'auto',
        maxWidth: 650,
        minWidth: 400,
        paddingLeft:20,
        paddingRight:20,
        position: 'absolute',
        left: 350,
        top: 100,
        zIndex: 200
    }

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <img width="37" height="38" onClick={this.props.onClose} alt="Close Window"
            src={require('../../images/public/btn_close_modal.png')} className="close-it M-closeit" />
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    children: PropTypes.any,
    onClose: PropTypes.func.isRequired
}

export default Modal;
