import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';

const Fieldset = styled.fieldset`
  border: 1px solid rgb(230,230,230);
  padding: 10px;
  margin-top: -1px;

  > input { margin-right: 10px; }
  > label { margin: 0; }
`

const renderField = ({ input, label, type }) => {
  return (
    <Fieldset>
      <input {...input} type={type} />
      <label>{label}</label>
    </Fieldset>
  )
};

class VoteForm extends React.Component {

  handleSubmitForm({ option }) {
    const surveyId = this.props.survey._id;
    const options = this.props.survey.options.map(option => option.option);
    const optionIndex = options.indexOf(option);
    
    this.props.handleVote({ optionIndex, surveyId });
  }

  renderOptions(options) {
    return options.map(option => {
      return (
        <Field 
          type='radio'
          name='option'
          key={options.indexOf(option)}
          value={option.option}
          label={option.option}
          component={renderField}
        />
      )}
    )
  }

  render() {
    const { handleSubmit } = this.props;
    
    return (
      <form className='form-group' onSubmit={handleSubmit(this.handleSubmitForm.bind(this))}>
        <h2>Choose your answer:</h2>
        {this.renderOptions(this.props.survey.options)}
        <button className='btn btn-primary'>Vote</button>
      </form>
    )
  }
}

const voteForm = reduxForm({
  form: 'votingForm'
})(VoteForm);

export default connect(null, actions)(voteForm);