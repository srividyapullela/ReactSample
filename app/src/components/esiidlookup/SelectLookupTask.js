import React from 'react';
import { CustomRadio }  from '../common/Radio'
import PropTypes from 'prop-types';

let SelectLookupTask = ({lookupType,onUserRadioChange}) => {

    const upload = "Upload"
    const enterSrvcAddr = "Enter Service Address"

    return(
        <div className="left fullwidth">
            <CustomRadio divClassName="left" checked={lookupType == 'upload'} inputClassName="serviceAddType" labelClassName="displayinline"
                             onUserRadioChange={onUserRadioChange} name="serviceAddType" value="upload" text={upload} />

            <CustomRadio divClassName="left leftMarginSpace marginlefttwenty" checked={lookupType == 'serviceAdd'} inputClassName="serviceAddType" labelClassName="displayinline"
                            onUserRadioChange={onUserRadioChange} name="serviceAddType" value="serviceAdd" text={enterSrvcAddr} />
            </div>
    )
}

SelectLookupTask.propTypes = {
    lookupType: PropTypes.string.isRequired,
    onUserRadioChange: PropTypes.func.isRequired
}

export default SelectLookupTask
