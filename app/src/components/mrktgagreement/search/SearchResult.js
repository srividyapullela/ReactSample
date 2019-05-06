import React from 'react'
import Agreement from './Agreement'
import { ErrorBox } from '../../common/Error'
import PropTypes from 'prop-types';

let SearchResult = ({srchRsltOptions}) => {

  const { marketAgrmt, onCreateMarketingAgrmt, onUpdateMarketingAgrmt } = srchRsltOptions

  const errorMessage = "BP Number not found."

  let result;
  if(marketAgrmt.error){
      result = <ErrorBox message={errorMessage} isError={true}/>
  }else{
    let searchResult = marketAgrmt.data
    if(searchResult.status == "CCS"){
      result = <Agreement result={searchResult} buttomValue="Create Marketing Agreement" onButtonClick={onCreateMarketingAgrmt}/>
    }else if(searchResult.status == "DB"){
      result = <Agreement result={searchResult} buttomValue="Update Marketing Agreement" onButtonClick={onUpdateMarketingAgrmt}/>
    }
  }

  return(
    <div>
      {result}
    </div>
  )
}

SearchResult.propTypes = {
    srchRsltOptions: PropTypes.object.isRequired
}

export default SearchResult
