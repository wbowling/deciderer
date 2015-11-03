'use strict';

var Reflux = require('reflux');

var PollActions = Reflux.createActions([
    'switchPoll',
    'addPlace',
    'vote',
    'createPoll'
]);

module.exports = PollActions;
