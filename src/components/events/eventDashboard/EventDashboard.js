import React, { Component } from 'react'
import './EventDashboard.scss'
import { Tabs, Tab } from 'material-ui/Tabs'
import Face from 'material-ui/svg-icons/action/face'
import AccountIcon from 'material-ui/svg-icons/action/account-box'
import Event from 'material-ui/svg-icons/action/event'
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble'
import AdminList from './admins/AdminList'
import { Alert } from 'react-bootstrap'
import EnrollmentsList from './enrollments/EnrollmentsList'
import EventAddress from './../eventAddress/EventAddress'
import { getImageURLWithTransformations } from '../../../utils/CloudinaryUtils'

class EventDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.params.tabName || 'users'
    }
  }

  handleChange = (value) => {
    this.props.gotToTab(this.props.params.eventId, value)
    this.setState({
      value: value
    })
  }

  componentDidMount () {
    this.props.loadEvent(this.props.params.eventId)
    this.props.loadEventEnrollments(this.props.params.eventId)
    window.scrollTo(0, 0)
  }

  getImageContent () {
    let eventImages = this.getEventImages()
    const imageContent = eventImages.map((imageUrl, index) => {
      const imageSrc = imageUrl ? getImageURLWithTransformations(imageUrl, 'h_117,w_208,c_fill') : 'http://placehold.it/208x117/000/fff'
      return (<div className='image-thumbnail-wrapper col-xs-6 col-s-4 col-md-3 col-lg-3' key={`image-thumb-${index}`}>
        <img className='image-thumbnail' src={imageSrc} />
      </div>)
    })

    return imageContent
  }

  getEventImages () {
    const eventImages = this.props.event.images || {}
    const imageUrls = []
    const coverImageURL = this.props.event.coverImage || 'http://placehold.it/900x400/000/fff'
    imageUrls.push(coverImageURL)
    eventImages && Object.values(eventImages).forEach(imageURLs => {
      imageUrls.push(imageURLs)
    })
    return imageUrls
  }

  getEventDetailsTabContents (event) {
    return <div className='event-details'>
      <div className='row'>
        <button className='btn btn-danger btn-lg pull-right edit-button' onClick={() => this.props.showEventInEditMode(event.id)}>Edit</button>
      </div>
      <div className='row'>
        <div className='form-group'>
          <label className='control-label col-md-3 col-lg-3'>Name</label>
          <div className='col-md-9 col-lg-9'>
            {event.name}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='form-group'>
          <label className='control-label col-md-3 col-lg-3'>Description</label>
          <div className='col-md-9 col-lg-9'>
            {`${event.description && (event.description).substring(0, 400)}...`}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='form-group'>
          <label className='control-label col-md-3 col-lg-3'>Images</label>
          <div className='col-md-9 col-lg-9'>
            {this.getImageContent()}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='form-group'>
          <label className='control-label col-md-3 col-lg-3'>Address</label>
          <div className='col-md-9 col-lg-9'>
            <EventAddress event={event} />
          </div>
        </div>
      </div>
    </div>
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

    return (
      <div className='container-wrapper top-70 event-dashboard-container'>
        <div>
          <Tabs
            value={this.state.value}>
            <Tab
              onActive={() => this.handleChange('details')}
              value='details'
              icon={<Event />}
              label='Details'
              className='dasboard-tab'>
              {this.getEventDetailsTabContents(event)}
            </Tab>
            <Tab
              onActive={() => this.handleChange('enrollments')}
              value='enrollments'
              icon={<Face />}
              label='All Enrollments'
              className='dasboard-tab'>
              <EnrollmentsList
                event={event}
                loadEventEnrollments={this.props.loadEventEnrollments}
                enrollments={this.props.eventEnrollments.enrollments}
                hasErrored={this.props.eventEnrollments.hasErrored}
                isLoading={this.props.eventEnrollments.isLoading} />
            </Tab>
            <Tab
              onActive={() => this.handleChange('admins')}
              value='admins'
              icon={<AccountIcon />}
              label='Admins'
              className='dasboard-tab'>
              <AdminList
                event={event}
                inviteAdmin={this.props.inviteAdmin}
                removeAdmin={this.props.removeAdmin}
                removeInvitedAdmin={this.props.removeInvitedAdmin} />
            </Tab>
            <Tab
              onActive={() => this.handleChange('messages')}
              value='messages'
              icon={<ChatIcon />}
              label='All Messages'
              className='dasboard-tab'>
              <h2>This feature will be launched soon</h2>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }

}

EventDashboard.propTypes = {
  event: React.PropTypes.object,
  loadEvent: React.PropTypes.func,
  loadEventEnrollments: React.PropTypes.func,
  eventEnrollments: React.PropTypes.object,
  gotToTab: React.PropTypes.func,
  params: React.PropTypes.object,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  inviteAdmin: React.PropTypes.func,
  removeAdmin: React.PropTypes.func,
  removeInvitedAdmin: React.PropTypes.func,
  showEventInEditMode: React.PropTypes.func
}

export default EventDashboard
