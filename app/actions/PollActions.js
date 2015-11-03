'use strict';

var Reflux = require('reflux');

var PollActions = Reflux.createActions([
    'switchPoll',
    'addPlace',
    'vote'
]);

module.exports = PollActions;