import { connectWithStore } from '../utils/ReduxUtils'
import { loadEvent } from '../actions/eventDetails'
import { goToHomePage } from '../actions/navigation'
import PaymentSuccess from '../components/events/paymentSuccess/PaymentSuccess'

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvent: (eventId) => dispatch(loadEvent(eventId)),
    goToHomePage: () => dispatch(goToHomePage())
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
    loggedInUser: state.login && state.login.loggedInUser,
    storeState: state
  }
}

export default connectWithStore(PaymentSuccess, mapStateToProps, mapDispatchToProps)
