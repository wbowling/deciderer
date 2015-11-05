import React from 'react'
import { Grid } from 'react-bootstrap'

import TopBar from './TopBar'
import Footer from './Footer'

const MainLayout = React.createClass({
  render() {
    return (
      <div>
        <TopBar />
        <Grid>
            {this.props.children}
            <Footer />
        </Grid>
    </div>)
  }
})

export default MainLayout
