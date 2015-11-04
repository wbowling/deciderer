import React from 'react'
import { Label } from 'react-bootstrap'

const People = React.createClass({
  render() {
    const votedPeople = this.props.people.map(p => <Label key={p}>{p}</Label>)
    return (
        <div style={{ lineHeight: '42px' }}>
          {votedPeople}&nbsp;
          <Label bsStyle="success">Total people voted: {this.props.people.length}</Label>
        </div>
    )
  }
})

export default People
