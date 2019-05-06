import React from 'react'

let EMMTable = ({tableOptns}) => {

    const { custList, onManagementCBox, onRegionCBox, onPropertyCBox, onAgentAssignedLinkClick } = tableOptns

    const TableHeader = <thead>
        									<tr>
                              <td className="unst"><input type="checkbox" name="selectAll" /></td>
          										<th className="unst">Business Name or DBA</th>
          										<th className="unst">BP#</th>
          										<th className="unst">Address</th>
        									</tr>
								        </thead>

    console.log("--------")
    console.log(custList)
    console.log("--------")

    const ManagementRow = (mngt,index) => {

        let mngmtRow =  <tr>
                          <td><input type="checkbox" onChange={onManagementCBox} checked={mngt.selectedOnUpdatePage}  value={mngt.bpNumber} name="managementBP"  className="" /></td>
                          <td><span className="">&nbsp;{mngt.managementName}</span></td>
                          <td>{mngt.bpNumber}</td>
                          <td><span>{mngt.strBPAddress}</span></td>
                        </tr>

        return([
            (mngt.bpNumber != 'NO_MGMT' && mngt.selected)?mngmtRow:'',
            mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index))
          ])
    }


  const RegionRow = (mng,rgn,index) => {

        let rgnList = [];
        let regionRow =  <tr key={rgn.bpNumber}>
                            <td><input type="checkbox" onChange={onRegionCBox} checked={rgn.selectedOnUpdatePage} className="" name="regionBP" value={rgn.bpNumber} /></td>
                            <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName} </td>
                            <td>{rgn.bpNumber}</td>
                            <td><span>{rgn.strBPAddress}</span></td>
                          </tr>

        rgnList.push(regionRow)
        return([
              (rgn.bpNumber != 'NO_REGN' && rgn.selected)?rgnList:"",
              rgn.propertyList.map((prop,index) => PropertyRow(rgn,prop,index))
          ])
    }


    const PropertyRow = (rgn,prop,index) => {

          let propList = [];
          let propRow = <tr key={rgn.bpNumber}>
                          <td><input type="checkbox" onChange={onPropertyCBox} checked={prop.selectedOnUpdatePage} className="" name="propertyBP" value={prop.bpNumber}/></td>
                          <td className="padLFifty"><span>{prop.propertyName}</span></td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>

          prop.selected?propList.push(propRow):''
          return propList
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

export default EMMTable
