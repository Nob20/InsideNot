import { goToURL } from '../utils/Navigation'
import { client } from '../utils/RestClient'

export const EVENT_FETCH_HAS_ERRORED = 'EVENT_FETCH_HAS_ERRORED'
export const EVENT_FETCH_FROM_SERVER_SUCCESS = 'EVENT_FETCH_FROM_SERVER_SUCCESS'
export const EVENT_FETCH_FROM_STORE_SUCCESS = 'EVENT_FETCH_FROM_STORE_SUCCESS'
export const EVENT_FETCH_IN_PROGRESS = 'EVENT_FETCH_IN_PROGRESS'

export const EVENT_ENROLLMENTS_FETCH_HAS_ERRORED = 'EVENT_ENROLLMENTS_FETCH_HAS_ERRORED'
export const EVENT_ENROLLMENTS_FETCH_SUCCESS = 'EVENT_ENROLLMENTS_FETCH_SUCCESS'
export const EVENT_ENROLLMENTS_FETCH_IN_PROCESS = 'EVENT_ENROLLMENTS_FETCH_IN_PROCESS'

export const INVITE_ADMIN_HAS_ERRORED = 'INVITE_ADMIN_HAS_ERRORED'
export const INVITE_ADMIN_SUCCESS = 'INVITE_ADMIN_SUCCESS'
export const INVITE_ADMIN_IN_PROCESS = 'INVITE_ADMIN_IN_PROCESS'

export const REMOVE_ADMIN_HAS_ERRORED = 'REMOVE_ADMIN_HAS_ERRORED'
export const REMOVE_ADMIN_SUCCESS = 'REMOVE_ADMIN_SUCCESS'
export const REMOVE_ADMIN_IN_PROCESS = 'REMOVE_ADMIN_IN_PROCESS'

export function eventIsLoading () {
  return {
    type: EVENT_FETCH_IN_PROGRESS
  }
}

function eventHasErrored (error) {
  return {
    type: EVENT_FETCH_HAS_ERRORED,
    error
  }
}

function eventFetchFromServerSuccess (event) {
  return {
    type: EVENT_FETCH_FROM_SERVER_SUCCESS,
    event
  }
}

function eventFetchFromStoreSuccess (event) {
  return {
    type: EVENT_FETCH_FROM_STORE_SUCCESS,
    event
  }
}

export function loadEvent (eventId) {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.events || !state.events.isLoadedFromServer || !state.events.events || !state.events.events[eventId]) {
      getEventDetailsFromServer(eventId)(dispatch)
    } else {
      dispatch(eventFetchFromStoreSuccess(state.events.events[eventId]))
    }
  }
}

export function getEventDetailsFromServer (eventId) {
  return (dispatch) => {
    dispatch(eventIsLoading(true))

    return client.events.getEvent(eventId)
      .then((response) => dispatch(eventFetchFromServerSuccess(response.data)))
      .catch((error) => {
        console.error(error)
        dispatch(eventHasErrored(true))
      })
  }
}

export function goToEventDetails (eventId) {
  return goToURL(`/events/${eventId}`)
}

export function eventEnrollmentsIsLoading (bool) {
  return {
    type: EVENT_ENROLLMENTS_FETCH_IN_PROCESS
  }
}

function eventEnrollmentsHasErrored (error) {
  return {
    type: EVENT_ENROLLMENTS_FETCH_HAS_ERRORED,
    error
  }
}

function eventEnrollmentsFetchDataSuccess (eventEnrollments) {
  return {
    type: EVENT_ENROLLMENTS_FETCH_SUCCESS,
    eventEnrollments
  }
}

export function loadEventEnrollments (eventId) {
  return (dispatch) => {
    dispatch(eventEnrollmentsIsLoading(true))
    client.event.getEventEnrollments(eventId)
      .then((response) => response.data)
      .then((eventEnrollments) => dispatch(eventEnrollmentsFetchDataSuccess(eventEnrollments)))
      .catch((error) => {
        console.error(error)
        dispatch(eventEnrollmentsHasErrored(true))
      })
  }
}

function inviteAdminInProgress (bool) {
  return {
    type: INVITE_ADMIN_IN_PROCESS
  }
}

function inviteAdminHasErrored (error) {
  return {
    type: INVITE_ADMIN_HAS_ERRORED,
    error
  }
}

function inviteAdminSuccess (event) {
  return {
    type: INVITE_ADMIN_SUCCESS,
    event
  }
}

function removeAdminInProgress () {
  return {
    type: REMOVE_ADMIN_IN_PROCESS
  }
}

function removeAdminHasErrored (error) {
  return {
    type: REMOVE_ADMIN_HAS_ERRORED,
    error
  }
}

function removeAdminSuccess (event) {
  return {
    type: REMOVE_ADMIN_SUCCESS,
    event
  }
}

export function inviteAdmin (eventId, adminName, adminEmail) {
  return (dispatch) => {
    dispatch(inviteAdminInProgress(true))

    client.event.inviteAdmin(eventId, adminName, adminEmail)
      .then((response) => {
        dispatch(eventFetchFromServerSuccess(response.data))
        return response.data
      })
      .then((response) => dispatch(inviteAdminSuccess(response.data)))
      .catch((error) => {
        console.error(error)
        dispatch(inviteAdminHasErrored(error))
      })
  }
}

export function removeAdmin (eventId, adminId) {
  return (dispatch) => {
    dispatch(removeAdminInProgress())

    client.event.removeAdmin(eventId, adminId)
      .then((response) => {
        dispatch(eventFetchFromServerSuccess(response.data))
        return response.data
      })
      .then((response) => dispatch(removeAdminSuccess(response.data)))
      .catch((error) => {
        console.error(error)
        dispatch(removeAdminHasErrored(error))
      })
  }
}

export function removeInvitedAdmin (eventId, adminEmail) {
  return (dispatch) => {
    dispatch(removeAdminInProgress())

    client.event.removeInvitedAdmin(eventId, adminEmail)
      .then((response) => {
        dispatch(eventFetchFromServerSuccess(response.data))
        return response.data
      })
      .then((response) => dispatch(removeAdminSuccess(response.data)))
      .catch((error) => {
        console.error(error)
        dispatch(removeAdminHasErrored(error))
      })
  }
}

export function gotToEventDashboardTab (eventId, tabName) {
  return goToURL(`/event-dashboard/${eventId}/${tabName}`)
}

