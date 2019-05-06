import React from 'react';
import EditorDelete from '../EditorDelete'
import GMETable from '../../common/GMETable'
import { ErrorBox } from '../../common/Error'
import moment from 'moment';
import PropTypes from 'prop-types';

let SearchResults = ({offerList, onDeleteOffer, onEditOffer}) => {

    const downloadFileName = "Srch_Results_"+moment().format("MM_DD_YYYY")+".csv"

    if(offerList.length == 0){
        return (
            <div id="searchResult">
                <ErrorBox message="No offers found for the search criteria." isError={true}/>
            </div>
        )
    }

    const OfferRow = (offer,index) => {

      return(
            <tr key = {index} className={index%2 == 0?'even':'odd'}>
                <td id="{offer.offercode}">{offer.offerCode}</td>
                <td id="{offer.validFrom}">{offer.validFrom}</td>
                <td id="{offer.validTo}">{offer.validTo}</td>
                <td id="{offer.deletedDate}">{offer.deletedDate == undefined?'NA':offer.deletedDate}</td>
                <td id="{offer.customerType}">{offer.customerType}</td>
                <td className="textc" id="{offer.offercode}">
                    <EditorDelete offer={offer} onEditOffer={onEditOffer} onDeleteOffer={onDeleteOffer}/>
                </td>
            </tr>
        )
    }

    const offerTable = offerList.map((offer,index) => OfferRow(offer,index))

    const tableHeaders = [
                          {"sortTitle":"offerCode",title:"Promo Code"},
                          {"sortTitle":"validFrom",title:"Valid From"},
                          {"sortTitle":"validTo",title:"Valid To"},
                          {"sortTitle":"deletedDate",title:"Deleted Date"},
                          {"sortTitle":"customerType",title:"Customer Type"},
                          {}
                         ]

    return(
        <div id="searchResult">
          <GMETable
              tableBody={offerTable}
              tableHeaders={tableHeaders}
              csvFileName={downloadFileName}
              csvData={offerList}
              totalSize={offerList.length}
              allItems={offerList} />
        </div>
    )

}

SearchResults.propTypes = {
    offerList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteOffer: PropTypes.func.isRequired,
    onEditOffer: PropTypes.func.isRequired
}

export default SearchResults
