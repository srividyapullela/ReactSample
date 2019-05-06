import React from 'react'

let CustAsscTable = ({tableOptns}) => {

    const { custList } = tableOptns

    const TableHeader = <thead>
        									<tr>
          										<th className="unst">Business Name or DBA</th>
          										<th className="unst">BP#</th>
          										<th className="unst">Address</th>
        									</tr>
								        </thead>

      const ManagementRow = (mngt,index) => {

          return([
              (mngt.bpNumber != 'NO_MGMT' && mngt.selected)?
              <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                  <td><span className="" data-show={mngt.bpNumber}>&nbsp;</span>{mngt.managementName}</td>
                  <td>{mngt.bpNumber}</td>
                  <td className="">{mngt.strBPAddress}</td>
              </tr>:'',
              mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index))
            ]
          )
      }

      const RegionRow = (mng,rgn,index) => {

        return([
              (rgn.bpNumber != 'NO_REGN' && rgn.selected)?
                <tr key={rgn.bpNumber} className={mng.bpNumber}>
                    <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName}</td>
                    <td>{rgn.bpNumber}</td>
                    <td className="">{rgn.strBPAddress}</td>
                </tr>
                :"",
                rgn.propertyList.map((prop,index) => PropertyRow(rgn,prop,index))
            ])
      }

      const PropertyRow = (rgn,prop,index) => {

            return(
                prop.selected?
                    <tr key={prop.bpNumber}>
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td className="">{prop.strBPAddress}</td>
                    </tr>:""
                  )
      }

      const customerAssociateTable = custList.map((mngt,index) => ManagementRow(mngt,index))


    return(
        <table id="brkTable" className="tdsn dottedtdsn tablesorter">
            {TableHeader}
            <tbody id="transTbody">
                {customerAssociateTable}
            </tbody>
        </table>
    );
}

export default CustAsscTable
