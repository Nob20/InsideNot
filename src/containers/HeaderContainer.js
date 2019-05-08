import { connectWithStore } from '../utils/ReduxUtils'
import { createNewEvent } from '../actions/eventCreate'
import { logoutUserAndGoToLogin } from '../actions/login'
import { goToMyEnrollments, goToMyEvents, becomeATrainer } from '../actions/header'
import Header from '../components/header/Header'

const mapDispatchToProps = (dispatch) => {
  return {
    createNewEvent: (event) => dispatch(createNewEvent(event)),
    logoutUserAndGoToLogin: () => dispatch(logoutUserAndGoToLogin()),
    becomeATrainer: () => dispatch(becomeATrainer()),
    goToMyEnrollments: () => dispatch(goToMyEnrollments()),
    goToMyEvents: () => dispatch(goToMyEvents())
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.login.loggedInUser,
    storeState: state
  }
}

export default connectWithStore(
  Header,
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)
