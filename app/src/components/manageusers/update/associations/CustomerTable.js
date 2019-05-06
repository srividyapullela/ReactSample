import React from 'react'
import BrokerTable from './BrokerTable'

let CustomerTable = (props) => {

    const { securityRole, mngtList } = props

    return(
        <div id="verifyTable">
            <div className="left fullwidth movetitledown">
              <BrokerTable mngtList={mngtList}/>
            </div>
        </div>
    );
}

export default CustomerTable
