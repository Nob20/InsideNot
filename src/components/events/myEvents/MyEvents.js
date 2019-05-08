import React, { Component } from 'react'
import './MyEvents.scss'
import { Alert } from 'react-bootstrap'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { getImageURLWithTransformations } from '../../../utils/CloudinaryUtils'

class MyEvents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDeleteModal: false,
      selectedEventForDelete: null,
      open: false
    }
    this.getMyEventsTableContent = this.getMyEventsTableContent.bind(this)
    this.getDeleteModal = this.getDeleteModal.bind(this)
    this.getDeleteButton = this.getDeleteButton.bind(this)
    this.getErrorMessage = this.getErrorMessage.bind(this)
  }

  componentDidMount () {
    this.props.loadMyEvents()
  }

  openConfirmationPopup = (event) => {
    this.setState({
      open: true,
      selectedEventForDelete: event
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  getDeleteModal () {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onClick={this.handleClose}
        />,
      <FlatButton
        label='Yes'
        primary
        keyboardFocused
        onClick={() => {
          this.props.archiveEvent(this.state.selectedEventForDelete.id)
          this.handleClose()
        }}
        />
    ]

    if (this.state.selectedEventForDelete) {
      return (<Dialog
        title='Delete Event'
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}>
      Are you sure you want to delete "{this.state.selectedEventForDelete.name}"
    </Dialog>)
    }
  }

  getDeleteButton (event) {
    const eventDelete = this.props.eventDelete
    const inProcess = eventDelete && eventDelete.isLoading && eventDelete.eventId === event.id
    return (
      <button className='btn btn-primary btn-lg' onClick={() => this.openConfirmationPopup(event)} disabled={inProcess}>
        <i className={inProcess ? ' fa fa-spin fa-circle-o-notch margin-5' : ''} />
      Delete</button>
    )
  }

  getErrorMessage (event) {
    if (this.props.eventDelete && this.props.eventDelete.hasErrored && this.props.eventDelete.eventId === event.id) {
      return (
        <Alert bsStyle='danger'>
          Unable to delete event. Please try again!
        </Alert>
      )
    }
  }

  getMyEventsTableContent () {
    if (this.props.events && this.props.events.length > 0) {
      return (<div id='events' className='row'>
        {this.getDeleteModal()}
        { this.props.events && this.props.events.map((event, index) => {
          const coverImageUrl = event.imageDetails && event.imageDetails.coverImage && event.imageDetails.coverImage.url
          return (
            <div className='row event-row' key={'my-events-' + index}>
              {this.getErrorMessage(event)}
              <div className='col-xs-12'><h3>{event.name}</h3></div>
              <div className='col-xs-8 col-sm-8 col-md-3'>
                <img className='image-thumb' src={coverImageUrl != null ? getImageURLWithTransformations(coverImageUrl, 'w_330,h_200,c_lfill')
                  : 'http://placehold.it/400x250/000/fff'} />
              </div>
              <div className='col-md-3 hidden-xs hidden-sm'>{`${event.description && (event.description).substring(0, 200)}...`}</div>
              <div className='col-md-3 hidden-xs hidden-sm' />
              <div className='col-xs-4 col-sm-4 col-md-3'>
                <div className='btn-group-vertical'>
                  <button className='btn btn-success btn-lg' onClick={() => this.props.goToEventDashboard(event.id)}>Manage</button>
                  <button className='btn btn-primary btn-lg' onClick={() => this.props.showEventPreview(event.id)}>Preview</button>
                  {this.getDeleteButton(event)}
                </div>
              </div>
            </div>)
        })}

      </div>)
    } else {
      return (<h3>Please create a new Event by clicking on 'Create New Event' button.</h3>)
    }
  }

  render () {
    if (this.props.hasErrored) {
      return <div className='container-wrapper top-70'><p>Sorry! There was an error loading the events</p></div>
    }

    if (this.props.isLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }

    return (
      <div className='container-wrapper top-70 my-events-container'>
        {this.getMyEventsTableContent()}
      </div>
    )
  }

}

MyEvents.propTypes = {
  showEventPreview: React.PropTypes.func,
  goToEventDashboard: React.PropTypes.func,
  archiveEvent: React.PropTypes.func,
  loadMyEvents: React.PropTypes.func,
  eventDelete: React.PropTypes.object,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  events: React.PropTypes.array
}

export default MyEvents
