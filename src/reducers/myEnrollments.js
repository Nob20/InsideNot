import { MY_ENROLLMENTS_FETCH_HAS_ERRORED, MY_ENROLLMENTS_FETCH_IN_PROCESS, MY_ENROLLMENTS_FETCH_SUCCESS } from '../actions/myEnrollments'
import { EVENT_UPDATE_SUCCESS } from '../actions/eventEdit'
import { EVENT_FETCH_FROM_SERVER_SUCCESS } from '../actions/eventDetails'

const ACTION_HANDLERS = {

  [MY_ENROLLMENTS_FETCH_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    hasErrored: true,
    isLoading: false,
    isLoadedFromServer: true
  }),

  [MY_ENROLLMENTS_FETCH_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    isLoading: true,
    hasErrored: false,
    isLoadedFromServer: false
  }),

  [MY_ENROLLMENTS_FETCH_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      enrollments: action.enrollments,
      isLoadedFromServer: true,
      isLoading: false,
      hasErrored: false
    })
  },

  [EVENT_FETCH_FROM_SERVER_SUCCESS]: (state, action) => {
    let newState = Object.assign({}, state)
    let events = newState.events
    if (events) {
      events[action.event.id] = action.event
    } else {
      events = { }
      events[action.event.id] = action.event
      newState.events = events
    }
    return newState
  },

  [EVENT_UPDATE_SUCCESS]: (state, action) => {
    const newState = Object.assign({}, state)
    const events = newState.events
    if (events) {
      events[action.event.id] = action.event
    }
    return newState
  }
}

const initialState = {
  isLoadedFromServer: false,
  isLoading: false,
  hasErrored: false
}

export default function eventsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

