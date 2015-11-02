"use strict";

var React = require("react");
var PieChart = require('react-chartjs').Pie;
var randomcolor = require("randomcolor");


function createColour(num) {
  return randomcolor({count: num});
}


function genData(data) {
  var cols = createColour(data.length);
  return data.map((val, i) => {return {value: val.value, label: val.label, color: cols[i]}; });
}

var Chart = React.createClass({

    render () {
      var chart;
      if (this.props.data && this.props.data.length > 0) {
        var chartData = genData(this.props.data);
        chart = <PieChart data={chartData} redraw />;
      } else {
        chart = <div />;
      }
      return (
        <div>
          {chart}
        </div>
      );
    }
});

module.exports = Chart;
