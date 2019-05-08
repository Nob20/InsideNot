import React, { Component } from 'react'
import './EventDetails.scss'
import { VisibleOnlyToLoggedInUser, VisibleOnlyToNonLoggedInUsers } from './../../../utils/AuthHelper'
import { Alert } from 'react-bootstrap'
import EventImages from '../eventImages/EventImages'
import Location from '../location/location'
import _ from 'lodash'
import Sticky from './../../sticky/Sticky'
import { Helmet } from 'react-helmet'
import { getImageURLWithTransformations } from '../../../utils/CloudinaryUtils'
import { ShareButtons } from 'react-share'

class EventDetails extends Component {
  constructor (props) {
    super(props)
    this.onToken = this.onToken.bind(this)
    this.askUserToLogin = this.askUserToLogin.bind(this)
    this.getLoginAndPayButton = this.getLoginAndPayButton.bind(this)
    this.getPayButton = this.getPayButton.bind(this)
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0
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
    const Login = (props) => (
      <div className='stripe-pay-button-wrapper'>
        <button className='pay-login-button right'><span className='pay-login-span' onClick={this.askUserToLogin}>Pay after Login</span></button>
      </div>
    )
    const LoginAndPayButton = VisibleOnlyToNonLoggedInUsers(Login, this.props)
    return <LoginAndPayButton {...this.props} />
  }

  getPayButton () {
    const { event } = this.props

    const Login = (props) => (
      <div className='stripe-pay-button-wrapper'>
        <button className='pay-login-button right'><span className='pay-login-span' onClick={() => this.props.goToPaymentScreen(event.id)}>Pay</span></button>
      </div>
    )
    const PayButton = VisibleOnlyToLoggedInUser(Login, this.props)
    return <PayButton {...this.props} />
  }

  getFormattedEventText (text) {
    text = _.escape(text)
    return { __html: '<p>' + text.replace(/\n([ \t]*\n)+/g, '</p><p>').replace('\n', '<br />') + '</p>' }
  }

  getEquipmentsProvidedContent () {
    const event = this.props.event
    if (event.equipmentsProvided && event.equipmentsProvided.trim().length > 0) {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <h5>Equipment provided by Trainer</h5>
            <div dangerouslySetInnerHTML={this.getFormattedEventText(event.equipmentsProvided)} />
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  getEquipmentsRequiredContent () {
    const event = this.props.event
    if (event.equipmentsRequired && event.equipmentsRequired.trim().length > 0) {
      return (
        <div className='row top-20'>
          <div className='col-xs-12'>
            <h5>Equipment Required</h5>
            <div dangerouslySetInnerHTML={this.getFormattedEventText(event.equipmentsRequired)} />
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  getAddressDetails () {
    const location = this.props.event.location
    if (location && location.address) {
      const address = location.address
      return (
        <div>
          <h3>Where we’ll be</h3>
          <div className='event-address'>
            <div>{address.street_number} {address.route}</div>
            <div>{address.locality + ', ' + address.administrative_area_level_1} {address.postal_code} </div>
            <div>{address.country} </div>
          </div>
          {location.directions ? <div>{location.directions}</div> : ''}
        </div>
      )
    }
    return null
  }
  render () {
    if (this.props.hasErrored) {
      return (
        <div className='top-70 container-wrapper' onClick={this.goToEventDetails}>
          <Alert bsStyle='danger'>
            Some Error occurred while loading the event
          </Alert>
        </div>
      )
    }

    if (this.props.isLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }

    const { event } = this.props
    if (!event) {
      return null
    }
    const isComingSoonOrSoldOut = ['COMING_SOON', 'SOLD_OUT'].indexOf(event.status) > -1
    const socialShareImageUrl = event.imageDetails && event.imageDetails.socialShareImage && event.imageDetails.socialShareImage.url
    const { FacebookShareButton } = ShareButtons
    return (
      <div className='container-wrapper event-details-container top-70' onClick={this.goToEventDetails}>
        <Helmet>
          <meta property='fb:app_id' content='317281115364305' />
          <meta property='og:url' content={`https://www.insidenot.com/events/` + event.id} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={event.name} />
          <meta property='og:description' content={event.description} />
          <meta property='og:image' content={socialShareImageUrl ? getImageURLWithTransformations(socialShareImageUrl,
            'h_630,w_1200,c_fill') : 'http://placehold.it/1200x630/000/fff'} />
        </Helmet>
        <EventImages event={this.props.event} />
        <div className='clearfix' />
        <Sticky className={'sticky-subheader'}>
          <div className='sticky-content'>
            <div className='col-xs-4 date-and-time'>
              <div>Date & Time</div>
              <div>{event.dateTimeString}</div>
            </div>
            <div className='col-xs-4 event-price'>
              <div>Price </div>
              <div>{event.financialInfo.defaultPriceOption.onlinePrice.toFixed(2)} {event.financialInfo.currency.toUpperCase()}</div>
            </div>
            <div className='col-xs-4'>
              {isComingSoonOrSoldOut ? '' : this.getLoginAndPayButton()}
              {isComingSoonOrSoldOut ? '' : this.getPayButton()}
            </div>
          </div>
          <div className='clearfix' />
        </Sticky>

        <div className='caption top-30'>
          <h2 className='group inner list-group-item-heading'>{event.name}</h2>
          <div className='facebook-share-wrapper pull-right'>
            <FacebookShareButton url={`https://www.insidenot.com/events/` + event.id}>
              <div id=''>
                <span className='fb-share'>
                  <i className='fa fa-facebook-official' /> Share
              </span>
              </div>
            </FacebookShareButton>
          </div>
          <div className='group inner event-description top-20' dangerouslySetInnerHTML={this.getFormattedEventText(event.description)} />
          {this.getEquipmentsProvidedContent()}
          {this.getEquipmentsRequiredContent()}
        </div>
        {this.getAddressDetails()}
        <Location location={event.location} />
      </div>

    )
  }
}

EventDetails.propTypes = {
  loadEvent: React.PropTypes.func,
  goToPaymentScreen: React.PropTypes.func,
  askUserToLogin: React.PropTypes.func,
  chargeUser: React.PropTypes.func,
  event: React.PropTypes.object,
  location: React.PropTypes.object,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  params: React.PropTypes.object
}
export default EventDetails
