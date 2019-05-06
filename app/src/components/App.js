import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage'
import PrimaryLayout from './layouts/PrimaryLayout'
import AuthorizedRoute from './layouts/AuthorizedRoute'
import ErrorLayout from './layouts/ErrorLayout'

class App extends React.Component {

    constructor(props){
        super(props)
    }

    render(){

        return(
            <div>
                <BrowserRouter basename="/ssgme">
                    <Switch>
                        <Route exact path="/"  component={HomePage} />
                        <Route path="/error"  component={ErrorLayout} />
                        <AuthorizedRoute path="/admin" component={PrimaryLayout}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
