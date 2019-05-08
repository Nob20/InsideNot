import { goToURL } from '../utils/Navigation'
import { loginSuccess } from './login'
import { client } from '../utils/RestClient'

export const USER_CREATION_IN_PROCESS = 'USER_CREATION_IN_PROCESS'
export const USER_CREATION_HAS_ERRORED = 'USER_CREATION_HAS_ERRORED'
export const USER_CREATION_SUCCESS = 'USER_CREATION_SUCCESS'

export const BECOME_A_TRAINER_IN_PROCESS = 'BECOME_A_TRAINER_IN_PROCESS'
export const BECOME_A_TRAINER_HAS_ERRORED = 'BECOME_A_TRAINER_HAS_ERRORED'
export const BECOME_A_TRAINER_SUCCESS = 'BECOME_A_TRAINER_SUCCESS'

export function creatingNewUserInProcess () {
  return {
    type: USER_CREATION_IN_PROCESS
  }
}

function creatingNewUserErrored (error) {
  return {
    type: USER_CREATION_HAS_ERRORED,
    error: error && error.code
  }
}

function creatingNewUserSuccess (data) {
  return {
    type: USER_CREATION_SUCCESS,
    user: data.user,
    receivedAt: Date.now(),
    inProcess: true
  }
}

export function becomeATrainerInProcess () {
  return {
    type: BECOME_A_TRAINER_IN_PROCESS
  }
}

function becomeATrainerErrored (error) {
  return {
    type: BECOME_A_TRAINER_HAS_ERRORED,
    error: error && error.code
  }
}

function becomeATrainerSuccess (data) {
  return {
    type: BECOME_A_TRAINER_SUCCESS,
    user: data.user,
    receivedAt: Date.now(),
    inProcess: true
  }
}

export function errorAfterFiveSeconds () {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(creatingNewUserErrored(true))
    }, 5000)
  }
}

export function goToLoginScreen () {
  return (dispatch) => dispatch(goToURL(`login`))
}

export function completeSignupOfSSOUser (user, dispatch) {
  dispatch(creatingNewUserInProcess())
  const signupPromise = client.auth.completeSignupOfSSOUser(user)
  handleCompleteSignupPromise(signupPromise, dispatch)
}

export function createNewUser (user) {
  return (dispatch) => {
    dispatch(creatingNewUserInProcess())
    const signupPromise = client.auth.createNewUser(user)
    handleCompleteSignupPromise(signupPromise, dispatch)
  }
}

export function becomeATrainer (user) {
  return (dispatch) => {
    dispatch(becomeATrainerInProcess())
    const becomeTrainerPromise = client.auth.becomeATrainer(user)
    handleBecomeATrainerPromise(becomeTrainerPromise, dispatch)
  }
}

function handleCompleteSignupPromise (signupPromise, dispatch) {
  signupPromise
    .then((response) => {
      if (!response.data) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => {
      dispatch(creatingNewUserSuccess(response.data))
      return response
    })
    .then((response) => dispatch(loginSuccess(response.data)))
    .then(() => dispatch(goToURL(`/`)))
    .catch((error) => {
      console.error(error)
      return dispatch(creatingNewUserErrored(error.response && error.response.data))
    })
}

function handleBecomeATrainerPromise (signupPromise, dispatch) {
  signupPromise
    .then((response) => {
      if (!response.data) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => {
      dispatch(becomeATrainerSuccess(response.data))
      return response
    })
    .then((response) => dispatch(loginSuccess(response.data)))
    .then(() => dispatch(goToURL(`/my-events`)))
    .catch((error) => {
      console.error(error)
      return dispatch(becomeATrainerErrored(error.response && error.response.data))
    })
}
