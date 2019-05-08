import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderFieldWithoutLabel } from '../utils/FormUtils'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  }

  if (!values.name) {
    errors.name = 'Required'
  }

  if (values.confirmPassword && values.password && values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords don\'t match'
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Required'
  }

  return errors
}

const warn = values => {
  const warnings = {}
  return warnings
}

const SSOSignupForm = (props) => {
  const { handleSubmit, pristine, submitting, invalid, useAnotherEmail } = props
  return (
    <form className='form-horizontal' onSubmit={handleSubmit}>
      <Field name='name' type='text' component={renderFieldWithoutLabel} label='Full Name' className='custom-form-input' />
      <a className='pull-right another-email' onClick={useAnotherEmail}>Use another email?</a>
      <Field name='email' type='email' component={renderFieldWithoutLabel} label='Email' disabled className='custom-form-input' />
      <Field name='password' type='password' component={renderFieldWithoutLabel} label='Password' className='custom-form-input' />
      <Field name='confirmPassword' type='password' component={renderFieldWithoutLabel} label='Confirm Password' className='custom-form-input' />
      <button className='btn btn-primary btn-block signup-button top-10' type='submit' disabled={pristine || submitting || invalid}>
        Submit
      </button>

    </form>
  )
}

SSOSignupForm.propTypes = {
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  useAnotherEmail: React.PropTypes.func
}

export default reduxForm({
  form: 'signupForm',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(SSOSignupForm)
