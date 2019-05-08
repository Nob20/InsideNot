import {
  RESET_PASSWORD_IN_PROCESS,
  RESET_PASSWORD_HAS_ERRORED,
  RESET_PASSWORD_LINK_NOT_VALID,
  RESET_PASSWORD_SUCCESS
} from '../actions/resetPassword'

const ACTION_HANDLERS = {
  [RESET_PASSWORD_LINK_NOT_VALID]: (state, action) => Object.assign({}, state, {
    hasErrored: true,
    inProcess: false,
    error: 'link_not_valid'
  }),
  [RESET_PASSWORD_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    hasErrored: true,
    inProcess: false,
    error: 'error_sending_email'
  }),
  [RESET_PASSWORD_IN_PROCESS]: (state, action) => Object.assign({}, state, { inProcess: true, hasErrored: false }),
  [RESET_PASSWORD_SUCCESS]: (state, action) => {
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
  hasErrored: false
}

export default function resetPasswordReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

