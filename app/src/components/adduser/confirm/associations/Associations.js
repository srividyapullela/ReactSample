import React from 'react'
import AssociateMore from './AssociateMore'
import CommonUtil from '../../../common/Util'
import AssociateTable from './AssociateTable'
import PropTypes from 'prop-types';

let Associations = ({asscOptions}) => {

    const { securityRole, custList, selAdminAsscList,brokerLinkCollapsed,toggleBrokerLink, brokerLinkBpNumbers } = asscOptions

    const tableOptns = {mngtList:custList, securityRole, selAdminAsscList, brokerLinkCollapsed, brokerLinkBpNumbers, toggleBrokerLink }

    let result
    if(CommonUtil.isUserBroker(securityRole)){
        result = <div>Customer associations for brokers and broker associates must be managed in the business partner hierarchy within CRM.</div>
    }else{
        result = <AssociateMore />
    }

    return(
        <div>
          {result}
          <div className="left fullwidth movetitledown">
            <AssociateTable tableOptns={tableOptns}/>
          </div>
        </div>
    )
}

Associations.propTypes = {
    asscOptions: PropTypes.object.isRequired
}

export default Associations
