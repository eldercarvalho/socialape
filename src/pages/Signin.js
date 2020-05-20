import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'

// Redux
import { connect } from 'react-redux'
import { userSignin } from '../store/actions/userActions'

// MUI
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  ...theme.customStyles
})

class Signin extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.userSignin(userData, this.props.history)
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  render () {
    const { classes, UI: { loading, errors } } = this.props
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="Social Ape" className={classes.image}/>
          <Typography variant="h2" className={classes.pageTitle}>Signin</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Senha"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Entrar
              {loading && (
                <CircularProgress size={30} className={classes.progress}></CircularProgress>
              )}
            </Button>
            <p><small>Ainda não é um primata? <Link to="/signup">Cadastre-se aqui!</Link></small></p>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
  userSignin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  userSignin
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signin))