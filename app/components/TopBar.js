import React from 'react'
import Reflux from 'reflux'
import { History } from 'react-router'
import { Navbar, Nav, NavBrand, Button } from 'react-bootstrap'

import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions'
import PollStore from '../stores/PollStore'
import debug from '../constants/debug'

const TopBar = React.createClass({
  mixins: [
    Reflux.listenTo(LoginStore, 'onLoginChange'),
    Reflux.listenTo(PollStore, 'onPollChange'),
    History
  ],
  getInitialState() {
    return {
      email: LoginStore.getEmail(),
      loggedIn: LoginStore.isLoggedIn(),
      admin: PollStore.isAdmin()
    }
  },
  render() {
    let adminButton
    if (false && this.state.admin) {
      adminButton = <Button onClick={this.edit} eventKey={1}>Edit</Button>
    } else {
      adminButton = <span />
    }

    return (<Navbar inverse toggleNavKey={0}>
              <NavBrand>
                {this.state.email ? this.state.email : 'Guest (login to create/vote)'}
                {PollStore.isAdmin() ? ' (Poll admin)' : ''}
              </NavBrand>
              <Nav right eventKey={0}>
                <form className="navbar-form navbar-left">
                  <Button bsStyle="success" onClick={this.createPoll} eventKey={1}>Create</Button>
                  {adminButton}
                  <Button onClick={this.toggleLogin} eventKey={1}>{this.state.loggedIn ? 'Logout' : 'Login'}</Button>
                </form>
              </Nav>
            </Navbar>)
  },
  toggleLogin(e) {
    e.preventDefault()
    if (this.state.loggedIn) {
      LoginActions.logout()
    } else {
      LoginActions.login()
    }
    e.target.blur()
  },
  createPoll(e) {
    e.preventDefault()
    this.history.pushState(null, '/')
    e.target.blur()
  },
  onLoginChange(data) {
    debug.log('onLoginChange', data)
    this.setState({
      email: data.email,
      loggedIn: data.loggedIn,
      admin: PollStore.isAdmin()
    })
  },
  onPollChange(data) {
    debug.log('onPollChange', data)
    this.setState({
      admin: PollStore.isAdmin()
    })
  }
})

export default TopBar
