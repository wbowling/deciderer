import React from 'react'

import { Row, Button, Glyphicon } from 'react-bootstrap'
import VoteButton from './VoteButton'
import PollActions from '../../actions/PollActions'
import PollStore from '../../stores/PollStore'

const Place = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.bool.isRequired
  },
  render() {
    let inner
    if (PollStore.canDeletePlace(this.props.name)) {
      inner = (<small onClick={this.deletePlace} style={{ cursor: 'pointer' }}>
                <Glyphicon glyph="remove-circle" />
              </small>)
    } else {
      inner = ''
    }
    return (
      <Row>
        <h4>
          {inner} {this.props.name} { } : { }
            <VoteButton active={this.props.value} onClick={this.handleSubmit} />
        </h4>
      </Row>
    )
  },
  handleSubmit(val) {
    PollActions.vote({ name: this.props.name, value: val })
  },
  deletePlace() {
    PollActions.deletePlace(this.props.name)
  }
})

export default Place
