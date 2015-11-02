'use strict';

var LoginActions = require('../actions/LoginActions');
var Reflux = require('reflux');

var data = {
    uid: null,
    email: null,
    loggedIn: false
};

var LoginStore = Reflux.createStore({
    listenables: LoginActions,
    onLoggedIn(authData) {
        data.email = authData.google.email;
        data.uid = authData.uid;
        data.loggedIn = true;
        this.trigger(data);
    },

    onLoggedOut() {
        data.email = null;
        data.uid = null;
        data.loggedIn = false;
        this.trigger(data);
    },

    getEmail() {
        return data.email;
    },

    getUid() {
        return data.uid;
    },

    isLoggedIn() {
        return data.loggedIn;
    },

});

module.exports = LoginStore;
