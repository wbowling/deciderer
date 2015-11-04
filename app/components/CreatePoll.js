import React from 'react'
import { Row, Col, Input, Button } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import debug from '../constants/debug'
import LoginStore from '../stores/LoginStore'
import PollStore from '../stores/PollStore'
import PollActions from '../actions/PollActions'
import Reflux from 'reflux'
import { History } from 'react-router'

const CreatePoll = React.createClass({
  mixins: [
    Reflux.listenTo(LoginStore, 'onLoginChange'),
    Reflux.listenTo(PollStore, 'onPollChange'),
    History
  ],
  getInitialState() {
    const now = moment()
    const midday = moment().startOf('day').add(12, 'h')

    return {
      minDate: now,
      ranges: {
        'Now': [ now, now ],
        'Tomorrow': [ moment(midday).add(1, 'days'), moment(midday).add(1, 'days') ],
        'This Friday': [ moment(midday).day(5), moment(midday).day(5) ],
        'Next Friday': [ moment(midday).day(12), moment(midday).day(12) ]
      }
    }
  },
  render() {
    return (<div>
                  <Row className="panel text-center">
                      <Col mdOffset={3} md={6} className="panel-body">
                          <h4>Create a Poll</h4>
                          <form>
                              <Input className="text-center" type="text" placeholder="enter title" ref="title" />
                              <DateRangePicker ranges={this.state.ranges} opens="center" singleDatePicker timePicker minDate={this.state.minDate} onApply={this.datePicked}>
                                  <Input className="text-center" type="text" value={this.state.date ? this.state.date.format('MMMM Do YYYY, h:mm a') : '' } placeholder="Select date" />
                              </DateRangePicker>
                              <Button bsStyle="primary" disabled={!LoginStore.isLoggedIn()} onClick={this.createPoll}>Go!</Button>
                          </form>
                      </Col>
                  </Row>
    </div>)
  },
  datePicked(e, picker) {
    debug.log(picker.startDate)
    this.setState({ date:picker.startDate })
  },
  createPoll() {
    if (this.state.date && this.state.date.valueOf() > 0 && this.refs.title.getValue()) {
      PollActions.createPoll(this.state.date.valueOf(), this.refs.title.getValue())
    }
  },
  onPollChange(data) {
    this.history.pushState(null, '/' + data.poll)
  },
  onLoginChange() {
    this.forceUpdate()
  }
})

export default CreatePoll
