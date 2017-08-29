import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux';

import LoaderHOC from '../hoc/Loader';
import * as actions from '../../actions';
import './Show-All-Surveys.css';

class ShowAllSurveys extends React.Component {

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteSurvey(e.target.getAttribute('data-id'));
  }

  renderSurveys() {
    return this.props.survey.surveysList.map((survey) => {
      return (
        <Link to={`/survey/${survey._id}`} className='list-group-item list-group-itme-action' key={survey._id}>
          {survey.question}
          { 
            $('#menu_my').hasClass('active')
            ? <button className='btn btn-danger delete' data-id={survey._id} onClick={this.handleDelete}>Delete</button>
            : '' 
          }
        </Link>
      );
    });
  }
  
  render() {
    return <div>{this.renderSurveys()}</div>;
  }

}
 
const ShowAllSurveysWithLoader = LoaderHOC('survey')(ShowAllSurveys);
export default connect(null, actions)(ShowAllSurveysWithLoader);