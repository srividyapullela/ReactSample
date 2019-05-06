import React from 'react'
import PropTypes from 'prop-types';

let EMMTable = ({tableOptns}) => {

    const { mngtList, onManagementCBox, onRegionCBox, onPropertyCBox, onAgentAssignedLinkClick } = tableOptns

    const TableHeader = <thead>
                            <tr>
                              <td className="unst"></td>
                              <th className="unst">Business Name or DBA</th>
                              <th className="unst">BP#</th>
                              <th className="unst">Address</th>
                            </tr>
                        </thead>


    const ManagementRow = (mngt) => {

        let mngmtRow;
        if(mngt.EMMAssigned){
            let obj = {bpNumber:mngt.bpNumber,bpName:mngt.managementName,address:mngt.strBPAddress,hierarchyType:"MGMT", agentType:"EMM"}
            mngmtRow = <tr>
                        <td><input type="checkbox" onChange={onManagementCBox} value={mngt.bpNumber} name="managementBP" className="rootParent" disabled="disabled" /></td>
                        <td><span className="">&nbsp; <a href="#" onClick={() => onAgentAssignedLinkClick(obj)}>{mngt.managementName}</a></span></td>
                        <td>{mngt.bpNumber}</td>
                        <td><span>{mngt.strBPAddress}</span></td>
                      </tr>
        }else{
            let mngDisabled = false
            mngt.regionList.forEach(rgn => {if(rgn.EMMAssigned){mngDisabled = true}})
            mngmtRow =  <tr>
                          <td><input type="checkbox" onChange={onManagementCBox} checked={mngt.selected} disabled={mngDisabled?'disabled':''} value={mngt.bpNumber} name="managementBP"  className="" /></td>
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
        if(rgn.EMMAssigned){
            let obj = {bpNumber:rgn.bpNumber,bpName:rgn.regionName,address:rgn.strBPAddress,hierarchyType:"REGN",agentType:"EMM"}
            regionRow = <tr key={mng.bpNumber}>
                            <td><input type="checkbox" onChange={onRegionCBox} name="regionBP" value={rgn.bpNumber} disabled="disabled" /></td>
                            <td className="padLTwentyFive"><span className="">&nbsp;</span><a href="#" onClick={() => onAgentAssignedLinkClick(obj)}>{rgn.regionName}</a> </td>
                            <td>{rgn.bpNumber}</td>
                            <td><span>{rgn.strBPAddress}</span></td>
                        </tr>
        }else{
            regionRow =  <tr key={rgn.bpNumber}>
                            <td><input type="checkbox" onChange={onRegionCBox} checked={rgn.selected} className="" name="regionBP" value={rgn.bpNumber} /></td>
                            <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName} </td>
                            <td>{rgn.bpNumber}</td>
                            <td><span>{rgn.strBPAddress}</span></td>
                          </tr>
        }
        rgnList.push(regionRow)
        return([
              (rgn.bpNumber != 'NO_REGN')?rgnList:"",
              rgn.propertyList.map((prop) => PropertyRow(rgn,prop))
          ])
    }


    const PropertyRow = (rgn,prop) => {

          let propList = [];
          let propRow;
          if(prop.EMAAssigned){
              let obj = {bpNumber:prop.bpNumber,bpName:prop.propertyName,address:prop.strBPAddress,hierarchyType:"PROP", agentType:"EMM"}
              propRow = <tr key={rgn.bpNumber}>
                          <td><input type="checkbox" onChange={onPropertyCBox} name="propertyBP" value={prop.bpNumber} disabled="disabled" /></td>
                          <td className="padLFifty"><a onClick={() => onAgentAssignedLinkClick(obj)} href="#">{prop.propertyName}</a></td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>
          }else{
              propRow = <tr key={rgn.bpNumber}>
                          <td><input type="checkbox" onChange={onPropertyCBox} disabled={rgn.EMMAssigned} checked={prop.selected} className="" name="propertyBP" value={prop.bpNumber}/></td>
                          <td className="padLFifty"><span>{prop.propertyName}</span></td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>
          }
          propList.push(propRow)
          return(propList)
    }

    const EMMTable = mngtList.map((mngt,index) => ManagementRow(mngt,index))

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
    tableOptns: PropTypes.shape({
      mngtList: PropTypes.arrayOf(PropTypes.object).isRequired,
      onManagementCBox: PropTypes.func.isRequired,
      onRegionCBox: PropTypes.func.isRequired,
      onPropertyCBox: PropTypes.func.isRequired,
      onAgentAssignedLinkClick: PropTypes.func.isRequired,
    })
}

export default EMMTable
