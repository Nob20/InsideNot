import React, { Component } from 'react'
import './StripeTermsAndCond.scss'
import { STRIPE_CLIENT_ID } from '../../../utils/Constants'
import { TERMS } from '../../../utils/Terms'
import { get, set } from 'lodash'
class StripeTermsAndCond extends Component {
  constructor (props) {
    super(props)
    this.saveAndGoToEvents = this.saveAndGoToEvents.bind(this)
    this.getStripeConnectStatus = this.getStripeConnectStatus.bind(this)
    this.stripeOrTCNotDone = this.stripeOrTCNotDone.bind(this)
    this.updateTermsAccepted = this.updateTermsAccepted.bind(this)
    this.updateReceivePaymentSelection = this.updateReceivePaymentSelection.bind(this)
    const receivePaymentSelection = get(props.event, 'financialInfo.receivePaymentSelection')
    this.state = {
      termsAccepted: props.event.termsAccepted,
      receivePaymentSelection: receivePaymentSelection
    }
    if (props.params.stripe_connected) {
      this.state.receivePaymentSelection = 'PERSONAL_STRIPE_ACCOUNT'
    }
  }

  saveAndGoToEvents () {
    const event = this.props.event
    event.termsAccepted = this.state.termsAccepted
    set(event, 'financialInfo.receivePaymentSelection', this.state.receivePaymentSelection)
    this.props.submitEventToEdit(event)
    this.props.goToAllEvents()
  }

  updateTermsAccepted (termsAccepted) {
    this.setState({ termsAccepted: termsAccepted })
  }

  updateReceivePaymentSelection (receivePaymentSelection) {
    this.setState({ receivePaymentSelection })
  }

  componentDidMount () {
    const query = this.props.location.query
    if (query.code) {
      this.props.connectStripe(this.props.event.id, query.code)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ termsAccepted: nextProps.event && nextProps.event.termsAccepted })
  }

  getStripeConnectStatus () {
    const event = this.props.event
    const stripeUserId = get(event, 'financialInfo.stripeConnectInfo.stripe_user_id')
    if (stripeUserId) {
      return (
        <span className='stripe-connect-status'>
          <span><i className='fa fa-check success info-icon' aria-hidden='true' /></span>
          <span className='error-text help-block pull-left success info-text'>Your stripe account is now connected</span>
        </span>)
    } else {
      return (
        <span className='stripe-connect-status'>
          <span><i className='fa fa-times failure info-icon' aria-hidden='true' /></span>
          <span className='error-text help-block pull-left failure info-text'>Please connect your Stripe account.
            Money from all enrollments will be directly transferred to your connected account.</span>
        </span>)
    }
  }

  stripeOrTCNotDone () {
    const event = this.props.event
    const stripeUserId = get(event, 'financialInfo.stripeConnectInfo.stripe_user_id')
    let stripeNotConnected = true
    let termsNotAccepted = true
    if (this.state.receivePaymentSelection === 'PERSONAL_STRIPE_ACCOUNT' && stripeUserId) {
      stripeNotConnected = false
    } else if (this.state.receivePaymentSelection === 'INSIDE_NOT_STRIPE_ACCOUNT') {
      stripeNotConnected = false
    }
    if (this.state && this.state.termsAccepted) {
      termsNotAccepted = false
    }

    return stripeNotConnected || termsNotAccepted
  }

  getFormGroupElement (label, element) {
    return (
      <div className='form-group'>
        <div className='custom-form-input-wrapper'>
          <div className='row'>
            <div className='form-group'>
              <label className='control-label col-md-3 col-lg-3'>{label}</label>
              <div className='col-md-9 col-lg-9'>
                {element}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getStripeConnectControl () {
    if (this.state.receivePaymentSelection && this.state.receivePaymentSelection === 'PERSONAL_STRIPE_ACCOUNT') {
      const connectURL = 'https://connect.stripe.com/oauth/authorize?response_type=code&amp;' +
      `client_id=${STRIPE_CLIENT_ID}&amp;scope=read_write&amp;state=${this.props.event.id}`
      const stripeConnectButton = (<div>
        <a href={connectURL}
          className='stripe-connect-button'><span>Connect with Stripe</span></a>
        {this.getStripeConnectStatus()}
      </div>)
      return this.getFormGroupElement('Stripe Connect', stripeConnectButton)
    }
  }

  render () {
    const selectReceivePaymentSelection = (<div className='eventPaymentOption'>
      <label className='checkbox-inline' key='termsAccepted-yes-label'>
        <input type='radio'
          name='receivePaymentSelection'
          value='true'
          key='receivePaymentSelection-yes'
          checked={this.state && this.state.receivePaymentSelection === 'PERSONAL_STRIPE_ACCOUNT'}
          onChange={() => this.updateReceivePaymentSelection('PERSONAL_STRIPE_ACCOUNT')} />
        <sapn className='paymentOptionHeading'>Personal Stripe Account (Recommended)</sapn>
        <div className='paymentOptionExplanation'>Click below to create a new or link existing Stripe account.
          Money from all online enrollments will be transferred to your bank account via Stripe</div>
      </label>
      <br />
      <label className='checkbox-inline' key='termsAccepted-no-label'>
        <input type='radio'
          name='receivePaymentSelection'
          value='true'
          key='receivePaymentSelection-no'
          checked={this.state && this.state.receivePaymentSelection === 'INSIDE_NOT_STRIPE_ACCOUNT'}
          onChange={() => this.updateReceivePaymentSelection('INSIDE_NOT_STRIPE_ACCOUNT')} />
        <sapn className='paymentOptionHeading'>InsideNot Account</sapn>
        <div className='paymentOptionExplanation'>Money will be first deposited to InsideNot's Account and will be transferred to your bank account after the event.</div>
      </label>
    </div>)

    const acceptOrRejectTerms = (<div>
      <label className='checkbox-inline' key='termsAccepted-yes-label'>
        <input type='radio'
          name='termsAccepted'
          value='true'
          key='termsAccepted-yes'
          checked={this.state && this.state.termsAccepted}
          onChange={() => this.updateTermsAccepted(true)} /> Accept
      </label>
      <label className='checkbox-inline' key='termsAccepted-no-label'>
        <input type='radio'
          name='termsAccepted'
          value='true'
          key='termsAccepted-no'
          checked={!(this.state && this.state.termsAccepted)}
          onChange={() => this.updateTermsAccepted(false)} /> Reject
      </label>
    </div>)
    return (<div>
      <div className='form-horizontal'>
        {this.getFormGroupElement('Receive Payment', selectReceivePaymentSelection)}
        {this.getStripeConnectControl()}
        <br />
        <br />
        {this.getFormGroupElement('Stripe Connect', <textarea className='form-control' name='terms' rows='12' disabled value={TERMS} />)}
        {this.getFormGroupElement('Stripe Connect', acceptOrRejectTerms)}

        <div className='row'>
          <button className='btn btn-danger btn-lg next-button' type='submit' onClick={this.saveAndGoToEvents}
            disabled={this.stripeOrTCNotDone()}>Save</button>
          <button className='btn btn-danger btn-lg prev-button' onClick={this.props.handlePrev}>Previous</button>
        </div>

      </div>
    </div>)
  }

}

StripeTermsAndCond.propTypes = {
  submitEventToEdit: React.PropTypes.func,
  connectStripe: React.PropTypes.func,
  handlePrev: React.PropTypes.func,
  goToAllEvents: React.PropTypes.func,
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  event: React.PropTypes.object
}
export default StripeTermsAndCond
