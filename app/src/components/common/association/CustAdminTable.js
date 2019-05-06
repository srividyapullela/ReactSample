import React from 'react'
import * as _ from 'lodash'
import PropTypes from 'prop-types';

let CustAdminTable = ({tableOptns}) => {

    const { mngtList, onManagementCBox, onRegionCBox, onPropertyCBox, userCustomerList } = tableOptns

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
                  <td><input type="checkbox" onChange={onManagementCBox} disabled={_.includes(userCustomerList,mngt.bpNumber)} checked={mngt.selected} value={mngt.bpNumber} name="managementBP"/></td>
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
                    <td><input type="checkbox" onChange={onRegionCBox} disabled={_.includes(userCustomerList,rgn.bpNumber)} checked={rgn.selected} value={rgn.bpNumber} name="regionBP"/></td>
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
                        <td><input type="checkbox" onChange={onPropertyCBox} disabled={_.includes(userCustomerList,prop.bpNumber)} checked={prop.selected} className="" name="propertyBP" value={prop.bpNumber}/></td>
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
    tableOptns: PropTypes.shape({
      mngtList: PropTypes.arrayOf(PropTypes.object).isRequired,
      onManagementCBox: PropTypes.func.isRequired,
      onRegionCBox: PropTypes.func.isRequired,
      onPropertyCBox: PropTypes.func.isRequired,
      userCustomerList: PropTypes.arrayOf(PropTypes.string).isRequired
    })
}

export default CustAdminTable
