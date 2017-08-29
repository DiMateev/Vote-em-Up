import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';

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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <Fieldset>
    <label>{label}</label>
    <div>
      <input {...input} type={type} className='form-control' />
      {touched && error && <span className='text-danger'>{error}</span>}
    </div>
  </Fieldset>
);

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
    this.props.createSurvey({question, values});
  }

  render() {
    const { handleSubmit } = this.props;
    
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field type='text' name='question' label='Your question: ' component={renderField} />
          {this.state.options.map(option => 
            <Field type='text' key={option} name={`option${option}`} label={`Option ${option}: `} component={renderField} />
          )}
          <button className='btn btn-secondary' onClick={this.addOption}>Add option</button>
          <button className='btn btn-primary' type='submit'>Post Survey</button>
        </form>
      </div>
    )
  }
}

const createSurveyForm = reduxForm({
  form: 'create-survey'
})(createSurvey);

export default connect(null, actions)(createSurveyForm);