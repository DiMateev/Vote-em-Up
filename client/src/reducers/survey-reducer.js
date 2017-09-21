import { 
  FETCH_SURVEYS,
  FETCH_OWN_SURVEYS,
  FETCH_SURVEY,
  UPDATE_SURVEY,
  DESELECT_SURVEY,
  DELETE_SURVEY
} from '../actions/types';

const initialState = {
  surveysList: [],
  selectedSurvey: undefined,
  request_ip: undefined,
  filter: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_SURVEYS:
      return {
        ...state,
        surveysList: [ ...action.payload.data ],
        filter: false
       };
    case FETCH_OWN_SURVEYS:
      return {
        ...state,
        surveysList: [ ...action.payload.data ],
        filter: true
      };
    case FETCH_SURVEY:
    case UPDATE_SURVEY:
      console.log(action.payload);
      return {
        ...state,
        selectedSurvey: action.payload.survey,
        request_ip: action.payload.ip
      };
    case DESELECT_SURVEY:
      return {
        ...state,
        selectedSurvey: null
      }
    case DELETE_SURVEY:
      const filteredList = state.surveysList
        .filter(survey => survey._id !== action.payload ? true : false);

      return {
        ...state,
        surveysList: filteredList
      }
    default:
  }
  return state;
}