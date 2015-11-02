/* @flow */
"use strict";

var React = require("react");
var {ListGroup, ListGroupItem} = require("react-bootstrap");

var People = React.createClass({
  render () {
      var pT = this.props.people.map(p => <ListGroupItem key={p}>{p}</ListGroupItem>);
      if (!this.props.people.length) {
        pT = <ListGroupItem key="None">No one has voted :(</ListGroupItem>;
      }
      return (
          <ListGroup className="list-inline">{pT}</ListGroup>
      );
    }
});

module.exports = People;
