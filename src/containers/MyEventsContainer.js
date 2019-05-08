import { connectWithStore } from '../utils/ReduxUtils'
import { loadMyEvents, showEventPreview, archiveEvent } from '../actions/myEvents'
import { goToEventDetails, gotToEventDashboardTab } from '../actions/eventDetails'
import MyEvents from '../components/events/myEvents/MyEvents'

const mapDispatchToProps = (dispatch) => {
  return {
    loadMyEvents: () => dispatch(loadMyEvents()),
    showEventPreview: (eventId) => showEventPreview(eventId),
    goToEventDashboard: (eventId) => dispatch(gotToEventDashboardTab(eventId, 'details')),
    archiveEvent: (eventId) => dispatch(archiveEvent(eventId)),
    goToEventDetails: (eventId) => dispatch(goToEventDetails(eventId))
  }
}

const mapStateToProps = (state) => {
  const { isLoadedFromServer, isLoading, hasErrored } = state.myEvents
  let { events } = state.myEvents
  let { eventDelete } = state.myEvents
  if (events) {
    events = Object.values(events)
  }
  return {
    events,
    eventDelete,
    isLoadedFromServer,
    isLoading,
    hasErrored,
    storeState: state
  }
}

export default connectWithStore(MyEvents, mapStateToProps, mapDispatchToProps)
