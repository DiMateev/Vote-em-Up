import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';

const Container = styled.div`
  display: flex;
  height: 60vh;

  > div {
    margin: auto;
  }
`

class Signout extends React.Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <Container>
        <div>
          <h2>Sorry to see you go...</h2>
          <p>Come again when you need more answers ;)</p>
        </div>
      </Container>
    )
  }
}

export default connect(null, actions)(Signout);