import { EVENTS_FETCH_HAS_ERRORED, EVENTS_FETCH_IN_PROCESS, EVENTS_FETCH_SUCCESS } from '../actions/eventList'

const ACTION_HANDLERS = {

  [EVENTS_FETCH_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    hasErrored: true,
    isLoading: false,
    isLoadedFromServer: true
  }),

  [EVENTS_FETCH_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    isLoading: true,
    hasErrored: false,
    isLoadedFromServer: false
  }),

  [EVENTS_FETCH_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      events: action.events.map(event => event.id),
      isLoadedFromServer: true,
      isLoading: false,
      hasErrored: false
    })
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

