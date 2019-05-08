import { goToURL } from '../utils/Navigation'
import { client } from '../utils/RestClient'
import { EVENT_FETCH_FROM_SERVER_SUCCESS } from './eventDetails'

export const IMAGE_UPLOAD_IN_PROCESS = 'IMAGE_UPLOAD_IN_PROCESS'
export const IMAGE_UPLOAD_HAS_ERRORED = 'IMAGE_UPLOAD_HAS_ERRORED'
export const IMAGE_UPLOAD_SUCCESS = 'IMAGE_UPLOAD_SUCCESS'

export const COVER_IMAGE_UPLOAD_IN_PROCESS = 'COVER_IMAGE_UPLOAD_IN_PROCESS'
export const COVER_IMAGE_UPLOAD_HAS_ERRORED = 'COVER_IMAGE_UPLOAD_HAS_ERRORED'
export const COVER_IMAGE_UPLOAD_SUCCESS = 'COVER_IMAGE_UPLOAD_SUCCESS'

export const IMAGE_DELETE_IN_PROCESS = 'IMAGE_DELETE_IN_PROCESS'
export const IMAGE_DELETE_HAS_ERRORED = 'IMAGE_DELETE_HAS_ERRORED'
export const IMAGE_DELETE_SUCCESS = 'IMAGE_DELETE_SUCCESS'

export const STRIPE_CONNECT_IN_PROCESS = 'STRIPE_CONNECT_IN_PROCESS'
export const STRIPE_CONNECT_HAS_ERRORED = 'STRIPE_CONNECT_HAS_ERRORED'
export const STRIPE_CONNECT_SUCCESS = 'STRIPE_CONNECT_SUCCESS'

export const EVENT_UPDATE_HAS_ERRORED = 'EVENT_UPDATE_HAS_ERRORED'
export const EVENT_UPDATE_SUCCESS = 'EVENT_UPDATE_SUCCESS'
export const EVENT_UPDATE_IN_PROGRESS = 'EVENT_UPDATE_IN_PROGRESS'

export function showEventInEditMode (eventId) {
  return (dispatch) => {
    dispatch(goToURL(`/event-edit/${eventId}/step-0`))
  }
}

function imageIsUploading () {
  return {
    type: IMAGE_UPLOAD_IN_PROCESS
  }
}

function imageUploadHasErrored (error) {
  return {
    type: IMAGE_UPLOAD_HAS_ERRORED,
    error
  }
}

function impageUploadSuccessful (event) {
  return {
    type: IMAGE_UPLOAD_SUCCESS,
    event
  }
}

function coverImageIsUploading () {
  return {
    type: COVER_IMAGE_UPLOAD_IN_PROCESS
  }
}

function coverImageUploadHasErrored (error) {
  return {
    type: COVER_IMAGE_UPLOAD_HAS_ERRORED,
    error
  }
}

function coverImpageUploadSuccessful (event) {
  return {
    type: COVER_IMAGE_UPLOAD_SUCCESS,
    event
  }
}

function eventFetchFromServerSuccess (event) {
  return {
    type: EVENT_FETCH_FROM_SERVER_SUCCESS,
    event
  }
}

export function uploadImageForEvent (file, eventId, dispatch) {
  dispatch(imageIsUploading())

  client.images.uploadImage(file, eventId)
    .then((response) => {
      const event = response.data
      dispatch(impageUploadSuccessful(event))
      return event
    })
    .then((event) => dispatch(eventFetchFromServerSuccess(event)))
    .catch((error) => {
      console.error(error)
      dispatch(imageUploadHasErrored(error))
    })
}

export function uploadCoverImageForEvent (file, eventId, dispatch) {
  dispatch(coverImageIsUploading())

  client.images.uploadCoverImage(file, eventId)
    .then((response) => {
      const event = response.data
      dispatch(coverImpageUploadSuccessful(event))
      return event
    })
    .then((event) => dispatch(eventFetchFromServerSuccess(event)))
    .catch((error) => {
      console.error(error)
      dispatch(coverImageUploadHasErrored(error))
    })
}

function imageIsDeleting () {
  return {
    type: IMAGE_DELETE_IN_PROCESS
  }
}

function imageDeleteHasErrored (error) {
  return {
    type: IMAGE_DELETE_HAS_ERRORED,
    error
  }
}

function imageDeleteSuccessful (event) {
  return {
    type: IMAGE_DELETE_SUCCESS,
    event
  }
}

function stripeConnectInProgress () {
  return {
    type: STRIPE_CONNECT_IN_PROCESS
  }
}

function stripeConnectHasErrored (error) {
  return {
    type: STRIPE_CONNECT_HAS_ERRORED,
    error
  }
}

function stripeConnectSuccessful (event) {
  return {
    type: STRIPE_CONNECT_SUCCESS,
    event
  }
}

function eventIsUpdating () {
  return {
    type: EVENT_UPDATE_IN_PROGRESS
  }
}

function eventUpdateHasErrored (error) {
  return {
    type: EVENT_UPDATE_HAS_ERRORED,
    error
  }
}

function eventUpdateSuccessFull (event) {
  return {
    type: EVENT_UPDATE_SUCCESS,
    event
  }
}

export function deleteImageForEvent (imageId, eventId, dispatch) {
  dispatch(imageIsDeleting())

  client.images.deleteImage(imageId, eventId)
    .then((response) => {
      const event = response.data
      dispatch(imageDeleteSuccessful(event))
      return event
    })
    .then((event) => dispatch(eventFetchFromServerSuccess(event)))
    .catch((error) => {
      console.error(error)
      dispatch(imageDeleteHasErrored(error))
    })
}

export function connectStripe (eventId, code) {
  return (dispatch) => {
    dispatch(stripeConnectInProgress())
    client.events.connectStripe(eventId, code)
      .then((response) => {
        const event = response.data
        dispatch(stripeConnectSuccessful(event))
        return event
      })
      .then((event) => dispatch(eventFetchFromServerSuccess(event)))
      .then(() => dispatch(goToURL(`/event-edit/${eventId}/step-3`)))
      .catch((error) => {
        console.error(error)
        dispatch(stripeConnectHasErrored(error))
      })
  }
}

export function updateEventToEdit (eventToUpdate, dispatch) {
  dispatch(eventIsUpdating())
  client.events.updateEvent(eventToUpdate)
    .then((response) => response.data)
    .then((event) => {
      dispatch(eventUpdateSuccessFull(event))
      return event
    })
    .then((event) => dispatch(eventFetchFromServerSuccess(event)))
    .catch((error) => {
      console.log(error)
      dispatch(eventUpdateHasErrored(error))
    })
}

export function submitEventToEdit (eventToUpdate, dispatch) {
  dispatch(eventIsUpdating())
  client.events.submitEventToEdit(eventToUpdate)
    .then((response) => response.data)
    .then((event) => {
      dispatch(eventUpdateSuccessFull(event))
      return event
    })
    .then((event) => dispatch(eventFetchFromServerSuccess(event)))
    .catch((error) => {
      console.log(error)
      dispatch(eventUpdateHasErrored(error))
    })
}

export function goToAllEvents (dispatch) {
  dispatch(goToURL(`/`))
}

export function goToNextStep (eventId, step) {
  return (dispatch) => dispatch(goToURL(`/event-edit/${eventId}/${step}`))
}

