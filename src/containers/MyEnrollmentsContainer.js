import { connectWithStore } from '../utils/ReduxUtils'
import { loadMyEnrollments } from '../actions/myEnrollments'
import { showEventInEditMode } from '../actions/eventEdit'
import { goToEventDetails } from '../actions/eventDetails'

import MyEnrollments from '../components/events/myEnrollments/MyEnrollments'

const mapDispatchToProps = (dispatch) => {
  return {
    loadMyEnrollments: () => dispatch(loadMyEnrollments()),
    showEventInEditMode: (eventId) => dispatch(showEventInEditMode(eventId)),
    goToEventDetails: (eventId) => dispatch(goToEventDetails(eventId))

  }
}

const mapStateToProps = (state) => {
  const { isLoadedFromServer, isLoading, hasErrored } = state.myEnrollments
  let { enrollments } = state.myEnrollments
  if (enrollments) {
    enrollments = Object.values(enrollments)
  }
  return {
    enrollments,
    isLoadedFromServer,
    isLoading,
    hasErrored,
    storeState: state
  }
}

export default connectWithStore(MyEnrollments, mapStateToProps, mapDispatchToProps)
