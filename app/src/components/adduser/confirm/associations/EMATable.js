import React from 'react'
import PropTypes from 'prop-types';

let EMATable = ({tableOptns}) => {

    const { mngtList } = tableOptns

    const TableHeader = <thead>
                          <tr>
                              <th className="unst">Business Name or DBA</th>
                              <th className="unst">BP#</th>
                              <th className="unst">Address</th>
                          </tr>
                        </thead>


    const ManagementRow = (mngt) => mngt.regionList.map((rgn) => RegionRow(mngt,rgn))
    const RegionRow = (mng,rgn) => rgn.propertyList.map((prop) => PropertyRow(rgn,prop))

    const PropertyRow = (rgn,prop) => {
          let propList = [];
          if(!prop.EMAAssigned && prop.selected){
              let propRow = <tr key={rgn.bpNumber}>
                          <td className="padLFifty">{prop.propertyName}</td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>
              propList.push(propRow)
          }
          return(propList)
    }

    const EMATable = mngtList.map((mngt) => ManagementRow(mngt))

    return(
      <table id="brkTable" className="tdsn dottedtdsn tablesorter">
          {TableHeader}
          <tbody id="transTbody">
              {EMATable}
          </tbody>
      </table>
    )
}

EMATable.propTypes = {
    tableOptns: PropTypes.object.isRequired
}

export default EMATable
