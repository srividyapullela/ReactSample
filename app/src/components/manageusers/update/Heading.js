import React from 'react'
import PropTypes from 'prop-types';

let Heading = ({changingAdminFromUpdatePage}) => {

    let heading;
    if(changingAdminFromUpdatePage){
        heading = <div id="verifyMessage" ><h1>Update User - Verification</h1></div>
    }else{
        heading = <div id="updateUserMsg"><h1>Update User</h1></div>
    }

    return(
      <div>
        {heading}
      </div>
    )
}

Heading.propTypes = {
    changingAdminFromUpdatePage: PropTypes.bool.isRequired
}

export default Heading
