import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';

const Form = styled.form`
  border-radius: 5px;
  border: 1px solid rgb(220,220,220);
  padding: 1em;

  >h2 { font-family: 'Baloo Bhaijaan', cursive; }
`

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

  handleNewOption = (e) => {
    e.preventDefault();
    const surveyId = this.props.survey._id;
    const optionIndex = this.props.survey.options.length;
    let option = window.prompt('Option you want to vote for:').toString();
    if (!option) { return false; }
    option = option.trim();
    if (option.length > 0) {
      if (option.length > 35) { return alert('Option must be equal or less than 35 characters!'); }
      this.props.addNewOption({ option, optionIndex, surveyId });
    } else {
      return alert('Option must not be empty!');
    }
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
      <Form onSubmit={handleSubmit(this.handleSubmitForm.bind(this))}>
        <h2>I vote for:</h2>
          {this.renderOptions(this.props.survey.options)}
        <button className='btn btn-primary'>Vote</button>
        {
          (localStorage.getItem('x-auth'))
          ? <button 
              onClick={this.handleNewOption} 
              className='btn btn-secondary'>
              Add different option
            </button>
          : ''
        }
      </Form>
    )
  }
}

const voteForm = reduxForm({
  form: 'votingForm'
})(VoteForm);

export default connect(null, actions)(voteForm);