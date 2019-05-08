import {
  IMAGE_UPLOAD_IN_PROCESS, IMAGE_UPLOAD_HAS_ERRORED, IMAGE_UPLOAD_SUCCESS,
  COVER_IMAGE_UPLOAD_IN_PROCESS, COVER_IMAGE_UPLOAD_HAS_ERRORED, COVER_IMAGE_UPLOAD_SUCCESS,
  IMAGE_DELETE_IN_PROCESS, IMAGE_DELETE_HAS_ERRORED, IMAGE_DELETE_SUCCESS
} from '../actions/eventEdit'
import {
  EVENT_FETCH_FROM_STORE_SUCCESS, EVENT_FETCH_HAS_ERRORED, EVENT_FETCH_IN_PROGRESS, EVENT_FETCH_FROM_SERVER_SUCCESS
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

  [IMAGE_UPLOAD_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    imagesState: {
      isLoading: true,
      hasErrored: false
    }
  }),
  [IMAGE_UPLOAD_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    imagesState: {
      isLoading: false,
      hasErrored: true
    }
  }),
  [IMAGE_UPLOAD_SUCCESS]: (state, action) => Object.assign({}, state, {
    event: action.event,
    imagesState: {
      isLoading: false,
      hasErrored: false
    }
  }),
  [COVER_IMAGE_UPLOAD_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    imagesState: {
      isCoverLoading: true,
      hasErrored: false
    }
  }),
  [COVER_IMAGE_UPLOAD_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    imagesState: {
      isCoverLoading: false,
      hasErrored: true
    }
  }),
  [COVER_IMAGE_UPLOAD_SUCCESS]: (state, action) => Object.assign({}, state, {
    event: action.event,
    imagesState: {
      isCoverLoading: false,
      hasErrored: false
    }
  }),

  [IMAGE_DELETE_IN_PROCESS]: (state, action) => Object.assign({}, state, {
    imagesStateDelete: {
      isLoading: true,
      hasErrored: false
    }
  }),
  [IMAGE_DELETE_HAS_ERRORED]: (state, action) => Object.assign({}, state, {
    imagesStateDelete: {
      isLoading: false,
      hasErrored: true
    }
  }),
  [IMAGE_DELETE_SUCCESS]: (state, action) => Object.assign({}, state, {
    event: action.event,
    imagesState: {
      isLoading: false,
      hasErrored: false
    }
  })

}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  isLoadedFromServer: false,
  isLoading: false,
  hasErrored: false,
  imagesState: {
    isLoading: false,
    hasErrored: false
  }
}

export default function eventEditReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  const reducedState = handler ? handler(state, action) : state
  return reducedState
}
