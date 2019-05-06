import React from 'react'
import PropTypes from 'prop-types';

let EMATable = ({tableOptns}) => {

    const { mngtList, onPropertyCBox, onAgentAssignedLinkClick } = tableOptns

    const TableHeader = <thead>
                            <tr>
                              <td className="unst"></td>
                              <th className="unst">Business Name or DBA</th>
                              <th className="unst">BP#</th>
                              <th className="unst">Address</th>
                            </tr>
                        </thead>


    const ManagementRow = (mngt) => {

      return([
            <tr key={mngt.bpNumber}>
              <td>&nbsp;</td>
              <td><span className="">&nbsp;{mngt.managementName}</span></td>
              <td>{mngt.bpNumber}</td>
              <td><span>{mngt.strBPAddress}</span></td>
            </tr>,
            mngt.regionList.map((rgn) => RegionRow(mngt,rgn))
          ]
        )
    }


  const RegionRow = (mng,rgn) => {

        return([
              (rgn.bpNumber != 'NO_REGN')?
                <tr key={mng.bpNumber}>
                    <td>&nbsp;</td>
                    <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName} </td>
                    <td>{rgn.bpNumber}</td>
                    <td><span>{rgn.strBPAddress}</span></td>
                </tr>:"",
              rgn.propertyList.map((prop) => PropertyRow(rgn,prop))
          ])
    }


    const PropertyRow = (rgn,prop) => {

          let propList = [];
          let propRow;
          if(prop.EMAAssigned){
              let obj = {bpNumber:prop.bpNumber,bpName:prop.propertyName,address:prop.strBPAddress,hierarchyType:"PROP", agentType:"EMA"}
              propRow = <tr key={rgn.bpNumber}>
                          <td><input type="checkbox" onChange={onPropertyCBox} name="propertyBP" value={prop.bpNumber} disabled="disabled" /></td>
                          <td className="padLFifty"><a onClick={() => onAgentAssignedLinkClick(obj)} href="#">{prop.propertyName}</a></td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>
          }else{
              propRow = <tr key={rgn.bpNumber}>
                          <td><input type="checkbox" onChange={onPropertyCBox} checked={prop.selected?'checked':''} className="" name="propertyBP" value={prop.bpNumber}/></td>
                          <td className="padLFifty"><span>{prop.propertyName}</span></td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>
          }
          propList.push(propRow)
          return(propList)
    }

    const EMMTable = mngtList.map((mngt) => ManagementRow(mngt))

    return(
      <table id="brkTable" className="tdsn dottedtdsn tablesorter">
          {TableHeader}
          <tbody id="transTbody">
              {EMMTable}
          </tbody>
      </table>
    )
}

EMATable.propTypes = {
      tableOptns: PropTypes.object.isRequired
}

export default EMATable
