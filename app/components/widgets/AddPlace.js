"use strict";

var React = require("react");
var PollActions = require('../../actions/PollActions');
var LoginStore = require('../../stores/LoginStore');
var PollStore = require('../../stores/PollStore');

var {Input, Button, Row, Col} = require("react-bootstrap");

var AddPlace = React.createClass({
    getInitialState() {
      return {
        text: ""
      };
    },

    onChange(e) {
        this.setState({text: e.target.value});
    },


    handleSubmit(e) {
      e.preventDefault();
      if (this.state.text && this.state.text.trim().length !== 0) {
        PollActions.addPlace(this.state.text);
        this.setState({text: ""});
      }
    },

    render () {
      var disabled = !PollStore.canVote();
      var button = <Button disabled={disabled} onClick={this.handleSubmit}>Add place</Button>;
      var input = <Input disabled={disabled} type='text' buttonAfter={button} onChange={ this.onChange } value={ this.state.text } />;
      return (
        <Row>
          <Col mdOffset={3} md={6}>
            <form onSubmit={this.handleSubmit}>
              {input}
            </form>
          </Col>
        </Row>
      );
    }
});

module.exports = AddPlace;
