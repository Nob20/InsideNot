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
  return errors
}

const warn = values => {
  const warnings = {}
  return warnings
}

const ForgotPasswordForm = (props) => {
  const { handleSubmit, pristine, submitting, invalid, inProcess } = props
  return (
    <form className='form-horizontal' onSubmit={handleSubmit}>
      <Field name='email' type='email' component={renderFieldWithoutLabel} label='Email' className='custom-form-input' />
      <button className='btn btn-primary btn-block signup-button top-50' type='submit' disabled={pristine || submitting || invalid || inProcess}>
        <i className={inProcess ? ' fa fa-spin fa-circle-o-notch margin-5' : ''} />
        Submit
      </button>

    </form>
  )
}

ForgotPasswordForm.propTypes = {
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  inProcess: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func
}

export default reduxForm({
  form: 'forgotPasswordForm',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(ForgotPasswordForm)
