import { EVENTS_FETCH_SUCCESS } from '../actions/eventList'
import { EVENT_UPDATE_SUCCESS } from '../actions/eventEdit'
import { EVENT_FETCH_FROM_SERVER_SUCCESS } from '../actions/eventDetails'

const ACTION_HANDLERS = {

  [EVENTS_FETCH_SUCCESS]: (state, action) => {
    const copyOfState = Object.assign({}, state)
    action.events.forEach((event) => {
      copyOfState.events[event.id] = {
        event,
        isLoadedFromServer: true,
        isLoading: false,
        hasErrored: false
      }
    })
    return copyOfState
  },

  [EVENT_FETCH_FROM_SERVER_SUCCESS]: (state, action) => {
    const copyOfState = Object.assign({}, state)
    copyOfState.events[action.event.id] = {
      event: action.event,
      isLoadedFromServer: true,
      isLoading: false,
      hasErrored: false
    }

    return copyOfState
  },

  [EVENT_UPDATE_SUCCESS]: (state, action) => {
    const copyOfState = Object.assign({}, state)
    copyOfState.events[action.event.id] = {
      event: action.event,
      isLoadedFromServer: true,
      isLoading: false,
      hasErrored: false
    }

    return copyOfState
  }
}

const initialState = {
  events : {}
}

export default function eventsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

