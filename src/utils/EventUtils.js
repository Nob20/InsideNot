import React from 'react'
import { STATES, COUNTRIES } from './LocationUtils'

export const CURRENCIES = ['USD', 'CAD', 'AUD', 'SGD']

export const EVENT_SCHEDULE_TYPE = [{ label: 'Yes', value: 'FIXED_DATE' }, { label: 'No', value: 'NO_DATE' }]

export const YES_NO_OPTIONS = [{ label: 'Yes', value: 'YES' }, { label: 'No', value: 'NO' }]

export const AGE_GROUPINGS = [
{ value: '1', label: '1-3' },
{ value: '2', label: '4-9' },
{ value: '3', label: '6-12' },
{ value: '4', label: '12-17' },
{ value: '5', label: '18-29' },
{ value: '6', label: '30-44' },
{ value: '7', label: '45-64' },
{ value: '8', label: '65' }
]

export function getStateOptions () {
  const options = STATES.map((state, index) => {
    return (<option key={index + 'state'} value={state.short}>{state.name}</option>)
  })
  return options
}

export function getCountryOptions () {
  const options = COUNTRIES.map((country, index) => {
    return (<option key={index + 'country'} value={country.short}>{country.name}</option>)
  })
  return options
}

export function getCurrencyOptions () {
  const options = CURRENCIES.map((currency, index) => {
    return (<option key={index + `event-currency-repeat-key`} value={currency}>{currency}</option>)
  })
  return options
}

