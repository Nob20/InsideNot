import {
  EVENT_FETCH_FROM_STORE_SUCCESS, EVENT_FETCH_HAS_ERRORED, EVENT_FETCH_IN_PROGRESS, EVENT_FETCH_FROM_SERVER_SUCCESS,
  EVENT_ENROLLMENTS_FETCH_HAS_ERRORED, EVENT_ENROLLMENTS_FETCH_IN_PROCESS, EVENT_ENROLLMENTS_FETCH_SUCCESS
} from '../actions/eventDetails'

const ACTION_HANDLERS = {
  [EVENT_FETCH_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    isLoadedFromServer: false,
    isLoading: false,
    hasErrored: true
  }),
  [EVENT_FETCH_IN_PROGRESS]: (state, action) => Object.assign({}, state, {
    isLoadedFromServer: false,
    isLoading: true,
    hasErrored: false
  }),
  [EVENT_FETCH_FROM_SERVER_SUCCESS]: (state, action) => Object.assign({}, state, {
    eventId: action.event.id,
    isLoadedFromServer: true,
    isLoading: false,
    hasErrored: false
  }),

  [EVENT_FETCH_FROM_STORE_SUCCESS]: (state, action) => Object.assign({}, state, {
    eventId: action.event.id,
    isLoadedFromServer: false,
    isLoading: false,
    hasErrored: false
  }),
  [EVENT_ENROLLMENTS_FETCH_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    eventEnrollments: {
      hasErrored: true,
      isLoading: false
    },
    eventId: state.eventId,
    isLoadedFromServer: state.isLoadedFromServer,
    isLoading: state.isLoading,
    hasErrored: state.hasErrored
  }),

  [EVENT_ENROLLMENTS_FETCH_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    eventEnrollments: {
      hasErrored: false,
      isLoading: true
    },
    eventId: state.eventId,
    isLoadedFromServer: state.isLoadedFromServer,
    isLoading: state.isLoading,
    hasErrored: state.hasErrored
  }),

  [EVENT_ENROLLMENTS_FETCH_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      eventEnrollments: {
        hasErrored: false,
        isLoading: false,
        enrollments: action.eventEnrollments
      },
      eventId: state.eventId,
      isLoadedFromServer: state.isLoadedFromServer,
      isLoading: state.isLoading,
      hasErrored: state.hasErrored
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  eventEnrollments: {
    hasErrored: false,
    isLoading: false
  },
  isLoadedFromServer: false,
  isLoading: true,
  hasErrored: false
}

export default function eventEditReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
