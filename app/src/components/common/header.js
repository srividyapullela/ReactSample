import React from 'react';
import { NavLink } from 'react-router-dom';
import * as stateInfo from '../../store/stateInfo'
import CommonUtil from './Util';
import PropTypes from 'prop-types';

let Header  = ({fromErrorLayout}) => {

      const onLogOut = () => stateInfo.clearLocalStorage();


      const notAllowedStyle = {cursor:'not-Allowed', color:'grey'}
      let loggedInSecurityRole = stateInfo.getLoggedInSecurityRole();

      const isAdmin = CommonUtil.isAdmin(loggedInSecurityRole)
      const isAgentAMMorEMA = CommonUtil.isAgentAMMorEMA(loggedInSecurityRole)
      //const isAgentOPSREP = CommonUtil.isAgentOPSREP(loggedInSecurityRole)

      let addNewUserLink, manageUserLink, homeLink, marketingAgrmLink, manageContractLink, formUploadLink, incentiveOffersLink,esiidLookupLink;
      if(fromErrorLayout){
          homeLink = <li><a href="#" style={notAllowedStyle}><span>&nbsp;</span></a></li>
          addNewUserLink = <li><a href="#" style={notAllowedStyle}><span>Add New User</span></a></li>
          manageUserLink = <li><a href="#" style={notAllowedStyle}><span>Manage Users</span></a></li>
          marketingAgrmLink = <li><a href="#" style={notAllowedStyle}><span>Marketing Agreements</span></a></li>
          manageContractLink = <li><a href="#" style={notAllowedStyle}><span>Manage Contract</span></a></li>
          formUploadLink = <li><a href="#" style={notAllowedStyle}><span>Form Upload</span></a></li>
          incentiveOffersLink = <li><a href="#" style={notAllowedStyle}><span>Incentive Offers</span></a></li>
          esiidLookupLink = <li><a href="#" style={notAllowedStyle}><span>ESIID Lookup</span></a></li>
      }else{
          const subPath = (window.location.href.split("admin")[1]).split("/")[1];
          homeLink = <div className="topMenuHolder">
                         <NavLink to="/admin/overview"><span>&nbsp;</span></NavLink>
                       <a href="/ssgme"  onClick={onLogOut} id="logout">Logout</a>
                     </div>
          addNewUserLink = <li className ={subPath == 'adduser'?'hdrselbgcolor':''}>
                              <NavLink to="/admin/adduser/selectusertype"><span>Add New User</span></NavLink>
                           </li>
          manageUserLink = <li className ={subPath == 'manageusers'?'hdrselbgcolor':''}>
                              <NavLink to="/admin/manageusers/searchusers"><span>Manage Users</span></NavLink>
                           </li>
          marketingAgrmLink = isAdmin?<li className ={subPath == 'marketingagreements'?'hdrselbgcolor':''}>
                                  <NavLink to="/admin/marketingagreements/searchcustomers"><span>Marketing Agreements</span></NavLink>
                              </li>:<li><a href="#" style={notAllowedStyle}><span>Marketing Agreements</span></a></li>
          incentiveOffersLink =   isAdmin?<li className ={subPath == 'incentiveoffers'?'hdrselbgcolor':''}>
                                      <NavLink to="/admin/incentiveoffers/manage"><span>Incentive Offers</span></NavLink>
                                  </li>:<li><a href="#" style={notAllowedStyle}><span>Incentive Offers</span></a></li>
          esiidLookupLink = isAdmin?<li className ={subPath == 'lookup'?'hdrselbgcolor':''}>
                                <NavLink to="/admin/lookup/esiid"><span>ESIID Lookup</span></NavLink>
                            </li>:<li><a href="#" style={notAllowedStyle}><span>ESIID Lookup</span></a></li>

          manageContractLink =   (isAdmin || isAgentAMMorEMA)?<li className ={subPath == 'managecontract'?'hdrselbgcolor':''}>
                                    <NavLink to="/admin/managecontract/searchcustomers"><span>Manage Contract</span></NavLink>
                                </li>:<li><a href="#" style={notAllowedStyle}><span>Manage Contract</span></a></li>

          formUploadLink = (isAdmin || isAgentAMMorEMA)?<li className ={subPath == 'formupload'?'hdrselbgcolor':''}>
                              <NavLink to="/admin/formupload/upload"><span>Form Upload</span></NavLink>
                          </li>:<li><a href="#" style={notAllowedStyle}><span>Form Upload</span></a></li>
      }

      return(
        <div>
          <div id="homeInfo">{homeLink}</div>
          <div id="header">
              <ul>
                  {addNewUserLink}
                  {manageUserLink}
                  {marketingAgrmLink}
                  {manageContractLink}
                  {formUploadLink}
                  {incentiveOffersLink}
                  {esiidLookupLink}
              </ul>
          </div>
        </div>

      )
}

Header.propTypes = {
    fromErrorLayout: PropTypes.bool.isRequired
}

export default Header;
