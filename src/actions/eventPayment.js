import { client } from '../utils/RestClient'
import { goToURL } from '../utils/Navigation'

export const PAYMENT_HAS_ERRORED = 'PAYMENT_HAS_ERRORED'
export const PAYMENT_SUCCESSFUL = 'PAYMENT_FROM_SERVER_SUCCESS'
export const PAYMENT_IN_PROCESS = 'PAYMENT_IN_PROCESS'

export function paymentInProcess () {
  return {
    type: PAYMENT_IN_PROCESS
  }
}

function paymentHasErrored (error) {
  return {
    type: PAYMENT_HAS_ERRORED,
    error
  }
}

function paymentSuccessful (eventId) {
  return {
    type: PAYMENT_SUCCESSFUL,
    eventId
  }
}

export function goToPaymentScreen (eventId) {
  return (dispatch) => dispatch(goToURL(`/events/${eventId}/payment`))
}

export function chargeUser (token, eventId) {
  return (dispatch) => {
    dispatch(paymentInProcess())

    client.payment.chargeUser(token, eventId)
      .then((response) => dispatch(paymentSuccessful(response.data)))
      .then(() => dispatch(goToURL(`/events/${eventId}/payment-success`)))
      .catch((error) => {
        console.error(error)
        dispatch(paymentHasErrored(error))
      })
  }
}
