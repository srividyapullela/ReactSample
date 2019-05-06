import React from 'react'
import PropTypes from 'prop-types';

let SizeSelection = ({sizeOptns,position}) => {

    const { onDisplaySizeChange, itemsSize, pSize } = sizeOptns

    if(position != "top"){
      return <div></div>
    }

    return(
        <div className="pagination_range">
          <div id="pd_display" className="left">
            <label htmlFor="pagesize" className="displayinline">Display</label>
            <select id="pagesize" onChange={onDisplaySizeChange} className="pagesize">
              <option selected={pSize == 25?'selected':''}  value={25}>25</option>
              <option selected={pSize == 50?'selected':''} value={50}>50</option>
              <option selected={pSize == 75?'selected':''} value={75}>75</option>
              <option selected={pSize == 100?'selected':''} value={100}>100</option>
              <option selected={pSize == itemsSize?'selected':''} value={itemsSize}>All</option>
            </select>
            <span>rows at a time</span>
          </div>
        </div>
    )
}

SizeSelection.propTypes = {
    sizeOptns: PropTypes.object.isRequired,
    position: PropTypes.string.isRequired
}

export default SizeSelection
