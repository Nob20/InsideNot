import React, { Component } from 'react'
import EventFormStep1 from '../../../forms/EventFormStep1'
import './EditEvent.scss'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'
import { get } from 'lodash'
import ImageUploader from '../../imageUpload/ImageUploader'
import StripeTermsAndCond from '../stripeAndTC/StripeTermsAndCond'
import AddressStep from './addressStep/AddressStep'

class EditEvent extends Component {

  constructor (props) {
    super(props)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.gotToStep2 = this.gotToStep2.bind(this)
    this.gotToStep3 = this.gotToStep3.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getContentForPhotoUploadStep = this.getContentForPhotoUploadStep.bind(this)
    this.getPaymentTermsAndCondContent = this.getPaymentTermsAndCondContent.bind(this)
    this.submitEventToEdit = this.submitEventToEdit.bind(this)
    this.state = {
      stepIndex: 0,
      location: {
        country: 'US'
      }
    }
  }

  updateEvent (values) {
    const eventToUpdate = Object.assign({}, this.props.event, values)
    this.props.updateEventToEdit(eventToUpdate)
  }

  submitEventToEdit (eventToUpdate) {
    this.props.submitEventToEdit(eventToUpdate)
  }

  componentDidMount () {
    this.props.loadEvent(this.props.params.eventId)
    if (this.props.params.stepNumber !== undefined) {
      // step-0
      const stepNumber = this.props.params.stepNumber.slice(5)
      if (stepNumber !== undefined && stepNumber >= -1) {
        this.setState({ stepIndex: parseInt(stepNumber) })
      }
    }
    this.props.loadEvent(this.props.params.eventId)
  }

  handleCountryChange (e) {
    this.state.location.country = e.target.value
    this.setState(this.state)
  }

  handleNext () {
    window.scrollTo(0, 0)
    const { stepIndex } = this.state
    if (stepIndex < 3) {
      const nextStep = stepIndex + 1
      this.setState({ stepIndex: parseInt(nextStep) })
      this.props.goToStep(this.props.params.eventId, 'step-' + nextStep)
    }
  }

  handlePrev () {
    window.scrollTo(0, 0)
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      const nextStep = stepIndex - 1
      this.setState({ stepIndex: parseInt(nextStep) })
      this.props.goToStep(this.props.params.eventId, 'step-' + nextStep)
    }
  }

  getContentForPhotoUploadStep () {
    return (
      <div>
        <ImageUploader uploadImage={this.props.uploadImage} uploadCoverImage={this.props.uploadCoverImage} imagesState={this.props.imagesState}
          deleteImage={this.props.deleteImage} event={this.props.event} />
        <div className='row top-50'>
          <button className='btn btn-danger btn-lg next-button' onClick={this.gotToStep3}>Next</button>
          <button className='btn btn-danger btn-lg prev-button' onClick={this.handlePrev}>Previous</button>
        </div>
      </div>)
  }

  getPaymentTermsAndCondContent () {
    return <StripeTermsAndCond location={this.props.location} event={this.props.event}
      goToAllEvents={this.props.goToAllEvents} connectStripe={this.props.connectStripe} handlePrev={this.handlePrev}
      submitEventToEdit={this.submitEventToEdit} params={this.props.params} />
  }

  getStep1Contents (event) {
    event.onlinePrice = get(event, 'financialInfo.defaultPriceOption.onlinePrice')
    event.doorPrice = get(event, 'financialInfo.defaultPriceOption.doorPrice')
    event.currency = get(event, 'financialInfo.currency')
    return (
      <EventFormStep1 updateEvent={this.updateEvent} handleNext={this.handleNext} initialValues={event} financialInfo={event.financialInfo} />)
  }

  getStepContent (stepIndex) {
    const event = this.props.event
    switch (stepIndex) {
      case 0:
        return this.getStep1Contents(event)
      case 1:
        return this.getContentForPhotoUploadStep()
      case 2:
        return (<AddressStep location={event.location} handlePrev={this.handlePrev}
          updateEvent={this.updateEvent} handleNext={this.handleNext} />)
      case 3:
        return this.getPaymentTermsAndCondContent()
      default:
        return 'General Information'
    }
  }

  gotToStep2 (valuesFromStep1) {
    this.handleNext()
  }

  gotToStep3 () {
    this.handleNext()
  }

  render () {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the event you are trying to edit</p>
    }
    if (this.props.isLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }
    if (this.props.event === undefined) {
      return null
    }
    const { stepIndex } = this.state
    return (
      <div className='top-70 container-wrapper'>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton>
              General Information
            </StepButton>
          </Step>
          <Step>
            <StepButton>
              Images
            </StepButton>
          </Step>
          <Step>
            <StepButton>
              Location
            </StepButton>
          </Step>
          <Step>
            <StepButton>
              T&C
            </StepButton>
          </Step>
        </Stepper>
        <div className='edit-event'>{this.getStepContent(stepIndex)}</div>
      </div>
    )
  }
}

EditEvent.propTypes = {
  event: React.PropTypes.object,
  loadEvent: React.PropTypes.func,
  uploadImage: React.PropTypes.func,
  uploadCoverImage: React.PropTypes.func,
  deleteImage: React.PropTypes.func,
  params: React.PropTypes.object,
  imagesState: React.PropTypes.object,
  location: React.PropTypes.object,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  updateEventToEdit: React.PropTypes.func,
  submitEventToEdit: React.PropTypes.func,
  connectStripe: React.PropTypes.func,
  goToAllEvents: React.PropTypes.func,
  goToStep: React.PropTypes.func
}

export default EditEvent
