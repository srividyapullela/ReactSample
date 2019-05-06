import React from 'react'
import CommonUtil from '../../common/Util'
import PropTypes from 'prop-types';

let AccessPriv = ({accessprivOptions}) => {

    const { userType, onChangeFieldValue, ableToPayBills, ableToStartStopService } = accessprivOptions

    const ableToAccessPriv = CommonUtil.ableToAccessPriv(userType)
    const disabledAccessPriv = CommonUtil.disabledAccessPriv(userType)

   let result;
   if(disabledAccessPriv){

       result =  <div className="left rightcolumnwrapper">
                   <input type="checkbox" name="ableToPayBills" disabled={disabledAccessPriv} checked={ableToPayBills || disabledAccessPriv} onChange={(e) => onChangeFieldValue(e,'abletopay')}/>
                   <label htmlFor="payBill" className="displayinline tip1">Able to Pay Bills</label>
                </div>
   }else{
       result = <div className="left rightcolumnwrapper" onMouseEnter="">
                     <input type="checkbox" name="ableToPayBills" disabled={disabledAccessPriv} checked={ableToPayBills || disabledAccessPriv} onChange={(e) => onChangeFieldValue(e,'abletopay')}/>
                     <label htmlFor="payBill" className="displayinline tip1">Able to Pay Bills</label>
                </div>

   }

    if(ableToAccessPriv){
        return(
          <div className={`left fullwidth smallinputinline movetitledown ${disabledAccessPriv?'greybox':''}`}>
                {disabledAccessPriv?<p>* Customer Admin inherently has the ability to pay bills and perform start/stop transactions</p>:
                <p>* Please select atleast one access privilege.</p>}
               {result}
              <div className="left">
                <input type="checkbox" name="ableToStartStopService" disabled={disabledAccessPriv} checked={ableToStartStopService || disabledAccessPriv} onChange={(e) => onChangeFieldValue(e,'abletoss')}/>
                <label htmlFor="startServ" checked="checked" className="displayinline">Able to Start / Stop Service</label>
              </div>
          </div>
        )
    }else{
        return <div></div>;
    }
}

AccessPriv.propTypes = {
    accessprivOptions: PropTypes.object.isRequired
}

export default AccessPriv
