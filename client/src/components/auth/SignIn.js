import React from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

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

const AlternativeSignIn = styled.div`
  margin: 10px auto 0;
  padding-top: 10px;
  border-top: 1px solid grey;
  text-align: center;

  > span {
    font-size: 20px;
    color: grey;

    @media (max-width: 319px) {
      display: none;
    }
  }

  > img {
    width: 30px;
    height: 30px;
    margin: 0 10px;
    margin-top: -5px;
    cursor: pointer;
  }
`

const SubmitSection = styled.div`
  position: relative;
  height: 58px;
  padding: 10px 0;

  @media (max-width: 767px) {
    height: auto;
  }

  > button {
    width: 30%;
    position: absolute;
    right: 0;

    @media (max-width: 767px) {
      width: 100%;
      position: static;
    }
  }

  > div {
    display: inline-block;
    width: 68%;
    height: 38px;
    padding: 6px 15px;
    margin: 0;

    @media (max-width: 767px) {
      width: 100%;
      margin-bottom: 10px;
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

class Signin extends React.Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
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
        <h1>Sign In</h1>
        <Field type='text' name='email' label='Email:' component={renderField} />
        <Field type='password' name='password' label='Password:' component={renderField} />
        <SubmitSection>
          {this.renderAlert()}
          <button action='submit' className='btn btn-primary'>Sign In</button>
        </SubmitSection>
        <AlternativeSignIn>
          <span>Sign In With:</span>
          <img src='/src/resourses/facebook.png' alt='facebook logo' title='Facebook' />
          <img src='/src/resourses/github.png' alt='github logo' title='GitHub' />
          <img src='/src/resourses/google+.png' alt='google+ logo' title='Google+' />
        </AlternativeSignIn>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
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
  }

  return errors;
}

const signinForm = reduxForm({
  form: 'signin',
  validate
})(Signin);

export default connect(mapStateToProps, actions)(signinForm);