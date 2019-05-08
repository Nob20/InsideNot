import 'whatwg-fetch'
import { goToURL } from '../utils/Navigation'
import { client } from '../utils/RestClient'

export const EVENT_CREATION_IN_PROCESS = 'EVENT_CREATION_IN_PROCESS'
export const EVENT_CREATION_HAS_ERRORED = 'EVENT_CREATION_HAS_ERRORED'
import { EVENT_FETCH_FROM_SERVER_SUCCESS } from './eventDetails'

export function creatingNewEventInProcess (bool) {
  return {
    type: EVENT_CREATION_IN_PROCESS,
    inProcess: bool
  }
}

function creatingNewEventErrored (bool) {
  return {
    type: EVENT_CREATION_HAS_ERRORED,
    hasErrored: bool
  }
}

function eventFetchFromServerSuccess (event) {
  return {
    type: EVENT_FETCH_FROM_SERVER_SUCCESS,
    event
  }
}

export function errorAfterFiveSeconds () {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(creatingNewEventErrored(true))
    }, 5000)
  }
}

export function createNewEvent (event) {
  return (dispatch) => {
    dispatch(creatingNewEventInProcess(true))

    client.events.createEvent(event)
      .then((response) => response.data)
      .then((event) => dispatch(eventFetchFromServerSuccess(event)))
      .then(() => dispatch(goToURL(`event-edit/${event.id}/step-0`)))
      .catch(() => dispatch(creatingNewEventErrored(true)))
  }
}
