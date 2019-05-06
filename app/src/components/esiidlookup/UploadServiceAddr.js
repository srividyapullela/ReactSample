import React from 'react';
import { CSVLink } from 'react-csv'
import ReactFileReader from 'react-file-reader'
import moment from 'moment';
import PropTypes from 'prop-types';

let UploadServiceAddress = ({uploadSrvAdrOpts}) => {

    const upload = "Upload"
    const download = "Download Service Address Template"
    const downloadFileName = "ServiceAddress Template"+moment().format("MM_DD_YYYY")+".csv"
    const uploadSrvcAddr = "Upload Service Addresses"
    const search = "Search"
    const serviceAddrTemplate = [{'Street Number':'','Street Name':'','Unit Number':'','City':'','State':'','Zipcode':''}]

    const { lookup, onUploadServiceAddr, fileName } = uploadSrvAdrOpts

    const handleFiles = files => {
      var reader = new FileReader();
      reader.onload = () => {
        onUploadServiceAddr(reader.result, files[0].name)
      };
      reader.readAsText(files[0]);
    }

    return(
        <div className="left fullwidth movetitledown uploadInfo">
          <form name="fileUploadFrm" id="fileUploadFrm" action="" method="post">
              <div className="left">
                  <label htmlFor="uploadFile">{uploadSrvcAddr}</label>
                  <input id="uploadFile" value={fileName} placeholder="Choose File" className="validate[required,FileType[csv]]" disabled="disabled" name="esidstoUpload"/>
                  <div className="fileUpload controlText-B myaccount-btn">
                      <ReactFileReader handleFiles={handleFiles}>
                        <p id="browseText">{upload}</p>
                      </ReactFileReader>
                  </div>
              </div>
              <div className="left left marginlefttwenty mtThirtyFive">
                  <CSVLink data={serviceAddrTemplate} filename={downloadFileName}>{download}</CSVLink><span className="excellink">&nbsp;</span><br/>
              </div>
              <div className="left marginlefttwenty mtTwentyFive">
                  <button className="right controlText-A b_submit ajaxIt1" onClick={lookup} id="fileuploadserachButton" type="button">{search}<span></span></button>
              </div>
        </form>
        <div id="searchResult1" className="movedown15 left fullwidth"></div>
		</div>
    )
}

UploadServiceAddress.propTypes = {
    uploadSrvAdrOpts: PropTypes.shape({
        lookup: PropTypes.func.isRequired,
        onUploadServiceAddr: PropTypes.func.isRequired,
        fileName: PropTypes.string.isRequired
    })
}

export default UploadServiceAddress
