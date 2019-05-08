import { getCookie } from '../utils/Cookie'
import { AUTH_CONSTANTS } from '../utils/Constants'

export function initializeApp () {
  let authCookie = getCookie(AUTH_CONSTANTS.AUTH_COOKIE_NAME)
  if (authCookie) {
    // loginExistingUser()
  }
}
