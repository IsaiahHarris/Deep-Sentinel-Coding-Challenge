import React, { Component } from 'react';
import Papa from 'papaparse';
import c3 from 'c3';

function parseDataValid(createGraphVaild) {
  Papa.parse(require('../data/valid-invalid.csv'), {
    download: true,
    complete: function(results) {
      createGraphValid(results.data);
    }
  });
}

function createGraphValid(data) {
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

  let chartValid = c3.generate({
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

class ValidInvalid extends Component {
  componentDidMount() {
    parseDataValid(createGraphValid);
  }
  render() {
    return (
      <div className="valid-invalid-container">
        <div className="header">header</div>
        <div id="chart" />
      </div>
    );
  }
}

export default ValidInvalid;
