import React from 'react'
import PropTypes from 'prop-types';

let Range = ({rangeOptns}) => {

    const { itemsSize, onFirst, onLast, onPrevious, onNext, start, end } = rangeOptns

    const pageDisplay = <span className="pagedisplay">Showing {start} to {end} of {itemsSize} entries</span>

    return(
        <div className="pagination_range right paddingb">
            {pageDisplay}
            <a className="pagination first" onClick={onFirst}>First</a>
            <a className="pagination prev" onClick={onPrevious}>Previous</a>
            <span className="paginationNumbers"></span>
            <a className="pagination next" onClick={onNext}>Next</a>
            <a className="pagination last" onClick={onLast}>Last</a>
        </div>
    )
}

Range.propTypes = {
    rangeOptns: PropTypes.object.isRequired,

}

export default Range
