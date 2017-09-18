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
		backgroundColor: ['rgba(136, 71, 255, .9)', 'rgba(65, 232, 226, .9)', 'rgba(192, 255, 84, .9)', 'rgba(232, 162, 65, .9)', 'rgba(255, 0, 158, .9)', 'rgba(255, 33, 0, .9)', 'rgba(232, 168, 0, .9)', 'rgba(94, 255, 0, .9)', 'rgba(0, 232, 228, .9)', 'rgba(46, 0, 255, .9)', 'rgba(255, 244, 40, .9)', 'rgba(255, 146, 26, .9)', 'rgba(255, 166, 130, .9)', 'rgba(233, 160, 255, .9)', 'rgba(87, 227, 255, .9)', 'rgba(87, 233, 137, .9)', 'rgba(232, 162, 25, .9)', 'rgba(255, 244, 40, .9)', 'rgba(112, 232, 87, .9)', 'rgba(87, 255, 199, .9)', 'rgba(236, 247, 255, .9)', 'rgba(117, 95, 232, .9)', 'rgba(255, 176, 249, .9)', 'rgba(255, 230, 57, .9)', 'rgba(104, 214, 255, .9)', 'rgba(255, 235, 131, .9)', 'rgba(224, 169, 255, .9)', 'rgba(25, 255, 196, .9)', 'rgba(139, 232, 95, .9)', 'rgba(145, 172, 232, .9)'],
		hoverBackgroundColor: ['rgba(136, 71, 255, 1)', 'rgba(65, 232, 226, 1)', 'rgba(192, 255, 84, 1)', 'rgba(232, 162, 65, 1)', 'rgba(255, 0, 158, 1)', 'rgba(255, 33, 0, 1)', 'rgba(232, 168, 0, 1)', 'rgba(94, 255, 0, 1)', 'rgba(0, 232, 228, 1)', 'rgba(46, 0, 255, 1)', 'rgba(255, 244, 40, 1)', 'rgba(255, 146, 26, 1)', 'rgba(255, 166, 130, 1)', 'rgba(233, 160, 255, 1)', 'rgba(87, 227, 255, 1)', 'rgba(87, 233, 137, 1)', 'rgba(232, 162, 25, 1)', 'rgba(255, 244, 40, 1)', 'rgba(112, 232, 87, 1)', 'rgba(87, 255, 199, 1)', 'rgba(236, 247, 255, 1)', 'rgba(117, 95, 232, 1)', 'rgba(255, 176, 249, 1)', 'rgba(255, 230, 57, 1)', 'rgba(104, 214, 255, 1)', 'rgba(255, 235, 131, 1)', 'rgba(224, 169, 255, 1)', 'rgba(25, 255, 196, 1)', 'rgba(139, 232, 95, 1)', 'rgba(145, 172, 232, 1)']
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