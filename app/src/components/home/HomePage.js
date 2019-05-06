import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as loginActions from '../../actions/loginActions.ts';
import { bindActionCreators } from 'redux';
import { ErrorBox } from '../common/Error'
import { LoggedInUser } from '../../models/login/loggedInUser.model'

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user:{empSapID: "",bpNumber:"",isValid:false},
            isBackendCalled:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmpSapIdChange = this.onEmpSapIdChange.bind(this);
        this.onBPNumberChange = this.onBPNumberChange.bind(this);
    }

    handleSubmit(){
        let user = Object.assign({}, this.state.user);
        if(user.empSapID != ''){
            this.props.actions.getUserDetailsAPI(this.state.user.empSapID);
        }else{
            this.setState({isError:true})
        }
    }

    onEmpSapIdChange(event){
        const user = this.state.user;
        user.empSapID = event.target.value;
        this.setState({user:user});
    }

    onBPNumberChange(event){
        const user = this.state.user;
        user.bpNumber = event.target.value;
        this.setState({user:user});
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.loggedInUser != nextProps.loggedInUser){
            let userValidated  = nextProps.loggedInUser.isValid
            let redirectLink = (userValidated)?'/admin/overview':'/error/invalidSapid/' + "invalidSapId"
            this.props.history.push(redirectLink)
        }else{
            //console.log("NOT A VALID REQUEST::::"+nextProps)
        }
    }


    render(){

        return (
            <div className="loginbox">
              <h1>Simplesource Admin</h1>
                <form>
                    <ErrorBox message="Please enter valid sap id." isError={this.state.isError}/>
                    <label htmlFor="SAP_ID" >EMP SAP ID</label>
                    <input type="text" maxLength="10" name="empSapId" onChange={this.onEmpSapIdChange} value={this.state.user.empSapID}/><br/>
                    <label htmlFor="BP NUMBER">BP NUMBER</label>
                    <input type="text" maxLength="10" name="bpNumber" onChange={this.onBPNumberChange} value={this.state.user.bpNumber}/>
                    <div id="continuebtn">
                        <button onClick={this.handleSubmit} className="boxmarginright myaccount-btn" type="button">Submit</button>
                    </div>
                </form>
              </div>
        );
    }
}

HomePage.propTypes = {
    actions: PropTypes.object,
    history: PropTypes.func,
    loggedInUser: PropTypes.instanceOf(LoggedInUser)
}

const mapStateToProps = (state) => ({loggedInUser: state.loggedInUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(loginActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
