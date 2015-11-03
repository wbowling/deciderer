var React = require("react");

var Reflux = require('reflux');
var datejs = require("datejs");
var {Well, Row, Col, Jumbotron} = require("react-bootstrap");


var _ = require("lodash");

var People = require("./widgets/People");
var AddPlace = require("./widgets/AddPlace");
var Place = require("./widgets/Place");
var Votes = require("./widgets/Votes");
var SecondsToGo = require('./widgets/SecondsToGo');

var LoginStore = require('../stores/LoginStore');
var PollStore = require('../stores/PollStore');
var PollActions = require('../actions/PollActions');


var ShowPoll = React.createClass({
    mixins: [
              Reflux.listenTo(LoginStore, 'onLoginChange'),
              Reflux.listenTo(PollStore, "onPollChange"),
    ],
    onLoginChange(data) {
      this.setState({loggedIn: data.loggedIn})
    },
    onPollChange: function(poll) {
        this.setState(poll);
    },
    getInitialState() {
      return {};
    },
    render () {
      if (PollStore.hasPoll()) {
      var {votes, people} = this.getVotes();
      var places = this.state.places.map(item => <Place key={item} name={item} value={PollStore.hasVoted(item)} />);
      if (places.length === 0) {
        places = <h5>No options have been added yet!</h5>;
      }
      var placesVotes = this.state.places.map(place => {return {place: place, votes: (votes[place] || 0)}; });
      placesVotes = _.sortBy(placesVotes, "votes").reverse();

      var date = new Date(this.state.enddate);
        return (
          <div>
            <Jumbotron className="text-center">
                <h2>{this.state.title}<br/><small>{date.toString("y-M-d")}&nbsp;<small>(<SecondsToGo end={this.state.enddate} />)</small></small></h2>
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
        );
      } else {
        var inner;
        if (this.state.error) {
          inner = <h2><small className="text-danger">{this.state.error}</small></h2>;
        } else {
          inner = <h2>Loading...</h2>;
        }
        return (
          <div>
            <Jumbotron className="text-center">
                {inner}
            </Jumbotron>
          </div>
            );
      }
    },

    componentWillMount() {
        PollActions.switchPoll(this.props.params.poll);
    },

    componentWillReceiveProps(nextProps) {
      PollActions.switchPoll(nextProps.params.poll);
    },

    getVotes() {
      var users = this.state.users
      var votes = {};
      var peopleObj = {};
      if (users) {
        Object.keys(users).map(key => {
            var user = users[key];
            if (user.votes) {
              Object.keys(user.votes).map(place => {
                var inc = (user.votes[place] || 0);
                if (inc) {
                  peopleObj[user.email] = true;
                }
                votes[place] = (votes[place] || 0) + inc;
              });
          }
        });
      }

      var people = Object.keys(peopleObj);
      return {
        votes,
        people
      };
    }
});

module.exports = ShowPoll;
