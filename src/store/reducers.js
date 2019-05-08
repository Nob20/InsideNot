import { combineReducers } from 'redux'
import adminDashboardReducer from '../reducers/adminDashboard'
import locationReducer from '../reducers/location'
import eventCreateReducer from '../reducers/eventCreate'
import eventToEditReducer from '../reducers/eventEdit'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import loginReducer from '../reducers/login'
import eventDetailsReducer from '../reducers/eventDetails'
import eventsListReducer from '../reducers/eventList'
import myEventsReducer from '../reducers/myEvents'
import myEnrollmentsReducer from '../reducers/myEnrollments'
import allEventsReducer from '../reducers/allEvents'
import forgotPasswordReducer from '../reducers/forgotPassword'
import resetPasswordReducer from '../reducers/resetPassword'
import ssoSignupReducer from '../reducers/ssoSignup'
import signupReducer from '../reducers/signup'
import eventPayment from '../reducers/eventPayment'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    eventCreate: eventCreateReducer,
    routing: routerReducer,
    form: reduxFormReducer,
    login: loginReducer,
    events: eventsListReducer,
    eventToEdit: eventToEditReducer,
    eventDetails: eventDetailsReducer,
    eventPayment: eventPayment,
    myEvents: myEventsReducer,
    adminDashboard: adminDashboardReducer,
    myEnrollments: myEnrollmentsReducer,
    allEvents: allEventsReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    ssoSignup: ssoSignupReducer,
    signup: signupReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
