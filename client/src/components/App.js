import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import Signin from './auth/SignIn';
import Signout from './auth/SignOut';
import Signup from './auth/SignUp';
import createSurvey from './survey/Create-Survey';
import showSurvey from './survey/Show-Survey';
import RequireAuth from './auth/require-auth';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={Signin} />
          <Route path='/signout' component={Signout} />
          <Route path='/signup' component={Signup} />
          <Route path='/create-survey' component={RequireAuth(createSurvey)} />
          <Route path='/survey/:id' component={showSurvey} />
        </div>
      </Router>
    );
  }
}