import React, { Component } from 'react'
import EventListItem from '../events/eventlistitem/EventListItem'
import './HomePage.scss'
import { Helmet } from 'react-helmet'
import { getImageURLWithTransformations } from '../../utils/CloudinaryUtils'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
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
      <div className='container home-page-wrapper'>
        <Helmet>
          <meta property='fb:app_id' content='317281115364305' />
          <meta property='og:url' content={`https://www.insidenot.com`} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={'Create - Promote - Sell Fitness Events'} />
          <meta property='og:description' content={'InsideNot is an online platform for health and fitness experts to create, promote and sell their events. ' +
          'Experts create the event information, setup online payments, and then use InsideNot\'s social media integrations to spread the word.'} />
          <meta property='og:image' content={getImageURLWithTransformations('http://res.cloudinary.com/dc0wn50cu/image/upload/v1511461027/production/fb_main_share.jpg',
            'h_1260,w_2400,c_fill')} />
        </Helmet>
        <div id='events' className='row list-group'>
          <h1 className='home-heading' ><span className='company-name'>InsideNot</span> helps you find outdoor workouts and events
            happening in your city</h1>
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

HomePage.propTypes = {
  showEventInEditMode: React.PropTypes.func,
  goToEventDetails: React.PropTypes.func,
  loadEvents: React.PropTypes.func,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  events: React.PropTypes.array,
  store: React.PropTypes.object
}

export default HomePage
