import React from 'react';
import styled from 'styled-components';

const AggregateList = styled.ol`
  list-style: none;
  padding: 1em;
  margin-bottom: 1em;
  border: 1px solid rgb(220,220,220);

  > h3 {
    font-variant: small-caps;
    text-align: center;
    color: rgb(150,150,150);
  }

  > li {
    display: inline-block;
    border-bottom: 1px solid rgb(210,210,210);
    border-left: 10px solid rgb(200,200,200);
    width: 31%;
    margin: 0 1% 5px 1%;

    @media(max-width: 920px) {
      width: 48%;
    }

    @media(max-width: 767px) {
      width: 100%;
      margin: 0 0 5px 0;
    }

    > span.option {
      display: inline-block;
      padding: 0 8px;
      width: 90%;
    }

    > span.count {
      width: 10%;
      display: inline-block;
      text-align: center;
      color: darkblue;
    }
  }
`

export default function ResultsAggregate(props) {

  let results = props.options.map(option => option);
  results.sort((a, b) => b.count - a.count);
  let count = 1;

  return (
    <AggregateList>
      <h3>survey results</h3>
      {results.map(option => {
        return (
          <li key={count++}>
            <span className='option'>{option.option}</span>
            <span className='count'>{option.count}</span>
          </li>
        )
      })}
    </AggregateList>
  )
}