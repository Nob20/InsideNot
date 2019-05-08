import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderFieldWithoutLabel } from '../utils/FormUtils'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  }

  if (values.confirmPassword && values.password && values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords don\'t match'
  }

  return errors
}

const warn = values => {
  const warnings = {}
  return warnings
}

const ResetPasswordForm = (props) => {
  const { handleSubmit, pristine, submitting, invalid } = props
  return (
    <form className='form-horizontal' onSubmit={handleSubmit}>
      <Field name='password' type='password' component={renderFieldWithoutLabel} label='Password' className='custom-form-input' />
      <Field name='confirmPassword' type='password' component={renderFieldWithoutLabel} label='Confirm Password' className='custom-form-input' />
      <button className='btn btn-primary btn-block signup-button top-10' type='submit' disabled={pristine || submitting || invalid}>
        Submit
      </button>

    </form>
  )
}

ResetPasswordForm.propTypes = {
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func
}

export default reduxForm({
  form: 'resetPasswordForm',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(ResetPasswordForm)
