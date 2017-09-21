import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 60vh;

  > h2 {
    margin: auto;
  }
`

export default () => (
  <Container>
    <h2>Page you are trying to access does not exist!</h2>
  </Container>
);