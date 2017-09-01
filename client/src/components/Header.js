import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const NavMenu = styled.ul`
  display: block;
`

const HeaderBrand = styled.div`
  text-align: center;
  background-color: rgb(120, 207, 255);
  padding: 15px 0;
  color: white;

  > h1 {
    font-family: 'Baloo Bhaijaan', cursive;
    margin: 0;
  }
`
const HeaderLink = styled.li`
  display: inline-block;

  > a {
    color: grey;

    :hover {
      color: black;
    }
  }

  ${props => props.right && 'float: right'}
`

class Header extends React.Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <HeaderLink className='nav-item' key={2} right>
          <Link to='/signout' className='nav-link'>Sign Out</Link>
        </HeaderLink>
      );
    } else {
      return [
        <HeaderLink className='nav-item' key={2} right>
          <Link to='/signin' className='nav-link'>Sign In</Link>
        </HeaderLink>,
        <HeaderLink className='nav-item' key={3} right>
          <Link to='/signup' className='nav-link'>Sign Up</Link>
        </HeaderLink>   
      ];
    }
  }

  render() {
    return (
      <nav>
        <NavMenu className='nav'>
          <HeaderLink className='nav-item' key={1}>
            <Link to='/' className='nav-link'>Home</Link>
          </HeaderLink>
          {this.renderLinks()}
        </NavMenu>
        <HeaderBrand>
          <h1>Vote'em Up</h1>
        </HeaderBrand>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);