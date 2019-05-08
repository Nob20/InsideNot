import React, { Component } from 'react'
import './AdminDashboard.scss'
import { Tabs, Tab } from 'material-ui/Tabs'
import Face from 'material-ui/svg-icons/action/face'
import AccountIcon from 'material-ui/svg-icons/action/account-box'
import Event from 'material-ui/svg-icons/action/event'
import UsersList from './users/UsersList'
import EventsList from './events/EventsList'
import EnrollmentsList from './enrollments/EnrollmentsList'

class AdminDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.params.tabName || 'users'
    }
  }

  handleChange = (value) => {
    this.props.gotToTab(value)
    this.setState({
      value: value
    })
  };

  render () {
    return (
      <div className='container-wrapper top-70 dashboard-container'>
        <div>
          <Tabs
            value={this.state.value}>
            <Tab
              onActive={() => this.handleChange('events')}
              value='events'
              icon={<Event />}
              label='All Events'
              className='dasboard-tab'>
              <EventsList
                loadAllEvents={this.props.loadAllEvents}
                events={this.props.allEvents.events}
                hasErrored={this.props.allEvents.hasErrored}
                isLoading={this.props.allEvents.isLoading} />
            </Tab>
            <Tab
              onActive={() => this.handleChange('users')}
              value='users'
              icon={<AccountIcon />}
              label='All Users'
              className='dasboard-tab'>
              <UsersList loadAllUsers={this.props.loadAllUsers}
                users={this.props.allUsers.users}
                hasErrored={this.props.allUsers.hasErrored}
                isLoading={this.props.allUsers.isLoading}
                impersonateUser={this.props.impersonateUser} />
            </Tab>
            <Tab
              onActive={() => this.handleChange('enrollments')}
              value='enrollments'
              icon={<Face />}
              label='All Enrollments'
              className='dasboard-tab' >
              <EnrollmentsList
                loadAllEnrollments={this.props.loadAllEnrollments}
                enrollments={this.props.allEnrollments.enrollments}
                hasErrored={this.props.allEnrollments.hasErrored}
                isLoading={this.props.allEnrollments.isLoading} />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }

}

AdminDashboard.propTypes = {
  impersonateUser: React.PropTypes.func,
  loadAllUsers: React.PropTypes.func,
  allUsers: React.PropTypes.object,
  loadAllEnrollments: React.PropTypes.func,
  loadAllEvents: React.PropTypes.func,
  allEnrollments: React.PropTypes.object,
  allEvents: React.PropTypes.object,
  gotToTab: React.PropTypes.func,
  params: React.PropTypes.object
}

export default AdminDashboard
