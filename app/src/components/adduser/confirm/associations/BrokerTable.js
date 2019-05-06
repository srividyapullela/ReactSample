import React from 'react'
import CommonUtil from '../../../common/Util'
import PropTypes from 'prop-types';

let BrokerTable = ({tableOptns}) => {

    const { mngtList, brokerLinkBpNumbers, toggleBrokerLink } = tableOptns

    const TableHeader = <thead>
                          <tr>
                            <th className="unst">Business Name or DBA</th>
                            <th className="unst">BP#</th>
                            <th className="unst">Address</th>
                            <th className="unst">Can Pay</th>
                            <th className="unst">Can Start / Stop Service</th>
                          </tr>
                        </thead>

      const ManagementRow = (mngt,index) => {

          let isLinkCollapsed = CommonUtil.isArrayContains(brokerLinkBpNumbers,mngt.bpNumber);

          return([
              <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                  <td><span onClick={() => toggleBrokerLink(mngt.bpNumber,!isLinkCollapsed)} className={!isLinkCollapsed?'collapsedLink':'expandedLink'}>&nbsp;</span>{mngt.managementName}</td>
                  <td>{mngt.bpNumber}</td>
                  <td className="">{mngt.strBPAddress}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>,
              mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index))
            ]
          )
      }

      const RegionRow = (mng,rgn) => {

        return([
              (rgn.bokerAssigned && rgn.bpNumber != 'NO_REGN')?
                <tr className={mng.bpNumber}>
                    <td className="padLTwentyFive"><span className={CommonUtil.isArrayContains(brokerLinkBpNumbers,mng.bpNumber)?'collapsedLink':'expandedLink'}>&nbsp;</span>{rgn.regionName}</td>
                    <td>{rgn.bpNumber}</td>
                    <td className="">{rgn.strBPAddress}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                :"",
                rgn.propertyList.map((prop,index) => PropertyRow(mng,rgn,prop,index))
            ])
      }

      const PropertyRow = (mng,rgn,prop) => {

            return(
                prop.bokerAssigned && CommonUtil.isArrayContains(brokerLinkBpNumbers,mng.bpNumber)?
                    <tr className="">
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td className="">{prop.strBPAddress}</td>
                        <td><span>{prop.billingAce == 'Y'?'Yes':'No'}</span></td>
                        <td><span>{prop.startStopAce == 'Y'?'Yes':'No'}</span></td>
                      </tr>:""
                  )
      }

      const brokerTable = mngtList.map((mngt,index) => ManagementRow(mngt,index))


    return(
        <table id="brkTable" className="tdsn dottedtdsn tablesorter">
            {TableHeader}
            <tbody id="transTbody">
                {brokerTable}
            </tbody>
        </table>
    );
}

BrokerTable.propTypes = {
    tableOptns: PropTypes.object.isRequired
}

export default BrokerTable
