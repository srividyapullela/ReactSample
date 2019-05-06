import React from 'react'
import ServiceAddress from './ServiceAddress'
import PropTypes from 'prop-types';

let EnterServiceAddress = ({enterSrvAdrOpts}) => {

    const { lookup, onAdd, srvcAddrCount, onAddressChange, onRemove } = enterSrvAdrOpts

    let serviceAddrList = [];
    for(var i=1; i<srvcAddrCount; i++){
        serviceAddrList.push(<ServiceAddress index={i+1} onAddressChange={onAddressChange} onAdd={onAdd} onRemove={onRemove} lookup={lookup} srvcAddrCount={srvcAddrCount}/>);
    }

    return(
         <div className="left fullwidth serviceInfo movetitledown">
            <form name="srvAddrFrm" id="srvAddrFrm" action="" method="post">
                <ServiceAddress index={1} onAddressChange={onAddressChange} onAdd={onAdd} onRemove={onRemove} lookup={lookup} srvcAddrCount={srvcAddrCount}/>
                {serviceAddrList}
            </form>
		</div>
    )
}

EnterServiceAddress.propTypes = {
    enterSrvAdrOpts: PropTypes.shape({
        lookup: PropTypes.func.isRequired,
        onAdd: PropTypes.func.isRequired,
        srvcAddrCount: PropTypes.number.isRequired,
        onAddressChange: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
    })
}

export default EnterServiceAddress
