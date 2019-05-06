import React from 'react'
import Modal from '../../../common/Modal'
import AssociatesModal from '../../../common/AssociatesModal'
import RightButton from '../../../common/RightButton'
import { ErrorBox } from '../../../common/Error'
import GMETable from '../../../common/GMETable'
import PropTypes from 'prop-types';

let SearchResult = ({searchRsltOptions}) => {

      const { brkrDetails, searchCriteria, onBrokerLinkClick, toggleModal, isBrokerModalOpen,
            asscList, userType, onBrokerRadioChange, onAssociateToBrokerBtn } = searchRsltOptions

      if(undefined == brkrDetails.adminList || brkrDetails.adminList.length == 0){
          const errorMessage = (searchCriteria == 'BP')?"Broker admin with entered BP number doesn't exist. Please try with a different BP Number."
                      :"Broker admin with entered last name doesn't exist. Please try with a different last name."
          return(
            <ErrorBox message={errorMessage} isError={true}/>
          )
      }


      const CustomerRow = (user,index) => {

                            return(
                                <tr key={user.userName} className={index%2 == 0?'odd':'even'}>
                                    <td className="textc"><input type="radio" value={user.userName} onChange={onBrokerRadioChange} name="selAdmin"/></td>
                                    <td><label className="textlabel">{user.firstName}</label></td>
                                    <td>{user.lastName}</td>
                                    <td><a href="#" onClick={() => onBrokerLinkClick(user)} className="modal1">{user.userName}</a></td>
                                    {searchCriteria != 'BP'?<td>{user.businessName}</td>:''}
                                </tr>
                            )
                        }

      const customerTable = brkrDetails.adminList.map((user,index) => CustomerRow(user,index))

      let lastColumn = searchCriteria != 'BP'?{"sortTitle":"businessName",title:"Broker"}:""
      const tableHeaders = [
                            {},
                            {"sortTitle":"firstName",title:"First Name"},
                            {"sortTitle":"lastName",title:"Last Name"},
                            {"sortTitle":"userName",title:"Username"},
                            lastColumn
                           ]

      return(
          <div className="left fullwidth" id="userTbl" >
              <div className="left fullwidth contenttitleseperator"></div>
              <Modal show={isBrokerModalOpen} onClose={toggleModal}>
                  <AssociatesModal asscList={asscList} userType={userType}/>
              </Modal>
              <GMETable
                  tableBody={customerTable}
                  tableHeaders={tableHeaders}
                  totalSize={brkrDetails.adminList.length}
                  allItems={brkrDetails.adminList} />
              <RightButton text="Associate to Broker" onClickFunc={onAssociateToBrokerBtn}/>
            </div>
      )
}

SearchResult.propTypes = {
    searchRsltOptions: PropTypes.object.isRequired
}

export default SearchResult
