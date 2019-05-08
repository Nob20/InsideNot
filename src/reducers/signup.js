import {
  USER_CREATION_HAS_ERRORED,
  USER_CREATION_IN_PROCESS,
  USER_CREATION_SUCCESS
} from '../actions/signup'

const ACTION_HANDLERS = {
  [USER_CREATION_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    hasErrored: true,
    inProcess: false,
    error: action.error
  }),
  [USER_CREATION_IN_PROCESS]: (state, action) => Object.assign({}, state, { inProcess: true, hasErrored: false }),
  [USER_CREATION_SUCCESS]: (state, action) => {
    const reducedState = Object.assign({}, state, {
      inProcess: false,
      hasErrored: false
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

