import React from 'react';
import { connect } from 'react-redux'
import FieldName from './FieldName'
import PropTypes from 'prop-types';

class UploadConfirmationPage extends React.Component {

    render(){

        const result = this.props.formUpload.result

        return(
            <div>
                <div className="pageHeader">
                       <h1>Form Upload</h1>
                </div>
                <div className="box">
                  <div className="boxtitleseperator"></div>
                  <div className="fullwidth left">
                      <FieldName label="Promo Code" value={result.promocode} />
                      <FieldName label="Display Name" value={result.displayName} />
                      <FieldName label="File to Upload" value={result.fileName} />
                  </div>
            </div>
          </div>
        );
    }
}

UploadConfirmationPage.propTypes = {
    formUpload: PropTypes.shape({
        result:{
            promoCode: PropTypes.string.isRequired,
            displayName: PropTypes.string.isRequired,
            fileName: PropTypes.string.isRequired
        }
    }),
}

const mapStateToProps = (state) => ({formUpload: state.formUpload})
export default connect(mapStateToProps, null)(UploadConfirmationPage)
