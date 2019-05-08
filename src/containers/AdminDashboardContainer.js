import { connectWithStore } from '../utils/ReduxUtils'
import { loadAllUsers, loadAllEvents, loadAllEnrollments, impersonateUser,
showAllEnrollments, showAllEvents, showAllUsers, gotToTab } from '../actions/adminDashboard'

import AdminDashboard from '../components/admin/AdminDashboard'

const mapDispatchToProps = (dispatch) => {
  return {
    impersonateUser: (userId) => dispatch(impersonateUser(userId)),
    loadAllUsers: (eventId) => dispatch(loadAllUsers(eventId)),
    loadAllEvents: (eventId) => dispatch(loadAllEvents(eventId)),
    loadAllEnrollments: (eventId) => dispatch(loadAllEnrollments(eventId)),
    showAllEvents: () => dispatch(showAllEvents()),
    showAllUsers: () => dispatch(showAllUsers()),
    showAllEnrollments: () => dispatch(showAllEnrollments()),
    gotToTab: (tabName) => dispatch(gotToTab(tabName))
  }
}

const mapStateToProps = (state) => {
  const { allUsers, allEvents, allEnrollments } = state.adminDashboard
  return {
    allUsers,
    allEvents,
    allEnrollments,
    storeState: state
  }
}

export default connectWithStore(AdminDashboard, mapStateToProps, mapDispatchToProps)
