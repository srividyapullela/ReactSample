import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class AuthorizedRoute extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    const { component: Component, ...rest } = this.props

    const logged = true
    const pending = false
    return (
      <Route
        {...rest}
        render={props => {
          if (pending) return <div>Loading...</div>
          return logged? <Component {...props} />:<Redirect to="/ssgmeAdmin/error" />
        }}
      />
    )
  }
}


export default AuthorizedRoute;
