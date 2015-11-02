"use strict";

var React = require("react");

var SecondsToGo = React.createClass({
    propTypes: {
        end: React.PropTypes.number.isRequired
    },

    getInitialState() {
      return this.getNewState(this.props.end);
    },

    componentDidMount: function() {
      this.interval = setInterval(this.tick, 1000);
    },

    componentWillUnmount: function() {
      clearInterval(this.interval);
    },

    componentWillReceiveProps(newProps) {
      clearInterval(this.interval);
      this.setState(this.getNewState(newProps.end));
      this.interval = setInterval(this.tick, 1000);
    },

    tick() {
      this.setState(this.getNewState(this.props.end));
    },

    getNewState(end) {
      return {seconds: Math.round((end - new Date().getTime()) / 1000) };
    },

    render () {
      var inner;
      if (this.state.seconds > 0) {
        inner = (<span>only {this.state.seconds} seconds to go!</span>);
      } else {
        inner = (<span>It was {this.state.seconds * -1} seconds ago, you missed it!</span>);
      }
      return inner;
    }
});

module.exports = SecondsToGo;
