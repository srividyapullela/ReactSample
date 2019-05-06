import React from 'react'
import { Link } from 'react-router-dom';

let Cancel = () => {

    return(
        <Link to="/admin/overview">
          <button className="left controlText-B cancelButton" id="cancelButton" type="button">Cancel</button>
        </Link>
    )
}

export default Cancel
