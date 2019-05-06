import React from 'react'
import PropTypes from 'prop-types';

let BrokerAsscTable = ({tableOptns}) => {

    const { selAdminAsscList, onPropAccesspriv, brokerLinkCollapsed, toggleBrokerLink } = tableOptns

    const TableHeader = <thead>
                          <tr>
                              <th className="unst">Business Name or DBA</th>
                              <th className="unst">BP#</th>
                              <th className="unst">Address</th>
                              <th className="unst">Access Privileges</th>
                          </tr>
                        </thead>

    const ManagementRow = (mngt,index) => {

        let mngmtRow;
        let isLinkCollapsed = brokerLinkCollapsed;
        if(mngt.newlyAddedBP){
            mngmtRow = <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                          <td><span className={brokerLinkCollapsed?'collapsedLink':'expandedLink'} onClick={toggleBrokerLink}>&nbsp;</span>{mngt.managementName}</td>
                          <td>{mngt.bpNumber}</td>
                          <td className="">{mngt.strBPAddress}</td>
                          <td>
														New Property
														<img src="/ssgme/resources/assets/images/public/icon_img_asterisk.png"/>
													</td>
                      </tr>
        }else{
            mngmtRow = <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                          <td><span onClick={toggleBrokerLink} className={brokerLinkCollapsed?'collapsedLink':'expandedLink'}>&nbsp;</span>{mngt.managementName}</td>
                          <td>{mngt.bpNumber}</td>
                          <td className="">{mngt.strBPAddress}</td>
                          <td>&nbsp;</td>
                    </tr>
        }
        return([
            mngmtRow,
            mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index,isLinkCollapsed))
          ]
        )
    }

    const RegionRow = (mng,rgn,index,isLinkCollapsed) => {

      let rgnList = [];
      let regionRow;
      if(rgn.bokerAssigned && rgn.bpNumber != 'NO_REGN'){
          if(rgn.newlyAddedBP){
            regionRow = <tr key={rgn.bpNumber} className={mng.bpNumber}>
                            <td className="padLTwentyFive"><span className={isLinkCollapsed?'collapsedLink':'expandedLink'}>&nbsp;</span>{rgn.regionName}</td>
                            <td>{rgn.bpNumber}</td>
                            <td className="">{rgn.strBPAddress}</td>
                            <td>
                              New Property
                              <img src="/ssgme/resources/assets/images/public/icon_img_asterisk.png"/>
                            </td>
                        </tr>
          }else{
            regionRow = <tr key={rgn.bpNumber} className={mng.bpNumber}>
                            <td className="padLTwentyFive"><span className={isLinkCollapsed?'collapsedLink':'expandedLink'}>&nbsp;</span>{rgn.regionName}</td>
                            <td>{rgn.bpNumber}</td>
                            <td className="">{rgn.strBPAddress}</td>
                            <td>&nbsp;</td>
                        </tr>
          }

          rgnList.push(regionRow)
      }
      return([
            rgnList,
            rgn.propertyList.map((prop,index) => PropertyRow(rgn,prop,index,isLinkCollapsed))
          ])
    }

    const PropertyRow = (rgn,prop,index,isLinkCollapsed) => {

      let propList = [];
      let propRow;
      if(prop.bokerAssigned && !isLinkCollapsed){
          if(prop.newlyAddedBP){
             propRow = <tr key={prop.bpNumber}>
                         <td className="padLFifty">{prop.propertyName}</td>
                         <td>{prop.bpNumber}</td>
                         <td className="">{prop.strBPAddress}</td>
                         <td>
                           New Property
                           <img src="/ssgme/resources/assets/images/public/icon_img_asterisk.png"/>
                         </td>
                       </tr>
          }else{
              let billingAceChecked = (prop.billingAce == 'Y')
              let startstopAceChecked = (prop.startStopAce == 'Y')
              propRow =  <tr key={prop.bpNumber}>
                            <td className="padLFifty">{prop.propertyName}</td>
                            <td>{prop.bpNumber}</td>
                            <td className="">{prop.strBPAddress}</td>
                            <td>
                                <input type="checkbox" checked={billingAceChecked} onChange={(e) => onPropAccesspriv('B',e)} name="payace" value={prop.bpNumber}/>
                                <label htmlFor="${prop.bpNumber}pay" className="textlabel">Pay Bill</label><br/>
                                <input type="checkbox" checked={startstopAceChecked} name="startserv"  onChange={(e) => onPropAccesspriv('S',e)} value={prop.bpNumber}/>
                                <label htmlFor="${prop.bpNumber}serv" className="textlabel">Start/Stop Service</label><br/>
														</td>
                        </tr>
          }
      }

        propList.push(propRow)
        return(propList)
    }

    const customerAssociateTable = selAdminAsscList.map((mngt,index) => ManagementRow(mngt,index))


    return(
        <table id="brkTable" className="tdsn dottedtdsn tablesorter">
            {TableHeader}
            <tbody id="transTbody">
                {customerAssociateTable}
            </tbody>
        </table>
    );
}

BrokerAsscTable.propTypes = {
    tableOptns: PropTypes.object.isRequired
}

export default BrokerAsscTable
