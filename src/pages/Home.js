import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getScreams } from '../store/actions/dataActions'

import Grid from '@material-ui/core/Grid'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

class Home extends Component {
  componentDidMount () {
    this.props.getScreams()
  }
  render () {
    const { screams, loading } = this.props.data
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
    ) : <p>Loading...</p>
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8} md={8}>
            {recentScreamsMarkup}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Profile />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getScreams })(Home)