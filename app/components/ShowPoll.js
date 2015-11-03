import React from 'react'
import Reflux from 'reflux'
import { Well, Row, Col, Jumbotron } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment'

import People from './widgets/People'
import AddPlace from './widgets/AddPlace'
import Place from './widgets/Place'
import Votes from './widgets/Votes'
import SecondsToGo from './widgets/SecondsToGo'

import LoginStore from '../stores/LoginStore'
import PollStore from '../stores/PollStore'
import PollActions from '../actions/PollActions'


const ShowPoll = React.createClass({
  mixins: [
    Reflux.listenTo(LoginStore, 'onLoginChange'),
    Reflux.listenTo(PollStore, 'onPollChange')
  ],
  onLoginChange(data) {
    this.setState({ loggedIn: data.loggedIn })
  },
  onPollChange(poll) {
    this.setState(poll)
  },
  getInitialState() {
    return {
      places: [],
      enddate: 0
    }
  },
  render() {
    if (PollStore.hasPoll()) {
      const { votes, people } = this.getVotes()
      let places = this.state.places.map(item => <Place key={item} name={item} value={PollStore.hasVoted(item)} />)
      if (places.length === 0) {
        places = <h5>No options have been added yet!</h5>
      }
      let placesVotes = this.state.places.map(place => {return { place: place, votes: (votes[place] || 0) } })
      placesVotes = _.sortBy(placesVotes, 'votes').reverse()

      const date = moment(this.state.enddate)
      return (
        <div>
          <Jumbotron className="text-center">
              <h2>{this.state.title}<br/><small>{date.format('YYYY-M-D')}&nbsp;<small>(<SecondsToGo end={this.state.enddate} />)</small></small></h2>
          </Jumbotron>
          <Row className="panel text-center">
              <Col mdOffset={1} md={5} className="panel-body">
                  {places}
              </Col>
              <Col md={5} className="panel-body">
               <Votes placesVotes={placesVotes} />
              </Col>
          </Row>
          <Row className="">
            <div className="panel-body">
              <Col md={2}><h5>Who's voted ({people.length}):</h5></Col>
              <Col md={10}><People people={people} /></Col>
            </div>
          </Row>
          <Row>
            <Well>
               <AddPlace />
            </Well>
          </Row>
        </div>
      )
    } else {
      let inner
      if (this.state.error) {
        inner = <h2><small className="text-danger">{this.state.error}</small></h2>
      } else {
        inner = <h2>Loading...</h2>
      }
      return (
        <div>
          <Jumbotron className="text-center">
              {inner}
          </Jumbotron>
        </div>
          )
    }
  },

  componentWillMount() {
    PollActions.switchPoll(this.props.params.poll)
  },

  componentWillReceiveProps(nextProps) {
    PollActions.switchPoll(nextProps.params.poll)
  },

  getVotes() {
    const users = this.state.users
    const votes = {}
    const peopleObj = {}
    if (users) {
      Object.keys(users).map(key => {
        const user = users[key]
        if (user.votes) {
          Object.keys(user.votes).map(place => {
            const inc = (user.votes[place] || 0)
            if (inc) {
              peopleObj[user.email] = true
            }
            votes[place] = (votes[place] || 0) + inc
          })
        }
      })
    }

    const people = Object.keys(peopleObj)
    return {
      votes,
      people
    }
  }
})

export default ShowPoll
