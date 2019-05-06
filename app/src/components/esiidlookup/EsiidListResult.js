import React from 'react'
import GMETable from '../common/GMETable'
import moment from 'moment';
import { ErrorBox } from '../common/error'
import PropTypes from 'prop-types';
import * as _ from 'lodash'

let ESIIDListResult = ({esiidList}) => {

    if(esiidList.length == 0){
       const message = "No ESIIDs found for service addresses entered or upload. please try again."
       return <ErrorBox message={message} isError={true}/>
    }

    const ESIIDRow = (esiid,index) => {

      if(esiid.streetNumber != '' && esiid.streetName != ''){
          return(
                <tr key = {esiid.esiid+index} className={index%2 == 0?'odd':'even'}>
                    <td>{esiid.streetNumber} {esiid.streetName}</td>
                    <td>{esiid.city}</td>
                    <td>{esiid.state}</td>
                    <td>{esiid.zipcode}</td>
                    <td>{esiid.unitNumber}</td>
                    <td>{esiid.esiid}</td>
                </tr>
            )
        }
    }

    const esiidTable = esiidList.map((esiid,index) => ESIIDRow(esiid,index))

    const tableHeaders = [{"sortTitle":"streetNumber",title:"Street Address"},
                          {"sortTitle":"city",title:"City"},
                          {"sortTitle":"state",title:"State"},
                          {"sortTitle":"zipcode",title:"Zipcode"},
                          {"sortTitle":"unitNumber",title:"Unit Number"},
                          {"sortTitle":"esiid",title:"ESI ID"}
                        ]

    const downloadFileName = "Srch_Results_"+moment().format("MM_DD_YYYY")+".csv"

    let csvData = _.cloneDeep(esiidList)
    csvData = csvData.map(esiid => {
        esiid.esiid = "'"+esiid.esiid+"'"
        return esiid;
    });

    return(
        <GMETable
            tableBody={esiidTable}
            tableHeaders={tableHeaders}
            csvFileName={downloadFileName}
            csvData={csvData}
            totalSize={esiidList.length}
            allItems={esiidList} />
    )
}

ESIIDListResult.propTypes = {
    esiidList: PropTypes.shape({
        esiid: PropTypes.string.isRequired,
        streetNumber: PropTypes.string.isRequired,
        streetName: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,
        unitNumber: PropTypes.string.isRequired
    })
}

export default ESIIDListResult
