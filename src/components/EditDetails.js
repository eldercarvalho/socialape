import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { editUserDetails } from '../store/actions/userActions'

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'

import TooltipButton from '../util/TooltipButton'

const styles = theme => ({
  ...theme.customStyles,
  button: {
    float: 'right'
  }
})

export class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  }

  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    })
  }

  componentDidMount () {
    const { credentials } = this.props.user
    this.mapUserDetailsToState(credentials)
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { bio, website, location } = this.state
    const userData = { bio, website, location }
    this.props.editUserDetails(userData)
    this.handleClose()
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <TooltipButton tip="Editar perfil" placement="top" onClick={this.handleClickOpen} btnClassName={classes.button}>
          <EditIcon color="primary" />
        </TooltipButton>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
          <DialogTitle id="form-dialog-title">Editar perfil</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                id="bio"
                name="bio"
                label="Bio"
                placeholder="Um descrição curte sobre você"
                fullWidth
                multiline
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
              />
              <TextField
                id="website"
                name="website"
                label="Website"
                placeholder="Seu site pessoal"
                fullWidth
                multiline
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
              />
              <TextField
                id="location"
                name="location"
                label="Local"
                placeholder="Onde você mora?"
                fullWidth
                multiline
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails))
