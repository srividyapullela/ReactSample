import React from 'react'
import Range from './Range'
import SizeSelection from './SizeSelection'
import PropTypes from 'prop-types';

let Pagination = ({sizeOptns,rangeOptns,position}) => {

    const { itemsSize } = sizeOptns

    if(itemsSize <= 25){
        return <div></div>
    }

    return(
      <div className="left fullwidth">
          <SizeSelection position={position} sizeOptns={sizeOptns}/>
          <Range rangeOptns={rangeOptns}/>
      </div>
    )
}

Pagination.propTypes = {
    sizeOptns: PropTypes.object.isRequired,
    rangeOptns: PropTypes.object.isRequired,
    position: PropTypes.string.isRequired
}

export default Pagination
