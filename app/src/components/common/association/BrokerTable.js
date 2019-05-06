import React from 'react'
import PropTypes from 'prop-types';

let BrokerTable = ({tableOptns}) => {

    const { mngtList, onPropAccesspriv } = tableOptns

    const TableHeader = <thead>
                          <tr>
                            <th className="unst">Business Name or DBA</th>
                            <th className="unst">BP#</th>
                            <th className="unst">Address</th>
                            <th className="unst">Access Privileges</th>
                          </tr>
                        </thead>

      const ManagementRow = (mngt,index) => {

          return([
              <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                  <td><span className="collapsedLink linkToOpen rootLevel" data-show={mngt.bpNumber}>&nbsp;</span>{mngt.managementName}</td>
                  <td>{mngt.bpNumber}</td>
                  <td className="">{mngt.strBPAddress}</td>
                  <td>&nbsp;</td>
              </tr>,
              mngt.regionList.map((rgn) => RegionRow(mngt,rgn))
            ]
          )
      }

      const RegionRow = (mng,rgn) => {

        return([
              (rgn.bokerAssigned && rgn.bpNumber != 'NO_REGN')?
                <tr className={mng.bpNumber}>
                    <td className="padLTwentyFive"><span className="collapsedLink linkToOpen" data-show={rgn.bpNumber}>&nbsp;</span>{rgn.regionName}</td>
                    <td>{rgn.bpNumber}</td>
                    <td className="">{rgn.strBPAddress}</td>
                    <td>&nbsp;</td>
                </tr>
                :"",
                rgn.propertyList.map((prop) => PropertyRow(rgn,prop))
            ])
      }

      const PropertyRow = (rgn,prop) => {

            return(
                prop.bokerAssigned?
                    <tr className="">
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td className="">{prop.strBPAddress}</td>
                        <td>
                           <input type="checkbox" onChange={(e) => onPropAccesspriv('B', e)} value={prop.bpNumber} checked={prop.billingAce == 'Y'} name="paybill" />
                         <label className="textlabel" htmlFor="paybill">Pay Bill</label><br></br>
                           <input type="checkbox" onChange={(e) => onPropAccesspriv('S', e)} name="startstop" value={prop.bpNumber} checked={prop.startStopAce == 'Y'} />
                         <label className="textlabel" htmlFor="startstop">Start/Stop Service</label>
                        </td>
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
    tableOptns: PropTypes.shape({
        mngtList: PropTypes.arrayOf(PropTypes.object).isRequired,
        onPropAccesspriv: PropTypes.func.isRequired
    })
}

export default BrokerTable
