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
  return errors
}

const warn = values => {
  const warnings = {}
  return warnings
}

const LoginForm = (props) => {
  const { handleSubmit, pristine, submitting, invalid } = props
  return (
    <div>
      <form className='form-horizontal' onSubmit={handleSubmit}>
        <Field name='email' type='email' component={renderFieldWithoutLabel} label='Email' className='custom-form-input' />
        <Field name='password' type='password' component={renderFieldWithoutLabel} label='Password' className='custom-form-input' />
        <button className='btn btn-primary btn-block login-button top-10' type='submit' disabled={pristine || submitting || invalid}>
          Submit
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func
}

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(LoginForm)
