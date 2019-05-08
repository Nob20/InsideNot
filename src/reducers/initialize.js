import { LOGIN_HAS_ERRORED, LOGIN_IN_PROCESS, LOGIN_SUCCESS } from '../actions/login'

const ACTION_HANDLERS = {
  [LOGIN_HAS_ERRORED]: (state, action) => Object.assign({}, state, { hasErrored: true, inProcess: false }),
  [LOGIN_IN_PROCESS]: (state, action) => Object.assign({}, state, { inProcess: true, hasErrored: false }),
  [LOGIN_SUCCESS]: (state, action) => Object.assign({}, state, {
    loggedInUser: action.loggedInUser,
    inProcess: false,
    hasErrored: false
  })
}

const initialState = {}

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

