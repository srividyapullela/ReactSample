import React from 'react'
import ReactFileReader from 'react-file-reader'
import PropTypes from 'prop-types';

let File = ({ handleFiles, fileName }) => {

    return(
      <div className="left leftcolumntitlewrapper">
        <div className="left movetitledown">
          <label htmlFor="uploadFile">File to Upload</label>
          <input id="uploadFile" placeholder="Choose File" value={fileName} disabled="disabled" className="validate[required,FileType[pdf]]"/>
          <div className="fileUpload controlText-B myaccount-btn">
              <ReactFileReader handleFiles={handleFiles}>
                <p id="browseText">Select File</p>
              </ReactFileReader>
          </div>
        </div>
      </div>
    )
}

File.propTypes = {
    handleFiles: PropTypes.func.isRequired,
    fileName: PropTypes.string.isRequired
}

export default File
