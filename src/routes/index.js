// We only need to import the modules necessary for initial render
import React from 'react'
import CoreLayoutContainer from '../containers/CoreLayoutContainer'
import AdminDashboard from './../containers/AdminDashboardContainer'
import EventDashboard from './../containers/EventDashboardContainer'
import EventsList from './../containers/EventsListContainer'
import EventEdit from './../containers/EventEditContainer'
import Login from './../containers/LoginContainer'
import Signup from './../containers/SignupContainer'
import SSOSignup from './../containers/SSOSignupContainer'
import EventDetails from './../containers/EventDetailsContainer'
import BecomeAHost from '../containers/BecomeAHostContainer'
import BecomeATrainer from '../containers/BecomeATrainerContainer'
import MyEnrollments from '../containers/MyEnrollmentsContainer'
import MyEvents from '../containers/MyEventsContainer'
import ForgotPassword from './../containers/ForgotPasswordContainer'
import ResetPassword from './../containers/ResetPasswordContainer'
import EventPayment from '../containers/EventPaymentContainer'
import PaymentSuccess from '../containers/PaymentSuccessContainer'
import Home from '../containers/HomePageContainer'
import { Route, IndexRoute } from 'react-router'
import { eventsFetchData } from './../actions/eventList'
import { getEventDetailsFromServer } from './../actions/eventDetails'
import GAPageViewWrapper from './GAPageViewWrapper'

const createRoutes = (store) => {
  return (
    <Route path='/' component={CoreLayoutContainer} >
      <IndexRoute component={GAPageViewWrapper(Home)} fetchData={({ store }) => eventsFetchData()(store.dispatch)} />
      <Route path='admin-dashboard/:tabName' component={GAPageViewWrapper(AdminDashboard)} />
      <Route path='event-dashboard/:eventId/:tabName' component={GAPageViewWrapper(EventDashboard)}
        fetchData={({ store, params }) => getEventDetailsFromServer(params.eventId)(store.dispatch)} />
      <Route path='events' component={GAPageViewWrapper(EventsList)} />
      <Route path='event-edit/:eventId' component={GAPageViewWrapper(EventEdit)} />
      <Route path='event-edit/:eventId/:stepNumber' component={GAPageViewWrapper(EventEdit)} />
      <Route path='login' component={GAPageViewWrapper(Login)} />
      <Route path='signup' component={GAPageViewWrapper(Signup)} />
      <Route path='sso-signup' component={GAPageViewWrapper(SSOSignup)} />
      <Route path='events/:eventId' component={GAPageViewWrapper(EventDetails)}
        fetchData={({ store, params }) => getEventDetailsFromServer(params.eventId)(store.dispatch)} />
      <Route path='become-a-host' component={GAPageViewWrapper(BecomeAHost)} />
      <Route path='become-a-trainer' component={GAPageViewWrapper(BecomeATrainer)} />
      <Route path='my-enrollments' component={GAPageViewWrapper(MyEnrollments)} />
      <Route path='my-events' component={GAPageViewWrapper(MyEvents)} />
      <Route path='forgot-password' component={GAPageViewWrapper(ForgotPassword)} />
      <Route path='reset-password' component={GAPageViewWrapper(ResetPassword)} />
      <Route path='events/:eventId/payment' component={GAPageViewWrapper(EventPayment)}
        fetchData={({ store, params }) => getEventDetailsFromServer(params.eventId)(store.dispatch)} />
      <Route path='events/:eventId/payment-success' component={GAPageViewWrapper(PaymentSuccess)}
        fetchData={({ store, params }) => getEventDetailsFromServer(params.eventId)(store.dispatch)} />
    </Route>
  )
}

export default createRoutes
