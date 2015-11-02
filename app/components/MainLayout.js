var TopBar = require('./TopBar');
var React = require('react');
var {Grid} = require('react-bootstrap');

var MainLayout = React.createClass({
    render: function() {
        return (
            <div>
                <TopBar />
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        );
    },
    });

module.exports = MainLayout;