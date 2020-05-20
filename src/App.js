import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import './App.css'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { SET_AUTHENTICATED } from './store/types'
import { logout, getUserData } from './store/actions/userActions'

// Components
import NavBar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

// Pages
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

// Util
import themeConfig from './util/theme'

const myTheme = createMuiTheme(themeConfig)

const token = localStorage.FBIdToken
if  (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout())
    localStorage.clear()
    window.location.href = '/signin'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = `${token}`
    store.dispatch(getUserData())
  }
} else {
  store.dispatch(logout())
  localStorage.clear()
  // window.location.href = '/signin'
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <div className="App">
          <Router>
            <NavBar></NavBar>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute path="/signin" component={Signin} />
                <AuthRoute path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default App
