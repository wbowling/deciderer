"use strict";

var React = require("react");
var Chart = require("./Chart");
var _ = require("lodash");
var debug = require('../../constants/debug');

var Votes = React.createClass({
    render () {
      var data = this.props.placesVotes.map(p => { return {value: p.votes, label: p.place}; });

      var limited = _.take(_.filter(this.props.placesVotes, x => x.votes > 0), 3);

      var max = _.max(limited, "votes");
      var min = _.min(limited, "votes");

      var counts = limited.map((p, i) => {
        var key = p.place;
        var size = 22;
        if (p.votes === max.votes) {
          size = 28;
        } else if (p.votes === min.votes) {
          size = 14;
        }
        var inn = `${i + 1}. ${p.place}`;
        return <h4 style={{fontSize: size}} key={inn + key}>{inn}</h4>;
      });
      debug.log(data)
      var data = _.filter(data, x => x.value > 0)
      return (
          <div>
            {counts}
          <Chart data={data} />
        </div>
      );
    }
});

module.exports = Votes;
