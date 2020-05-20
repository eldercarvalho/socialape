import React, { Component, Fragment, createRef } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'

import { connect } from 'react-redux'
import { logout, uploadImage } from '../store/actions/userActions'

import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

import EditDetails from '../components/EditDetails'
import TooltipButton from '../util/TooltipButton'

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  skeleton: {
    margin: '0 auto 20px'
  }
})

export class Profile extends Component {
  constructor() {
    super()
    this.inputFile = createRef();
  }
  handleEditPicture = event => {
    this.inputFile.current.click()
  }

  handleImageChange = event => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadImage(formData)
  }

  handleLogout = event => {
    this.props.logout()
  }
  
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      } 
    } = this.props

    let profileMarkup = !loading ? (authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input ref={this.inputFile} type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden" />
            <TooltipButton tip="Editar foto de perfil" placement="top" onClick={this.handleEditPicture}>
              <EditIcon color="primary"></EditIcon>
            </TooltipButton>
          </div>
          <hr/>
          <div className="profile-details">
            <MuiLink component={Link} to={`users/${handle}`} color="primary" variant="h5">
              @{handle}
            </MuiLink>
            <hr/>
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr/>
            {location && (
            <Fragment>
              <LocationOn color="primary" />
              <span>{location}</span>
              <hr/>
            </Fragment>
            )}
            {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
              <hr/>
            </Fragment>
            )}
            <CalendarToday color="primary" />{' '}
            <span>Membro desde {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <TooltipButton tip="Sair" placement="top" onClick={this.handleLogout}>
            <KeyboardReturn color="primary" />
          </TooltipButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">Nenhum perfil encontrado, por favor faça login novamente</Typography>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" component={Link} to="/signin">
            Signin
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">
            Signup
          </Button>
        </div>
      </Paper>
    )) : (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <Skeleton className={classes.skeleton} animation="wave" variant="circle" width={200} height={200} />
          <Skeleton className={classes.skeleton} animation="wave" height={30} width="80%" style={{ marginBottom: 6 }} />
          <Skeleton className={classes.skeleton} animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
          <Skeleton className={classes.skeleton} animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        </div>
      </Paper>
    )
    
    return profileMarkup
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  uploadImage,
  logout
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile))
