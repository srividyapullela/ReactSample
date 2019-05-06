import React from 'react'

let Print = () => {

    return(
      <div className="handle">
        <a onClick={() => window.print()} className="right">
          <span title="Print" className="printIcon">&nbsp;</span>Print
        </a>
    </div>
    )
}

export default Print
