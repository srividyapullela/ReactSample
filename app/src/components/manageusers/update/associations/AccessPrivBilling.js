import React from 'react'

let AccessPriv = (props) => {

    const { acessPriv } = props

    const PayBillEdit = (props) => {

        const { acessPriv, accessPrivOptns } = props
        const {  onBrokerPropAccessPriv, bpNumber, brokerPropAccessPriv, onBrkrPropAccessChange } = accessPrivOptns
        const { editType, editing, editingAccessType, clickedPropBpNumber } = brokerPropAccessPriv

        return (
          <div>
            {!(editing && bpNumber == clickedPropBpNumber && editingAccessType == 'B')?[<span className="editOption">{acessPriv == 'Y'?'Yes':'No'}</span>,
            <a onClick={() => onBrokerPropAccessPriv({editType:'E',accessType:'B',bpNumber})} className="editTblClick editing edit-r"></a>]
            :
            <span id="edtba{bpNumber}" className="editContent">
                <input type="checkbox" onChange={(e) => onBrkrPropAccessChange(e,bpNumber,'B')} checked={acessPriv == 'Y'} id={bpNumber} name="{bpNumber}pay"/>
                <label for="{bpNumber}pay" class="textlabel">Able to Pay Bills</label><br/>
                <a onClick={() => onBrokerPropAccessPriv({editType:'S',accessType:'B',bpNumber})} className="ajaxIt11 b_submit save_r"></a>
                <a onClick={() => onBrokerPropAccessPriv({editType:'C',accessType:'B'})} className="cancelTblClick delete_r" data-identifyText="updba"></a>
            </span>}
          </div>
        )

    }

    return(
        <td>
          {acessPriv == 'NA'?NA:PayBillEdit(props)}
        </td>
    );
}

export default AccessPriv
