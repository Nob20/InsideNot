/* eslint-disable max-len */
import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { renderFieldWithLabel } from '../utils/FormUtils'
import { AGE_GROUPINGS, getCurrencyOptions, EVENT_SCHEDULE_TYPE } from '../utils/EventUtils'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import moment from 'moment'
import { set } from 'lodash'
try { injectTapEventPlugin() } catch (e) {}

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }

  if (!values.price) {
    errors.price = 'Required'
  }

  if (!values.eventScheduleType) {
    errors.eventScheduleType = 'Required'
  }

  if (values.eventScheduleType && values.eventScheduleType === 'FIXED_DATE') {
    if (!values.date) {
      errors.date = 'Required'
    }
    if (!values.time) {
      errors.time = 'Required'
    }
  }
  if (!values.size || values.size === 0) {
    errors.size = 'Required'
  }

  return errors
}

const warn = values => {
  const warnings = {}
  return warnings
}

class EventFormStep1 extends Component {
  constructor (props) {
    super(props)
    this.gotToStep2 = this.gotToStep2.bind(this)
    this.getDateAndTime = this.getDateAndTime.bind(this)
    let initialValues = this.props.initialValues
    if (initialValues != null) {
      initialValues.date = initialValues.date && new Date(initialValues.date)
      initialValues.time = initialValues.time && new Date(initialValues.time)
    }
  }

  gotToStep2 () {
    const { name, description, ageGroupIds, onlinePrice, doorPrice, currency, eventScheduleType, date,
      time, equipmentsProvided, equipmentsRequired, size } = this.props
    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
      time.getHours(), time.getMinutes(), time.getSeconds())
    const dateTimeString = moment(dateTime).format('ddd, MMM DD YYYY, h:mm a')
    const step1FormVals = { name, description, ageGroupIds, eventScheduleType, date, time, equipmentsProvided, equipmentsRequired, size, dateTimeString }
    step1FormVals.financialInfo = this.props.financialInfo
    set(step1FormVals, 'financialInfo.defaultPriceOption.key', 'DEFAULT')
    set(step1FormVals, 'financialInfo.defaultPriceOption.title', 'Default Selection')
    set(step1FormVals, 'financialInfo.defaultPriceOption.details', 'Default Selection')
    set(step1FormVals, 'financialInfo.defaultPriceOption.onlinePrice', onlinePrice)
    set(step1FormVals, 'financialInfo.defaultPriceOption.doorPrice', doorPrice)
    set(step1FormVals, 'financialInfo.currency', currency)

    this.props.updateEvent(step1FormVals)
    this.props.handleNext()
  }

  getDateAndTime () {
    const initialValues = this.props.initialValues
    if ((initialValues && initialValues.eventScheduleType === 'FIXED_DATE') || this.props.eventScheduleType === 'FIXED_DATE') {
      return (
        <div>
          <Field name='date' id='date' component={renderFieldWithLabel} type='datepicker' label='Event Date' />

          <Field name='time' id='time' component={renderFieldWithLabel} type='timepicker' label='Event Time' />
        </div>
      )
    }
  }

  render () {
    const { handleSubmit, invalid } = this.props

    return (
      <form className='form-horizontal' onSubmit={handleSubmit}>
        <div className='form-group'>

          <Field name='name' id='eventName' component={renderFieldWithLabel} type='text' placeholder='Event Title'
            label='Event Title' />

          <Field name='description' id='description' component={renderFieldWithLabel} type='textarea' textAreaRows={15}
            placeholder='Event Description' label='Event Description' />

          <Field name='equipmentsProvided' id='equipmentsProvided' component={renderFieldWithLabel} type='textarea' textAreaRows={4}
            placeholder='Equipment Provided by Trainer' label='Equipment Provided by Trainer' />

          <Field name='equipmentsRequired' id='equipmentsRequired' component={renderFieldWithLabel} type='textarea' textAreaRows={4}
            placeholder='Equipment needed by Enrollee' label='Equipment needed by Enrollee' />

          <Field name='ageGroupIds' id='ageGroupIds' items={AGE_GROUPINGS} component={renderFieldWithLabel}
            type='checkbox' label='Age Groups' />

          <Field name='onlinePrice' id='onlinePrice' component={renderFieldWithLabel} type='number' label='Online Price' />

          <Field name='doorPrice' id='doorPrice' component={renderFieldWithLabel} type='number' label='Door Price' />

          <Field name='size' id='size' component={renderFieldWithLabel} type='number' label='Size' />

          <Field name='currency' id='currency' component={renderFieldWithLabel}
            type='select' placeholder='currency' label='Currency' items={getCurrencyOptions()} />

          <Field name='eventScheduleType' id='eventScheduleType' items={EVENT_SCHEDULE_TYPE}
            component={renderFieldWithLabel} type='radio-button' label='Has a Fixed Date?' />

          {this.getDateAndTime()}
        </div>

        <div className='row'>
          <button className='btn btn-danger btn-lg next-button' type='submit' onClick={this.gotToStep2}
            disabled={invalid}>Next
          </button>
        </div>
      </form>
    )
  }
}

EventFormStep1.propTypes = {
  invalid: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  handleNext: React.PropTypes.func,
  updateEvent: React.PropTypes.func,
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  equipmentsProvided: React.PropTypes.string,
  equipmentsRequired: React.PropTypes.string,
  currency: React.PropTypes.string,
  ageGroupIds: React.PropTypes.array,
  onlinePrice: React.PropTypes.number,
  doorPrice: React.PropTypes.number,
  eventScheduleType: React.PropTypes.string,
  size: React.PropTypes.number,
  date: React.PropTypes.instanceOf(Date),
  time: React.PropTypes.instanceOf(Date),
  initialValues: React.PropTypes.object,
  financialInfo: React.PropTypes.object
}

let DecoratedEventFormStep1 = reduxForm({
  form: 'eventFormStep1',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                 // <--- warning function given to redux-form
})(EventFormStep1)

// Decorate with connect to read form values
const selector = formValueSelector('eventFormStep1') // <-- same as form name
DecoratedEventFormStep1 = connect(state => {
  const { name, description, ageGroupIds, onlinePrice, doorPrice, currency, eventScheduleType, date, time, equipmentsProvided, equipmentsRequired, size } =
   selector(state, 'name', 'description', 'ageGroupIds', 'onlinePrice', 'doorPrice', 'currency', 'eventScheduleType',
     'date', 'time', 'equipmentsProvided', 'equipmentsRequired', 'size')
  return {
    name,
    description,
    ageGroupIds,
    onlinePrice,
    doorPrice,
    size,
    currency,
    eventScheduleType,
    date,
    time,
    equipmentsProvided,
    equipmentsRequired
  }
})(DecoratedEventFormStep1)

export default DecoratedEventFormStep1
