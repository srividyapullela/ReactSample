import { combineReducers } from 'redux'
import loggedInUser from './userLoginReducer'
import incentiveOffer from './incentiveOfferReducer'
import esiidLookup from './esiidLookupReducer'
import formUpload from './formUploadReducer'
import marketAgreement from './mrktgAgrmtReducer'
import searchContract from './searchContractReducer'
import manageUser from './manageUserReducer'
import updateUser from './updateUserReducer'
import viewAssociates from './viewAssociatesReducer'
import addUser from './addUserReducer'
import listOffers from './listOfferReducer'
import resetPassword from './resetPasswordReducer'
import isUser from './isUserReducer'
import deleteOffer from './deleteOfferReducer'
import marketAgrmStatus from './updMrktAgrmtStsReducer'
import updateContract from './updateContractReducer'
import removeUser from './removeUserReducer'
import agentAssociates from './agentAssociatesReducer'
import adminAssociates from './adminAssociateReducer'
import associateMoreCustomers from './associateMoreReducer'
import searchCustList from './searchBPReducer'
import associateCustToUserSts from './asscCustToUserReducer'
import changeAssociateAdmin from './changeAdminReducer'


const rootReducer = combineReducers({
    loggedInUser,
    incentiveOffer,
    esiidLookup,
    formUpload,
    marketAgreement,
    searchContract,
    manageUser,
    updateUser,
    viewAssociates,
    addUser,
    listOffers,
    resetPassword,
    isUser,
    deleteOffer,
    marketAgrmStatus,
    updateContract,
    removeUser,
    agentAssociates,
    adminAssociates,
    associateMoreCustomers,
    searchCustList,
    associateCustToUserSts,
    changeAssociateAdmin
});

export default rootReducer;
