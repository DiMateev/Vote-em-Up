import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Survey from './Survey';



class showSurvey extends React.Component {
  componentWillMount() {
    this.props.fetchSurvey(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.deselectSurvey();
  }

  render() {
    return (
      <Survey survey={this.props.survey.selectedSurvey} />
    )
  }
}

const mapStateToProps = (state) => {
  return { survey: state.survey };
}

export default connect(mapStateToProps, actions)(showSurvey);