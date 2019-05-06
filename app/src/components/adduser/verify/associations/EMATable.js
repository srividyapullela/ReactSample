import React from 'react'
import PropTypes from 'prop-types';

let EMATable = ({tableOptns}) => {

    const { custList, onPropertyCBox } = tableOptns

    const TableHeader = <thead>
                          <tr>
                              <td className="unst"><input type="checkbox" name="selectAll"/></td>
                              <th className="unst">Business Name or DBA</th>
                              <th className="unst">BP#</th>
                              <th className="unst">Address</th>
                          </tr>
                        </thead>


    const ManagementRow = (mngt) => mngt.regionList.map((rgn) => RegionRow(mngt,rgn))
    const RegionRow = (mng,rgn) => rgn.propertyList.map((prop) => PropertyRow(rgn,prop))



    const PropertyRow = (rgn,prop) => {

          let propList = [];
          let propRow;
          if(!prop.EMAAssigned && prop.selected){
              propRow = <tr key={rgn.bpNumber}>
                          <td><input type="checkbox" onChange={onPropertyCBox} checked={prop.verifySelected} className="" name="propertyBP" value={prop.bpNumber}/></td>
                          <td className="padLFifty"><span>{prop.propertyName}</span></td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>
              propList.push(propRow)
          }
          return(propList)
    }

    const EMATable = custList.map((mngt,index) => ManagementRow(mngt,index))

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
