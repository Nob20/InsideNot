import {
  SEND_PASSWORD_EMAIL_NOT_FOUND,
  SEND_PASSWORD_RESET_EMAIL_IN_PROCESS,
  SEND_PASSWORD_RESET_EMAIL_SUCCESS,
  SEND_PASSWORD_RESET_EMAIL_HAS_ERRORED,
  SHOW_FORGOT_PASSWORD
} from '../actions/forgotPassword'
import { RESET_PASSWORD_LINK_NOT_VALID } from '../actions/resetPassword'

const ACTION_HANDLERS = {
  [SEND_PASSWORD_EMAIL_NOT_FOUND]: (state, action) => Object.assign({}, state, { hasErrored: true, inProcess: false, error: 'email_not_found' }),
  [SHOW_FORGOT_PASSWORD]: (state, action) => Object.assign({}, state, {
    inProcess: false,
    hasErrored: false,
    resetPasswordSuccess: false
  }),
  [RESET_PASSWORD_LINK_NOT_VALID]: (state, action) => Object.assign({}, state, { hasErrored: true, inProcess: false, error: 'link_not_valid' }),
  [SEND_PASSWORD_RESET_EMAIL_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    hasErrored: true,
    inProcess: false,
    error: 'error_sending_email'
  }),
  [SEND_PASSWORD_RESET_EMAIL_IN_PROCESS]: (state, action) => Object.assign({}, state, { inProcess: true, hasErrored: false }),
  [SEND_PASSWORD_RESET_EMAIL_SUCCESS]: (state, action) => {
    const reducedState = Object.assign({}, state, {
      inProcess: false,
      hasErrored: false,
      resetPasswordSuccess: true
    })
    return reducedState
  }
}

const initialState = {
  inProcess: false,
  hasErrored: false,
  resetPasswordSuccess: false
}

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

