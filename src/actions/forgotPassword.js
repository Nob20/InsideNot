import { goToURL } from '../utils/Navigation'
import { client } from '../utils/RestClient'

export const SEND_PASSWORD_RESET_EMAIL_IN_PROCESS = 'SEND_PASSWORD_RESET_EMAIL_IN_PROCESS'
export const SEND_PASSWORD_EMAIL_NOT_FOUND = 'SEND_PASSWORD_EMAIL_NOT_FOUND'
export const SHOW_FORGOT_PASSWORD = 'SHOW_FORGOT_PASSWORD'
export const SEND_PASSWORD_RESET_EMAIL_HAS_ERRORED = 'SEND_PASSWORD_RESET_EMAIL_HAS_ERRORED'
export const SEND_PASSWORD_RESET_EMAIL_SUCCESS = 'SEND_PASSWORD_RESET_EMAIL_SUCCESS'

export function goToForgotPasswordScreen () {
  return (dispatch) => {
    dispatch(goToURL(`forgot-password`))
    dispatch({
      type: SHOW_FORGOT_PASSWORD
    })
  }
}

export function sendPasswordResetEmailInProcess () {
  return {
    type: SEND_PASSWORD_RESET_EMAIL_IN_PROCESS
  }
}

function sendPasswordResetEmailSuccess () {
  return {
    type: SEND_PASSWORD_RESET_EMAIL_SUCCESS,
    receivedAt: Date.now(),
    inProcess: true
  }
}

function sendPasswordResetEmailErrored () {
  return {
    type: SEND_PASSWORD_RESET_EMAIL_HAS_ERRORED
  }
}

function sendPasswordResetEmailNotFound () {
  return {
    type: SEND_PASSWORD_EMAIL_NOT_FOUND
  }
}

export function sendPasswordResetEmail (forgotPasswordCommand) {
  return (dispatch) => {
    dispatch(sendPasswordResetEmailInProcess(true))
    const forgotPasswordPromise = client.auth.sendPasswordResetEmail(forgotPasswordCommand)
    handleSentPasswordResetEmailPromise(forgotPasswordPromise, dispatch)
  }
}

function handleSentPasswordResetEmailPromise (signupPromise, dispatch) {
  signupPromise
    .then(() => dispatch(sendPasswordResetEmailSuccess()))
    .catch((error) => {
      console.error(error)
      if (error.response && error.response.status && error.response.status === 404) {
        dispatch(sendPasswordResetEmailNotFound())
      } else {
        return dispatch(sendPasswordResetEmailErrored())
      }
    })
}
