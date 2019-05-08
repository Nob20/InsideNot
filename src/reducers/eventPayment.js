import {
  PAYMENT_HAS_ERRORED,
  PAYMENT_SUCCESSFUL,
  PAYMENT_IN_PROCESS
} from '../actions/eventPayment'

const ACTION_HANDLERS = {

  [PAYMENT_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    error: action.error,
    hasErrored: true,
    isLoading: false
  }),

  [PAYMENT_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    isLoading: true,
    hasErrored: false
  }),

  [PAYMENT_SUCCESSFUL]: (state, action) => {
    return Object.assign({}, state, {
      isLoading: false,
      hasErrored: false
    })
  }
}

const initialState = {
  isLoading: false,
  hasErrored: false
}

export default function eventsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

