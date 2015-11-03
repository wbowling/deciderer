import React from 'react'
import { Row, Col, Input, Button } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import debug from '../constants/debug'
import LoginStore from '../stores/LoginStore'
import Reflux from 'reflux'


const CreatePoll = React.createClass({
  mixins: [ Reflux.listenTo(LoginStore, 'onLoginChange') ],
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
                              <Input type="text" placeholder="Poll title" ref="title" />
                              <DateRangePicker ranges={this.state.ranges} opens="center" singleDatePicker timePicker minDate={this.state.minDate} onApply={this.datePicked}>
                                  <Input type="text" value={this.state.date ? this.state.date.format() : '' } placeholder="Select date" />
                              </DateRangePicker>
                              <Button bsStyle="success" disabled={!LoginStore.isLoggedIn()} onClick={this.createPoll}>Go!</Button>
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
      debug.log('create')
    }
  },
  onLoginChange() {
    this.forceUpdate()
  }
})

export default CreatePoll
