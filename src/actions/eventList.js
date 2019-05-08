import { client } from '../utils/RestClient'
// import { normalize, schema } from 'normalizr'

export const LOAD_EVENTS = 'LOAD_EVENTS'
export const EVENTS_FETCH_HAS_ERRORED = 'EVENTS_FETCH_HAS_ERRORED'
export const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS'
export const EVENTS_FETCH_IN_PROCESS = 'EVENTS_FETCH_IN_PROCESS'

export function eventsIsLoading (bool) {
  return {
    type: EVENTS_FETCH_IN_PROCESS
  }
}

function eventsHasErrored (error) {
  return {
    type: EVENTS_FETCH_HAS_ERRORED,
    error
  }
}

function eventsFetchDataSuccess (events) {
  // const eventsSchema = new schema.Entity('events', { idAttribute: 'id' })
  // const normalizedData = normalize(events, [eventsSchema])
  // const eventEntities = normalizedData.entities.events
  return {
    type: EVENTS_FETCH_SUCCESS,
    events
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

export function loadEvents () {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.events || !state.events.isLoadedFromServer) {
      eventsFetchData()(dispatch)
    }
  }
}

export function eventsFetchData () {
  return (dispatch) => {
    dispatch(eventsIsLoading(true))

    return client.events.getEvents()
      .then((response) => response.data)
      .then((events) => dispatch(eventsFetchDataSuccess(events)))
      .catch((error) => {
        console.error(error)
        dispatch(eventsHasErrored(true))
      })
  }
}
