import React, { Component } from 'react'
import './EventImages.scss'
import Lightbox from 'react-images'
import { getImageURLWithTransformations } from '../../../utils/CloudinaryUtils'

class EventImages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0
    }

    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoImage = this.gotoImage.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.getEventImages = this.getEventImages.bind(this)
    this.handleClickOfCoverImage = this.handleClickOfCoverImage.bind(this)
  }

  openLightbox (index, event) {
    event.preventDefault()
    this.setState({
      currentImage: index + 1,
      lightboxIsOpen: true
    })
  }
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1
    })
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }
  gotoImage (index) {
    this.setState({
      currentImage: index + 1
    })
  }

  handleClickOfCoverImage () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: true
    })
  }

  handleClickImage () {
    if (this.state.currentImage === this.getEventImages().length - 1) {
      this.setState({
        currentImage: 0
      })
      return
    }
    this.gotoNext()
  }

  getImageContent () {
    const event = this.props.event
    const eventImages = event.imageDetails.images || []
    const imageContent = eventImages.map((image, index) => (
      <div className='image-thumbnail-wrapper col-xs-6 col-s-4 col-md-3 col-lg-3'
        key={`${this.props.event.id}-image-thumb-${index}`} onClick={(e) => { this.openLightbox(index, e) }}>
        <img className='image-thumbnail'
          src={image.url ? getImageURLWithTransformations(image.url, 'h_117,w_208,c_fill')
                 : 'http://placehold.it/208x117/000/fff'} />
      </div>
      ))

    return imageContent
  }

  getEventImages () {
    const event = this.props.event
    const eventImages = event.imageDetails.images || []
    const imageUrls = []
    const coverImageURL = event.imageDetails && event.imageDetails.coverImage && event.imageDetails.coverImage.url || 'http://placehold.it/900x400/000/fff'
    imageUrls.push({ src: coverImageURL })
    eventImages.forEach(image => {
      imageUrls.push({ src : image.url })
    })
    return imageUrls
  }

  render () {
    const { event } = this.props

    const coverImageUrl = event.imageDetails && event.imageDetails.coverImage && event.imageDetails.coverImage.url

    return (
      <div>
        <div className='cover-image-container col-xs-12' onClick={this.handleClickOfCoverImage}>
          <img className='group cover-image' src={coverImageUrl != null
            ? getImageURLWithTransformations(coverImageUrl, 'h_630,w_1200,c_pad,b_black') : 'http://placehold.it/1200x630/000/fff'}
            alt='' />
        </div>

        <Lightbox
          currentImage={this.state.currentImage}
          images={this.getEventImages()}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
          showThumbnails={false}
        />
        {this.getImageContent()}
      </div>
    )
  }
}

EventImages.propTypes = {
  event: React.PropTypes.object
}
export default EventImages
