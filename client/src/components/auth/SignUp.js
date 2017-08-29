import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';

const Form = styled.form`
  width: 60vw;
  padding: 25px 20px;
  margin: 20px auto;
  background-color: rgb(230, 230, 230);
  box-shadow: 1px 2px 4px grey;

  @media (max-width: 767px) {
		width: 95vw;
	}

  > h1 { 
    font-size: 1.8em;
    text-align: center;
    margin-bottom: 30px;
  }

  > button {
    width: 30%;
    margin: 10px 0 10px 70%;

    @media (max-width: 767px) {
      width: 100%;
      margin: 10px 0;
    }
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <Fieldset>
    <label>{label}</label>
    <div>
      <input {...input} type={type} className='form-control' />
      {touched && error && <span className='text-danger'>{error}</span>}
    </div>
  </Fieldset>
);

class Signup extends React.Component {

  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <h1>Sign Up</h1>
        <Field type='text' name='email' component={renderField} label='Email:' />
        <Field type='password' name='password' component={renderField} label='Password:' />
        <Field type='password' name='password_confirm' component={renderField} label='Confirm Password:' />
        {this.renderAlert()}
        <button type='submit' className='btn btn-primary'>Sign Up</button>
      </Form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Field is required!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!';
  }
  
  if (!values.password) {
    errors.password = 'Field is required!';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 symbols long!';
  } else if (values.password !== values.password_confirm) {
    errors.password_confirm = 'Passwords doesn\'t match!';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  validate
})(Signup));