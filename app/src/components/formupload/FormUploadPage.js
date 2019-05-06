import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as formUploadActions from '../../actions/formUploadActions'
import Promocode from './Promocode'
import DisplayName from './DisplayName'
import File from './File'
import { ErrorBox } from '../common/Error'
import CommonUtil from '../common/Util'
import PropTypes from 'prop-types';

class FormUploadPage extends React.Component {

    constructor(props){
        super(props)

        this.state = this.getInitialState()

        this.onUpload = this.onUpload.bind(this)
        this.onChangePromocode = this.onChangePromocode.bind(this)
        this.onChangeDisplayname = this.onChangeDisplayname.bind(this)
        this.handleFiles = this.handleFiles.bind(this)
    }

    getInitialState(){
        return {
          formData:{displayName:'',promoCode:''},
          isError:false,
          formErrors: {promoCode: '', displayName: '', uploadFile:''},
          formValid: false
        }
    }

    handleFiles(files) {
        var reader = new FileReader();
        if(CommonUtil.checkFileType(files[0].name, 'pdf')){
            this.setState({isError:false, errorMessage:""})
            let formData = this.state.formData
            reader.onload = (e) => {formData.file = e.target.result};
            reader.readAsDataURL(files[0]);
            formData.fileName = files[0].name;
            this.setState({formData})
        }else{
            this.setState({isError:true,errorMessage:"Please upload only pdf files."})
        }
    }

    onChangePromocode(e){
        let formData = this.state.formData
        formData.promoCode = e.target.value;
        this.setState({formData})
    }

    onChangeDisplayname(e){
        let formData = this.state.formData
        formData.displayName = e.target.value;
        this.setState({formData})
    }

    componentWillReceiveProps() {
        this.setState(this.getInitialState())
    }

    onUpload(e){
        if(e.charCode == 13 || e.charCode == undefined){
            let formData = this.state.formData
            if(CommonUtil.isNotBlank(formData.displayName) && CommonUtil.isNotBlank(formData.promoCode) && CommonUtil.isNotBlank(formData.file)){
                this.setState({isError:false, errorMessage:""})
                this.props.actions.formUpload(this.state.formData)
                this.props.history.push("/admin/formupload/confirm")
            }else{
                this.setState({isError:true, errorMessage:"Please complete the form. All fields are required."})
            }
        }
    }

    render(){

        const heading = <h1>Form Upload</h1>
        let fileName = this.state.formData.fileName != undefined?this.state.formData.fileName:''
        return(
            <div>
              <div className="pageHeader">{heading}</div>
                <div className="box">
                  <ErrorBox message={this.state.errorMessage} isError={this.state.isError} />
                  <div id="headingError" className="status-message">&nbsp;</div>
                  <form name="formUploadFrm" id="formUploadFrm" className="formBG">
                      <div className="left fullwidth aLM">
                          <div className="left fullwidth movetitledown">
                            <Promocode onUpload={this.onUpload} promoCode={this.state.formData.promoCode} onChangePromocode={this.onChangePromocode}/>
                            <DisplayName onUpload={this.onUpload} displayName={this.state.formData.displayName} onChangeDisplayname={this.onChangeDisplayname}/>
                            <File handleFiles={this.handleFiles} fileName={fileName}/>
                          </div>
                      </div>
                      <div className="movetitledown aLM">
                        <button type="button" id="formUploadBtn" onClick={this.onUpload} className="controlText-A myaccount-btn b_submit">Upload<span></span></button>
                      </div>
                  </form>
               </div>
            </div>
        );
    }
}

FormUploadPage.propTypes = {
    actions: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({formUpload: state.formUpload})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(formUploadActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(FormUploadPage)
