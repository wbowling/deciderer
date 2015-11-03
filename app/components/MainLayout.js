import TopBar from './TopBar'
import React from 'react'
import { Grid } from 'react-bootstrap'

const MainLayout = React.createClass({
  render() {
    return (
      <div>
        <TopBar />
        <Grid>
            {this.props.children}
        </Grid>
    </div>)
  }
})

export default MainLayout
