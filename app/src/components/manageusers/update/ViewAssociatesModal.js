import React from 'react'
import PropTypes from 'prop-types';

let ViewAssociatesModal = ({asscList, onAssociateUserNameClick}) => {

  let asscListFound = (undefined != asscList && asscList.length > 0);

  const TableHeader = <thead>
                          <tr>
                              <th className="unst">First Name</th>
                              <th className="unst">Last Name</th>
                              <th className="unst">Username</th>
                          </tr>
                      </thead>


  const AssociateRow = (associate,index) => {
                          return(
                              <tr key = {associate.userName} className={index%2 == 0?'odd':'even'}>
                                  <td>{associate.firstName}</td>
                                  <td>{associate.lastName}</td>
                                <td><a onClick={() => onAssociateUserNameClick(associate.userName)}>{associate.userName}</a></td>
                              </tr>
                          )
                      }

  const associateTable = asscList.map((associate,index) => AssociateRow(associate,index))

    return(
        <div className="M-content">
          <div className="left fullwidth movetitledown">
                <h2> Associated Users </h2>
               {asscListFound?<div className="left fullwidth movetitledown">
                    <table id="AsstUserTable" className="tdsn dottedtdsn tablepagination tablesorter">
                        {TableHeader}
                        <tbody id="AsstUserTableBody">
                            {associateTable}
                        </tbody>
                    </table>
               </div>:
                <p>No associates found for this admin.</p>
               }
          </div>
        </div>
    )
}

ViewAssociatesModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    asscList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAssociateUserNameClick: PropTypes.func.isRequired
}

export default ViewAssociatesModal
