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

const Vote = styled.div`
  border-radius: 5px;
  text-align: center;
  padding: 1em;

  > h2 { font-family: 'Baloo Bhaijaan', cursive; }
  > h4 { color: rgb(110,110,110); font-size: 1.5em; }
`

const VotedFor = (props) => {
  const { options, voters, index} = props;
  const optionIndex = voters[index].option;
  return (
    <Vote>
      <h2>You have voted for:</h2>
      <h4>{options[optionIndex].option}</h4>
    </Vote>
  )
}

const Survey = (props) => {
  const { question, options, voters } = props.survey;
  const voters_ip = voters.map(voter => voter.ip);
  const { userList, ip } = props;
  return (
    <SurveyContainer>
      <h1>{question}</h1>
      <SurveyBody>
        {
          (userList.indexOf(props.survey._id) > -1)
            ? <ResultsAggregate options={options} />
            : ''
        }
        {
          (voters_ip.indexOf(ip) > -1)
            ? <VotedFor 
                options={props.survey.options}
                voters={props.survey.voters}
                index={voters_ip.indexOf(ip)} />
            : <VoteForm survey={props.survey}/>
        }
        <div className='graph'>
          <ResultsChart options={options} />
        </div>
        <footer>Share this survey with your friends: <span>{window.location.href}</span></footer>
      </SurveyBody>
    </SurveyContainer>
  );
}


export default LoaderHOC(['userList', 'survey', 'ip'])(Survey);