import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const People = React.createClass({
  render() {
    let pT = this.props.people.map(p => <ListGroupItem key={p}>{p}</ListGroupItem>)
    if (!this.props.people.length) {
      pT = <ListGroupItem key="None">No one has voted :(</ListGroupItem>
    }
    return (
        <ListGroup className="list-inline">{pT}</ListGroup>
    )
  }
})

export default People
