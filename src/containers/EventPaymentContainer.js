import { connectWithStore } from '../utils/ReduxUtils'
import { loadEvent } from '../actions/eventDetails'
import EventPayment from '../components/events/eventPayment/EventPayment'
import { chargeUser } from '../actions/eventPayment'

const mapDispatchToProps = (dispatch) => {
  return {
    chargeUser: (token, eventId) => dispatch(chargeUser(token, eventId)),
    loadEvent: (eventId) => dispatch(loadEvent(eventId))
  }
}

const mapStateToProps = (state) => {
  const { eventId } = state.eventDetails
  let event
  if (eventId) {
    event = state.allEvents.events && state.allEvents.events[eventId].event
  }
  return {
    event,
    eventDetails: state.eventDetails,
    eventPayment: state.eventPayment,
    loggedInUser: state.login && state.login.loggedInUser,
    storeState: state
  }
}

export default connectWithStore(EventPayment, mapStateToProps, mapDispatchToProps)
