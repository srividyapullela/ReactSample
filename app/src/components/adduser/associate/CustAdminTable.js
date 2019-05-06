import React from 'react'
import PropTypes from 'prop-types';

let CustAdminTable = ({tableOptns}) => {

    const { mngtList, onManagementCBox, onRegionCBox, onPropertyCBox } = tableOptns

    const TableHeader = <thead>
                            <tr>
                              <td></td>
                              <th className="unst">Business Name or DBA</th>
                              <th className="unst">BP#</th>
                              <th className="unst">Address</th>
                            </tr>
                        </thead>

      const ManagementRow = (mngt,index) => {

          return([
              <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                  <td><input type="checkbox" onChange={onManagementCBox} checked={mngt.selected} value={mngt.bpNumber} name="managementBP"/></td>
                  <td><span className="" data-show={mngt.bpNumber}>&nbsp;</span>{mngt.managementName}</td>
                  <td>{mngt.bpNumber}</td>
                  <td className="">{mngt.strBPAddress}</td>
              </tr>,
              mngt.regionList.map((rgn) => RegionRow(mngt,rgn))
            ]
          )
      }

      const RegionRow = (mng,rgn) => {

        return([
              (rgn.bpNumber != 'NO_REGN')?
                <tr key={rgn.bpNumber} className={mng.bpNumber}>
                    <td><input type="checkbox" onChange={onRegionCBox} checked={rgn.selected} value={rgn.bpNumber} name="regionBP"/></td>
                    <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName}</td>
                    <td>{rgn.bpNumber}</td>
                    <td className="">{rgn.strBPAddress}</td>
                </tr>
                :"",
                rgn.propertyList.map((prop) => PropertyRow(rgn,prop))
            ])
      }

      const PropertyRow = (rgn,prop) => {

            return(
                    <tr key={prop.bpNumber}>
                        <td><input type="checkbox" onChange={onPropertyCBox} checked={prop.selected} className="" name="propertyBP" value={prop.bpNumber}/></td>
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td className="">{prop.strBPAddress}</td>
                    </tr>
                  )
      }

      const customerAdminTable = mngtList.map((mngt,index) => ManagementRow(mngt,index))


    return(
        <table id="brkTable" className="tdsn dottedtdsn tablesorter">
            {TableHeader}
            <tbody id="transTbody">
                {customerAdminTable}
            </tbody>
        </table>
    );
}

CustAdminTable.propTypes = {
    tableOptns: PropTypes.object.isRequired
}

export default CustAdminTable
