import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TooltipButton from '../util/TooltipButton'
import { connect } from 'react-redux'
import { postScream, clearErrors } from '../store/actions/dataActions'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  ...theme.customStyles,
  deleteButton: {
    position: 'absolute',
    top: '0.8em',
    right: '1em'
  },
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '0'
  }
})

export class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.props.clearErrors()
    this.setState({ open: false })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFocus = () => {
    this.props.clearErrors()
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.postScream({ body: this.state.body })
      .then(() => {
        this.handleClose()
      })
  }

  // getDerivedStateFromProps(props) {
  //   if (!props.UI.errors && !props.UI.loading) {
  //     return {
  //       body: '',

  //     }
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (Object.keys(nextProps.UI.errors).length) {
  //     this.setState({ errors: nextProps.UI.errors })
  //   }
  //   if (!Object.keys(nextProps.UI.errors).length && !nextProps.UI.loading) {
  //     this.setState({ body: '' })
  //     this.handleClose()
  //   }
  // }

  render() {
    const { classes, UI: { loading, errors } } = this.props
    // const { errors } = this.state

    return (
      <>
        <TooltipButton tip="Poste um Scream!" onClick={this.handleOpen}>
          <AddIcon />
        </TooltipButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <TooltipButton tip="Poste um Scream!" onClick={this.handleClose} btnClassName={classes.closeButton}>
            <CloseIcon color="primary" />
          </TooltipButton>
          <DialogTitle>Poste um novo scream</DialogTitle>
          <DialogContent>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Solte um scream para seus amigos primatas"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Postar
                {loading && (
                  <CircularProgress color="primary" size={30} className={classes.progressSpinner} />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(
  mapStateToProps,
  { postScream, clearErrors }
)(withStyles(styles)(PostScream))
