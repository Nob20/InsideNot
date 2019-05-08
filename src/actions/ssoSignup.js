import { goToURL } from '../utils/Navigation'
import { deleteAllCookies } from '../utils/Cookie'
export const GOT_USER_DETAILS_FROM_SSO_PROVIDER = 'GOT_USER_DETAILS_FROM_SSO_PROVIDER'

function gotUserDetailsFromSsoProvider (ssoUser) {
  return {
    type: GOT_USER_DETAILS_FROM_SSO_PROVIDER,
    ssoUser
  }
}

export function useAnotherEmail (dispatch) {
  deleteAllCookies()
  dispatch(goToURL(`/login`))
}

export function completeSsoSignup (user, dispatch) {
  dispatch(gotUserDetailsFromSsoProvider(user))
  dispatch(goToURL(`/sso-signup`))
}
