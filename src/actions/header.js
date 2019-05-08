import { goToURL } from '../utils/Navigation'

export function goToMyEnrollments () {
  return goToURL(`/my-enrollments`)
}

export function goToMyEvents () {
  return goToURL(`/my-events`)
}

export function becomeATrainer () {
  return goToURL(`/become-a-trainer`)
}
