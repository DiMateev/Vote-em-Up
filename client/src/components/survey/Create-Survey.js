import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';

const FormContainer = styled.div`
  width: 90vw;
  margin: 30px auto;

  > h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  > form {
    > button {
      margin: 30px 20px 30px 0;
    }
  }

  @media (max-width: 767px) {
    width: 96vw;
  }
`

const Fieldset = styled.fieldset`
  > label { 
    display: inline-block; 
    width: 20%; 
  }

  > div { 
    display: inline-block; 
    position: relative;
    width: 80%; 
    margin-bottom: 10px;

    > span {
      position: absolute;
      top: 0;
      right: 5px;
      font-size: 0.8em;
    }

    @media (max-width: 767px) {
      width: 100%;
    }
  }
`

const renderField = ({ input, label, type, maxLength, meta: { touched, error } }) => {
  return (
  <Fieldset>
    <label>{label}</label>
    <div>
      <input {...input} type={type} maxLength={maxLength} className='form-control' />
      {touched && error && <span className='text-danger'>{error}</span>}
    </div>
  </Fieldset>
  );
};

class createSurvey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [1, 2]
    }

    this.addOption = this.addOption.bind(this);
  }

  addOption(e) {
    e.preventDefault();
    this.setState({
      options: [ ...this.state.options, this.state.options.length + 1 ]
    });
  }

  handleFormSubmit({question, ...values}) {

    const indexes = Object.keys(values);
    console.log(values);
    indexes.map((i) => {
      values[i] = values[i].trim();
      if (values[i].length < 1) { delete values[i] };
      return values[i];
    });
    console.log(values);
    
    this.props.createSurvey({question, values})
      .then((response) => this.props.history.push(`/survey/${response.data}`))
      .catch();
  }

  render() {
    const { handleSubmit } = this.props;
    
    return (
      <FormContainer>
        <h1>Make a Survey</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field 
            type='text' 
            name='question'
            maxLength='200'
            label='Your question: ' 
            component={renderField} />
          {this.state.options.map(option => 
            <Field 
              type='text'
              maxLength='35' 
              key={option} 
              name={`option${option}`} 
              label={`Option ${option}: `} 
              component={renderField} />
          )}
          <button className='btn btn-secondary' onClick={this.addOption}>Add an option</button>
          <button className='btn btn-primary' type='submit'>Post Survey</button>
        </form>
      </FormContainer>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.question) {
    errors.question = 'Field is required!';
  } else if (values.question.length < 7) {
    errors.question = 'Really you can ask question in less then 7 symbols?!? "X or Y?"';
  }
  
  if (!values.option1 || values.option1.trim().length < 1) {
    errors.option1 = 'Field is required!';
  }

  if (!values.option2 || values.option2.trim().length < 1) {
    errors.option2 = 'Field is required!';
  }

  return errors;
}

const createSurveyForm = reduxForm({
  form: 'create-survey',
  validate
})(createSurvey);

export default connect(null, actions)(createSurveyForm);