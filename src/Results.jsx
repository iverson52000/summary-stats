import React from 'react';

const Results = (props) => {
  const { mean, median, mode, std } = props.values;
  return (
    <div className = 'results'>
      <li>Average/Mean: { mean.toFixed(1) }</li>
      <li>Median: { median }</li>
      <li>Mode: { mode.toString() }</li>
      <li>Standard Deviation: { std }</li>
    </div>
  );
};

export default Results;
