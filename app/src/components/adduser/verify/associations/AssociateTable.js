import React from 'react'
import EMATable from './EMATable'
import EMMTable from './EMMTable'
import BrokerTable from './BrokerTable'
import CustAdminTable from './CustAdminTable'
import CustomerAsscTable from './CustomerAsscTable'
import BrokerAsscTable from './BrokerAsscTable'
import PropTypes from 'prop-types';

let AssociateTable = ({tableOptns}) => {

    const { securityRole } = tableOptns

    let table;
    if(securityRole == 'EXT_BROKER'){
        table = <BrokerTable tableOptns={tableOptns}/>;
    }else if(securityRole == 'EXT_CA_PO' || securityRole == 'EXT_CA_PM' || securityRole == 'EXT_READ_ONLY'){
        table = <CustAdminTable tableOptns={tableOptns}/>;
    }else if(securityRole == 'INT_AGT_EMM'){
        table = <EMMTable tableOptns={tableOptns}/>
    }else if(securityRole == 'INT_AGT_EMA'){
        table = <EMATable tableOptns={tableOptns}/>
    }else if(securityRole == 'EXT_CUS_ASC'){
        table = <CustomerAsscTable tableOptns={tableOptns}/>
    }else if(securityRole == 'EXT_BRK_ASC'){
        table = <BrokerAsscTable tableOptns={tableOptns}/>
    }



    return(
      <div className="left fullwidth movetitledown">
          {table}
      </div>
    )
}

AssociateTable.propTypes = {
    tableOptns: PropTypes.object.isRequired
}

export default AssociateTable
