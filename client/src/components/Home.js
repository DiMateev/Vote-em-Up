import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';

import * as actions from '../actions';
import ShowAllSurveys from './survey/Show-All-Surveys';
import './Home.css';

const Container = styled.div`
  > h2 {
    text-align: center;
    font-size: 1.6em;
    font-variant: small-caps;
    margin-top: 15px;
  }
`

const Header = styled.div`
  text-align: center;
  background-color: rgb(120, 207, 255);
  color: white;
  padding: 20px;

  > a {
    font-size: 1.1em;
  }

  > h3 {
    font-size: 1em;
    margin-top: 10px;
    line-height: 1.5em;
  }
`

const Body = styled.div`
  position: relative;
  max-height: 491px;
  width: 90vw;
  overflow: auto;
  margin: 15px auto;
`

class Home extends React.Component {
  componentWillMount() {
    if (this.props.survey.filter) {
      this.props.fetchMySurveys();
    } else {
      this.props.fetchAllSurveys();
    }
  }

  handleMenuClicks = (e) => {
    if (e.target.id === 'menu_all') {
      $('#menu_all').addClass('active');
      $('#menu_my').removeClass('active');
      this.props.fetchAllSurveys();
    } else if (e.target.id === 'menu_my') {
      $('#menu_my').addClass('active');
      $('#menu_all').removeClass('active');
      this.props.fetchMySurveys();
    }
  }

  renderSurveysMenu = () => {
    return (
      <h2>
        <a 
          id='menu_all' 
          className={this.props.survey.filter ? 'nav_menu' : 'nav_menu active'}
          onClick={this.handleMenuClicks}>all surveys</a>
        &nbsp;|&nbsp;
        <a 
          id='menu_my' 
          className={this.props.survey.filter ? 'nav_menu active' : 'nav_menu'} 
          onClick={this.handleMenuClicks}>my surveys</a>
      </h2>
    )
  }

  render() {
    return (
      <Container>
        <Header>
          <Link to='/create-survey' className='btn btn-primary'>Create a new Survey</Link>
          <h3>or<br />participate in one</h3>
        </Header>
        {this.props.auth.authenticated
          ? this.renderSurveysMenu()
          : <h2>open surveys</h2>}
        <Body>
          <ShowAllSurveys { ...this.props } />
        </Body>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return { 
    survey: state.survey,
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(Home);