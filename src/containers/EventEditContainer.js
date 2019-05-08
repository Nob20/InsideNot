import { connect } from 'react-redux'
import {
  updateEventToEdit,
  submitEventToEdit,
  uploadImageForEvent,
  deleteImageForEvent,
  goToAllEvents,
  uploadCoverImageForEvent,
  goToNextStep,
  connectStripe
} from '../actions/eventEdit'

import { loadEvent } from '../actions/eventDetails'
import EventFormStep1 from '../components/events/eventEdit/index'

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvent: (eventId) => dispatch(loadEvent(eventId)),
    updateEventToEdit: (event) => updateEventToEdit(event, dispatch),
    submitEventToEdit: (event) => submitEventToEdit(event, dispatch),
    goToStep: (eventId, step) => dispatch(goToNextStep(eventId, step)),
    connectStripe: (eventId, code) => dispatch(connectStripe(eventId, code)),
    deleteImage: (imageId, eventId) => deleteImageForEvent(imageId, eventId, dispatch),
    uploadImage: (file, eventId) => uploadImageForEvent(file, eventId, dispatch),
    uploadCoverImage: (file, eventId) => uploadCoverImageForEvent(file, eventId, dispatch),
    goToAllEvents: () => goToAllEvents(dispatch)
  }
}

const mapStateToProps = (state) => {
  const { eventId, hasErrored, isLoading, isLoadedFromServer, imagesState } = state.eventToEdit
  let event
  if (eventId) {
    event = state.allEvents.events && state.allEvents.events[eventId].event
  }
  return {
    event,
    hasErrored,
    isLoading,
    isLoadedFromServer,
    imagesState,
    storeState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFormStep1)
