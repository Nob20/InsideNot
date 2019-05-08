import React from 'react'
import { DatePicker, TimePicker } from 'redux-form-material-ui'
import { Field } from 'redux-form'

const getField = function (name, input, label, type, className, items, disabled, textAreaRows, rest) {
  if (type === 'datepicker') {
    return (
      <Field {...input} component={DatePicker} />
    )
  }
  if (type === 'timepicker') {
    return (
      <Field {...input} component={TimePicker} />
    )
  } else if (type === 'checkbox') {
    return (<div>
      { items.map((item, index) => (

        <label className='checkbox-inline' key={`${name}[${index}]-key-checkbox-label`}>
          <input type='checkbox'
            name={`${name}[${index}]`}
            value={item.value}
            key={`${name}[${index}]-key-checkbox`}
            checked={input.value.indexOf(item.value) !== -1}
            onChange={event => {
              const newValue = [...input.value]
              if (event.target.checked) {
                newValue.push(item.value)
              } else {
                newValue.splice(newValue.indexOf(item.value), 1)
              }
              return input.onChange(newValue)
            }} />
          {item.label}
        </label>
        ))
      }
    </div>)
  } else if (type === 'select') {
    return (
      <select className='form-control' {...input} placeholder={label}>
        <option>select</option>
        {items}
      </select>
    )
  } else if (type === 'textarea') {
    const cssClass = className + ' form-control' || 'form-control'
    return (<textarea name={name} rows={textAreaRows} className={cssClass} {...input} disabled={disabled} placeholder={label} type={type} />)
  } else if (type === 'radio-button') {
    return (<div>
      { items.map((item, index) => (
        <label className='radio-inline' key={`${name}[${index}]-key-radio-label`}>
          <input type='radio'
            name={`${name}`}
            value={item.value}
            key={`${name}[${index}]-key-radio`}
            onChange={input.onChange}
            checked={input.value && input.value.indexOf(item.value) !== -1}
          />
          {item.label}
        </label>
      ))
      }
    </div>)
  } else {
    const cssClass = className + ' form-control' || 'form-control'
    return (<input name={name} className={cssClass} {...input} disabled={disabled} placeholder={label} type={type} />)
  }
}

export const renderFieldWithLabel = ({ input, label, name, type, className, items, disabled, textAreaRows,
                                       meta: { touched, error, warning }, ...rest }) => {
  const formControlClass = touched && error ? 'form-group has-error' : 'form-group'
  const field = getField(name, input, label, type, className, items, disabled, textAreaRows, rest)
  const helpText = touched && (error || warning)
  return (
    <div className='custom-form-input-wrapper'>
      <div className='row'>
        <div className={formControlClass}>
          <label htmlFor={name} className='control-label col-md-3 col-lg-3'>{label}</label>
          <div className='col-md-9 col-lg-9'>
            {field}
            <span className='error-text help-block pull-left' >{helpText}</span>
          </div>
        </div>
      </div>
    </div>)
}

export const renderFieldWithoutLabel = ({ input, label, name, type, className, items, disabled, textAreaRows,
                                          meta: { touched, error, warning } }) => {
  const formControlClass = touched && error ? 'form-group has-error' : 'form-group'
  const field = getField(name, input, label, type, className, items, disabled, textAreaRows)
  const helpText = touched && (error || warning)
  return (
    <div className='custom-form-input-wrapper'>
      <div className='row'>
        <div className={formControlClass}>
          <label />
          {field}
          <span className='error-text help-block pull-left' >{helpText}</span>
        </div>
      </div>
    </div>
  )
}

renderFieldWithoutLabel.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  className: React.PropTypes.string,
  textAreaRows: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  meta: React.PropTypes.object,
  input: React.PropTypes.object,
  items: React.PropTypes.array
}

renderFieldWithLabel.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  className: React.PropTypes.string,
  textAreaRows: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  meta: React.PropTypes.object,
  input: React.PropTypes.object,
  items: React.PropTypes.array
}
