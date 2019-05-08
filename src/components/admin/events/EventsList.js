import React, { Component } from 'react'
import EditIcon from 'material-ui/svg-icons/editor/border-color'
import './EventsList.scss'

class EventsList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.getAllEventsTableContent = this.getAllEventsTableContent.bind(this)
  }

  componentDidMount () {
    this.props.loadAllEvents()
  }

  getAllEventsTableContent () {
    if (this.props.events && this.props.events.length > 0) {
      return (
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.props.events && this.props.events.map((event, index) => {
                return (
                  <tr key={'event' + index}>
                    <td>{event.name}</td>
                    <td>{`${event.description && (event.description).substring(0, 100)}...`}</td>
                    <td><span style={{ cursor: 'pointer' }} onClick={() => console.log(event.id)}><EditIcon /></span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (<h3>No users found in the site!</h3>)
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
      <div>
        <h2>All Events</h2>
        <br />
        <br />
        {this.getAllEventsTableContent()}
      </div>
    )
  }

}

EventsList.propTypes = {
  loadAllEvents: React.PropTypes.func,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  events: React.PropTypes.array
}

export default EventsList
