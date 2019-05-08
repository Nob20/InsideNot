import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import './ImageUploader.scss'
import { Row, Col, Alert } from 'react-bootstrap'
import { getImageURLWithTransformations } from '../../utils/CloudinaryUtils'

class ImageUploader extends Component {

  constructor (props) {
    super(props)
    this.state = {
      imageUploadErrors: []
    }
    this.getErrorContentForImages = this.getErrorContentForImages.bind(this)
    this.onNewCoverImageDrop = this.onNewCoverImageDrop.bind(this)
    this.getImageThumbsForEvent = this.getImageThumbsForEvent.bind(this)
    this.getImageUploadContent = this.getImageUploadContent.bind(this)
    this.onCoverImageChange = this.onCoverImageChange.bind(this)
    this.onAddImageChange = this.onAddImageChange.bind(this)
    this.imageText = () => {
      return (<div className='image-upload-text'>Please drop the cover Image here or click to upload </div>)
    }
  }

  getErrorContentForImages () {
    if (this.state.imageUploadErrors.length > 0) {
      return (
        <Alert bsStyle='danger'>
          { this.state.imageUploadErrors.map(
            (error) => {
              return (<li>{error}</li>)
            })}
        </Alert>
      )
    } else {
      return null
    }
  }

  onCoverImageChange (e) {
    const file = e.target.files[0]
    const errors = this.validateImage(file)
    if (errors.length === 0) {
      this.props.uploadCoverImage(file, this.props.event.id)
    }
    this.setState({ imageUploadErrors: errors })
  }

  onAddImageChange (e) {
    const file = e.target.files[0]
    const errors = this.validateImage(file)
    if (errors.length === 0) {
      this.props.uploadImage(e.target.files[0], this.props.event.id)
    }
    this.setState({ imageUploadErrors: errors })
  }

  onNewCoverImageDrop (acceptedFiles, rejectedFiles) {
    acceptedFiles.forEach(file => {
      const errors = this.validateImage(file)
      if (errors.length === 0) {
        this.props.uploadCoverImage(file, this.props.event.id)
      }
    })
  }

  validateImage (file) {
    const errors = []
    const fileExtension = file.name.split('.').pop()
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'tif', 'tiff']
    if (!(fileExtension && allowedExtensions.includes(fileExtension))) {
      errors.push(`File "${file.name}" cannot be uploaded as its not valid image`)
    } else if (file.size > 2097152) {
      errors.push(`File cannot be uploaded as its greater than 2 MB`)
    }
    return errors
  }

  getImageThumbsForEvent () {
    if (this.props.imagesState.isLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }

    const event = this.props.event
    const eventImages = event.imageDetails.images || []
    const imageContent = eventImages.map((image, index) => (
      <div className='image-thumbnail-wrapper'>
        <button className='glyphicon glyphicon-remove remove-button'
          onClick={() => this.props.deleteImage(image.id, this.props.event.id)} />
        <img className='image-thumbnail' key={`${this.props.event.id}-image-thumb-${image.id}`}
          src={image.url ? getImageURLWithTransformations(image.url, 'h_117,w_208,c_fill')
            : 'http://placehold.it/208x117/000/fff'} />
      </div>
    ))
    return (
      <div>
        {imageContent}
        <div className='image-thumbnail-wrapper'>
          <input id='addImage' className='hidden' type='file' onChange={this.onAddImageChange} />
          <label className='glyphicon glyphicon-plus add-another-image-label' htmlFor='addImage'>Add Another</label>
        </div>
      </div>
    )
  }

  getImageUploadContent () {
    if (this.props.imagesState.isCoverLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }
    const event = this.props.event
    const coverImageURL = event.imageDetails && event.imageDetails.coverImage && event.imageDetails.coverImage.url || 'http://placehold.it/900x400/000/fff'
    if (coverImageURL != null) {
      return (
        <div className='thumbnail'>
          <img src={coverImageURL} className='image-thumbnail' alt='' />
          <div className='img-overlay'>
            <input id='coverImage' className='hidden' type='file' onChange={this.onCoverImageChange} />
            <label className='glyphicon glyphicon-edit' htmlFor='coverImage' />
          </div>
        </div>
      )
    } else {
      return (<Dropzone onDrop={this.onNewCoverImageDrop} className='image-uploader' children={this.imageText} />)
    }
  }

  render () {
    return (
      <div className='image-upload-wrapper'>
        <div>{this.getErrorContentForImages()}</div>
        <div>
          <Row>
            <Col>
              {this.getImageUploadContent()}
            </Col>
          </Row>
          <Row>
            {this.getImageThumbsForEvent()}
          </Row>
        </div>
      </div>
    )
  }
}

ImageUploader.propTypes = {
  uploadImage: React.PropTypes.func,
  uploadCoverImage: React.PropTypes.func,
  deleteImage: React.PropTypes.func,
  event: React.PropTypes.object,
  imagesState: React.PropTypes.object
}

export default ImageUploader
