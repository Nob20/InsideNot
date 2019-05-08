import React, { Component } from 'react'
import './PaymentSuccess.scss'
import { Alert } from 'react-bootstrap'

class PaymentSuccess extends Component {
  constructor (props) {
    super(props)
    this.askUserToLogin = this.askUserToLogin.bind(this)
    this.goToEventsPage = this.goToEventsPage.bind(this)
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      termsAccepted: false
    }
  }

  componentDidMount () {
    this.props.loadEvent(this.props.params.eventId)
    window.scrollTo(0, 0)
  }

  askUserToLogin () {
    this.props.askUserToLogin(this.props.location.pathname)
  }

  goToEventsPage () {
    this.props.goToHomePage()
  }

  render () {
    if (this.props.eventDetails && this.props.eventDetails.hasErrored) {
      return (
        <div className='top-70 container-wrapper' onClick={this.goToEventDetails}>
          <Alert bsStyle='danger'>
            Some Error occurred while loading the event
          </Alert>
        </div>
      )
    }

    if (this.props.eventDetails && this.props.eventDetails.isLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }

    const { event } = this.props
    if (!event) {
      return null
    }

    return (
      <div className='container-wrapper payment-confirmation-page top-70'>
        <div className='col-lg-2 col-md-2' />
        <div className='col-lg-8 col-md-8'>
          <h2 className='success-message'>{event.name}</h2>
          <div className='success-icon'>
            <i className='fa fa-check-square-o' aria-hidden='true' />
          </div>
          <h3 className='success-message'>Your payment has been successfully submitted for {event.name}. You will get a confirmation email soon.</h3>
          <div className='form-actions'>
            <button className='btn btn-primary btn-block btn-lg find-more-events-btn' onClick={this.goToEventsPage}>Find more Events</button>
          </div>
        </div>
        <div className='col-lg-2 col-md-2' />
      </div>

    )
  }
}

PaymentSuccess.propTypes = {
  loadEvent: React.PropTypes.func,
  askUserToLogin: React.PropTypes.func,
  goToHomePage: React.PropTypes.func,
  eventDetails: React.PropTypes.object,
  event: React.PropTypes.object,
  params: React.PropTypes.object,
  location: React.PropTypes.object
}
export default PaymentSuccess
