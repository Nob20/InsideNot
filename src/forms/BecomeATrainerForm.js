import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderFieldWithLabel } from '../utils/FormUtils'
import { YES_NO_OPTIONS } from '../utils/EventUtils'

const validate = values => {
  const errors = {}
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  }

  if (!values.aboutTrainer) {
    errors.aboutTrainer = 'Required'
  }
  if (values.agreeToTC !== 'YES') {
    errors.agreeToTC = 'Required'
  }

  return errors
}

const warn = values => {
  const warnings = {}
  return warnings
}

const BecomeATrainerForm = (props) => {
  const { handleSubmit, pristine, submitting, invalid } = props
  return (
    <form className='form-horizontal' onSubmit={handleSubmit}>
      <Field name='phoneNumber' type='text' component={renderFieldWithLabel} label='Phone Number' className='custom-form-input' />
      <Field name='aboutTrainer' id='equipmentsRequired' component={renderFieldWithLabel} type='textarea' textAreaRows={8}
        placeholder='About You' label='About You' />
      <Field name='termsAndConditions' id='equipmentsRequired' component={renderFieldWithLabel} type='textarea' disabled textAreaRows={4}
        placeholder='Terms & Conditions' label='Terms & Conditions' />
      <Field name='agreeToTC' id='agreeToTC' items={YES_NO_OPTIONS}
        component={renderFieldWithLabel} type='radio-button' label='Agree to Terms' />
      <button className='btn btn-primary btn-block become-a-trainer-btn top-10' type='submit' disabled={pristine || submitting || invalid}>
        Submit
      </button>

    </form>
  )
}

BecomeATrainerForm.propTypes = {
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func
}

export default reduxForm({
  form: 'becomeATrainer',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(BecomeATrainerForm)
