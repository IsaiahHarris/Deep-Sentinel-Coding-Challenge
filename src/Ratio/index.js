import React, { Component } from 'react';
import './Ratio.scss';
import Papa from 'papaparse';
import c3 from 'c3';

console.log('ratio');
function parseData(createGraph) {
  Papa.parse(require('../data/ratio.csv'), {
    download: true,
    complete: function(results) {
      createGraph(results.data);
    }
  });
}

function createGraph(data) {
  var years = [];
  var silverMinted = ['Silver Minted'];
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) {
      years.push(data[i][0]);
    } else {
      years.push(0);
    }
    if (data[i][2]) {
      silverMinted.push(data[i][2]);
    } else {
      silverMinted.push(0);
    }
  }

  let chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [silverMinted],
      type: 'bar'
    },
    bar: {
      width: 1
      // or
      //width: 100 // this makes bar width 100px
    }
  });
}
class Ratio extends Component {
  componentDidMount() {
    parseData(createGraph);
  }
  render() {
    return (
      <div className="ratio-container">
        <div className="ratio-header">Ratio</div>
        <div id="chart" />
      </div>
    );
  }
}

export default Ratio;
