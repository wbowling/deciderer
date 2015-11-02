"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var {Router, Route, IndexRoute} = require('react-router');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var MainLayout = require("./components/MainLayout");
var ShowPoll = require("./components/ShowPoll");
var CreatePoll = require("./components/CreatePoll");


ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={CreatePoll} />
      <Route path=":poll" component={ShowPoll} />
    </Route>
  </Router>
), document.getElementById("app"));
