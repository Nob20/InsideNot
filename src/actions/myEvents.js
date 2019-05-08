import { normalize, schema } from 'normalizr'
import { client } from '../utils/RestClient'

export const LOAD_MY_EVENTS = 'LOAD_MY_EVENTS'
export const MY_EVENTS_FETCH_HAS_ERRORED = 'MY_EVENTS_FETCH_HAS_ERRORED'
export const MY_EVENTS_FETCH_SUCCESS = 'MY_EVENTS_FETCH_SUCCESS'
export const MY_EVENTS_FETCH_IN_PROCESS = 'MY_EVENTS_FETCH_IN_PROCESS'

export const EVENT_ARCHIVE_HAS_ERRORED = 'EVENT_ARCHIVE_HAS_ERRORED'
export const EVENT_ARCHIVE_IN_PROGRESS = 'EVENT_ARCHIVE_IN_PROGRESS'

function eventDeleteInProgress (eventId) {
  return {
    type: EVENT_ARCHIVE_IN_PROGRESS,
    eventId
  }
}

function eventDeleteHasErrored (error, eventId) {
  return {
    type: EVENT_ARCHIVE_HAS_ERRORED,
    error,
    eventId
  }
}

export function eventsIsLoading (bool) {
  return {
    type: MY_EVENTS_FETCH_IN_PROCESS
  }
}

function eventsHasErrored (error) {
  return {
    type: MY_EVENTS_FETCH_HAS_ERRORED,
    error
  }
}

function eventsFetchDataSuccess (events) {
  const eventsSchema = new schema.Entity('events', { idAttribute: 'id' })
  const normalizedData = normalize(events, [eventsSchema])
  const eventEntities = normalizedData.entities.events
  return {
    type: MY_EVENTS_FETCH_SUCCESS,
    events: eventEntities
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

export function loadMyEvents () {
  return (dispatch) => {
    dispatch(eventsIsLoading(true))

    client.events.getMyEvents()
      .then((response) => response.data)
      .then((events) => dispatch(eventsFetchDataSuccess(events)))
      .catch((error) => {
        console.error(error)
        dispatch(eventsHasErrored(true))
      })
  }
}

export function showEventPreview (eventId) {
  window.open(`/events/${eventId}`, '_blank')
}

export function archiveEvent (eventId) {
  return (dispatch) => {
    dispatch(eventDeleteInProgress(eventId))
    client.events.deleteEvent(eventId)
      .then(() => {
        dispatch(loadMyEvents())
      })
      .catch((error) => {
        console.log(error)
        dispatch(eventDeleteHasErrored(error, eventId))
      })
  }
}

