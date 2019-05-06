import React from 'react'
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv'

let CSV = ({csvData,csvFileName}) => {

    return(
      <div id="blqcontent">
          <div className="right">
              <ul>
                <CSVLink data={csvData} filename={csvFileName}>Download Data to CSV</CSVLink>
              </ul>
          </div>
      </div>
    )
}

CSV.propTypes = {
    csvData: PropTypes.arrayOf(PropTypes.object).isRequired,
    csvFileName: PropTypes.string.isRequired
}

export default CSV
