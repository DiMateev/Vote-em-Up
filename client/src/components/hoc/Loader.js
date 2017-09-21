import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
  width: 120px;
  height: 120px;
  margin: 30px auto;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const LoaderHOC = (propNames) => (WrappedComponent) => {
  return class LoaderHOC extends React.Component {
    isEmpty = (prop) => prop === undefined;

    areEmpty(props) {
      const ready = propNames.map(prop => !this.isEmpty(props[prop]));
      return ready.every(item => item);
    }

    render() {
      return (
        this.areEmpty(this.props)
          ? <WrappedComponent { ...this.props } />
          : <Loader></Loader>
      );
    }
  }
}

export default LoaderHOC;