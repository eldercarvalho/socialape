import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'

import { connect } from 'react-redux'
import { userSignup } from '../store/actions/userActions'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  ...theme.customStyles
})

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true })
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.userSignup(userData, this.props.history)
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  render () {
    const { classes, UI: { loading, errors } } = this.props
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="Social Ape" className={classes.image}/>
          <Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
          <TextField
              id="handle"
              name="handle"
              type="handle"
              label="Usuário"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirmar senha"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
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
              Cadastrar
              {loading && (
                <CircularProgress size={30} className={classes.progress}></CircularProgress>
              )}
            </Button>
            <p><small>Já é um primata? <Link to="/signin">Faça login!</Link></small></p>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  userSignup
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup))