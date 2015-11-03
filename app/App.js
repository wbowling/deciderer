import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import MainLayout from './components/MainLayout'
import ShowPoll from './components/ShowPoll'
import CreatePoll from './components/CreatePoll'


ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={CreatePoll} />
      <Route path=":poll" component={ShowPoll} />
    </Route>
  </Router>), document.getElementById('app'))
