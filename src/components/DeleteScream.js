import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TooltipButton from '../util/TooltipButton'
import { connect } from 'react-redux'
import { deleteScream } from '../store/actions/dataActions'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

const styles = {
  deleteButton: {
    position: 'absolute',
    top: '0.8em',
    right: '1em'
  }
}

export class DeleteScream extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId)
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <TooltipButton
          tip="Excluir scream"
          btnClassName={classes.deleteButton}
          onClick={this.handleOpen}
        >
          <DeleteOutline color="primary" />
        </TooltipButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullMaxWidth
          maxWidth="sm"
        >
          <DialogTitle>Tem certeza que deseja excluir este scream?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
}

export default connect(
  null,
  { deleteScream }
)(withStyles(styles)(DeleteScream))
