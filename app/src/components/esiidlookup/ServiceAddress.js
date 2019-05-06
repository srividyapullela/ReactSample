import React from 'react';
import PropTypes from 'prop-types';

let ServiceAddress = ({index, onAddressChange, lookup, onAdd, srvcAddrCount, onRemove}) => {

    const moreWidth = {minWidth:'200px'}
    const searchWidth = {maxWidth:'25px'}

    const add = "Add"
    const search = "Search"
    const remove = "Remove"
    const streetNumber = "Street Number"+index
    const streetName = "Street Name"+index
    const unitNumber = "Unit Number"+index
    const city = "City"+index
    const zipcode = "Zipcode"+index

    return(
        <div className="left fullwidth addressData movetitledown">
          <div className="left">
              <label htmlFor="StreetNum1">{streetNumber}</label>
            <input type="text" name="StreetNum1" onChange={(e) => onAddressChange(e,'SNB',index)} className="validate[required] subinput"/>
          </div>
          <div className="left aLM">
              <label htmlFor="StreetName1">{streetName}</label>
            <input type="text" name="StreetName1" onChange={(e) => onAddressChange(e,'SNM',index)} className="validate[required] mediumField"/>
          </div>
          <div className="pL aLM">
            <label style={moreWidth} htmlFor="unitNum">{unitNumber}</label>
            <input type="text" name="unitNum1" onChange={(e) => onAddressChange(e,'UN',index)} className="subinput"/>
          </div>
          <div className="left aLM">
              <label htmlFor="city">{city}</label>
            <input type="text" name="city1" onChange={(e) => onAddressChange(e,'C',index)} className="mediumField"/>
          </div>
          <div className="left  aLM">
              <label htmlFor="zipcode">{zipcode}</label>
            <input type="text" name="zipcode1" maxLength="5" onChange={(e) => onAddressChange(e,'Z',index)} className="subinput"/>
          </div>
          {index ==1?
            [<div key={index} className="left movetitledown addHolder">
                <button type="button" onClick={() => onAdd(srvcAddrCount)} className="controlText-B leftMarginSpace addServiceAddBtn">{add}</button>
            </div>,
            <div key={index+1} style={searchWidth} className="left movetitledown aLM searchHolder">
                <button className="left controlText-A leftMarginSpace b_submit ajaxIt2" onClick={lookup} id="serachButton" type="button">{search}<span>&nbsp;</span></button>
            </div>]:
            <div className="left movetitledown addHolder">
                <button type="button" onClick={() => onRemove(srvcAddrCount,index)} className="controlText-A leftMarginSpace">{remove}</button>
            </div>
          }
        </div>
    )
}

ServiceAddress.propTypes = {
    index: PropTypes.number.isRequired,
    onAddressChange: PropTypes.func.isRequired,
    lookup: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    srvcAddrCount: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default ServiceAddress
