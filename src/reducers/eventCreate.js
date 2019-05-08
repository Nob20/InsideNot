import { EVENT_CREATION_HAS_ERRORED, EVENT_CREATION_IN_PROCESS } from '../actions/eventCreate'

const ACTION_HANDLERS = {
  [EVENT_CREATION_HAS_ERRORED]: (state, action) => Object.assign({}, state, { hasErrored: true, inProcess: false }),
  [EVENT_CREATION_IN_PROCESS]: (state, action) => Object.assign({}, state, { inProcess: true, hasErrored: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  inProcess: false,
  hasErrored: false
}
export default function eventCreationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
