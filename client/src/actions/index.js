import axios from 'axios';
import _ from 'lodash';

import { 
  AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR,
  CLEAR_ERROR,
  UPDATE_USER,
  FETCH_SURVEYS,
  FETCH_OWN_SURVEYS,
  FETCH_SURVEY,
  UPDATE_SURVEY,
  DESELECT_SURVEY,
  DELETE_SURVEY
} from './types';

const API_URL = '';

function handleGoodRequest(response ,dispatch) {
  // - Update state to indicate user is authenticated
  dispatch({ type: AUTH_USER });
  // - Save the JWT token
  localStorage.setItem('x-auth', response.data.token);
}

export function fetchUserSurveys(token, dispatch) {
  axios.get(`${API_URL}/api/user`, {
    headers: {
      "x-auth": token
    }
  })
    .then((res) => {
      const { surveyList } = res.data;
      dispatch({
        type: UPDATE_USER,
        payload: surveyList
      });
    })
    .catch();
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    return axios.post(`${API_URL}/api/user/signin`, { email, password })
      .then(res => {
        handleGoodRequest(res, dispatch);
        fetchUserSurveys(res.data.token, dispatch);
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to user
        dispatch(authError('Bad Login Details'));
      });
  }
}

export function socialAuthenticate(network, socialToken) {
  return function(dispatch) {
    return axios.post(`${API_URL}/api/oauth`, { network, socialToken })
      .then(res => {
        handleGoodRequest(res, dispatch);
        fetchUserSurveys(res.data.token, dispatch);
      })
      .catch(err => {
        dispatch(authError(err))
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    return axios.post(`${API_URL}/api/user/signup`, { email, password })
      .then(response => handleGoodRequest(response, dispatch))
      .catch(({ response }) => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  }
}

export function signoutUser() {
  localStorage.removeItem('x-auth');

  return { type: UNAUTH_USER };
}

export function fetchAllSurveys() {
  return function(dispatch) {
    axios.get(`${API_URL}/api/survey`)
      .then(response => dispatch({
        type: FETCH_SURVEYS,
        payload: response.data
      }))
      .catch();
  }
}

export function fetchSurvey(id) {
  return function(dispatch) {
    axios.get(`${API_URL}/api/survey/${id}`)
      .then(response => {
        dispatch({
          type: FETCH_SURVEY,
          payload: response.data
        })
      })
      .catch((e) => {
        dispatch({
          type: FETCH_SURVEY
        })
      });
  }
}

export function deselectSurvey() {
  return {
    type: DESELECT_SURVEY
  }
}

export function createSurvey({question, values}) {
  const options = _.values(values);
  
  return function(dispatch) {
    return axios.post(`${API_URL}/api/survey/new`, {
      question, 
      options
    }, {
      headers: {
        'x-auth': localStorage.getItem('x-auth')
      }
    })
      .then(fetchUserSurveys(localStorage.getItem('x-auth'), dispatch))
      .catch();
  }
}

export function handleVote({ optionIndex, surveyId }) {
  return function(dispatch) {
    axios.patch(`${API_URL}/api/survey/vote/${surveyId}`, {
      optionIndex
    })
      .then(response => {
        dispatch({
          type: UPDATE_SURVEY,
          payload: response.data
        });
      })
      .catch();
  }
}

export function addNewOption({ option, optionIndex, surveyId }) {
  return function(dispatch) {
    axios.patch(`${API_URL}/api/survey/newVote/${surveyId}`, {
      newOption: option,
      optionIndex
    })
      .then(response => {
        dispatch({
          type: UPDATE_SURVEY,
          payload: response.data
        });
      })
      .catch();
  }
}

export function fetchMySurveys() {
  return function(dispatch) {
    axios.get(`${API_URL}/api/survey/user`, {
      headers: {
        'x-auth': localStorage.getItem('x-auth')
      }
    })
      .then(response => {
        dispatch({
          type: FETCH_OWN_SURVEYS,
          payload: response.data
        })
      })
      .catch();
  }
}

export function deleteSurvey(id) {
  return function(dispatch) {
    axios.delete(`${API_URL}/api/survey/${id}`, {
      headers: {
        'x-auth': localStorage.getItem('x-auth')
      }
    })
      .then(response => {
        dispatch({
          type: DELETE_SURVEY,
          payload: response.data.survey._id
        })
      })
      .catch();
  }
}