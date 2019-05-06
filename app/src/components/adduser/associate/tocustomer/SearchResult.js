import React from 'react'
import Modal from '../../../common/Modal'
import AssociatesModal from '../../../common/AssociatesModal'
import RightButton from '../../../common/RightButton'
import { ErrorBox } from '../../../common/Error'
import BPInfo from './BPInfo'
import GMETable from '../../../common/GMETable'
import PropTypes from 'prop-types';

let SearchResult = ({searchRsltOptions}) => {

      const { custDetails, searchCriteria, onCustomerLinkClick, toggleModal, isCustModalOpen,
              asscList, userType, onCustAdminRadioChange, onAssociateToCustAdminBtn } = searchRsltOptions


      if(undefined == custDetails.adminList || custDetails.adminList.length == 0){
          const errorMessage = (searchCriteria == 'BP')?"Customer admin with entered BP number doesn't exist. Please try with a different BP Number."
                      :"Customer admin with entered last name doesn't exist. Please try with a different last name."
          return(
            <ErrorBox message={errorMessage} isError={true}/>
          )
      }

      const CustomerRow = (user,index) => {

                            return(
                                <tr key={user.userName} className={index%2 == 0?'odd':'even'}>
                                    <td className="textc"><input type="radio" onChange={onCustAdminRadioChange} name="selAdmin" value={user.userName}/></td>
                                    <td><label className="textlabel">{user.firstName}</label></td>
                                    <td>{user.lastName}</td>
                                    <td><a href="#" onClick={() => onCustomerLinkClick(user)} className="modal1">{user.userName}</a></td>
                                    {searchCriteria != 'BP'?<td>{user.businessName}</td>:''}
                                </tr>
                            )
                        }

      const customerTable = custDetails.adminList.map((user,index) => CustomerRow(user,index))

      let lastColumn = searchCriteria != 'BP'?{"sortTitle":"businessName",title:"Customer"}:""

      const tableHeaders = [
                            {},
                            {"sortTitle":"firstName",title:"First Name"},
                            {"sortTitle":"lastName",title:"Last Name"},
                            {"sortTitle":"userName",title:"Username"},
                            lastColumn
                           ]

      return(
          <div>
              {searchCriteria == 'BP'?<BPInfo bpName={custDetails.bpName} bpAddress={custDetails.bpAddress}/>:''}
              <div className="left fullwidth" id="userTbl" >
                  <div className="left fullwidth contenttitleseperator"></div>
                  <Modal show={isCustModalOpen} onClose={toggleModal}>
                      <AssociatesModal asscList={asscList} userType={userType}/>
                  </Modal>
                  <GMETable
                      tableBody={customerTable}
                      tableHeaders={tableHeaders}
                      totalSize={custDetails.adminList.length}
                      allItems={custDetails.adminList} />
                  <RightButton text="Associate to Customer Admin" onClickFunc={onAssociateToCustAdminBtn}/>
              </div>
          </div>
      )
}

SearchResult.propTypes = {
    searchRsltOptions: PropTypes.object.isRequired
}

export default SearchResult
