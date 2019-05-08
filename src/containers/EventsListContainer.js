import { connectWithStore } from '../utils/ReduxUtils'
import { loadEvents } from '../actions/eventList'
import { showEventInEditMode } from '../actions/eventEdit'
import { goToEventDetails } from '../actions/eventDetails'

import EventList from '../components/events/eventlist/EventList'

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: () => dispatch(loadEvents()),
    showEventInEditMode: (eventId) => dispatch(showEventInEditMode(eventId)),
    goToEventDetails: (eventId) => dispatch(goToEventDetails(eventId))

  }
}

const mapStateToProps = (state) => {
  const { isLoadedFromServer, isLoading, hasErrored } = state.events
  const allEvents = state.allEvents.events
  let { events } = state.events
  let eventsArray = []
  if (events) {
    eventsArray = events.map(eventId => allEvents[eventId].event)
  }
  return {
    events: eventsArray,
    isLoadedFromServer,
    isLoading,
    hasErrored,
    storeState: state
  }
}

export default connectWithStore(EventList, mapStateToProps, mapDispatchToProps)
