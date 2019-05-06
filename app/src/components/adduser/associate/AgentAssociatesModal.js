import React from 'react'
import { ErrorBox } from '../../common/Error'
import PropTypes from 'prop-types';

let AgentAssociatesModal = ({asscList, agent}) => {

    let result;
    if(undefined != asscList && asscList.length != 0){

      const TableHeader = <thead>
                            <tr>
                              <th className="unst">First Name</th>
                              <th className="unst">Last Name</th>
                              <th className="unst">Username</th>
                              <th className="unst">Security Role</th>
                              <th className="unst">User Type</th>
                            </tr>
                          </thead>

      const AssociateRow = (assc,index) => {

                            return(
                                <tr key = {assc.userName} className={index%2 == 0?'odd':'even'}>
                                  <td><label htmlFor="broker1" className="textlabel">{assc.firstName}</label></td>
                                  <td>{assc.lastName}</td>
                                  <td>{assc.userName}</td>
                                  <td>{assc.securityRole}</td>
                                  <td>{assc.securityRoleDisplayName}</td>
                                </tr>
                            )
                        }

        const AssociateTable = asscList.map((associate,index) => AssociateRow(associate,index))

        result = <div className="left fullwidth movetitledown">
                    <table id="esitable" className="tdsn dottedtdsn tablepagination tablesorter">
                        {TableHeader}
                        <tbody id="transTbody">
                          {AssociateTable}
                        </tbody>
                    </table>
                </div>
    }else{
        result = <ErrorBox message="No associates found" isError={true} />
    }

    const heading = <h2>Associated Users</h2>



    const bpDetails = <div className="left fullwidth">
                         <div className="left fullwidth">
                             <div className="left fullwidth">
                               <div id="bpnumberfield" className="b">BP#: {agent.bpNumber}</div>
                             </div>
                             <div className="left fullwidth">
                               <div id="bpnamefield" className="b">{agent.bpName}</div>
                             </div>
                             <div id="bpaddresscomstr" className="left fullwidth">{agent.address}</div>
                         </div>
                     </div>

    return(
        <div>
            <div className="M-heading">{heading}</div>
            <div className="M-content">
            {bpDetails}
            <div className="left fullwidth movetitledown">
            <div className="left fullwidth contenttitleseperator"></div>
            {result}
            <div className="left fullwidth"></div>
            </div>
          </div>
        </div>
    )
}

AgentAssociatesModal.propTypes = {
    asscList: PropTypes.arrayOf(PropTypes.object).isRequired,
    agent: PropTypes.shape({
        bpNumber: PropTypes.string,
        bpName: PropTypes.string,
        address: PropTypes.string
    })
}

export default AgentAssociatesModal
