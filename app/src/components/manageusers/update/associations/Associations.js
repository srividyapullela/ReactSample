import React from 'react'
import AssociateMore from './AssociateMore'
import CommonUtil from '../../../common/Util'
import AssociateTable from './AssociateTable'


let Associations = ({tableRsltOptns}) => {

    const { securityRole, custList, onManagementCBox, onRegionCBox, onPropertyCBox, onAssociateMoreLink, isAdminChangingForAssociate } = tableRsltOptns

    let result
    if(CommonUtil.isUserBroker(securityRole)){
        result = <div className="left">Customer associations for brokers and broker associates must be managed in the business partner hierarchy within CRM.</div>
    }else if(CommonUtil.isUserCustAssociate(securityRole) || isAdminChangingForAssociate){
        result = <div className="left fullwidth contenttitleseperator">
                    <div className="label">Associated Customers</div>
                 </div>
    }else{
        result = <AssociateMore onAssociateMoreLink={onAssociateMoreLink} />
    }

    return(
        <div>
          {result}
          <div class="left fullwidth movetitledown">
            <AssociateTable tableOptns={tableRsltOptns}/>
          </div>
        </div>
    )
}

export default Associations
