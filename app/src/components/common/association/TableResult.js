import React from 'react'
import BrokerTable from './BrokerTable'
import CustAdminTable from './CustAdminTable'
import EMATable from './EMATable'
import EMMTable from './EMMTable'
import { ErrorBox } from '../Error'
import Cancel from '../Cancel'
import CommonUtil from '../Util'
import PropTypes from 'prop-types';

let TableResult = ({tableRsltOptns}) => {

    const { custList, userType, onManagementCBox, onRegionCBox, onPropertyCBox, onAssociatedSelected, onAgentAssignedLinkClick, onPropAccesspriv, userCustomerList } = tableRsltOptns

    let errorMessage = 'No Hierarchy found for this bp.'
    let table;
    let result;

    if(custList.error){
        errorMessage = custList.errorMessage
        result = <div className="left fullwidth">
                    <ErrorBox message={errorMessage} isError={true}/>
                    <div className="handle"><Cancel /></div>
                 </div>
    }else{
        const tableOptns = {mngtList:custList,onManagementCBox,onRegionCBox,onPropertyCBox, onAgentAssignedLinkClick, onPropAccesspriv, userCustomerList }

        if(userType == 'EXT_BROKER'){
            table = <BrokerTable tableOptns={tableOptns}/>;
        }else if(CommonUtil.isCustAdminorExtReadOnly(userType)){
            table = <CustAdminTable tableOptns={tableOptns}/>
        }else if(CommonUtil.isAgentEMM(userType)){
            table = <EMMTable tableOptns={tableOptns}/>
        }else if(CommonUtil.isAgentEMA(userType)){
            table = <EMATable tableOptns={tableOptns}/>
        }

        result = <div className="left fullwidth">
                    {table}
                    <div className="handle movetitledown">
                        <Cancel />
                      <button className="right controlText-A" onClick={() => onAssociatedSelected(custList)} type="button">Associate Selected<span></span></button>
                    </div>
                </div>
    }


    return(
      <div id="searchResult">
          <div id="resultarea">
              {result}
            </div>
      </div>
    )
}

TableResult.propTypes = {
    tableRsltOptns: PropTypes.shape({
        custList: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object), PropTypes.object
        ]),
        userType: PropTypes.string.isRequired,
        onManagementCBox: PropTypes.func.isRequired,
        onRegionCBox: PropTypes.func.isRequired,
        onPropertyCBox: PropTypes.func.isRequired,
        onAssociatedSelected: PropTypes.func.isRequired,
        onAgentAssignedLinkClick: PropTypes.func.isRequired,
        onPropAccesspriv: PropTypes.func.isRequired,
        userCustomerList: PropTypes.any.isRequired
    })
}

export default TableResult
