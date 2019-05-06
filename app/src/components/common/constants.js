export const moduleArray = [{name:"Add New User",text:"Establish portal access for a new user",link:"/admin/adduser/selectusertype",
                            linkName:"Add New User",className:"addUser"},{name:"Manage Users",text:"Update information for a user that has access to the portal",link:"/admin/manageusers/searchusers",
                            linkName:"Manage Users",className:"manageUser"},
                            {name:"Manage Contract Info",text:"Create or update contract info",link:"/admin/managecontract/searchcustomers",
                            linkName:"Manage Contract Info",className:"manageContract"},{name:"Manage Incentive Offers",text:"Create,update or delete Incentive Offers",link:"/admin/incentiveoffers/manage",
                            linkName:"Manage Incentive Offers",className:"manageIncentive"},
                            {name:"Manage Marketing Agreements",text:"Create or update Marketing Agreements",link:"/admin/marketingagreements/searchcustomers",
                            linkName:"Manage Marketing Agreements",className:"manageAgreement"},{name:"Form Upload",text:"Upload form",link:"/admin/formupload/upload",
                            linkName:"Form Upload",className:"formUpload"}];

export const userTypes = [{internalTypes:[{id:"admin",value:"INT_ADMIN",text:"Admin (e.g., BMF Operation Managers/Supervisors)"},
                          {id:"admin",value:"INT_ADMIN",text:"Admin (e.g., BMF Operation Managers/Supervisors)"},
                          {id:"admin",value:"INT_ADMIN",text:"Admin (e.g., BMF Operation Managers/Supervisors)"},
                          {id:"admin",value:"INT_ADMIN",text:"Admin (e.g., BMF Operation Managers/Supervisors)"},
                          {id:"admin",value:"INT_ADMIN",text:"Admin (e.g., BMF Operation Managers/Supervisors)"},
                          {id:"admin",value:"INT_ADMIN",text:"Admin (e.g., BMF Operation Managers/Supervisors)"}

                                        ],
                           externalTypes:[]}

]

export const manageUsersOptions = [{value:"LN", label:"Last Name"},{value:"CBP", label:"Customer BP#"}
                                    ,{value:"BBP", label:"Broker BP#"}]

export const userTypeOptions = [{value:"NA:ALL", label:"All"},{value:"NA:E", label:"All External"},
                                {value:"BRK_ADM:E", label:"External - Broker"},{value:"BRK_ASC:E", label:"External - Broker Associate"},
                                {value:"PS:E", label:"External - Customer Associate"},{value:"PO:E", label:"External - Customer Admin - Property Owner"},
                                {value:"PM:E", label:"External - Customer Admin - Property Manager"},{value:"OA:E", label:"External - Read-only"},
                                {value:"NA:I", label:"All Internal"},{value:"OPS_MGR:I", label:"Internal - Admin"}, {value:"EMA:I", label:"Internal - Account Executive"},
                                {value:"EMM:I", label:"Internal - Sales Executive"},{value:"OPS_REP:I", label:"Internal - Operations Representative"},
                                {value:"IT:I", label:"Internal - Read-only"},{value:"OWN:I", label:"Own Profile"}]


export const internalTypeUsers = [{userType:"Admin (e.g., BMF Operation Managers/Supervisors)",value:"INT_ADMIN",subTypes:[]},
                                  {userType:"Agent",value:"A",subTypes:[{userType:"Sales Executive",value:"INT_AGT_EMM"},{userType:"Account Executive",value:"INT_AGT_EMA"},
                                  {userType:"Operations Representative",value:"INT_AGT_OPREP"}]},{userType:"Read-only (e.g., IT)",value:"INT_READ_ONLY",subTypes:[]}]

export const externalTypeUsers = [{userType:"Broker",value:"EXT_BROKER",subTypes:[]},
                                  {userType:"Broker Associate",value:"EXT_BRK_ASC",subTypes:[]},
                                  {userType:"Customer Admin",value:"CA",subTypes:[{userType:"Property Owner",value:"EXT_CA_PO"},{userType:"Property Manager",value:"EXT_CA_PM"}]}
                                  ,{userType:"Customer Associate",value:"EXT_CUS_ASC",subTypes:[]},{userType:"Read-only (e.g., Office Assistant)",value:"EXT_READ_ONLY",subTypes:[]}]

export const userPrivileges = [{admin:{heading:"Admin (e.g., BMF Operation Managers/Supervisors)"},
                               privileges:["Modify own profile information through portal.",
                                            "Change own password through portal.",
                                            "View all BMF accounts through portal.",
                                            "Transact on all BMF accounts through portal.",
                                            "View previous bills through portal.",
                                            "Access Admin Tool.",
                                            "Edit internal users' profile information through admin tool.",
                                            "Edit external users' profile information through admin tool.",
                                            "Reset users' password through admin tool.",
                                            "Deactivate Users through admin tool.",
                                            "Create All internal and external profiles through admin tool.",
                                            "Associate users to BP Accounts through admin tool.",
                                            "Disassociate users from BP accounts through admin tool.",
                                            "Set up Incentive Offers through admin tool.",
                                            "Upload documents through admin tool.",
                                            "Create Marketing Agreements through admin tool.",
                                            "Access CRM."]}]

export const noAssociationUsers = ["INT_ADMIN","INT_READ_ONLY","INT_AGT_OPREP","I_Admin_OPS_MGR","I_Read-Only_IT","I_Agent_OPS_REP"]
export const associates = ["EXT_CUS_ASC","EXT_BRK_ASC"]
export const notAbleToAccessPriv = ["EXT_BROKER","EXT_BRK_ASC","EXT_READ_ONLY","INT_ADMIN","INT_READ_ONLY","INT_AGT_OPREP","INT_AGT_EMM","INT_AGT_EMA"]
export const accessPrivDisabled = ["EXT_CA_PO","EXT_CA_PM"]


export const usstates = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI",
                          "MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX",
                          "UT","VA","VT","WA","WI","WV","WY"]

export const tierFeeOptions = ["<40%","=or>40%","<45%","=or>45%","<50%","=or>50%","<55%","<70%","=or>70%"]
