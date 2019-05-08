import { goToURL } from '../utils/Navigation'
import { setCookie, deleteAllCookies, getCookie } from '../utils/Cookie'
import { AUTH_CONSTANTS } from '../utils/Constants'
import { client } from '../utils/RestClient'
import { completeSsoSignup } from './ssoSignup'

export const GO_TO_SIGNUP = 'GO_TO_SIGNUP'
export const LOGIN_IN_PROCESS = 'LOGIN_IN_PROCESS'
export const LOGIN_HAS_ERRORED = 'LOGIN_HAS_ERRORED'
export const LOGIN_USERNAME_PASS_MATCH_ERROR = 'LOGIN_USERNAME_PASS_MATCH_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SAVE_POST_LOGIN_URL = 'SAVE_POST_LOGIN_URL'
export const POST_LOGIN_REDIRECT_SUCCESSFUL = 'POST_LOGIN_REDIRECT_SUCCESSFUL'

export function loginInProcess () {
  return {
    type: LOGIN_IN_PROCESS
  }
}

function loginHasErrored () {
  return {
    type: LOGIN_HAS_ERRORED
  }
}

export function loginSuccess (loggedInUser) {
  setCookie(AUTH_CONSTANTS.AUTH_COOKIE_NAME, loggedInUser.sessionCookie)
  return {
    type: LOGIN_SUCCESS,
    loggedInUser,
    receivedAt: Date.now(),
    hasErrored: false,
    inProcess: false
  }
}

function logoutUser () {
  deleteAllCookies()
  window.location.replace(`/login`)
}

function loginUsernamePasswordDidnotMatch () {
  return {
    type: LOGIN_USERNAME_PASS_MATCH_ERROR
  }
}

function postLoginRedirectComplete () {
  return {
    type: POST_LOGIN_REDIRECT_SUCCESSFUL
  }
}

function saveCurrentURLForRedirect (postLoginRedirectURL) {
  return {
    type: SAVE_POST_LOGIN_URL,
    postLoginRedirectURL
  }
}

export function errorAfterFiveSeconds () {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(loginHasErrored(true))
    }, 5000)
  }
}

export function loginExistingUser () {
  return (dispatch) => {
    let loginCookie = getCookie(AUTH_CONSTANTS.AUTH_COOKIE_NAME)
    if (loginCookie) {
      dispatch(loginInProcess())

      client.auth.loginExistingUser()
        .then((response) => {
          if (!response.data) {
            throw Error(response.statusText)
          }
          const loggedInUser = response.data
          if (loggedInUser && loggedInUser.user && loggedInUser.user.registrationStatus === 'COMPLETE') {
            dispatch(loginSuccess(response.data))
          } else if (loggedInUser && loggedInUser.user && loggedInUser.user.registrationStatus === 'SSO_PROFILE_LINKED') {
            completeSsoSignup(loggedInUser, dispatch)
          } else {
            dispatch(loginHasErrored(true))
          }
        })
        .catch(() => dispatch(loginHasErrored(true)))
    } else {
      return () => {}
    }
  }
}

export function goToSignupScreen () {
  return goToURL(`/signup`)
}

export function logoutUserAndGoToLogin () {
  return (dispatch) => {
    dispatch(logoutUser())
    dispatch(goToURL(`/login`))
  }
}

export function askUserToLogin (currentURL) {
  return (dispatch) => {
    dispatch(saveCurrentURLForRedirect(currentURL))
    dispatch(goToURL(`/login`))
  }
}
export function loginUser (credentials) {
  return (dispatch, getState) => {
    loginInProcess(true)
    const loginResponsePromise = client.auth.loginUser(credentials)
    handleLoginResponse(loginResponsePromise, dispatch, getState)
  }
}

export function loginWithFacebook (accessToken) {
  return (dispatch, getState) => {
    loginInProcess(true)
    client.auth.loginWithFacebook({ accessToken: accessToken })
    const loginResponsePromise = client.auth.loginWithFacebook({ accessToken: accessToken })
    handleLoginResponse(loginResponsePromise, dispatch, getState)
  }
}

export function loginWithGoogle (accessToken) {
  return (dispatch, getState) => {
    loginInProcess(true)
    const loginResponsePromise = client.auth.loginWithGoogle({ accessToken: accessToken })
    handleLoginResponse(loginResponsePromise, dispatch, getState)
  }
}

function handleLoginResponse (loginResponsePromise, dispatch, getState) {
  loginResponsePromise
    .then((response) => {
      if (!response.data) {
        throw Error(response.statusText)
      }
      setCookie(AUTH_CONSTANTS.AUTH_COOKIE_NAME, response.data.sessionCookie)
      if (response.data.user.registrationStatus === 'SSO_PROFILE_LINKED') {
        completeSsoSignup(response.data, dispatch)
      } else {
        dispatch(loginSuccess(response.data))
        const currentState = getState()
        if (currentState.login && currentState.login.postLoginRedirectURL) {
          dispatch(goToURL(currentState.login.postLoginRedirectURL))
        } else {
          dispatch(goToURL(`/`))
        }
        dispatch(postLoginRedirectComplete())
      }
    })
    .catch((error) => {
      if (error.response && error.response.status && (error.response.status === 403 || error.response.status === 401)) {
        dispatch(loginUsernamePasswordDidnotMatch())
      } else {
        dispatch(loginHasErrored(true))
      }
    })
}
