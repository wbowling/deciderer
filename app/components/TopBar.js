"use strict";

var React = require('react');
var Reflux = require('reflux');
var {History} = require('react-router');
var {Navbar, Nav, NavBrand, Button} = require("react-bootstrap");
var LoginStore = require('../stores/LoginStore');
var LoginActions = require('../actions/LoginActions');

var PollStore = require('../stores/PollStore');
var debug = require('../constants/debug');

var TopBar = React.createClass({
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
        var adminButton;
        if (this.state.admin) {
            adminButton = <Button onClick={this.edit} eventKey={1}>Edit</Button>;
        } else {
            adminButton = <span />;
        }

        return (<Navbar inverse toggleNavKey={0}>
                    <NavBrand>{this.state.email ? this.state.email : "Guest (login to vote)"}</NavBrand>
                    <Nav right eventKey={0}>
                      <form className="navbar-form navbar-left">
                        <Button onClick={this.createPoll} eventKey={1}>Create</Button>
                        {adminButton}
                        <Button onClick={this.toggleLogin} eventKey={1}>{this.state.loggedIn ? "Logout" : "Login"}</Button>
                      </form>
                    </Nav>
              </Navbar>);
    },
    toggleLogin(e) {
        e.preventDefault();
        if (this.state.loggedIn) {
            LoginActions.logout();
        } else {
            LoginActions.login();
        }
        e.target.blur();
    },
    createPoll(e) {
        e.preventDefault();
        this.history.pushState(null, "/");
        e.target.blur();
    },
    onLoginChange(data) {
        debug.log("onLoginChange", data);
        this.setState({
                        email: data.email,
                        loggedIn: data.loggedIn,
                        admin: PollStore.isAdmin()
                    });
    },
    onPollChange(data) {
        debug.log("onPollChange", data);
        this.setState({
                        admin: PollStore.isAdmin()
                    });
    }
});

module.exports = TopBar;
