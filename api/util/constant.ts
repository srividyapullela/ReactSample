export const ENVIRONMENT_CONFIG = {
    "baseRestURL":process.env.BASE_REST_URL,
    "baseEmailUrl":process.env.BASE_NRGREST_EMAIL_URL,
    "gmeBMFPasswordSetup":process.env.prop.bmf.setup.password,
    "gmessHostInfo":process.env.prop.gmess.host.info
};

const EMAIL = "/emails/send";
export const SEND_EMAIL_URL = ENVIRONMENT_CONFIG.baseEmailUrl+EMAIL;

const DATAACCESS="/dataaccess";
export const ADD_USER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/addusercall";
export const ASSOC_USER_TO_CUST_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/associateuser2cust";
export const CHG_ADMIN_FOR_ASSOC_USER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/chgadminforassouser";
export const DEACTIVATE_USER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/deactivateuser";
export const DISASSOC_CUST_FROM_USER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/disasscustfromuser";
export const GET_USERS_ASSOC_TO_BP_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/getusersassotobp";
export const GET_ASSOCIATES_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/getassociate";
export const SEARCH_BRKR_ADMIN_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/searchbrokeradmin";
export const SEARCH_CUST_ADMIN_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/searchcustomeradmin";
export const IS_USER_EXIST_FOR_SAPID_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/isusrexistforsapid";
export const UPDATE_USER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/updateuser";
export const GET_USERS_FOR_UPDATE_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/getusersforupdate";
export const GET_USERS_PROFILE_WITH_SAPID_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/getuserdtlsfromsapid";
export const GET_USER_PROFILE_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/getuserprofile";
export const ASSOCIATE_USER_TO_CUST_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/associateuser2cust";
export const ADD_USER_TXN_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/addusertxn";
export const UPD_BRKR_WITH_NEW_PROP_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/updatebrkrwithnewprop";
export const ESIID_LOOKUP_BY_ADDR_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/lookupesiidbyaddress";
export const CREATE_OFFER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/createoffer";
export const DELETE_OFFER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/deleteoffer";
export const GET_OFFER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/getoffer";
export const UPDATE_OFFER_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/updateoffer";
export const CREATE_MKT_AGREEMENT_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/createmktaggrement";
export const UPDATE_MKT_AGGMENT_STATUS_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/updatemktagreementsts";
export const INSERT_RESET_PWD_DTLS_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/insertresetpwddtls";
export const CREATE_UPDATE_CONTRACT_DETAILS_URL = ENVIRONMENT_CONFIG.baseRestURL+DATAACCESS+"/createupdatecontract";

const FORM="/form";
export const FORM_UPLOAD_URL = ENVIRONMENT_CONFIG.baseRestURL+FORM+"/upload";

const EMAILS="/emails";
export const SEND_EMAILS_URL = ENVIRONMENT_CONFIG.baseEmailUrl+EMAILS+"/send";



//account management urls added later for collectives
export const ADD_COLLECTIVES_FOR_PROPERTY = ENVIRONMENT_CONFIG.baseRestURL+"accountmanagement/collectives/add";
export const LIST_COLLECTIVES_FOR_PROPERTY = ENVIRONMENT_CONFIG.baseRestURL+"accountmanagement/collectives/list";
export const REMOVE_COLLECTIVES_FOR_PROPERTY = ENVIRONMENT_CONFIG.baseRestURL+"accountmanagement/collectives/remove";


const BMFSS="/bmfss";
export const GET_BP_DTLS_FOR_AGENT_URL = ENVIRONMENT_CONFIG.baseRestURL+BMFSS+"/getbpdtlsforagent";
export const GET_USER_PROFILE_WITH_BP_HIER_URL = ENVIRONMENT_CONFIG.baseRestURL+BMFSS+"/userprofilebphierarchy";
export const GET_CONTRACT_DETAILS_URL = ENVIRONMENT_CONFIG.baseRestURL+BMFSS+"/getcontractdetails";
export const GET_MARKETING_AGGREMENT_URL = ENVIRONMENT_CONFIG.baseRestURL+BMFSS+"/getmktagreement";

const CCS="/ccs";
export const GET_BP_HIERARCHY_DTLS_URL = ENVIRONMENT_CONFIG.baseRestURL+CCS+"/getbphierarchydtls";
export const GET_BP_HIERARCHY_URL = ENVIRONMENT_CONFIG.baseRestURL+CCS+"/getbphierarchy";

const LDAP="/ldap";
export const CREATE_USER_IN_LDAP_URL = ENVIRONMENT_CONFIG.baseRestURL+LDAP+"/createuser";
export const IS_USER_VALIDATED_IN_LDAP_URL = ENVIRONMENT_CONFIG.baseRestURL+LDAP+"/validateusername";
export const UPDATE_PASSWORD_IN_LDAP_URL = ENVIRONMENT_CONFIG.baseRestURL+LDAP+"/updatepassword";


export const GMESS_CC_0270 = "0270";
export const ADMIN_TOOL = "ADMIN_TOOL";
export const GMESS_LDAP_ORG ="greenmountain.com"; //o=greenmountain.com
export const GME_SSO_TYPE = "gmebmf";//ou=gmebmf
export const LDAP_BMF_GME_USERTYPE="GMESS";


//BMF USER TYPES
	export const USERTYPE_ALL="ALL";
	export const USERTYPE_INT_ALL="INT_ALL";
	export const USERTYPE_EXT_ALL="EXT_ALL";
	export const USERTYPE_INT="INT";
	export const USERTYPE_EXT="EXT";
	export const USERTYPE_EXTERNAL="External";
	export const USERTYPE_INTERNAL="Internal";
	export const USER_CATEGORY_I="I";
	export const USER_CATEGORY_E="E";
	export const USERTYPE_INT_ADMIN= "INT_ADMIN";
	export const USERTYPE_INT_AGT_EMM="INT_AGT_EMM";
	export const USERTYPE_INT_AGT_EMA="INT_AGT_EMA";
	export const USERTYPE_INT_AGT_OPREP="INT_AGT_OPREP";
	export const USERTYPE_INT_READ_ONLY="INT_READ_ONLY";
	export const USERTYPE_EXT_BROKER="EXT_BROKER";
	export const USERTYPE_EXT_BRK_ASC="EXT_BRK_ASC";
	export const USERTYPE_EXT_CA_PO="EXT_CA_PO";
	export const USERTYPE_EXT_CA_PM="EXT_CA_PM";
	export const USERTYPE_EXT_CUS_ASC="EXT_CUS_ASC";
	export const USERTYPE_EXT_READ_ONLY="EXT_READ_ONLY";
	export const USERTYPE_BUILDER = "HB";
	export const USERTYPE_MULTIFAMILY = "PM";
	export const SECURITY_ROLE_ADMIN = "Admin";
	export const SECURITY_ROLE_READ_ONLY = "Read-Only";
	export const SECURITY_ROLE_EXT_READ_ONLY = "External Read-Only";
	export const SECURITY_ROLE_AGT = "Agent";
	export const SECURITY_ROLE_BROKER= "Broker";
	export const SECURITY_ROLE_CUS_ADMIN= "Customer Admin";
	export const SECURITY_ROLE_CUS_ASC =  "Customer Associate";
	export const SECURITY_ROLE_BROKER_ASC = "Broker Associate";
	export const PROPERTY_MANAGER = "Property Manager";
	export const PROPERTY_OWNER = "Property Owner";
	export const PROPERTY_SUPERVISOR= "Admin";
	export const EMM = "EMM";
  export const SALES_EXECUTIVE = "Sales Executive";
	export const EMA = "EMA";
  export const ACCOUNT_EXECUTIVE =  "Account Executive";
	export const OPS_REP= "Operations Representative";
	export const HIERARCHY_LEVEL_MGMT = "MGMT";
	export const HIERARCHY_LEVEL_REGN = "REGN";
	export const HIERARCHY_LEVEL_PROP = "PROP";

  //the following user types should be set according to stored procedures
export const USERTYPE_SP_EXTERNAL_PORTAL="EXTERNAL_PORTAL";
export const USERTYPE_SP_ADMIN_TOOL="ADMIN_TOOL";
export const USERTYPE_SP_INT_ADMIN="I_Admin_OPS_MGR";
export const USERTYPE_SP_INT_AGT_EMM="I_Agent_EMM";
export const USERTYPE_SP_INT_AGT_EMA="I_Agent_EMA";
export const USERTYPE_SP_INT_AGT_OPREP="I_Agent_OPS_REP";
export const USERTYPE_SP_INT_READ_ONLY="I_Read-Only_IT";
export const USERTYPE_SP_EXT_BROKER="E_Broker_BRK_ADM";
export const USERTYPE_SP_EXT_BRK_ASC="E_Broker Associate_BRK_ASC";
export const USERTYPE_SP_EXT_CA_PO="E_Customer Admin_PO";
export const USERTYPE_SP_EXT_CA_PM="E_Customer Admin_PM";
export const USERTYPE_SP_EXT_CUS_ASC="E_Customer Associate_PS";
export const USERTYPE_SP_EXT_READ_ONLY="E_Read-Only_OA";


export const BMF_FIRST_TIME_SET_PASSWORD = ENVIRONMENT_CONFIG.gmeBMFPasswordSetup;
export const GMESS_HOST_INFO = ENVIRONMENT_CONFIG.gmessHostInfo;
export const GME_BRAND_NAME ="GME";

export const SEARCH_CRITERIA_LN = "LN";
export const SEARCH_CRITERIA_BP = "BP";
export const SEARCH_CRITERIA_BBP = "BBP";
export const SEARCH_CRITERIA_CBP = "CBP";

/** The Constant CENTER_POINT_ENERGY. */
	export const  CENTER_POINT_ENERGY = "CenterPoint Energy";
	export const CPE = "CPE";

	/** The Constant ONCOR. */
	export const ONCOR = "Oncor";
	export const ONCOR_AREA = "ONCOR";


	/** The Constant TEXAS_NEW_MEXICO_POWER_COMPANY. */
	export const TEXAS_NEW_MEXICO_POWER_COMPANY = "Texas-New Mexico Power Company";
	export const TNMP = "TNMP";


	/** The Constant AEP_TEXAS_CENTRAL. */
	export const AEP_TEXAS_CENTRAL = "AEP Texas Central";
	export const AEPTC = "AEPTC";

	/** The Constant AEP_TEXAS_NORTH. */
	export const AEP_TEXAS_NORTH = "AEP Texas North";
	export const AEPTN = "AEPTN";

	/** The Constant NOT APPLICABLE. */
	export const NA = "NA";
  export const MULTIFAMILY = "MF";
	export const BUILDER_BLDR = "BLDR";
	export const MULTIFAMILY_MFAM = "MFAM";
  export const ACTIVE = "Active";
  export const INACTIVE = "Inactive";
  export const ADMIN_PORTAL = "GME_ADMIN";

  export const EMPTY_STR = "";
  export const EMPTY_SPACE = " ";
  export const NO_ERROR = "NO_ERROR";
  export const NOT_PROVIDED = "Not Provided";
  export const NOT_APPLICABLE = "Not Applicable";
  export const NOT_FOUND = "Not Found";

  //constants
	export const YES = "Y";
	export const NO = "N";
	export const YES_TXT = "Yes";
	export const NO_TXT = "No";
	export const CREATE_C = "C";
	export const UPDATE_U = "U";

export const BRKR_ERR_MSG = "This is Broker BP. Please enter valid BPNumber."
export const NON_BRKR_ERR_MSG  = "This Broker BP not found in the Hierarchy."
export const NO_BP_HIERARCHY_FOUND  = "No Hierarchy found for this bp."
