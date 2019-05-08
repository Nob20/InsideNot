import React, { Component } from 'react'
import EventListItem from '../eventlistitem/EventListItem'
import './EventListStyles.scss'

class EventList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    // this.changeView = this.changeView.bind(this);
  }

  componentDidMount () {
    this.props.loadEvents()
  }

  changeView (event) {
    event.preventDefault()
  }

  render () {
    if (this.props.hasErrored) {
      return <div className='container-wrapper top-70'><p>Sorry! There was an error loading the events</p></div>
    }

    if (this.props.isLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }

    return (
      <div className='container'>
        <div id='events' className='row list-group'>
          { this.props.events && this.props.events.map((event) => {
            return (<EventListItem key={event.id} event={event} store={this.props.store}
              goToEventDetails={this.props.goToEventDetails}
              showEventInEditMode={this.props.showEventInEditMode} />)
          })}

        </div>
      </div>
    )
  }

}

EventList.propTypes = {
  showEventInEditMode: React.PropTypes.func,
  goToEventDetails: React.PropTypes.func,
  loadEvents: React.PropTypes.func,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  events: React.PropTypes.array,
  store: React.PropTypes.object
}

export default EventList
