import { connectWithStore } from '../utils/ReduxUtils'
import { becomeATrainer } from '../actions/signup'

import BecomeATrainer from '../components/becomeATrainer/BecomeATrainer'

const mapDispatchToProps = (dispatch) => {
  return {
    becomeATrainer: (trainer) => dispatch(becomeATrainer(trainer))
  }
}

const mapStateToProps = (state) => {
  return {
    storeState: state
  }
}

export default connectWithStore(BecomeATrainer, mapStateToProps, mapDispatchToProps)
