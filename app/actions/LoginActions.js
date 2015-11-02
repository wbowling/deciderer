'use strict';
var Reflux = require('reflux');
var {baseRef} = require('../constants/firebaseUtils');

var LoginActions = Reflux.createActions([
    'loggedIn',
    'loggedOut'
]);


baseRef.onAuth(function(authData) {
  if (authData) {
    LoginActions.loggedIn(authData);
  } else {
    LoginActions.loggedOut();
  }
});

LoginActions.login = () => {
    baseRef.authWithOAuthPopup("google", (error, authData) => {
      if (error && error.code === "TRANSPORT_UNAVAILABLE") {
          baseRef.authWithOAuthRedirect("google", LoginActions.loginHandler, {scope: "email"});
      } else {
        LoginActions.loginHandler(error, authData);
      }
  }, {scope: "email"});
};

LoginActions.logout = () => {
        baseRef.unauth();
};

LoginActions.loginHandler = (error, authData) => {

};

module.exports = LoginActions;
