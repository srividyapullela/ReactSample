import React from 'react';
import FromDate from '../calendar/FromDate'
import ToDate from '../calendar/ToDate'
import PropTypes from 'prop-types';

let SearchPromocodeForm = ({searchOptions}) => {

    const { searchPromocode, startDate, handleFromDate,minDate,maxDate,
          handleToDate, selFromDate, selToDate, onPromocodeChange, offer } = searchOptions

    const heading = <h2>Search current promo codes</h2>

    return (
        <div className="mT20">
            <form>
                    {heading}
                <div className=" formBG mT20">
                    <div className="movetitledown inlineBlock spcthirtyeight">
                        <div className="movetitledown pL20">
                            <div className="inlineBlock">
                                <label htmlFor="searchOfferCode">Promo Code</label>
                                <input name="offerCode" onChange={onPromocodeChange} value={offer.offerCode} maxLength="8" type="text" className="validate[required] twoSeventyTwo"/>
                            </div>
                        </div>
                        <div className="leftcolumntitlewrapper pL20 movetitledown">
                            <div>
                                <FromDate handleDateChange={handleFromDate} maxDate={maxDate} startDate={startDate} selectedDate={selFromDate}/>
                                <div className="left margtop cardselectboxspace">&#150;</div>
                                <ToDate handleDateChange={handleToDate} minDate={minDate} startDate={startDate} selectedDate={selToDate}/>
                            </div>
                        </div>
                    </div>

                    {/*<div className="inlineBlock vTop movetitledown">
                        <label htmlFor="searchCustType">Customer Type</label>
                                  <input name="searchCustType" onChange={onCustomerTypeChange} type="radio" value="HB" className="validate[reqRadio[1]]"/>
                                  <label htmlFor="builder" className="textlabel displayinline">Builder</label>
                                <input name="searchCustType" onChange={onCustomerTypeChange} type="radio" value="MF" className="validate[reqRadio[1]] aLM"/>
                                  <label htmlFor="multiFamily" className="textlabel displayinline">Multi-Family</label>
                    </div>*/}

                     <div className="movetitledown pL20">
                            <button type="button" onClick={searchPromocode} className="controlText-A" name="search" id="search">Search</button>
                        </div>
                </div>
            </form>
            <div  className="tableMsgHolder hide">&nbsp;</div>
        </div>
    );
}

SearchPromocodeForm.propTypes = {
    searchOptions: PropTypes.object.isRequired
}

export default SearchPromocodeForm
