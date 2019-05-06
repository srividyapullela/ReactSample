import React from 'react'

let AccessPrivService = (props) => {

    const { acessPriv } = props

    const StartStopEdit = (props) => {

        const { acessPriv, accessPrivOptns } = props
        const {  onBrokerPropAccessPriv, bpNumber, brokerPropAccessPriv, onBrkrPropAccessChange } = accessPrivOptns
        const { editType, editing, editingAccessType, clickedPropBpNumber } = brokerPropAccessPriv

        let checkBoxVal = acessPriv == 'Y'

        return (
          <div>
            {!(editing &&  bpNumber == clickedPropBpNumber && editingAccessType == 'S')?[<span className="editOption">{acessPriv == 'Y'?'Yes':'No'}</span>,
            <a onClick={() => onBrokerPropAccessPriv({editType:'E', accessType:'S',bpNumber})} className="editTblClick editing edit-r"></a>]:
            <span id="edtba{bpNumber}" className="editContent">
                <input type="checkbox" onChange={(e) => onBrkrPropAccessChange(e,bpNumber,'S')} checked={acessPriv == 'Y'} id={bpNumber} name="{bpNumber}pay"/>
                <label for="{bpNumber}pay" class="textlabel">Able to start/stop service</label><br/>
                <a onClick={() => onBrokerPropAccessPriv({editType:'S',accessType:'S',bpNumber,checkBoxVal})} className="ajaxIt11 b_submit save_r"></a>
                <a onClick={() => onBrokerPropAccessPriv({editType:'C',accessType:'S'})} className="cancelTblClick delete_r" data-identifyText="updba"></a>
            </span>}
          </div>
        )
      }

    return(
        <td>
          {acessPriv == 'NA'?NA:StartStopEdit(props)}
        </td>
    );
}

export default AccessPrivService
