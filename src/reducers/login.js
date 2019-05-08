import {
  LOGIN_HAS_ERRORED,
  LOGIN_IN_PROCESS,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGIN_USERNAME_PASS_MATCH_ERROR,
  SAVE_POST_LOGIN_URL,
  POST_LOGIN_REDIRECT_SUCCESSFUL
} from '../actions/login'

const ACTION_HANDLERS = {
  [LOGIN_HAS_ERRORED]: (state, action) => Object.assign({}, state, { hasErrored: true, inProcess: false }),
  [LOGIN_IN_PROCESS]: (state, action) => Object.assign({}, state, { inProcess: true, hasErrored: false }),

  [SAVE_POST_LOGIN_URL]: (state, action) => {
    return Object.assign({}, state, {
      postLoginRedirectURL: action.postLoginRedirectURL
    })
  },

  [POST_LOGIN_REDIRECT_SUCCESSFUL]: (state, action) => {
    let reducedState = Object.assign({}, state)
    reducedState.postLoginRedirectURL = undefined
    return reducedState
  },

  [LOGIN_USERNAME_PASS_MATCH_ERROR]: (state, action) => Object.assign({}, state, {
    inProcess: false,
    hasErrored: false,
    loginUserPasswordError: true
  }),

  [LOGIN_SUCCESS]: (state, action) => {
    const reducedState = Object.assign({}, state, {
      loggedInUser: action.loggedInUser,
      inProcess: false,
      hasErrored: false,
      loginUserPasswordError: false
    })
    return reducedState
  },

  [LOGOUT_USER]:(state, action) => {
    state.loggedInUser = undefined
    return Object.assign({}, state)
  }
}

const initialState = {}

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

