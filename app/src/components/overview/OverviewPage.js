import React from 'react';
import { Link } from 'react-router-dom';
import * as constants from '../common/constants';
import * as stateInfo from '../../store/stateInfo'
import CommonUtil from '../common/Util';

class OverviewPage extends React.Component {

   render(){

        let loggedInSecurityRole = stateInfo.getLoggedInSecurityRole();

        //const isNotAdmin = !CommonUtil.isAdmin(loggedInSecurityRole)
        const isAgentAMMorEMA = CommonUtil.isAgentAMMorEMA(loggedInSecurityRole)
        const isAgentOPSREP = CommonUtil.isAgentOPSREP(loggedInSecurityRole)
        const moduleArray = constants.moduleArray;

        var groupSize = 2;
        //if we use loadash we can reduce the number of lines here//
        const RenderRows = moduleArray.map(function(module,index) {

            if(isAgentOPSREP && module.name == 'Manage Contract Info') return '';
            if((isAgentOPSREP || isAgentAMMorEMA) && module.name == 'Manage Incentive Offers') return '';
            if((isAgentOPSREP || isAgentAMMorEMA) && module.name == 'Manage Marketing Agreements') return '';
            if(isAgentOPSREP && module.name == 'Form Upload') return '';
            return (<div key={index} className="tablecell">
                            <div className="imageColumn"><span className={module.className}>&nbsp;</span>   </div>
                            <div className="contentColumn"><span className="labelSpan">{module.name}</span>
                            <p>
                                {module.text}
                            </p>
                            <Link to ={module.link} className="ctrls">{module.linkName}<span></span></Link></div>
                        </div>);
        }).reduce(function(r, element, index) {
            index % groupSize === 0 && r.push([]);
            r[r.length - 1].push(element);
            return r;
        }, []).map(function(rowContent, index) {
            return <div key={index} className="tablerow">{rowContent}</div>;
        });

        return(
            <div className="left fullwidth">
                <div className="pageHeader">
                        <h1>Simplesource Admin</h1>
                </div>
                <div className="box">

                    <div className="boxtitleseperator"></div>
                    <div className="tabledisplay overviewTable">
                        {RenderRows}
                    </div>
                </div>
            </div>
        );
    }
}

export default OverviewPage;
