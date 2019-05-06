import React from 'react'
import EMATable from './EMATable'
import EMMTable from './EMMTable'
import BrokerTable from './BrokerTable'
import BrokerAsscTable from './BrokerAsscTable'
import CustAdminTable from './CustAdminTable'
import CustAsscTable from './CustAsscTable'
import Cancel from '../../../common/Cancel'

let AssociateTable = ({tableOptns}) => {

    const { securityRole } = tableOptns


    let table;
    if(securityRole == 'E_Broker_BRK_ADM'){
        table = <BrokerTable tableOptns={tableOptns}/>
    }else if(securityRole == 'E_Broker_Associate_BRK_ASC' || securityRole == 'E_Broker Associate_BRK_ASC'){
        table = <BrokerAsscTable tableOptns={tableOptns}/>
    }else if(securityRole == 'E_Customer Admin_PO' || securityRole == 'E_Customer Admin_PM' || securityRole == 'E_Read-Only_OA'){
        table = <CustAdminTable tableOptns={tableOptns}/>
    }else if(securityRole == 'E_Customer Associate_PS'){
        table = <CustAsscTable tableOptns={tableOptns}/>
    }else if(securityRole == 'I_Agent_EMM'){
        table = <EMMTable tableOptns={tableOptns}/>
    }else if(securityRole == 'I_Agent_EMA'){
        table = <EMATable tableOptns={tableOptns}/>
    }

    return(
      <div class="left fullwidth movetitledown">
          {table}
      </div>
    )
}

export default AssociateTable
