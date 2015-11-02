'use strict';

var PollActions = require('../actions/PollActions');
var Reflux = require('reflux');
var {baseRef} = require('../constants/firebaseUtils');
var LoginStore = require('./LoginStore');
var debug = require('../constants/debug');

var data = {

};

var PollStore = Reflux.createStore({
    listenables: PollActions,

    onSwitchPoll(poll) {
        if (data.poll) {
            baseRef.child("polls").child(data.poll).off('value');
        }
        baseRef.child("polls").child(poll).on('value', (dataSnapshot) => {
            if (dataSnapshot.exists()) {
                data = dataSnapshot.val();
                data.poll = dataSnapshot.key();
                data.places = Object.keys(data.places);
                debug.log(data);
            } else {
                data.error = "Poll doesn't exist"
            }
            this.trigger(data);
        });
    },
    onAddPlace(place) {
        if (LoginStore.isLoggedIn()) {
            baseRef.child("polls").child(data.poll).child("places").child(place).set(LoginStore.getUid());
        }
    },
    onVote(vote) {
        if (LoginStore.isLoggedIn()) {
            var email = LoginStore.getEmail();
            var userRef = baseRef.child("polls").child(data.poll).child("users").child(LoginStore.getUid());
            userRef.child("email").once("value", (snapshot) => {
                if (!snapshot.exists()) {
                    snapshot.ref().set(email);
                }
            });
            userRef.child("votes").child(vote.name).set(vote.value);
        }
    },
    hasVoted(name) {
        if (LoginStore.isLoggedIn()) {
            return (data.users[LoginStore.getUid()].votes[name] === 1)
        } else {
            return false;
        }
    },
    canVote() {
        return (LoginStore.isLoggedIn() && this.hasPoll() && new Date().getTime() < data.enddate);
    },
    isAdmin() {
        return (LoginStore.isLoggedIn() && LoginStore.getUid() === data.admin);
    },
    hasPoll() {
        return (data.poll != null);
    }
});

module.exports = PollStore;
