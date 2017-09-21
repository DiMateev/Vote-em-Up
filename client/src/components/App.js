import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Signin from './auth/SignIn';
import Signout from './auth/SignOut';
import Signup from './auth/SignUp';
import createSurvey from './survey/Create-Survey';
import showSurvey from './survey/Show-Survey';
import RequireAuth from './auth/require-auth';
import Home from './Home';
import NoSuchPage from './404.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' {...this.props} component={Home} />
            <Route path='/signin' component={Signin} />
            <Route path='/signout' component={Signout} />
            <Route path='/signup' component={Signup} />
            <Route path='/create-survey' component={RequireAuth(createSurvey)} />
            <Route path='/survey/:id' component={showSurvey} />
            <Route component={NoSuchPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}