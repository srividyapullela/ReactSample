import React from 'react'
import CancelorSave from './CancelorSave'
import UpdateSuccessBox from './UpdateSuccessBox'
import PropTypes from 'prop-types';

let Password = ({forUpdate}) => {

    const { update, fieldName, editing } = forUpdate

    const enableEditing = (editing && (fieldName == 'password'))

    return(
      <div className="fullwidth left">
        <form name="password" className="lessmargin smallinputinline">
         {fieldName == 'password'?<UpdateSuccessBox {...forUpdate} />:''}
          <div className="label"><label htmlFor="password">Change Passowrd</label></div>
          <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
            <div className="data secondcolumndata">*********</div>
            <div className="right">
              <a onClick={() => update('password')} className="editClick editing">Update</a>
            </div>
          </div>
          <div className={`secondcolumndata left ${enableEditing?'':'editable'}`}>
            <div className="data">
              <input type="password" name="password" id="password"
                className="validate[required,funcCall[validUsername]] filterNoSpecialCharsOrSpaces"
                value="*********" />
            </div>
            <CancelorSave onUpdate={forUpdate} />
          </div>
        </form>
      </div>
    );
}

Password.propTypes = {
    forUpdate: PropTypes.shape({
        update: PropTypes.func.isRequired,
        fieldName: PropTypes.string.isRequired,
        editing: PropTypes.bool.isRequired
    })
}

export default Password
