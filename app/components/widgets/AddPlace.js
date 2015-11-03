import React from 'react'
import PollActions from '../../actions/PollActions'
import PollStore from '../../stores/PollStore'

import { Input, Button, Row, Col } from 'react-bootstrap'

const AddPlace = React.createClass({
  getInitialState() {
    return {
      text: ''
    }
  },

  onChange(e) {
    this.setState({ text: e.target.value })
  },

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.text && this.state.text.trim().length !== 0) {
      PollActions.addPlace(this.state.text)
      this.setState({ text: '' })
    }
  },

  render() {
    const disabled = !PollStore.canVote()
    const button = <Button disabled={disabled} onClick={this.handleSubmit}>Add place</Button>
    const input = <Input disabled={disabled} type="text" buttonAfter={button} onChange={ this.onChange } value={ this.state.text } />
    return (
      <Row>
        <Col mdOffset={3} md={6}>
          <form onSubmit={this.handleSubmit}>
            {input}
          </form>
        </Col>
      </Row>
    )
  }
})

export default AddPlace
