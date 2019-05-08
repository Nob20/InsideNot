import React, { Component } from 'react'
import './EventPayment.scss'
import { VisibleOnlyToLoggedInUser, VisibleOnlyToNonLoggedInUsers } from './../../../utils/AuthHelper'
import StripeCheckout from 'react-stripe-checkout'
import { Alert } from 'react-bootstrap'
import { get } from 'lodash'
import moment from 'moment'
import { STRIPE_KEY } from './../../../utils/Constants'
import { TERMS } from '../../../utils/Terms'

class EventPayment extends Component {
  constructor (props) {
    super(props)
    this.onToken = this.onToken.bind(this)
    this.askUserToLogin = this.askUserToLogin.bind(this)
    this.getLoginAndPayButton = this.getLoginAndPayButton.bind(this)
    this.getPayButton = this.getPayButton.bind(this)
    this.getPaymentErrorMessage = this.getPaymentErrorMessage.bind(this)
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      termsAccepted: false
    }
  }

  onToken (token) {
    this.props.chargeUser(token, this.props.event.id)
  }

  componentDidMount () {
    this.props.loadEvent(this.props.params.eventId)
    window.scrollTo(0, 0)
  }

  askUserToLogin () {
    this.props.askUserToLogin(this.props.location.pathname)
  }

  getLoginAndPayButton () {
    const LoginAndPay = (props) => (
      <div className='stripe-pay-button-wrapper'>
        <button className='pay-button payment-button right'>
          <span className='pay-login-span' onClick={this.askUserToLogin}>Pay after Login</span>
        </button>
      </div>
    )
    const LoginAndPayButton = VisibleOnlyToNonLoggedInUsers(LoginAndPay, this.props)
    return <LoginAndPayButton {...this.props} />
  }

  getPayButton () {
    const { event } = this.props

    const userEmail = this.props.loggedInUser && this.props.loggedInUser.user && this.props.loggedInUser.user.email

    const Login = (props) => (
      <div className='stripe-pay-button-wrapper'>
        {this.props.eventPayment.isLoading ? (
          <div className='text-center top-30'><i className='top-10 fa fa-circle-o-notch fa-spin in-spinner' /></div>) : <StripeCheckout
            className='stripe-pay-button' token={this.onToken} name={event.name} email={userEmail}
            allowRememberMe={false} disabled={!this.state.termsAccepted}
            description={`${event.description && (event.description).substring(0, 200)}...`}
            currency='CAD' stripeKey={STRIPE_KEY} />}

      </div>
    )
    const PayButton = VisibleOnlyToLoggedInUser(Login, this.props)
    return <PayButton {...this.props} />
  }

  acceptTerms = (event) => {
    const termsAccepted = event.target.checked
    this.setState({
      termsAccepted
    })
  }

  getPaymentErrorMessage () {
    if (this.props.eventPayment && this.props.eventPayment.hasErrored) {
      return (
        <Alert bsStyle='danger'>Got an error while processing payment. Please try again!</Alert>
      )
    }
  }

  getStripeCharges (event) {
    const onlinePrice = get(event, 'financialInfo.defaultPriceOption.onlinePrice')
    return Math.ceil(((1.02987 * onlinePrice + 0.30896) - onlinePrice) * 100) / 100
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

    const onlinePrice = get(event, 'financialInfo.defaultPriceOption.onlinePrice')
    return (
      <div className='container-wrapper top-70 payment-page' onClick={this.goToEventDetails}>
        {this.getPaymentErrorMessage()}
        <div >
          <div className='col-md-7 col-lg-7'>
            <div className='top-30'>
              <h2 className='group inner list-group-item-heading'>
                <span>{event.name}</span>&nbsp;
                <span ng-if={event.date}>({event.date && (new Date(event.date).toString()) && moment().format('DD-MMM-YYYY')})</span>
              </h2>
              <div>{`${event.description && (event.description).substring(0, 400)}...`}</div>
            </div>
            <div className='form-group'>
              <label htmlFor='terms'>InsideNot Terms & Conditions</label>
              <div>
                <textarea className='form-control' name='terms' rows='12' disabled value={TERMS} />
              </div>
            </div>

          </div>
          <div className='col-md-5 col-lg-5' >
            <div className='payment-section'>
              <table className='payment-details-table'>
                <tr lc>
                  <td>
                    <div className='payment-label'>Event Price</div>
                    <div className='payment-hint'>Inclusive of all taxes</div></td>
                  <td>${onlinePrice && onlinePrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>
                    <div className='payment-label'>Stripe Charges</div>
                    <div className='payment-hint'>Approx charges by the payment provider</div></td>
                  <td>${this.getStripeCharges(event)}</td>
                </tr>
                <tr>
                  <td>
                    <div className='payment-label'>InsideNot Charges</div>
                    <div className='payment-hint'>Free for now</div></td>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <div className='divider' />
                  </td>
                </tr>
                <tr>
                  <td className='totalRow'>
                    <div>Total ({event.financialInfo.currency})</div>
                    <div />
                  </td>
                  <td className='totalRow'>${onlinePrice + this.getStripeCharges(event)}</td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <div className='divider' />
                  </td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <input type='checkbox' className='input' onClick={this.acceptTerms} /> &nbsp;&nbsp;Accept Terms & Conditions
                  </td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    {this.getPayButton()}
                  </td>
                </tr>

              </table>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

EventPayment.propTypes = {
  loadEvent: React.PropTypes.func,
  askUserToLogin: React.PropTypes.func,
  eventDetails: React.PropTypes.object,
  eventPayment: React.PropTypes.object,
  chargeUser: React.PropTypes.func,
  event: React.PropTypes.object,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  params: React.PropTypes.object,
  location: React.PropTypes.object,
  loggedInUser: React.PropTypes.object
}
export default EventPayment
