import axios from 'axios'
import {
  SET_SCREAMS,
  POST_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS
} from '../types'

export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios.get('/screams')
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

export const postScream = screamData => dispatch => {
  dispatch({ type: LOADING_UI })
  return axios.post('/scream', screamData)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      })
      dispatch({
        type: CLEAR_ERRORS
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const likeScream = screamId => dispatch => {
  // dispatch({ type: LOADING_DATA })
  axios.get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const unlikeScream = screamId => dispatch => {
  // dispatch({ type: LOADING_DATA })
  axios.get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const deleteScream = screamId => dispatch => {
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      })
    })
}

export const clearErrors = () => dispatch => {
  dispatch({
    type: SET_ERRORS,
    payload: {}
  })
}