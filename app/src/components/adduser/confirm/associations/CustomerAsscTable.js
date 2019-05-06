import React from 'react'
import PropTypes from 'prop-types';

let CustomerAsscTable = ({tableOptns}) => {

    const { selAdminAsscList } = tableOptns

    const TableHeader = <thead>
                            <tr>
                              <th className="unst">Business Name or DBA</th>
                              <th className="unst">BP#</th>
                              <th className="unst">Address</th>
                            </tr>
                        </thead>

    const ManagementRow = (mngt,index) => {

        let mngmtRow;
        if(mngt.bpNumber != 'NO_MGMT'){
            mngmtRow = <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                          <td><span className="" data-show={mngt.bpNumber}>&nbsp;</span>{mngt.managementName}</td>
                          <td>{mngt.bpNumber}</td>
                          <td className="">{mngt.strBPAddress}</td>
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
      if(rgn.bpNumber != 'NO_REGN'){
          regionRow = <tr key={rgn.bpNumber} className={mng.bpNumber}>
                          <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName}</td>
                          <td>{rgn.bpNumber}</td>
                          <td className="">{rgn.strBPAddress}</td>
                      </tr>
          rgnList.push(regionRow)
      }
      return([
            rgnList,
            rgn.propertyList.map((prop) => PropertyRow(rgn,prop))
          ])
    }

    const PropertyRow = (rgn,prop) => {

      let propList = [];
      let propRow = <tr key={prop.bpNumber}>
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td className="">{prop.strBPAddress}</td>
                    </tr>
        propList.push(propRow)
        return(propList)
    }

    const customerAssociateTable = selAdminAsscList.map((mngt) => ManagementRow(mngt))


    return(
        <table id="brkTable" className="tdsn dottedtdsn tablesorter">
            {TableHeader}
            <tbody id="transTbody">
                {customerAssociateTable}
            </tbody>
        </table>
    );
}

CustomerAsscTable.propTypes = {
    tableOptns: PropTypes.object.isRequired
}

export default CustomerAsscTable
