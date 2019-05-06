import React from 'react'
import PropTypes from 'prop-types';

let EMMTable = ({tableOptns}) => {

    const { custList, onManagementCBox, onRegionCBox, onPropertyCBox } = tableOptns

    const TableHeader = <thead>
                          <tr>
                              <td className="unst"><input type="checkbox" name="selectAll"/></td>
                              <th className="unst">Business Name or DBA</th>
                              <th className="unst">BP#</th>
                              <th className="unst">Address</th>
                          </tr>
                        </thead>


    const ManagementRow = (mngt) => {

        let mngmtRow;
        if(!mngt.EMMAssigned && mngt.selected){
            mngmtRow = <tr>
                        <td><input type="checkbox" onChange={onManagementCBox} value={mngt.bpNumber} name="managementBP" className="rootParent" checked={mngt.verifySelected}/></td>
                        <td><span className="">&nbsp;{mngt.managementName}</span></td>
                        <td>{mngt.bpNumber}</td>
                        <td><span>{mngt.strBPAddress}</span></td>
                      </tr>
        }
        return([
            mngmtRow,
            mngt.regionList.map((rgn) => RegionRow(mngt,rgn))
          ]
        )
    }


  const RegionRow = (mng,rgn) => {

        let rgnList = [];
        let regionRow;
        if(!rgn.EMMAssigned && rgn.selected){
            regionRow = <tr key={mng.bpNumber}>
                            <td><input type="checkbox" onChange={onRegionCBox} name="regionBP" value={rgn.bpNumber} checked={rgn.verifySelected}/></td>
                            <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName}</td>
                            <td>{rgn.bpNumber}</td>
                            <td><span>{rgn.strBPAddress}</span></td>
                        </tr>
            rgnList.push(regionRow)
        }
        return([
              (rgn.bpNumber != 'NO_REGN')?rgnList:"",
              rgn.propertyList.map((prop) => PropertyRow(rgn,prop))
          ])
    }


    const PropertyRow = (rgn,prop) => {

        let propList = [];
        let propRow;
        if(!prop.EMAAssigned && prop.selected){
            propRow = <tr key={rgn.bpNumber}>
                        <td><input type="checkbox" onChange={onPropertyCBox} name="propertyBP" value={prop.bpNumber} checked={prop.verifySelected}/></td>
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td><span>{prop.strBPAddress}</span></td>
                      </tr>
            propList.push(propRow)
        }
        return(propList)
    }

    const EMMTable = custList.map((mngt,index) => ManagementRow(mngt,index))

    return(
      <table id="brkTable" className="tdsn dottedtdsn tablesorter">
          {TableHeader}
          <tbody id="transTbody">
              {EMMTable}
          </tbody>
      </table>
    )
}

EMMTable.propTypes = {
      tableOptns: PropTypes.object.isRequired
}

export default EMMTable
