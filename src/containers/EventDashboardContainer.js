import { connectWithStore } from '../utils/ReduxUtils'
import { loadEvent, loadEventEnrollments, inviteAdmin, gotToEventDashboardTab, removeAdmin, removeInvitedAdmin } from '../actions/eventDetails'
import { showEventInEditMode } from '../actions/eventEdit'
import EventDashboard from '../components/events/eventDashboard/EventDashboard'

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvent: (eventId) => dispatch(loadEvent(eventId)),
    inviteAdmin: (eventId, adminName, adminEmail) => dispatch(inviteAdmin(eventId, adminName, adminEmail)),
    removeAdmin: (eventId, adminId) => dispatch(removeAdmin(eventId, adminId)),
    removeInvitedAdmin: (eventId, adminEmail) => dispatch(removeInvitedAdmin(eventId, adminEmail)),
    loadEventEnrollments: (eventId) => dispatch(loadEventEnrollments(eventId)),
    showEventInEditMode: (eventId) => dispatch(showEventInEditMode(eventId)),
    gotToTab: (eventId, tabName) => dispatch(gotToEventDashboardTab(eventId, tabName))
  }
}

const mapStateToProps = (state) => {
  const { eventId, hasErrored, isLoading, isLoadedFromServer, eventEnrollments } = state.eventDetails
  let event
  if (eventId) {
    event = state.allEvents.events && state.allEvents.events[eventId].event
  }
  return {
    event,
    hasErrored,
    isLoading,
    isLoadedFromServer,
    eventEnrollments,
    loggedInUser: state.login && state.login.loggedInUser,
    storeState: state
  }
}

export default connectWithStore(EventDashboard, mapStateToProps, mapDispatchToProps)
