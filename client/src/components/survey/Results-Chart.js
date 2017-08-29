import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function ResultsChart(props) {
  const results = props.options;

  const results_options = results.map(result => result.option);
  const results_votes = results.map(result => result.count);

  const data = {
	labels: results_options,
	datasets: [{
		data: results_votes,
		backgroundColor: [
		'rgba(136, 71, 255, .9)',
		'rgba(65, 232, 226, .9)',
    'rgba(192, 255, 84, .9)',
    'rgba(232, 162, 65, .9)',
    'rgba(255, 0, 158, .9)',
    'rgba(255, 33, 0, .9)',
    'rgba(232, 168, 0, .9)',
    'rgba(94, 255, 0, .9)',
    'rgba(0, 232, 228, .9)',
    'rgba(46, 0, 255, .9)'
		],
		hoverBackgroundColor: [
		'rgba(136, 71, 255, 1)',
		'rgba(65, 232, 226, 1)',
    'rgba(192, 255, 84, 1)',
    'rgba(232, 162, 65, 1)',
    'rgba(255, 0, 158, 1)',
    'rgba(255, 33, 0, 1)',
    'rgba(232, 168, 0, 1)',
    'rgba(94, 255, 0, 1)',
    'rgba(0, 232, 228, 1)',
    'rgba(46, 0, 255, 1)'
		]
	}]
};

  return (
    <Doughnut 
      data={data}
      width={props.width || 720}
	    height={props.height || 360}
	    options={{
		    maintainAspectRatio: false
	    }}
    />
  )
}

export default ResultsChart;