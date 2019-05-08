import { ALL_EVENTS_FETCH_HAS_ERRORED, ALL_EVENTS_FETCH_IN_PROCESS, ALL_EVENTS_FETCH_SUCCESS,
  ALL_ENROLLMENTS_FETCH_HAS_ERRORED, ALL_ENROLLMENTS_FETCH_IN_PROCESS, ALL_ENROLLMENTS_FETCH_SUCCESS,
  ALL_USERS_FETCH_HAS_ERRORED, ALL_USERS_FETCH_IN_PROCESS, ALL_USERS_FETCH_SUCCESS } from '../actions/adminDashboard'

const ACTION_HANDLERS = {

  [ALL_EVENTS_FETCH_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    allEvents: {
      hasErrored: true,
      isLoading: false
    },
    allEnrollments:state.allEnrollments,
    allUsers:state.allUsers
  }),

  [ALL_EVENTS_FETCH_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    allEvents: {
      isLoading: true,
      hasErrored: false
    },
    allEnrollments:state.allEnrollments,
    allUsers:state.allUsers
  }),

  [ALL_EVENTS_FETCH_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      allEvents: {
        events: action.allEvents,
        isLoading: false,
        hasErrored: false
      },
      allEnrollments:state.allEnrollments,
      allUsers:state.allUsers
    })
  },
  [ALL_ENROLLMENTS_FETCH_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    allEnrollments: {
      hasErrored: true,
      isLoading: false
    },
    allEvents:state.allEvents,
    allUsers:state.allUsers
  }),

  [ALL_ENROLLMENTS_FETCH_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    allEnrollments: {
      hasErrored: false,
      isLoading: true
    },
    allEvents:state.allEvents,
    allUsers:state.allUsers
  }),

  [ALL_ENROLLMENTS_FETCH_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      allEnrollments: {
        hasErrored: false,
        isLoading: false,
        enrollments: action.allEnrollments
      },
      allEvents:state.allEvents,
      allUsers:state.allUsers
    })
  },
  [ALL_USERS_FETCH_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    allUsers: {
      hasErrored: true,
      isLoading: false
    },
    allEnrollments:state.allEnrollments,
    allEvents:state.allEvents
  }),

  [ALL_USERS_FETCH_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    allUsers: {
      hasErrored: false,
      isLoading: true
    },
    allEnrollments:state.allEnrollments,
    allEvents:state.allEvents
  }),

  [ALL_USERS_FETCH_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      allUsers: {
        hasErrored: false,
        isLoading: false,
        users: action.allUsers
      },
      allEnrollments:state.allEnrollments,
      allEvents:state.allEvents
    })
  }
}

const initialState = {
  allUsers: {
    isLoading: false,
    hasErrored: false
  },
  allEvents: {
    isLoading: false,
    hasErrored: false
  },
  allEnrollments: {
    isLoading: false,
    hasErrored: false
  }

}

export default function eventsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

