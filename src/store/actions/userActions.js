import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types'
import axios from 'axios'

export const userSignin = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios.post('/signin', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const userSignup = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios.post('/signup', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const logout = () => dispatch => {
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER })
  axios.get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER })
  axios.post('/user/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(() => {
      dispatch(getUserData())
    })
    .catch(err => {
      console.log(err)
    })
}

export const editUserDetails = userData => dispatch => {
  dispatch({ type: LOADING_USER })
  return axios.post('/user', userData)
    .then(() => {
      dispatch(getUserData())
    })
}

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken)
  axios.defaults.headers.common['Authorization'] = FBIdToken
}