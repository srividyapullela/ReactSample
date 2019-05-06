import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchResult from './SearchResult'
import * as mrktgAgrmtActions from '../../../actions/mrktgAgmtActions'
import { ErrorBox } from '../../common/Error'
import Processing from '../../common/Processing'
import PropTypes from 'prop-types';

class SearchCustomersPage extends React.Component {

    constructor(props){
        super(props);

        this.state = this.getInitialState()

        this.onBPNumberChange = this.onBPNumberChange.bind(this);
        this.search = this.search.bind(this);
        this.onCreateMarketingAgrmt = this.onCreateMarketingAgrmt.bind(this)
        this.onUpdateMarketingAgrmt = this.onUpdateMarketingAgrmt.bind(this)
    }

    getInitialState(){
        return{
          isAjaxCalled: false,
          bpNumber: '',
          isError:false,
          isProcessing:false,
          showUserResult:false
        }
    }

    search(e){
        if(e.charCode == 13 || e.charCode == undefined){
            this.setState({showUserResult:false})
            let bpNumber = this.state.bpNumber
            if(bpNumber == undefined || bpNumber == ''){
                this.setState({isError:true})
            }else{
                this.setState({isError:false, isProcessing:true})
                this.props.actions.getMrktgAgreement({bpNumber:this.state.bpNumber});
                this.setState({isAjaxCalled:true});
            }
        }
    }

    onCreateMarketingAgrmt(){
        this.props.actions.saveMrktgAgreement({})
        this.props.history.push("/admin/marketingagreements/entermrkgagreement")
    }

    onUpdateMarketingAgrmt(){
       this.props.history.push("/admin/marketingagreements/update")
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.marketAgrmt != nextProps.marketAgrmt){
            this.setState({isProcessing:false,showUserResult:true,isError:false})
        }else{
            this.setState(this.getInitialState())
        }
    }

    onBPNumberChange(event){
        this.setState({bpNumber:event.target.value, showUserResult:false});
    }

    render(){

        const marketAgrmt = this.props.marketAgrmt
        const errorMessage = "Please enter BP Number"

        const srchRsltOptions = {marketAgrmt,onCreateMarketingAgrmt:this.onCreateMarketingAgrmt,onUpdateMarketingAgrmt:this.onUpdateMarketingAgrmt}


        return(
        <div>
            <div className="pageHeader">
                     <h1>Marketing Agreement - Search Customers</h1>
                </div>
            <div className="box">

	              <div className="boxtitleseperator">&nbsp;</div>
                <ErrorBox message={errorMessage} isError={this.state.isError}/>
                <div className="left fullwidth movetitledown">
                		<div className="left">
                			<div id="relationshipId" className="noformmargin"><label  htmlFor="relationId">Marketing Agreement BP Number#</label></div>
                			<input type="text" onKeyPress={this.search} className="validate[required] widefield" onChange={this.onBPNumberChange} value={this.state.bpNumber} name="relationId" maxLength="10"/>
                		</div>
                		<div className="left marginlefttwenty movetitledown">
                			<button className="left controlText-B" id="searchButton" onClick={this.search} type="button">Search</button>
                		</div>
                </div>
                {this.state.isAjaxCalled?
                  <div id="searchResult" className="srchrsltmrgntop">
                    {this.state.isProcessing?<Processing />:''}
                    {this.state.showUserResult?<SearchResult srchRsltOptions={srchRsltOptions}/>:''}
                </div>:""}
          </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({marketAgrmt: state.marketAgreement})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(mrktgAgrmtActions, dispatch)})

SearchCustomersPage.propTypes = {
    history: PropTypes.func.isRequired,
    actions: PropTypes.func.isRequired,
    marketAgrmt: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCustomersPage)
