import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TooltipButton from '../util/TooltipButton'
import { connect } from 'react-redux'

// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

import PostScream from '../components/PostScream'

class Navbar extends Component {
  render() {
    const { authenticated } = this.props
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
             <PostScream />
              <Link to="/">
                <TooltipButton tip="Home">
                  <HomeIcon />
                </TooltipButton>
              </Link>
              <TooltipButton tip="Home">
                <NotificationsIcon />
              </TooltipButton>
            </>
          ) : (
            <>
            <Button color="inherit" component={Link} to="/signin">Signin</Button>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(
  mapStateToProps
)(Navbar);