import React from 'react'
import Modal from '../../common/Modal'
import ResetPasswordModal from '../common/ResetPasswordModal'
import { ErrorBox } from '../../common/Error'
import moment from 'moment';
import CommonUtil from '../../common/Util'
import GMETable from '../../common/GMETable'
import BPDetails from './BPDetails'
import PropTypes from 'prop-types';

let Result = ({resultOptions}) => {

    const { searchResult, toggleModal, isOpen, onUserSelectFromUserList,
            resetPswdMessage, onResetPasswordClick, selectedUser,onUpdateUserClick } = resultOptions

    const downloadFileName = "Srch_Results_"+moment().format("MM_DD_YYYY")+".csv"
    const userList = searchResult.userList;
    const bpDetails = searchResult.bpDetails;

    if(searchResult.userList.length == 0){
        const errorMessage = "No users found for the search Criteria."
        return(
          <ErrorBox message={errorMessage} isError={true}/>
        )
    }

    const UserRow = (user,index) => {

      return(
            <tr key = {user.userName} className={index%2 == 0?'odd':'even'}>
                <td className="textc"><input type="radio" onChange={() => onUserSelectFromUserList(user)} className="validate[reqRadio[1]]" name="users" value={user.userName} /> </td>
                <td><label htmlFor="searchUser" className="textlabel">{user.firstName}</label></td>
                <td>{user.lastName}</td>
                <td>{user.userName}</td>
                <td>{user.securityRole}</td>
                <td>{CommonUtil.getUserTypeDisplayNameStr(user.securityRoleDisplayName)}</td>
            </tr>
        )
    }

    const userTable = userList.map((user,index) => UserRow(user,index))

    const tableHeaders = [{},
                          {"sortTitle":"firstName",title:"First Name"},
                          {"sortTitle":"lastName",title:"Last Name"},
                          {"sortTitle":"userName",title:"User Name"},
                          {"sortTitle":"securityRole",title:"Security Role"},
                          {"sortTitle":"securityRoleDisplayName",title:"User Type"}
                         ]

    return(
      <div>
        <BPDetails bpDetails={bpDetails}/>
        <div className="left fullwidth" id="userTbl" >
          <GMETable
              tableBody={userTable}
              tableHeaders={tableHeaders}
              csvFileName={downloadFileName}
              csvData={userList}
              totalSize={userList.length}
              allItems={userList} />

          <Modal show={isOpen} onClose={toggleModal}>
              <ResetPasswordModal message={resetPswdMessage} userName={selectedUser.userName} email={selectedUser.email} onClose={toggleModal} />
          </Modal>
          <div className="right">
             <div className="left aLM">
                <button className="left controlText-B modal1 makeBig" onClick={onResetPasswordClick} id="resetPwdBtn" type="button">Reset Password</button>
             </div>
              <div className="left aLM">
                  <button className="left controlText-A " id="updateUsrBtn" onClick={onUpdateUserClick} type="button">Update user<span></span></button>
             </div>
          </div>
        </div>
      </div>
    );
}

Result.propTypes = {
    resultOptions: PropTypes.shape({
        searchResult: PropTypes.object.isRequired,
        toggleModal: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        onUserSelectFromUserList: PropTypes.func.isRequired,
        resetPswdMessage: PropTypes.string.isRequired,
        onResetPasswordClick: PropTypes.func.isRequired,
        selectedUser: PropTypes.object.isRequired,
        onUpdateUserClick: PropTypes.func.isRequired
    })
}

export default Result
