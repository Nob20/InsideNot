import axios from 'axios'
import { getCookie } from '../utils/Cookie'
import { AUTH_CONSTANTS, API_URL } from '../utils/Constants'

const auth = {
  loginExistingUser: () => {
    return makePrivateCall({
      url: `${API_URL}/api/private/loggedInUser`,
      method: 'get'
    })
  },
  loginUser: (credentials) => {
    return makePublicCall({
      url: `${API_URL}/api/public/login`,
      method: 'post',
      data: credentials
    })
  },
  loginWithFacebook: (accessToken) => {
    return makePublicCall({
      url: `${API_URL}/api/public/loginWithFacebook`,
      method: 'post',
      data: accessToken
    })
  },
  loginWithGoogle: (accessToken) => {
    return makePublicCall({
      url: `${API_URL}/api/public/loginWithGoogle`,
      method: 'post',
      data: accessToken
    })
  },
  createNewUser: (user) => {
    return makePublicCall({
      url: `${API_URL}/api/public/signup`,
      method: 'post',
      data: user
    })
  },
  becomeATrainer: (user) => {
    return makePrivateCall({
      url: `${API_URL}/api/public/become-a-trainer`,
      method: 'post',
      data: user
    })
  },
  sendPasswordResetEmail: (forgotPasswordCommand) => {
    return makePublicCall({
      url: `${API_URL}/api/public/forgot-password`,
      method: 'post',
      data: forgotPasswordCommand
    })
  },
  validatePasswordResetLink: (validateLinkCommand) => {
    return makePublicCall({
      url: `${API_URL}/api/public/validate-forgot-password-link`,
      method: 'post',
      data: validateLinkCommand
    })
  },
  resetPassword: (resetPasswordCommand) => {
    return makePublicCall({
      url: `${API_URL}/api/public/reset-password`,
      method: 'post',
      data: resetPasswordCommand
    })
  },
  completeSignupOfSSOUser: (user) => {
    return makePrivateCall({
      url: `${API_URL}/api/private/completeSignupOfSSOUser`,
      method: 'post',
      data: user
    })
  }
}

const events = {
  getEvent: (eventId) => {
    return makePublicCall({
      url: `${API_URL}/api/events/${eventId}`,
      method: 'get'
    })
  },
  getEvents: () => {
    return makePublicCall({
      url: `${API_URL}/api/events`,
      method: 'get'
    })
  },
  getMyEvents: () => {
    return makePrivateCall({
      url: `${API_URL}/api/my-events`,
      method: 'get'
    })
  },
  updateEvent: (event) => {
    return makePrivateCall({
      url: `${API_URL}/api/event`,
      method: 'put',
      data: event
    })
  },
  submitEventToEdit: (event) => {
    return makePrivateCall({
      url: `${API_URL}/api/event/submit`,
      method: 'put',
      data: event
    })
  },
  deleteEvent: (eventId) => {
    return makePrivateCall({
      url: `${API_URL}/api/events/${eventId}`,
      method: 'delete'
    })
  },
  createEvent: (event) => {
    return makePrivateCall({
      url: `${API_URL}/api/events`,
      method: 'post',
      data: event
    })
  },
  connectStripe: (eventId, code) => {
    return makePrivateCall({
      url: `${API_URL}/api/events/${eventId}/stripe-connect`,
      method: 'post',
      data: { code: code }
    })
  }
}

const event = {
  getEventEnrollments: (eventId) => {
    return makePrivateCall({
      url: `${API_URL}/api/private/events/${eventId}/enrollments`,
      method: 'get'
    })
  },
  removeAdmin: (eventId, adminId) => {
    return makePrivateCall({
      url: `${API_URL}/api/private/events/${eventId}/remove-admin/${adminId}`,
      method: 'delete'
    })
  },
  removeInvitedAdmin: (eventId, adminEmail) => {
    return makePrivateCall({
      url: `${API_URL}/api/private/events/${eventId}/remove-invited-admin/${adminEmail}`,
      method: 'delete'
    })
  },
  inviteAdmin: (eventId, adminName, adminEmail) => {
    return makePrivateCall({
      url: `${API_URL}/api/private/events/${eventId}/invite-admin`,
      method: 'post',
      data: { adminName, adminEmail }
    })
  }
}

const images = {
  uploadImage: (file, eventId) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('eventId', eventId)
    return makePrivateCall({
      headers: {
        'content-type': 'multipart/form-data'
      },
      url: `${API_URL}/api/private/images/upload`,
      method: 'post',
      data: formData
    })
  },
  uploadCoverImage: (file, eventId) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('eventId', eventId)
    return makePrivateCall({
      headers: {
        'content-type': 'multipart/form-data'
      },
      url: `${API_URL}/api/private/images/uploadCoverImage`,
      method: 'post',
      data: formData
    })
  },
  deleteImage: (imageId, eventId) => {
    return makePrivateCall({
      url: `${API_URL}/api/private/images/delete`,
      method: 'post',
      data: {
        imageId,
        eventId
      }
    })
  }

}

const payment = {
  chargeUser: (token, eventId) => {
    return makePrivateCall({
      url: `${API_URL}/api/private/payment`,
      method: 'post',
      data: { token, eventId }
    })
  }
}

const enrollments = {
  getMyEnrollments: () => {
    return makePrivateCall({
      url: `${API_URL}/api/private/my-enrollments`,
      method: 'get'
    })
  }
}

const admin = {
  getAllUsers: () => {
    return makePrivateCall({
      url: `${API_URL}/api/admin/all-users`,
      method: 'get'
    })
  },
  impersonateUser: (userId) => {
    return makePrivateCall({
      url: `${API_URL}/api/admin/impersonate/${userId}`,
      method: 'get'
    })
  },
  getAllEvents: () => {
    return makePrivateCall({
      url: `${API_URL}/api/admin/all-events`,
      method: 'get'
    })
  },
  getAllEnrollments: () => {
    return makePrivateCall({
      url: `${API_URL}/api/admin/all-enrollments`,
      method: 'get'
    })
  }
}
export const client = {
  auth,
  events,
  event,
  images,
  payment,
  enrollments,
  admin
}

function makePrivateCall (config) {
  if (config.headers) {
    config.headers['x-authenticate-user'] = getCookie(AUTH_CONSTANTS.AUTH_COOKIE_NAME)
  } else {
    config.headers = { 'x-authenticate-user': getCookie(AUTH_CONSTANTS.AUTH_COOKIE_NAME) }
  }
  return axios.request(config)
}

function makePublicCall (config) {
  return axios.request(config)
}
