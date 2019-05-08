import { connectWithStore } from '../utils/ReduxUtils'
import { loadEvent } from '../actions/eventDetails'
import { askUserToLogin } from '../actions/login'
import { showEventInEditMode } from '../actions/eventEdit'
import { chargeUser, goToPaymentScreen } from '../actions/eventPayment'

import EventDetails from '../components/events/eventDetail/EventDetails'

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvent: (eventId) => dispatch(loadEvent(eventId)),
    showEventInEditMode: (eventId) => dispatch(showEventInEditMode(eventId)),
    askUserToLogin: (currentURL) => dispatch(askUserToLogin(currentURL)),
    chargeUser: (token, eventId) => dispatch(chargeUser(token, eventId)),
    goToPaymentScreen: (eventId) => dispatch(goToPaymentScreen(eventId))
  }
}

const mapStateToProps = (state) => {
  const { eventId, hasErrored, isLoading, isLoadedFromServer } = state.eventDetails
  let event
  if (eventId) {
    event = state.allEvents.events && state.allEvents.events[eventId].event
  }
  return {
    event,
    hasErrored,
    isLoading,
    isLoadedFromServer,
    loggedInUser: state.login && state.login.loggedInUser,
    storeState: state
  }
}

export default connectWithStore(EventDetails, mapStateToProps, mapDispatchToProps)
