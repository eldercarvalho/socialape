import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { withStyles } from '@material-ui/core/styles'
import 'dayjs/locale/pt-br'

import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../store/actions/dataActions'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import TooltipButton from '../util/TooltipButton'
import DeleteScream from '../components/DeleteScream'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Scream extends Component {
  likedScream = () => {
    return this.props.user.likes.length && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)
  }

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId)
  }

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId)
  }

  render() {
    dayjs.extend(relativeTime)
    dayjs.locale('pt-br')
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        screamId
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props

    const likeButton = !authenticated ? (
      <TooltipButton tip="Curtir">
        <Link to="/signin">
          <FavoriteBorder color="primary" />
        </Link>
      </TooltipButton>
    ) : (
      this.likedScream() ? (
        <TooltipButton tip="Descurtir" onClick={this.unlikeScream}>
          <FavoriteIcon color="primary" />
        </TooltipButton>
      ) : (
        <TooltipButton tip="Curtir" onClick={this.likeScream}>
          <FavoriteBorder color="primary" />
        </TooltipButton>
      )
    )

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile Image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} curtidas</span>
          <TooltipButton tip="Comentários">
            <ChatIcon color="primary" />
          </TooltipButton>
          <span>{commentCount} comentários</span>
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  likeScream,
  unlikeScream
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream))
