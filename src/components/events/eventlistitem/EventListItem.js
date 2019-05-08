import React, { Component } from 'react'
import './EventListItemStyles.scss'
import { get } from 'lodash'
import { getImageURLWithTransformations } from '../../../utils/CloudinaryUtils'

class EventListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.goToEventDetails = this.goToEventDetails.bind(this)
  }

  goToEventDetails () {
    this.props.goToEventDetails(this.props.event.id)
  }

  comingSoonOrSoldOutContent (event) {
    if (event.status && ['COMING_SOON', 'SOLD_OUT'].indexOf(event.status) > -1) {
      return (<div className='cnrflash'>
        <div className='cnrflash-inner'>
          <span className='cnrflash-label'>{event.status === 'COMING_SOON' ? 'Coming Soon' : 'Sold Out'}</span>
        </div>
      </div>)
    }
  }

  render () {
    const event = this.props.event
    const address = event.location && event.location.address || {}
    const coverImageUrl = get(event, 'imageDetails.coverImage.url')
    const onlinePrice = get(event, 'financialInfo.defaultPriceOption.onlinePrice')
    return (
      <div className='col-lg-4'>
        <div className='top-30 event-list-item' onClick={this.goToEventDetails}>
          {this.comingSoonOrSoldOutContent(event)}
          <div className='thumbnail'>

            <img className='group list-group-image'
              src={coverImageUrl != null ? getImageURLWithTransformations(coverImageUrl, 'w_330,h_200,c_lfill') : 'http://placehold.it/400x250/000/fff'} />
            <div className='caption'>
              <h4 className='group inner list-group-item-heading'>{event.name}</h4>
              <p className='group inner list-group-item-text'>{`${event.description && (event.description).substring(0, 100)}...`}</p>
            </div>
          </div>
          <div>
            <div className='project-meta'>
              <div className='project-scores'>
                <div className='score'>
                  <div className='count'>$ {onlinePrice}</div>
                  <div className='legend'>Enrollment</div>
                </div>
                <div className='score'>
                  <div className='count'>{event.size}</div>
                  <div className='legend'>Group Size</div>
                </div>
                <div className='score'>
                  <div className='count'>{address.locality}</div>
                  <div className='legend'>{address.administrative_area_level_1}, {address.postal_code}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='clearfix' />
      </div>
    )
  }
}

EventListItem.propTypes = {
  goToEventDetails: React.PropTypes.func,
  event: React.PropTypes.object
}
export default EventListItem
