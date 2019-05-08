import { goToURL } from '../utils/Navigation'
import { client } from '../utils/RestClient'
import { loginSuccess } from './login'

export const RESET_PASSWORD_IN_PROCESS = 'RESET_PASSWORD_IN_PROCESS'
export const RESET_PASSWORD_HAS_ERRORED = 'RESET_PASSWORD_HAS_ERRORED'
export const RESET_PASSWORD_LINK_NOT_VALID = 'RESET_PASSWORD_LINK_NOT_VALID'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_LINK_VALIDATION_SUCCESS = 'RESET_PASSWORD_LINK_VALIDATION_SUCCESS'

export function resetPasswordInProcess () {
  return {
    type: RESET_PASSWORD_IN_PROCESS
  }
}

function resetPasswordSuccess () {
  return {
    type: RESET_PASSWORD_SUCCESS,
    receivedAt: Date.now()
  }
}

function resetPasswordLinkValidationSuccess () {
  return {
    type: RESET_PASSWORD_LINK_VALIDATION_SUCCESS,
    receivedAt: Date.now()
  }
}

function resetPasswordErrored () {
  return {
    type: RESET_PASSWORD_HAS_ERRORED
  }
}

function resetPasswordLinkNotValid () {
  return {
    type: RESET_PASSWORD_LINK_NOT_VALID
  }
}

export function resetPassword (resetPasswordCommand) {
  return (dispatch) => {
    dispatch(resetPasswordInProcess(true))
    const resetPasswordPromise = client.auth.resetPassword(resetPasswordCommand)
    resetPasswordPromise
      .then((response) => dispatch(loginSuccess(response.data)))
      .then((response) => {
        dispatch(resetPasswordSuccess())
      })

      .then(() => dispatch(goToURL(`/`)))
      .catch((error) => {
        console.error(error)
      })
  }
}

export function validateResetPasswordLink (validateLinkCommand) {
  return (dispatch) => {
    dispatch(resetPasswordInProcess(true))
    const validateLinkPromise = client.auth.validatePasswordResetLink(validateLinkCommand)
    validateLinkPromise
      .then(() => dispatch(resetPasswordLinkValidationSuccess()))
      .catch((error) => {
        console.error(error)
        if (error.response && error.response.status && error.response.status === 403) {
          dispatch(resetPasswordLinkNotValid())
          dispatch(goToURL(`forgot-password`))
        } else {
          return dispatch(resetPasswordErrored())
        }
      })
  }
}

