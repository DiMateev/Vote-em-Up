import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './components/App';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { fetchUserSurveys } from './actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('x-auth');

// If we have a token, consider user authenticated
if (token) {
  // Update application state
  store.dispatch({ type: AUTH_USER });
  fetchUserSurveys(token, store.dispatch);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));