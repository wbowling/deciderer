"use strict";

var React = require("react");
var PollActions = require('../../actions/PollActions');
var LoginStore = require('../../stores/LoginStore');

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
      var enabled = !LoginStore.isLoggedIn();
      var button = <Button disabled={enabled} onClick={this.handleSubmit}>Add place</Button>;
      var input = <Input disabled={enabled} type='text' buttonAfter={button} onChange={ this.onChange } value={ this.state.text } />;
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
