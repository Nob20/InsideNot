import React, { Component } from 'react'
import Visibility from 'material-ui/svg-icons/action/visibility'
import './MessageThreads.scss'

class UsersList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.getAllUsersTableContent = this.getAllUsersTableContent.bind(this)
  }

  componentDidMount () {
    this.props.loadAllUsers()
  }

  changeView (event) {
    event.preventDefault()
    console.log(event.target.id)
  }

  getAllUsersTableContent () {
    if (this.props.users && this.props.users.length > 0) {
      return (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.props.users && this.props.users.map((user, index) => {
              return (
                <tr key={'my-user' + index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.roles.join(',')}</td>
                  <td><span style={{ cursor: 'pointer' }} onClick={() => this.props.impersonateUser(user.id)}><Visibility /></span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    } else {
      return (<h3>No users found in the site!</h3>)
    }
  }
  render () {
    if (this.props.hasErrored) {
      return <div className='container-wrapper top-70'><p>Sorry! There was an error loading the events</p></div>
    }

    if (this.props.isLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }

    return (
      <div>
        <h2>All Users</h2>
        <br />
        <br />
        {this.getAllUsersTableContent()}
      </div>
    )
  }

}

UsersList.propTypes = {
  impersonateUser: React.PropTypes.func,
  loadAllUsers: React.PropTypes.func,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  users: React.PropTypes.array
}

export default UsersList
