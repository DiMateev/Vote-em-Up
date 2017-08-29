import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth-reducer';
import surveyReducer from './survey-reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  survey: surveyReducer
});

export default rootReducer;