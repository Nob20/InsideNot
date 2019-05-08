import {
  MY_EVENTS_FETCH_HAS_ERRORED,
  MY_EVENTS_FETCH_IN_PROCESS,
  MY_EVENTS_FETCH_SUCCESS,
  EVENT_ARCHIVE_HAS_ERRORED,
  EVENT_ARCHIVE_IN_PROGRESS
} from '../actions/myEvents'

const ACTION_HANDLERS = {

  [MY_EVENTS_FETCH_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    hasErrored: true,
    isLoading: false,
    isLoadedFromServer: true
  }),

  [MY_EVENTS_FETCH_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    isLoading: true,
    hasErrored: false,
    isLoadedFromServer: false
  }),

  [MY_EVENTS_FETCH_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      events: action.events,
      isLoadedFromServer: true,
      isLoading: false,
      hasErrored: false
    })
  },
  [EVENT_ARCHIVE_IN_PROGRESS]: (state, action) => Object.assign({}, state, {
    eventDelete: {
      eventId: action.eventId,
      isLoading: true,
      hasErrored: false
    }
  }),
  [EVENT_ARCHIVE_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    eventDelete: {
      error: action.error,
      eventId: action.eventId,
      isLoading: false,
      hasErrored: true
    }
  })
}

const initialState = {
  isLoadedFromServer: false,
  isLoading: false,
  hasErrored: false,
  eventDelete: {
    isLoading: false,
    hasErrored: false
  }
}

export default function eventsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

