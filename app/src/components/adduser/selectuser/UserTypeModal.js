import React from 'react'
import PropTypes from 'prop-types';

let UserTypeModal = ({heading}) => {

    const userTypeContent = (heading) => {

              const AdminRoles = <ul>
                                    <li>Modify own profile information through portal.</li>
                                    <li>Change own password through portal.</li>
                                    <li>View all BMF accounts through portal.</li>
                                    <li>Transact on all BMF accounts through portal.</li>
                                    <li>View previous bills through portal.</li>
                                    <li>Access Admin Tool.</li>
                                    <li>Edit internal users&lsquo; profile information through admin tool.</li>
                                    <li>Edit external users&lsquo; profile information through admin tool.</li>
                                    <li>Reset users&lsquo; password through admin tool.</li>
                                    <li>Deactivate Users through admin tool.</li>
                                    <li>Create All internal and external profiles through admin tool.</li>
                                    <li>Associate users to BP Accounts through admin tool.</li>
                                    <li>Disassociate users from BP accounts through admin tool.</li>
                                    <li>Set up Incentive Offers through admin tool.</li>
                                    <li>Upload documents through admin tool.</li>
                                    <li>Create Marketing Agreements through admin tool.</li>
                                    <li>Access CRM</li>
                                  </ul>

                const agentEMM = <ul>
                          <li>Modify own profile information through portal.</li>
                          <li>Change own password through portal.</li>
                          <li>View assigned customer data through portal.</li>
                          <li>Perform Start/Stop Transactions through portal.</li>
                          <li>View previous bills through portal.</li>
                          <li>Access Admin Tool.</li>
                          <li>Edit external users&lsquo; profile information through admin tool.</li>
                          <li>Change users&lsquo; password through admin tool.</li>
                          <li>Create Broker through admin tool.</li>
                          <li>Create Broker Associate through Admin tool.</li>
                          <li>Create Customer Admin through Admin Tool.</li>
                          <li>Create Customer Associate through Admin tool.</li>
                          <li>Associate users to BP Accounts through Admin tool.</li>
                          <li>Disassociate users from BP accounts through Admin tool.</li>
                          <li>Upload documents through Admin tool.</li>
                          <li>Access CRM</li>
                      </ul>

                const agentEMA = <ul>
                            <li>Modify own profile information through portal.</li>
                            <li>Change own password through portal.</li>
                            <li>View assigned customer data through portal.</li>
                            <li>Perform Start/Stop Transactions through portal.</li>
                            <li>View previous bills through portal.</li>
                            <li>Access Admin Tool.</li>
                            <li>Edit external users&lsquo; profile information through admin tool.</li>
                            <li>Change users&lsquo; password through admin tool.</li>
                            <li>Create Broker through admin tool.</li>
                            <li>Create Broker Associate through Admin tool.</li>
                            <li>Create Customer Admin through Admin Tool.</li>
                            <li>Create Customer Associate through Admin tool.</li>
                            <li>Associate users to BP Accounts through Admin tool.</li>
                            <li>Disassociate users from BP accounts through Admin tool.</li>
                            <li>Upload documents through Admin tool.</li>
                            <li>Access CRM</li>
                        </ul>

                const agentOps = <ul>
                          <li>Modify own profile information through portal.</li>
                          <li>Change own password through portal.</li>
                          <li>View all BMF accounts through portal.</li>
                          <li>Perform Start/Stop Transactions through portal.</li>
                          <li>Access Admin Tool.</li>
                          <li>Edit external users&lsquo; profile information through admin tool.</li>
                          <li>Change users&lsquo; password through admin tool.</li>
                          <li>Create Broker through admin tool.</li>
                          <li>Create Broker Associate through Admin tool.</li>
                          <li>Create Customer Admin through Admin Tool.</li>
                          <li>Create Customer Associate through Admin tool.</li>
                          <li>Associate users to BP Accounts through Admin tool.</li>
                          <li>Disassociate users from BP accounts through Admin tool.</li>
                          <li>Access CRM</li>
                      </ul>

                const readOnlyInt = <ul>
                            <li>Modify own profile information through portal.</li>
                            <li>Change own password through portal.</li>
                            <li>View all BMF accounts through portal.</li>
                        </ul>

                const broker = <ul>
                            <li>Modify own profile information through portal.</li>
                            <li>Change own password through portal.</li>
                            <li>Create an associate profile through portal.</li>
                            <li>Deactivate an associate through portal.</li>
                            <li>Assign associate privileges through portal.</li>
                            <li>Reset associate password through portal.</li>
                            <li>Modify profile information of users they created through portal.</li>
                            <li>Modify profile privileges of users they created through portal.</li>
                            <li>View assigned customer data through portal.</li>
                            <li>Pay bills as assigned through portal.</li>
                            <li>Perform Start/Stop Transactions as assigned through portal.</li>
                            <li>View previous bills through portal.</li>
                          </ul>

                const brokerAssc = <ul>
                            <li>Modify own profile information through portal.</li>
                            <li>Change own password through portal.</li>
                            <li>Assign associate privileges through portal.</li>
                            <li>View assigned customer data through portal.</li>
                            <li>Pay bills as assigned through portal.</li>
                            <li>Perform Start/Stop Transactions as assigned through portal.</li>
                        </ul>


                const propOwner = <ul>
                            <li>Modify own profile information through portal.</li>
                            <li>Change own password through portal.</li>
                            <li>Create an associate profile through portal.</li>
                            <li>Deactivate an associate through portal.</li>
                            <li>Assign associate privileges through portal.</li>
                            <li>Reset associate password through portal.</li>
                            <li>Modify profile information of users they created through portal.</li>
                            <li>Modify profile privileges of users they created through portal.</li>
                            <li>View assigned customer data through portal.</li>
                            <li>Pay bills as assigned through portal.</li>
                            <li>Perform Start/Stop Transactions as assigned through portal.</li>
                            <li>View previous bills through portal.</li>
                        </ul>

                const propMngr = <ul>
                            <li>Modify own profile information through portal.</li>
                            <li>Change own password through portal.</li>
                            <li>Create an associate profile through portal.</li>
                            <li>Deactivate an associate through portal.</li>
                            <li>Assign associate privileges through portal.</li>
                            <li>Reset associate password through portal.</li>
                            <li>Modify profile information of users they created through portal.</li>
                            <li>Modify profile privileges of users they created through portal.</li>
                            <li>View assigned customer data through portal.</li>
                            <li>Pay bills as assigned through portal.</li>
                            <li>Perform Start/Stop Transactions as assigned through portal.</li>
                            <li>View previous bills through portal.</li>
                        </ul>

                const propAssc = 	<ul>
                            <li>Modify own profile information through portal.</li>
                            <li>Change own password through portal.</li>
                            <li>View assigned customer data through portal.</li>
                            <li>Pay bills as assigned through portal.</li>
                            <li>Perform Start/Stop Transactions as assigned through portal.</li>
                        </ul>

                const readOnlyExt = <ul>
                            <li>Modify own profile information through portal.</li>
                            <li>Change own password through portal.</li>
                            <li>View assigned customer data through portal.</li>
                            <li>View previous bills through portal.</li>
                          </ul>

              switch(heading){
                  case 'Admin (e.g., BMF Operation Managers/Supervisors)': return AdminRoles;
                  case 'Sales Executive': return agentEMM
                  case 'Account Executive': return agentEMA
                  case 'Broker': return broker
                  case 'Property Owner': return propOwner
                  case 'Property Manager': return propMngr
                  case 'Read-only (e.g., IT)': return readOnlyInt
                  case 'Operations Representative': return agentOps
                  case 'Read-only (e.g., Office Assistant)': return readOnlyExt
                  case 'Customer Associate': return propAssc
                  case 'Broker Associate': return brokerAssc
                  default: ""
            
            }
      }

    return(
      <div>
          <div className="M-heading">
            <h4>{heading}</h4>
          </div>
          <div className="M-content">
              {userTypeContent(heading)}
          </div>
      </div>
    );
}

UserTypeModal.propTypes = {
    heading: PropTypes.string.isRequired
}

export default UserTypeModal
