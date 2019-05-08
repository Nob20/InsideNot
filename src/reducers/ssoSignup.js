import { GOT_USER_DETAILS_FROM_SSO_PROVIDER } from '../actions/ssoSignup'
import { defaultReducerHandler } from '../utils/ReducerUtils'

const ACTION_HANDLERS = {
  [GOT_USER_DETAILS_FROM_SSO_PROVIDER]: (state, action) => Object.assign({}, state, { ssoUser: action.ssoUser.user })
}

export default defaultReducerHandler(ACTION_HANDLERS, {})

