import React from 'react';
import styled from 'styled-components';

import VoteForm from './Vote-Form';
import ResultsChart from './Results-Chart';
import ResultsAggregate from './Results-Aggregate';
import LoaderHOC from '../hoc/Loader';

const SurveyContainer = styled.div`
  > h1 {
    text-align: center;
    padding: 10px;
    margin: 0;
  }
`

const SurveyBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 96vw;
  margin: 0 2vw 10px;
  padding: 1em;
  justify-content: space-between;
  background-color: rgb(240,240,240);
  box-shadow: 0px 0px 2px grey;

  > ol {
    width: 100%;
  }

  > form {
    display: inline-block;
    vertical-align: top;
    min-width: 30%;

    > h2 {
      font-size: 1.5em;
    }

    > button { 
      margin-top: 10px;
      margin-right: 10px;
    }
  }

  > div.graph {
    width: 68.5%;
    padding: 1em;
    border: 1px solid rgb(220,220,220);
  }

  > footer {
    width: 100%;
    padding-top: 15px;
    text-align: center;
    word-wrap: break-word;

    > span { color: blue; }
  }

  @media (max-width: 920px) {
    display: block;

    > form {
      display: block;
      width: 100%;
      margin: 0 auto;

      > h2 { text-align: center; }
    }

    > div.graph {
      width: 100%;
      margin: 1em auto;
    }
  }

`

const Survey = (props) => {
  const { question, options } = props.survey;
  return (
    <SurveyContainer>
      <h1>{question}</h1>
      <SurveyBody>
        <ResultsAggregate options={options} />
        <VoteForm survey={props.survey}/>
        <div className='graph'>
          <ResultsChart options={options} />
        </div>
        <footer>Share this survey with your friends: <span>{window.location.href}</span></footer>
      </SurveyBody>
    </SurveyContainer>
  );
}


export default LoaderHOC('survey')(Survey);