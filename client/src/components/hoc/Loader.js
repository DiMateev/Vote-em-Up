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

const LoaderHOC = (propName) => (WrappedComponent) => {
  return class LoaderHOC extends React.Component {
    isEmpty(prop) {
      return (
        prop === null ||
        prop === undefined ||
        (prop.hasOwnProperty('length') && prop.length === 0) ||
        (prop.constructor === Object && Object.keys(prop).length === 0)
      );
    }

    render() {
      return (
        this.isEmpty(this.props[propName]) ? <Loader></Loader> : <WrappedComponent { ...this.props } />
      );
    }
  }
}

export default LoaderHOC;