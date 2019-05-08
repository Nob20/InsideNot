import { connect } from 'react-redux'
import { loginExistingUser } from './../actions/login'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'

const mapDispatchToProps = (dispatch) => {
  return {
    loginExistingUser:  () => dispatch(loginExistingUser())
  }
}

const mapStateToProps = (state) => {
  return {
    storeState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
