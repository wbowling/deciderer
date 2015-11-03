import React from 'react'

import { Row } from 'react-bootstrap'
import VoteButton from './VoteButton'
import PollActions from '../../actions/PollActions'

const Place = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.bool.isRequired
  },
  render() {
    return (
      <Row>
        <h4>{this.props.name} { } : { }
          <VoteButton active={this.props.value} onClick={this.handleSubmit} />
        </h4>
      </Row>
    )
  },
  handleSubmit(val) {
    PollActions.vote({ name: this.props.name, value: val })
  }
})

export default Place
