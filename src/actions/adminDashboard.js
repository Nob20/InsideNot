import { client } from '../utils/RestClient'
import { loginSuccess } from './login'
import { goToURL } from '../utils/Navigation'

export const ALL_EVENTS_FETCH_HAS_ERRORED = 'ALL_EVENTS_FETCH_HAS_ERRORED'
export const ALL_EVENTS_FETCH_SUCCESS = 'ALL_EVENTS_FETCH_SUCCESS'
export const ALL_EVENTS_FETCH_IN_PROCESS = 'ALL_EVENTS_FETCH_IN_PROCESS'

export const ALL_ENROLLMENTS_FETCH_HAS_ERRORED = 'ALL_ENROLLMENTS_FETCH_HAS_ERRORED'
export const ALL_ENROLLMENTS_FETCH_SUCCESS = 'ALL_ENROLLMENTS_FETCH_SUCCESS'
export const ALL_ENROLLMENTS_FETCH_IN_PROCESS = 'ALL_ENROLLMENTS_FETCH_IN_PROCESS'

export const ALL_USERS_FETCH_HAS_ERRORED = 'ALL_USERS_FETCH_HAS_ERRORED'
export const ALL_USERS_FETCH_SUCCESS = 'ALL_USERS_FETCH_SUCCESS'
export const ALL_USERS_FETCH_IN_PROCESS = 'ALL_USERS_FETCH_IN_PROCESS'

export function showAllEvents () {
  return goToURL(`/admin-dashboard/events`)
}

export function showAllUsers () {
  return goToURL(`/admin-dashboard/users`)
}

export function showAllEnrollments () {
  return goToURL(`/admin-dashboard/enrollments`)
}

export function gotToTab (tabName) {
  return goToURL(`/admin-dashboard/${tabName}`)
}

export function allEventsIsLoading (bool) {
  return {
    type: ALL_EVENTS_FETCH_IN_PROCESS
  }
}

function allEventsHasErrored (error) {
  return {
    type: ALL_EVENTS_FETCH_HAS_ERRORED,
    error
  }
}

function allEventsFetchDataSuccess (allEvents) {
  return {
    type: ALL_EVENTS_FETCH_SUCCESS,
    allEvents
  }
}

export function loadAllEvents () {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.allEvents || !state.allEvents.isLoadedFromServer) {
      allEventsFetchData()(dispatch)
    }
  }
}

function allEventsFetchData () {
  return (dispatch) => {
    dispatch(allEventsIsLoading(true))

    client.admin.getAllEvents()
      .then((response) => response.data)
      .then((allEvents) => dispatch(allEventsFetchDataSuccess(allEvents)))
      .catch((error) => {
        console.error(error)
        dispatch(allEventsHasErrored(true))
      })
  }
}

export function allUsersIsLoading (bool) {
  return {
    type: ALL_USERS_FETCH_IN_PROCESS
  }
}

function allUsersHasErrored (error) {
  return {
    type: ALL_USERS_FETCH_HAS_ERRORED,
    error
  }
}

function allUsersFetchDataSuccess (allUsers) {
  return {
    type: ALL_USERS_FETCH_SUCCESS,
    allUsers
  }
}

export function impersonateUser (userId) {
  return (dispatch) => {
    client.admin.impersonateUser(userId)
      .then((response) => response.data)
      .then((user) => {
        dispatch(loginSuccess(user))
        window.location.replace(`/`)
      })
      .catch((error) => {
        console.error(error)
        dispatch(allUsersHasErrored(true))
      })
  }
}

export function loadAllUsers () {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.allUsers || !state.allUsers.isLoadedFromServer) {
      allUsersFetchData()(dispatch)
    }
  }
}

function allUsersFetchData () {
  return (dispatch) => {
    dispatch(allUsersIsLoading(true))

    client.admin.getAllUsers()
      .then((response) => response.data)
      .then((allUsers) => dispatch(allUsersFetchDataSuccess(allUsers)))
      .catch((error) => {
        console.error(error)
        dispatch(allUsersHasErrored(true))
      })
  }
}

export function allEnrollmentsIsLoading (bool) {
  return {
    type: ALL_ENROLLMENTS_FETCH_IN_PROCESS
  }
}

function allEnrollmentsHasErrored (error) {
  return {
    type: ALL_ENROLLMENTS_FETCH_HAS_ERRORED,
    error
  }
}

function allEnrollmentsFetchDataSuccess (allEnrollments) {
  return {
    type: ALL_ENROLLMENTS_FETCH_SUCCESS,
    allEnrollments
  }
}

export function loadAllEnrollments () {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.allEnrollments || !state.allEnrollments.isLoadedFromServer) {
      allEnrollmentsFetchData()(dispatch)
    }
  }
}

function allEnrollmentsFetchData () {
  return (dispatch) => {
    dispatch(allEnrollmentsIsLoading(true))

    client.admin.getAllEnrollments()
      .then((response) => response.data)
      .then((allEnrollments) => dispatch(allEnrollmentsFetchDataSuccess(allEnrollments)))
      .catch((error) => {
        console.error(error)
        dispatch(allEnrollmentsHasErrored(true))
      })
  }
}
