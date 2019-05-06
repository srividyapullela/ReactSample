import React from 'react'
import AccessPrivService from './AccessPrivService'
import AccessPrivBilling from './AccessPrivBilling'
import NewlyAddedProperty from './NewlyAddedProperty'

let BrokerAsscTable = ({tableOptns}) => {

    const { custList, onManagementCBox, onRegionCBox, onPropertyCBox, onBrokerPropAccessPriv, brokerPropAccessPriv, onBrkrPropAccessChange, clickedPropBpNumber } = tableOptns

    const TableHeader = <thead>
        									<tr>
        										<th className="unst">Business Name or DBA</th>
        										<th className="unst">BP#</th>
        										<th className="unst">Address</th>
        										<th className="unst twocolumdivlayout">Can pay bills</th>
        										<th className="unst twocolumdivlayout">Can Start / Stop Service</th>
        									</tr>
								        </thead>

      const ManagementRow = (mngt,index) => {

          return([
              <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                  <td><span className="">&nbsp;</span>{mngt.managementName}</td>
                  <td>{mngt.bpNumber}</td>
                  <td className="">{mngt.strBPAddress}</td>
                  {mngt.newlyAddedBP?
                    <td colSpan="2">
                      <NewlyAddedProperty />
                    </td>:
                    [<td>&nbsp;</td>,
                    <td>&nbsp;</td>]
                  }
              </tr>,
              mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index))
            ]
          )
      }

      const RegionRow = (mng,rgn,index) => {

        return([
              (rgn.bokerAssigned && rgn.bpNumber != 'NO_REGN')?
                <tr className={mng.bpNumber}>
                    <td className="padLTwentyFive"><span>&nbsp;</span>{rgn.regionName}</td>
                    <td>{rgn.bpNumber}</td>
                    <td className="">{rgn.strBPAddress}</td>
                    {rgn.newlyAddedBP?
                      <td colSpan="2">
                        <NewlyAddedProperty />
                      </td>:
                      [<td>&nbsp;</td>,
                      <td>&nbsp;</td>]
                    }
                </tr>
                :"",
                rgn.propertyList.map((prop,index) => PropertyRow(rgn,prop,index))
            ])
      }

      const PropertyRow = (rgn,prop,index) => {

            const accessPrivOptns = {bpNumber:prop.bpNumber,clickedPropBpNumber,brokerPropAccessPriv,onBrkrPropAccessChange,onBrokerPropAccessPriv}

            return(
                prop.bokerAssigned?
                    <tr className="">
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td className="">{prop.strBPAddress}</td>
                        {prop.newlyAddedBP?
                          <td colSpan="2">
                            <NewlyAddedProperty />
                          </td>:
                          [<AccessPrivBilling acessPriv={prop.billingAce} accessPrivOptns={accessPrivOptns}/>,
                          <AccessPrivService acessPriv={prop.startStopAce} accessPrivOptns={accessPrivOptns}/>]
                        }
                     </tr>:""
                  )
      }

      const brokerTable = custList.map((mngt,index) => ManagementRow(mngt,index))


    return(
        <table id="brkTable" className="tdsn dottedtdsn tablesorter">
            {TableHeader}
            <tbody id="transTbody">
                {brokerTable}
            </tbody>
        </table>
    );
}

export default BrokerAsscTable
