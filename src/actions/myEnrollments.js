import { client } from '../utils/RestClient'

export const LOAD_MY_ENROLLMENTS = 'LOAD_MY_ENROLLMENTS'
export const MY_ENROLLMENTS_FETCH_HAS_ERRORED = 'MY_ENROLLMENTS_FETCH_HAS_ERRORED'
export const MY_ENROLLMENTS_FETCH_SUCCESS = 'MY_ENROLLMENTS_FETCH_SUCCESS'
export const MY_ENROLLMENTS_FETCH_IN_PROCESS = 'MY_ENROLLMENTS_FETCH_IN_PROCESS'

export function eventsIsLoading (bool) {
  return {
    type: MY_ENROLLMENTS_FETCH_IN_PROCESS
  }
}

function eventsHasErrored (error) {
  return {
    type: MY_ENROLLMENTS_FETCH_HAS_ERRORED,
    error
  }
}

function eventsFetchDataSuccess (enrollments) {
  return {
    type: MY_ENROLLMENTS_FETCH_SUCCESS,
    enrollments
  }
}

export function errorAfterFiveSeconds () {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(eventsHasErrored(true))
    }, 5000)
  }
}

export function loadMyEnrollments () {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.myEnrollments || !state.myEnrollments.isLoadedFromServer) {
      triggerFetchMyEnrollments()(dispatch)
    }
  }
}

function triggerFetchMyEnrollments () {
  return (dispatch) => {
    dispatch(eventsIsLoading(true))

    client.enrollments.getMyEnrollments()
      .then((response) => response.data)
      .then((events) => dispatch(eventsFetchDataSuccess(events)))
      .catch((error) => {
        console.error(error)
        dispatch(eventsHasErrored(true))
      })
  }
}
