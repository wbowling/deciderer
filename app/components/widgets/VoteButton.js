"use strict";

var React = require("react");
var ReactDOM = require('react-dom');
var {Button, ButtonGroup} = require("react-bootstrap");
var LoginStore = require('../../stores/LoginStore');
var PollStore = require('../../stores/PollStore');

function getStyle(active) {
  return {
      color: active ? "white" : "black",
      fontWeight: active ? "bold" : "normal"
    };
}

var VoteButton = React.createClass({
    propTypes: {
        active: React.PropTypes.bool.isRequired,
        onClick: React.PropTypes.func.isRequired
    },
    toggle () {
        if (LoginStore.isLoggedIn() && PollStore.canVote()) {
          ReactDOM.findDOMNode(this.refs.yes).blur();
          ReactDOM.findDOMNode(this.refs.no).blur();
          this.props.onClick(this.props.active ? 0 : 1);
        }
    },
    render () {
      var disabled = !(LoginStore.isLoggedIn() && PollStore.canVote());
      var active = this.props.active;
      var style1 = getStyle(active);
      var style2 = getStyle(!active);
      var bsStyle1 = active ? "primary" : "default";
      var bsStyle2 = active ? "default" : "danger";

      return (
          <ButtonGroup onClick={this.toggle}>
            <Button disabled={disabled} bsSize="small" ref="yes" style={style1} bsStyle={bsStyle1} active={active ? true : false}>Yes</Button>
            <Button disabled={disabled} bsSize="small" ref="no" style={style2} bsStyle={bsStyle2} active={active ? false : true}>No</Button>
          </ButtonGroup>
      );
    }
});

module.exports = VoteButton;
