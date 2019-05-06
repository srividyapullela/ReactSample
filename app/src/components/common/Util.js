import * as consts from './constants'
import * as _ from 'lodash'

class CommonUtil {

    static isUserHasAssociations(userType) {
        let isUserHasAssc = [];
        consts.noAssociationUsers.map(type => {
            if(type == userType){
                isUserHasAssc.push(type);
            }
        });
        return isUserHasAssc.length == 0;
    }

    static isAssociatesAdding(userType) {
        let isUserHasAssc = [];
        consts.associates.map(type => {
            if(type == userType){
                isUserHasAssc.push(type);
            }
        });
        return isUserHasAssc.length != 0;
    }

    static ableToAccessPriv(userType) {
        let ableToAccessPriv = [];
        consts.notAbleToAccessPriv.map(type => {
            if(type == userType){
                ableToAccessPriv.push(type);
            }
        });
        return ableToAccessPriv.length == 0;
    }


    static disabledAccessPriv(userType) {
        let disabledAccesspriv = [];
        consts.accessPrivDisabled.map(type => {
            if(type == userType){
                disabledAccesspriv.push(type);
            }
        });
        return disabledAccesspriv.length != 0;
    }

    static getUserCategory(securityRole) {
        let first3 = securityRole.substring(0,3)
        if(first3 == 'INT') return 'Internal';
        if(first3 == 'EXT') return 'External';
    }

	static getUserCategoryFromWebSecurityRole(securityRole) {
        let first1 = securityRole.substring(0,1)
        if(first1 == 'I') return 'Internal';
        if(first1 == 'E') return 'External';
    }

    static getSecurityRoleDisplayName(securityRole) {

        if(securityRole == 'INT_ADMIN' || securityRole == 'I_Admin_OPS_MGR') return "Admin";
        if(securityRole == 'INT_AGT_EMA' || securityRole == 'I_Agent_EMA') return "Agent"
        if(securityRole == 'INT_AGT_EMM' || securityRole == 'I_Agent_EMM') return "Agent";
        if(securityRole == 'EXT_BROKER' || securityRole == 'E_Broker_BRK_ADM') return "Broker";
        if(securityRole == 'EXT_CA_PO' || securityRole == 'E_Customer Admin_PO') return "Customer Admin";
        if(securityRole == 'EXT_CA_PM' || securityRole == 'E_Customer Admin_PM') return "Customer Admin";
        if(securityRole == 'INT_READ_ONLY' || securityRole == 'I_Read-Only_IT') return "Read-Only";
        if(securityRole == 'INT_AGT_OPREP' || securityRole == 'I_Agent_OPS_REP') return "Agent";
        if(securityRole == 'EXT_READ_ONLY' || securityRole == 'E_Read-Only_OA') return "External Read-Only";
        if(securityRole == 'EXT_CUS_ASC' || securityRole == 'E_Customer Associate_PS') return "Customer Associate";
        if(securityRole == 'EXT_BRK_ASC' || securityRole == 'E_Broker Associate_BRK_ASC') return "Broker Associate";
    }

    static getUserTypeDisplayName(securityRole) {

        if(securityRole == 'INT_AGT_EMA' || securityRole == 'I_Agent_EMA') return "Account Executive"
        if(securityRole == 'INT_AGT_EMM' || securityRole == 'I_Agent_EMM') return "Sales Executive";
        if(securityRole == 'EXT_CA_PO' || securityRole == 'E_Customer Admin_PO') return "Property Owner";
        if(securityRole == 'EXT_CA_PM' || securityRole == 'E_Customer Admin_PM') return "Property Manager";
        if(securityRole == 'INT_AGT_OPREP' || securityRole == 'I_Agent_OPS_REP') return "Operations Representative";
    }

    static showInternal(securityRole){

      switch(securityRole){
          case 'INT_ADMIN': return true
          case 'I_Admin_OPS_MGR': return true
          default: return false;
      }
    }

    static isArrayContains(arry, str){

        let inArray = [];
        if(undefined != arry){
          arry.forEach(type => {if(type == str){inArray.push(type);}});
        }
        return inArray.length > 0;
    }

    static isCustAdminorExtReadOnly(securityRole) {
        let inAray = ['EXT_CA_PO','EXT_CA_PM','E_Customer Admin_PO','E_Customer Admin_PM','EXT_READ_ONLY','E_Read-Only_OA']
        return this.isArrayContains(inAray,securityRole)
    }

    static isAdmin(securityRole) {

      switch(securityRole){
          case 'INT_ADMIN': return true
          case 'I_Admin_OPS_MGR': return true
          default: return false;
      }
    }

    static isAgentAMMorEMA(securityRole) {

      switch(securityRole){
          case 'I_Agent_EMM': return true
          case 'I_Agent_EMA': return true
          default: return false;
      }
    }

    static isAgentEMA(securityRole) {
        if(securityRole == 'INT_AGT_EMA' || securityRole == 'I_Agent_EMA') return true
    }

    static isAgentEMM(securityRole) {
        if(securityRole == 'INT_AGT_EMM' || securityRole == 'I_Agent_EMM') return true;
    }

    static isAgentOPSREP(securityRole) {

      switch(securityRole){
          case 'I_Agent_OPS_REP': return true
          default: return false;
      }
    }

    static dontShowExtReadOnly(securityRole){

      switch(securityRole){
          case 'INT_AGT_EMA': return true
          case 'INT_AGT_EMM': return true
          case 'INT_AGT_OPREP': return true
          case 'I_Agent_EMM': return true
          case 'I_Agent_EMA': return true
          case 'I_Agent_OPS_REP': return true
          default: return false;
      }
    }

    static showAssociatesLink(securityRole) {

        let secRoleAry = ['EXT_CA_PM','EXT_CA_PO','E_Customer Admin_PO','E_Customer Admin_PM','E_Broker_BRK_ADM','EXT_BROKER']
        let foundAry = [];
        secRoleAry.map(secRole => {
            if(secRole == securityRole) foundAry.push(secRole);
        })
        return foundAry.length > 0;
    }

    static showAssociateAdmin(securityRole) {

        if(securityRole == 'EXT_BRK_ASC' || securityRole == 'EXT_CUS_ASC' ||
        securityRole == 'E_Customer Associate_PS' || securityRole == 'E_Broker Associate_BRK_ASC') {
            return true;
        }
        return false;
    }

    static isBroker(securityRole) {

        if(securityRole == 'EXT_BRK_ASC' || securityRole == 'EXT_CUS_ASC') {
            return true;
        }
        return false;
    }

    static isUserBroker(securityRole) {

        if(securityRole == 'E_Broker_BRK_ADM' || securityRole == 'EXT_BROKER'
            || securityRole == 'EXT_BRK_ASC' || securityRole == 'E_Broker Associate_BRK_ASC' ||
          securityRole == 'E_Broker_Associate_BRK_ASC') {
            return true;
        }
        return false;
    }

    static isUserCustAssociate(securityRole) {

        if(securityRole == 'E_Customer Associate_PS' || securityRole == 'EXT_CUS_ASC'){
            return true;
        }
        return false
    }

    static isUserCustomerAdmin(securityRole) {

        let secRoleAry = ['EXT_CA_PM','EXT_CA_PO','E_Customer Admin_PO','E_Customer Admin_PM']
        let selected = [];
        secRoleAry.map(secRole => {
            if(secRole == securityRole){
              selected.push(secRole)
            }
        })
        return selected.length >0;
    }

    static showUserType(securityRole) {

        let secRoleAry = ['EXT_CA_PM','EXT_CA_PO','INT_AGT_EMA','INT_AGT_EMM','INT_AGT_OPREP',
        'E_Customer Admin_PO','E_Customer Admin_PM','I_Agent_EMA','I_Agent_EMM','I_Agent_OPS_REP']
        let selected = [];
        secRoleAry.map(secRole => {
            if(secRole == securityRole){
              selected.push(secRole)
            }
        })
        return selected.length >0;
    }

    static showSapId(securityRole) {

        if(this.isNotBlank(securityRole)){
            let substr = securityRole.substring(0,3)
            if(securityRole == 'INT_READ_ONLY'){return false}
            if(substr == 'INT') return true
        }
        return false;
    }

    static showSapIdOnUpdatePage(securityRole){

        if(this.isNotBlank(securityRole)){
            if(securityRole == 'I_Admin_OPS_MGR') return true;
        }
        return false;
    }

    static showAccessPrivOnUpdatePage(securityRole) {

        let secRoleAry = ['EXT_CA_PM','EXT_CA_PO','EXT_CUS_ASC','E_Customer Admin_PO','E_Customer Admin_PM','E_Customer Associate_PS']
        let accessPrivAry = [];
        secRoleAry.map(secRole => {
            if(secRole == securityRole) accessPrivAry.push(secRole)
        })
        return accessPrivAry.length > 0;
    }

    static showNoAssociations(securityRole) {

      let secRoleAry = ['INT_ADMIN','INT_READ_ONLY','INT_AGT_OPREP']
      secRoleAry.map(secRole => {
          if(secRole == securityRole)return true;
      })
      return false;
    }

    static checkFileType(fileName, fileType){
				if(undefined != fileName){
						let fileAry = fileName.split(".")
						if(undefined != fileAry && undefined != fileAry.length){
								if(fileType != fileAry[1]){
									return false;
								}
						}
				}
				return true;
		}

    static isNotBlank(val) {

        if(undefined != val && val.trim().length > 0){
            return true;
        }
        return false;
    }

    static getPaymentAddress(paymentInfo){

        if(undefined != paymentInfo && undefined != paymentInfo.streetNumber){
            return paymentInfo.streetNumber+" "+paymentInfo.streetName+" "+paymentInfo.city+", "+paymentInfo.state+" "+paymentInfo.zipcode
        }else{
          return "Not Provided"
        }
    }

    static getPaymentPhoneNum(val, extn){

        if(this.isNotBlank(val)){
            return val+(CommonUtil.isNotBlank(extn)?' Extn '+extn:'')
        }else{
          return "Not Provided"
        }
    }

    static getBillingAddress(address){

        if(undefined != address && undefined != address.streetNumber){
            return address.streetNumber+" "+address.streetName+" "+address.city+", "+address.state+" "+address.zipcode
        }else{
          return "Not Provided"
        }
    }

    static getPaymentAddressFromAgrm(address){

        if(undefined != address && undefined != address.streetNumber){
            return address.streetNumber+" "+address.streetName+" "+address.city+", "+address.state+" "+address.zipcode
        }else{
          return "Not Provided"
        }
    }

    static getPhoneDisplay(phoneNumber, extn){
        return this.isNotBlank(phoneNumber)?(this.isNotBlank(extn)?this.getFormattedPhoneNumber(phoneNumber)+' ext '+extn:
            this.getFormattedPhoneNumber(phoneNumber)):'Not Provided'
    }

    static getFormattedPhoneNumber(pN){

        if(this.isNotBlank(pN)){
            if(pN.length == 10){
                return "("+pN.substring(0,3)+")"+" "+pN.substring(3,6)+"-"+pN.substring(6,10);
            }
        }
        return pN;
    }

    static onManagementCBox(custList, selectedValue){

        if(undefined != custList && custList.length > 0){
            custList.forEach(mngt => {
                if(mngt.bpNumber == selectedValue){mngt.selected = !mngt.selected}
                    mngt.regionList.forEach(rgn => {rgn.selected = mngt.selected
                        rgn.propertyList.forEach(prop => {prop.selected = mngt.selected
                        })
                    })
                  })
         }
         return custList
    }

    static onRegionCBox(custList, selectedValue){

        custList.forEach(mngt => {
            let selLength = 0
            mngt.regionList.forEach(rgn => {
                if(rgn.bpNumber == selectedValue){rgn.selected = !rgn.selected}
                if(rgn.selected) selLength++
                rgn.propertyList.forEach(prop => {prop.selected = rgn.selected})
            })
            mngt.selected = (selLength == mngt.regionList.length)
        })
        return custList
    }

    static onPropertyCBox(custList, selectedValue, securityRole){

        if(securityRole == 'INT_AGT_EMM'){
            custList.forEach(mngt => {
                let selRgnLength = 0
                mngt.regionList.forEach(rgn => {
                    let selPropLength = 0
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                        if(prop.selected){
                          rgn.selected = !prop.selected;
                          mngt.selected = !prop.selected;
                          selPropLength++
                        }
                    });
                    rgn.selected = (selPropLength == rgn.propertyList.length)
                    if(rgn.selected) selRgnLength++
                });
                mngt.selected = (selRgnLength == mngt.regionList.length)
            });
        }else if(securityRole == 'INT_AGT_EMA'){
            custList.forEach(mngt => {
                mngt.regionList.forEach(rgn => {
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                    });
                });
            });
        }else{
          custList.forEach(mngt => {
              let selRgnLength = 0
              mngt.regionList.forEach(rgn => {
                  let selPropLength = 0
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                      if(prop.selected) selPropLength++
                  });
                  rgn.selected = (selPropLength == rgn.propertyList.length)
                  if(rgn.selected) selRgnLength++
              });
              mngt.selected = (selRgnLength == mngt.regionList.length)
          });
        }
        return custList
    }

    static onManagementCBoxAsscMore(custList, selectedValue, userCustomerlist){

        if(undefined != custList && custList.length > 0){
            custList.forEach(mngt => {
                if(mngt.bpNumber == selectedValue && !_.includes(userCustomerlist,selectedValue)){mngt.selected = !mngt.selected}
                    mngt.regionList.forEach(rgn => {
                        if(!_.includes(userCustomerlist,rgn.bpNumber))rgn.selected = mngt.selected
                        rgn.propertyList.forEach(prop => {
                            if(!_.includes(userCustomerlist,prop.bpNumber))prop.selected = mngt.selected
                        })
                    })
            })
         }
         return custList
    }

    static onRegionCBoxAsscMore(custList, selectedValue, userCustomerlist){

        custList.forEach(mngt => {
            let selLength = 0
            mngt.regionList.forEach(rgn => {
                if(rgn.bpNumber == selectedValue){rgn.selected = !rgn.selected}
                if(rgn.selected) selLength++
                rgn.propertyList.forEach(prop => {
                    if(!_.includes(userCustomerlist,prop.bpNumber))prop.selected = rgn.selected
                })
                userCustomerlist.forEach(bpNumber => {
                    if(bpNumber == rgn.bpNumber){
                        selLength++
                    }
                })
            })
            mngt.selected = (!_.includes(userCustomerlist,mngt.bpNumber) && selLength == mngt.regionList.length)
        })
        return custList
    }

    static onPropertyCBoxAsscMore(custList, selectedValue, securityRole, userCustomerlist){

        if(securityRole == 'INT_AGT_EMM'){
            custList.forEach(mngt => {
                let selRgnLength = 0
                mngt.regionList.forEach(rgn => {
                    let selPropLength = 0
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                        if(prop.selected){
                          rgn.selected = !prop.selected;
                          mngt.selected = !prop.selected;
                          selPropLength++
                        }
                    });
                    rgn.selected = (selPropLength == rgn.propertyList.length)
                    if(rgn.selected) selRgnLength++
                });
                mngt.selected = (selRgnLength == mngt.regionList.length)
            });
        }else if(securityRole == 'INT_AGT_EMA'){
            custList.forEach(mngt => {
                mngt.regionList.forEach(rgn => {
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                    });
                });
            });
        }else{
          custList.forEach(mngt => {
              let selRgnLength = 0
              mngt.regionList.forEach(rgn => {
                  let selPropLength = 0
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                      if(prop.selected) selPropLength++
                      userCustomerlist.forEach(bpNumber => (bpNumber == prop.bpNumber)?selPropLength++:selPropLength)
                  });
                  rgn.selected = (!_.includes(userCustomerlist,rgn.bpNumber) && selPropLength == rgn.propertyList.length)
                  if(rgn.selected) selRgnLength++
                  userCustomerlist.forEach(bpNumber => (bpNumber == rgn.bpNumber)?selRgnLength++:selRgnLength)
              });
              mngt.selected = (!_.includes(userCustomerlist,mngt.bpNumber) && selRgnLength == mngt.regionList.length)
          });
        }
        return custList
    }

    static onManagementCBoxOnVerify(custList, selectedValue){

        custList.forEach(mngt => {
            if(mngt.bpNumber == selectedValue){mngt.verifySelected = !mngt.verifySelected}
                mngt.regionList.forEach(rgn => {rgn.verifySelected = mngt.verifySelected
                    rgn.propertyList.forEach(prop => {prop.verifySelected = mngt.verifySelected})
                })
              })
         return custList
    }

    static onRegionCBoxOnVerify(custList, selectedValue){

        custList.forEach(mngt => {
            let selVerifyLength = 0
            mngt.regionList.forEach(rgn => {
                if(rgn.bpNumber == selectedValue){rgn.verifySelected = !rgn.verifySelected}
                if(rgn.verifySelected) selVerifyLength++
                rgn.propertyList.forEach(prop => {prop.verifySelected = rgn.verifySelected})
            })
            mngt.verifySelected = (selVerifyLength == mngt.regionList.length)
        })
        return custList
    }

    static onPropertyCBoxOnVerify(custList, selectedValue, securityRole){

        if(securityRole == 'INT_AGT_EMM'){
            custList.forEach(mngt => {
                let selRegVerifyLength = 0
                mngt.regionList.forEach(rgn => {
                    let selpropVerifyLength = 0
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.verifySelected = !prop.verifySelected}
                        if(prop.verifySelected) selpropVerifyLength++
                    });
                    rgn.verifySelected = (selpropVerifyLength == rgn.propertyList.length)
                    if(rgn.verifySelected) selRegVerifyLength++
                });
                mngt.verifySelected = (selRegVerifyLength == mngt.regionList.length)
            });
        }else if(securityRole == 'INT_AGT_EMA'){
            custList.forEach(mngt => {
                mngt.regionList.forEach(rgn => {
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.verifySelected = !prop.verifySelected}
                    });
                });
            });
        }else{
            custList.forEach(mngt => {
                let selRegVerifyLength = 0
                mngt.regionList.forEach(rgn => {
                    let selpropVerifyLength = 0
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.verifySelected = !prop.verifySelected}
                        if(prop.verifySelected) selpropVerifyLength++
                    });
                    rgn.verifySelected = (selpropVerifyLength == rgn.propertyList.length)
                    if(rgn.verifySelected) selRegVerifyLength++
                });
                mngt.verifySelected = (selRegVerifyLength == mngt.regionList.length)
            });
        }
        return custList
    }


    static onMngmtCBoxOnUpdatePage(custList, selectedValue){

        custList.forEach(mngt => {
            if(mngt.bpNumber == selectedValue) {
                mngt.selectedOnUpdatePage = !mngt.selectedOnUpdatePage}
                mngt.regionList.forEach(rgn => {
                  rgn.selectedOnUpdatePage = mngt.selectedOnUpdatePage
                    rgn.propertyList.forEach(prop => {
                      prop.selectedOnUpdatePage = mngt.selectedOnUpdatePage
                    })
                })
              })
         return custList
    }

    static onRegionCBoxOnUpdatePage(custList, selectedValue){

        custList.forEach(mngt => {
            let selLength = 0
            mngt.regionList.forEach(rgn => {
                if(rgn.bpNumber == selectedValue){rgn.selectedOnUpdatePage = !rgn.selectedOnUpdatePage}
                if(rgn.selectedOnUpdatePage) selLength++
                rgn.propertyList.forEach(prop => {prop.selectedOnUpdatePage = rgn.selectedOnUpdatePage})
            })
            mngt.selectedOnUpdatePage = (selLength == mngt.regionList.length)
        })
        return custList
    }

    static onPropCBoxOnUpdatePage(custList, selectedValue, securityRole){

        if(securityRole){
            //This is used to eliminat eslint errors: need to be removed later
        }
        custList.forEach(mngt => {
              let selRgnLength = 0
              mngt.regionList.forEach(rgn => {
                  let selPropLength = 0
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == selectedValue){
                          prop.selectedOnUpdatePage = !prop.selectedOnUpdatePage
                      }
                      if(prop.selectedOnUpdatePage) selPropLength++
                  });
                  rgn.selectedOnUpdatePage = (selPropLength == rgn.propertyList.length)
                  if(rgn.selectedOnUpdatePage) selRgnLength++
              });
              mngt.selectedOnUpdatePage = (selRgnLength == mngt.regionList.length)
            });
        return custList
    }

    static isCustomerSelected(custList, securityRole){
        if(securityRole == 'EXT_BROKER') return true;
        let selected = []
        custList.forEach(mngt => {
            if(mngt.selected){selected.push(mngt)}
                mngt.regionList.forEach(rgn => {if(rgn.selected){selected.push(rgn)}
                    rgn.propertyList.forEach(prop => {if(prop.selected){selected.push(prop)}})
                })
            })
      return selected.length >0
    }

    /*static getUserCategory(userCategory){

        return userCategory == "I"?"Internal":"External"
    }*/

    static convertCSVDataToArray(csvFileData) {

        let headers = [];
        let dataArray = [];
        try{
          if(undefined != csvFileData){
              let lineAry = csvFileData.split('\r\n');
              headers = lineAry[0].split(",");
              lineAry.forEach((line,index) => {
                  if(index != 0){
                      dataArray.push(line.split(","));
                  }
              })
          }
        }catch(err){
            //console.log('ERROR=====convertCSVDataToArray===>'+err.message)
        }
        return {headers, data: dataArray};
    }

    static mergeCustomers(searchBPList, assMoreList) {
        if(searchBPList.length == 0){
          return assMoreList;
        }else if(searchBPList.length > 0){
            let mngList = [];
            let rgnList = [];
            let propList = [];
            const isMergeNeeded = this.isMergeNeeded(searchBPList,assMoreList)
            if(isMergeNeeded){
                assMoreList.forEach(mng => {if(mng.selected)mngList.push(mng.bpNumber)
                    mng.regionList.forEach(rgn => {if(rgn.selected)rgnList.push(rgn.bpNumber)
                          rgn.propertyList.forEach(prop => {if(prop.selected)propList.push(prop.bpNumber)
                        })
                    })
                })
                searchBPList.forEach(mng => {mng.selected = CommonUtil.isArrayContains(mngList,mng.bpNumber)
                    mng.regionList.forEach(rgn => {rgn.selected = CommonUtil.isArrayContains(rgnList,rgn.bpNumber)
                        rgn.propertyList.forEach(prop => {prop.selected = CommonUtil.isArrayContains(propList,prop.bpNumber)
                    })
                  })
                })
                return assMoreList;
            }else{
                return [].concat(searchBPList,assMoreList);
            }
        }
    }

    /**
     * function to check whether we need to merge or not by
     * matching the bp numbers
     */
    static isMergeNeeded(searchBPList,assMoreList){

        let searchBPNumberList = [];
        let matchedBPList = [];
        try{
          searchBPList.forEach(mng => {
              if(mng.bpNumber != "NO_MGMT")searchBPNumberList.push(mng.bpNumber)
              mng.regionList.forEach(rgn => {
                  if(rgn.bpNumber != "NO_REGN")searchBPNumberList.push(rgn.bpNumber)
                  rgn.propertyList.forEach(prop => {
                      if(rgn.bpNumber != "NO_PROP")searchBPNumberList.push(prop.bpNumber)
                  })
              })
          })
          assMoreList.forEach(mng => {if(CommonUtil.isArrayContains(searchBPNumberList,mng.bpNumber)) matchedBPList.push(mng.bpNumber)
              mng.regionList.forEach(rgn => {if(CommonUtil.isArrayContains(searchBPNumberList,rgn.bpNumber)) matchedBPList.push(rgn.bpNumber)
                    rgn.propertyList.forEach(prop => {if(CommonUtil.isArrayContains(searchBPNumberList,prop.bpNumber)) matchedBPList.push(prop.bpNumber)
                  })
              })
          })
        }catch(err){
            //console.log('ERROR=====isMergeNeeded===>'+err.message)
        }
        return matchedBPList.length > 0
    }


    static requiredField(value)
    {
        alert(value);
        if(value.length==0)
            return false;
        else
            return true;
    }

    static getUserTypeDisplayNameStr(securityRoleDisplayName) {


        if(securityRoleDisplayName == 'EMA'){
          return 'Account Executive';
        }else if(securityRoleDisplayName == 'EMM'){
          return 'Sales Executive';
        }else{
          return securityRoleDisplayName;
        }

    }

    static isServcieAddrEmpty(addr, addrList){

        let addressMatch = false;
        if(undefined != addr){
            if(undefined == addr.streetNumber || addr.streetNumber == '') addressMatch = true;
            if(undefined == addr.streetName || addr.streetName == '') addressMatch = true;
        }

        addrList.forEach(address => {
            if((address.streetNumber == addr.streetNumber && address.streetName == addr.streetName)){
                if(address.unitNumber != addr.unitNumber){
                    addressMatch = false;
                }else{
                    addressMatch = true;
                }
            }
            if(address.streetNumber == addr.streetNumber && address.streetName == addr.streetName){
              addressMatch = true;
            }
        })
        return addressMatch;
    }

}

export default CommonUtil;
