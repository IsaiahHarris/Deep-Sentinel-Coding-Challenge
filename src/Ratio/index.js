import React, { Component } from 'react';
import './Ratio.scss';
import Papa from 'papaparse';
import c3 from 'c3';

class Ratio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      month: '01',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    };
    this.createGraph = this.createGraph.bind(this);
    this.parseData = this.parseData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  parseData(createGraph) {
    Papa.parse(require('../data/ratio.csv'), {
      download: true,
      complete: function(results) {
        createGraph(results.data);
      }
    });
  }

  createGraph(data) {
    let renderData = ['Ratio'];
    for (let i = 0; i < data.length; i++) {
      let month = data[i][5] + data[i][6];
      if (month === this.state.month) {
        renderData.push(data[i][2]);
        this.setState({
          data: renderData
        });
      }
    }

    let histogram = c3.generate({
      bindto: '#histogram',
      data: {
        columns: [this.state.data],
        type: 'bar'
      },
      bar: {
        width: 1
      }
    });

    let line = c3.generate({
      bindto: '#line',
      data: {
        columns: [this.state.data]
      }
    });

    let pie = c3.generate({
      bindto: '#pie',
      data: {
        columns: [
          ['Ratio 1', ...this.state.data],
          ['Ratio 2', ...this.state.data],
          ['Ratio 3', ...this.state.data],
          ['Ratio 4', ...this.state.data]
        ],
        type: 'pie'
      }
    });
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount() {
    this.parseData(this.createGraph);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.month !== this.state.month) {
      this.parseData(this.createGraph);
    }
  }

  render() {
    return (
      <div className="ratio-container">
        <div className="ratio-header">
          <div className="select-container">
            <select
              name="month"
              id="month"
              value={this.state.categoryInput}
              onChange={this.handleInputChange('month')}
            >
              {this.state.months.map((month, key) => {
                return (
                  <option key={key} value={'0' + (key + 1)}>
                    {month}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div id="histogram" />
        <div id="line" />
        <div id="pie" />
      </div>
    );
  }
}

export default Ratio;
