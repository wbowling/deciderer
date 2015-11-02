/* @flow weak */
"use strict";

var React = require("react");
// var {vote} = require("../constants/appConstants");
var firebaseUtils = require('../../constants/firebaseUtils');
var { Row} = require("react-bootstrap");
var ReactFireMixin = require("reactfire");
var VoteButton = require("./VoteButton");
var PollActions = require('../../actions/PollActions');

var Place = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.bool.isRequired
    },
    render () {
      return (
        <Row>
          <h4>{this.props.name} { } : { }
            <VoteButton active={this.props.value} onClick={this.handleSubmit} />
          </h4>
        </Row>
      );
    },
    handleSubmit(val) {
        PollActions.vote({name: this.props.name, value: val})
    },
});

module.exports = Place;
