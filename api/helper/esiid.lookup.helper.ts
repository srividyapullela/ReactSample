import { EsiidLookupService } from './../services/esiid.lookup.service';
import Promise = require('tspromise');
import LoggerUtil from './../logs/log';
import { EsiidLookupRequest } from '../request/esiid.lookup.request'
import * as cst from './../util/constant';
import { ESIID } from '../model/esiid.lookup';
import { CommonUtil } from './../util/common.util';

export class EsiidLookupHelper {


   private esiidLookupService: EsiidLookupService;

   constructor() {
         this.esiidLookupService = new EsiidLookupService();
   }

   public lookUpESIIDByAddressFromESI(req:any): Promise<any> {
        LoggerUtil.debug('calling lookUpESIIDByAddressFromESI service with the request::::'+JSON.stringify(req.body));
        let lookupReq = this.populateESIIDLookupReq(req);
        var esiidList = new Array<ESIID>();
        var p = new Promise((resolve, reject) => {
            this.esiidLookupService.lookUpESIIDByAddress(lookupReq).then(s => {
                if(undefined != s && s.dataAvailForInput){
                    s.esiidLookUPFromESIDOList.forEach(e => {
                      let esiid = new ESIID();
                      esiid.streetNumber = e.streetNumber;
                      esiid.streetName = e.streetName;
                      esiid.unitNumber = (null == e.unitNumber)?"":e.unitNumber;
                      esiid.city = e.city;
                      esiid.state = e.state;
                      esiid.zipcode = e.zipcode;
                      esiid.esiid = e.esiid;
                      esiidList.push(esiid);
                    });
                    LoggerUtil.info("FOUND DATA FOR THE ESIID LOOK UP:::"+esiidList.length)
                }else{
                    LoggerUtil.info("NO DATA FOUND FOR ESIID LOOK UP:::")
                }
                let returnEsiidList = this.processESIIDLookUpAfterResponseFromESI(esiidList,req.body.serviceAddressList)
                LoggerUtil.info(returnEsiidList.length)
                resolve(returnEsiidList);
            });
        })
        return p;
    }

    //add Not Found to the adddress if any addresses esiid are not returned from the API
    private  processESIIDLookUpAfterResponseFromESI(esiidList: ESIID[], inList: any): ESIID[] {

    		let tempESIIDList = new Array<ESIID>();
    		LoggerUtil.debug("SERVICE ADDRESS LIST FROM THE INPUT::::::::::"+inList.length);
        let tempAddrList = new Array<ESIID>();
        try{
          inList.forEach(serviceAddr => {
              if(!this.isAddressMatch(esiidList,serviceAddr)){
                  serviceAddr.esiid = cst.NOT_FOUND;
                  if(CommonUtil.isNotBlank(serviceAddr.streetNumber)){ //to avoid heading from template
                    tempAddrList.push(serviceAddr)
                  }
              }
          })
        }catch(err){
            LoggerUtil.error("ERROR====processESIIDLookUpAfterResponseFromESI===>"+err.message)
        }
        return [...esiidList, ...tempAddrList]
    }

    private isAddressMatch(esiidList: ESIID[], inEsiid: any): boolean {
        let esiidFound: boolean = false;
        try{
          esiidList.forEach(esiid => {
            if(CommonUtil.isNotBlank(inEsiid.streetNumber) && CommonUtil.isNotBlank(inEsiid.streetName) && CommonUtil.isNotBlank(inEsiid.unitNumber) && CommonUtil.isNotBlank(inEsiid.zipcode)){
                if(CommonUtil.isEqualsIgnoreCase(esiid.streetNumber,inEsiid.streetNumber) && CommonUtil.isEqualsIgnoreCase(esiid.streetName,inEsiid.streetName) &&
                  CommonUtil.isEqualsIgnoreCase(esiid.unitNumber,inEsiid.unitNumber) && CommonUtil.isEqualsIgnoreCase(esiid.zipcode,inEsiid.zipcode)) esiidFound = true;
            }
            if(CommonUtil.isNotBlank(inEsiid.streetNumber) && CommonUtil.isNotBlank(inEsiid.streetName) && CommonUtil.isNotBlank(inEsiid.unitNumber)){
                if(CommonUtil.isEqualsIgnoreCase(esiid.streetNumber,inEsiid.streetNumber) && CommonUtil.isEqualsIgnoreCase(esiid.streetName,inEsiid.streetName) &&
                    CommonUtil.isEqualsIgnoreCase(esiid.unitNumber,inEsiid.unitNumber)) esiidFound = true;
            }
            if(CommonUtil.isNotBlank(inEsiid.streetNumber) && CommonUtil.isNotBlank(inEsiid.streetName)){
                if(CommonUtil.isEqualsIgnoreCase(esiid.streetNumber,inEsiid.streetNumber) && CommonUtil.isEqualsIgnoreCase(esiid.streetName,inEsiid.streetName)) esiidFound = true;
            }
          })
        }catch(err){
            LoggerUtil.error("ERROR====isAddressMatch===>"+err.message)
        }
        return esiidFound;
    }

    private populateESIIDLookupReq(req: any): EsiidLookupRequest {

      let lookupReq = new EsiidLookupRequest();
      try{
          let streetNumList = new Array<string>();
          let streetNameList = new Array<string>();
          let cityList = new Array<string>();
          let unitNumberList = new Array<string>();
          let zipcodeList = new Array<string>();
          req.body.serviceAddressList.forEach(u => {
               streetNumList.push(CommonUtil.isNotBlank(u.streetNumber)?u.streetNumber.toUpperCase():cst.NA);
               streetNameList.push(CommonUtil.isNotBlank(u.streetName)?u.streetName.toUpperCase():cst.NA);
               cityList.push(CommonUtil.isNotBlank(u.city)?u.city.toUpperCase():cst.NA);
               unitNumberList.push(CommonUtil.isNotBlank(u.unitNumber)?u.unitNumber.toUpperCase():cst.NA);
               zipcodeList.push(CommonUtil.isNotBlank(u.zipcode)?u.zipcode.toUpperCase():cst.NA);
          });
          lookupReq.cityList = cityList;
          lookupReq.streetNumberList = streetNumList;
          lookupReq.streetNameList = streetNameList;
          lookupReq.unitNumberList = unitNumberList;
          lookupReq.zipcodeList = zipcodeList;
          lookupReq.strCompanyCode= req.session.bmfAdminSession.loggedInUserCompCode;
          lookupReq.strPortal = cst.ADMIN_PORTAL;
          lookupReq.strLoggedInUserName=req.session.bmfAdminSession.loggedInSapUserName;
        }catch(e){
           LoggerUtil.info("Error========>"+e)
        }
        return lookupReq;
    }
}
