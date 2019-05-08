import React, { Component } from 'react'
import { EMAIL_REGEX } from './../../../../utils/FormValidations'
import './AdminList.scss'
import moment from 'moment'

class AdminList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inviteAdmin : {
        name: '',
        email: ''
      }
    }
    this.getAdminsTableContent = this.getAdminsTableContent.bind(this)
    this.setInvitedAdminName = this.setInvitedAdminName.bind(this)
    this.setInvitedAdminEmail = this.setInvitedAdminEmail.bind(this)
    this.disableAddAdmin = this.disableAddAdmin.bind(this)
  }

  setInvitedAdminName (event) {
    const inviteAdmin = this.state.inviteAdmin
    inviteAdmin.name = event.target && event.target.value || ''
    this.setState({ inviteAdmin })
  }

  setInvitedAdminEmail (event) {
    const inviteAdmin = this.state.inviteAdmin
    inviteAdmin.email = event.target && event.target.value || ''
    this.setState({ inviteAdmin })
  }

  getAdminsTableContent () {
    if (this.props.event.admins && this.props.event.admins.length > 0) {
      return (
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.props.event.admins && this.props.event.admins.map((admin, index) => {
                return (
                  <tr key={'admin' + index}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td><button className='btn btn-danger btn-sm pull-left'
                      onClick={() => this.props.removeAdmin(this.props.event.id, admin.id)}>Remove</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (<div>No additional admins are added so far!</div>)
    }
  }

  getInvitedAdminsTableContent () {
    if (this.props.event.invitedAdmins && this.props.event.invitedAdmins.length > 0) {
      return (
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Invitation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.props.event.invitedAdmins && this.props.event.invitedAdmins.map((admin, index) => {
                return (
                  <tr key={'admin' + index}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{moment(admin.invitationDate).fromNow()}</td>
                    <td>
                      <button className='btn btn-danger btn-sm pull-left'
                        onClick={() => this.props.removeInvitedAdmin(this.props.event.id, admin.email)}>Remove</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (<div>No additional admins are invited so far!</div>)
    }
  }

  disableAddAdmin () {
    const inviteAdmin = this.state.inviteAdmin
    if (inviteAdmin.name && inviteAdmin.email && inviteAdmin.name.length > 2 && EMAIL_REGEX.test(inviteAdmin.email)) {
      return false
    }
    return true
  }

  render () {
    return (
      <div>
        <h2>All Events</h2>
        <br />
        <br />
        <h3>Admins</h3>
        {this.getAdminsTableContent()}
        <hr />
        <div>
          <div className='row invite-admin-controls'>
            <div className='form-group'>
              <label className='control-label col-md-3 col-lg-3'>Invite new Admin</label>
              <div className='col-md-9 col-lg-9'>
                <input className='form-control' placeholder='Name' value={this.state.inviteAdmin.name} onChange={this.setInvitedAdminName} />
                <input className='form-control' placeholder='Email' value={this.state.inviteAdmin.email} onChange={this.setInvitedAdminEmail} />
                <button className='btn btn-danger btn-md pull-left' disabled={this.disableAddAdmin()}
                  onClick={() => {
                    this.props.inviteAdmin(this.props.event.id, this.state.inviteAdmin.name, this.state.inviteAdmin.email)
                    this.setInvitedAdminName('')
                    this.setInvitedAdminEmail('')
                  }}>Add</button>
              </div>
            </div>
          </div>
        </div>
        <h3>Invited Admins</h3>
        {this.getInvitedAdminsTableContent()}
      </div>
    )
  }

}

AdminList.propTypes = {
  event: React.PropTypes.object,
  inviteAdmin: React.PropTypes.func,
  removeAdmin: React.PropTypes.func,
  removeInvitedAdmin: React.PropTypes.func

}

export default AdminList
