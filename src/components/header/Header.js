import React, { Component } from 'react'
import { IndexLink } from 'react-router'
import './Header.scss'
import { Button, Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import { UUID } from '../../utils/EntityUtils'
import { VisibleOnlyToLoggedInUser, VisibleOnlyToNonLoggedInUsers, VisibleToNotRole, VisibleOnlyToRoles } from './../../utils/AuthHelper'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

class Header extends Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.createEvent = this.createEvent.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  createEvent () {
    const newEvent = {
      id: UUID(),
      name: `New Event - ${Math.floor(Math.random() * 10000)} `
    }

    this.props.createNewEvent(newEvent)
  }

  logoutUser () {
    this.props.logoutUserAndGoToLogin()
  }

  getProfileMenu () {
    const ProfileMenu = (props) => {
      return (
        <NavDropdown className='custom-nav-item' eventKey={7} title='Profile' id='basic-nav-dropdown'>
          <MenuItem divider />
          <MenuItem onClick={this.logoutUser} eventKey={6.4}>Logout</MenuItem>
        </NavDropdown>
      )
    }
    const ProfileMenuComponent = VisibleOnlyToLoggedInUser(ProfileMenu, this.props)

    return <ProfileMenuComponent {...this.props} />
  }

  getMyEventsLink () {
    const MyEventsElement = (props) => (
      <LinkContainer className='custom-nav-item' to='/my-events'>
        <NavItem eventKey={7.2}>My Events</NavItem>
      </LinkContainer>
    )
    const MyEventsLink = VisibleOnlyToRoles(MyEventsElement, ['EVENT_HOST', 'SITE_ADMIN'])
    const ProfileMenu = (props) => {
      return (
        <MyEventsLink {...this.props} />
      )
    }
    const ProfileMenuComponent = VisibleOnlyToLoggedInUser(ProfileMenu, this.props)

    return <ProfileMenuComponent {...this.props} />
  }

  getMyEnrollmentsLink () {
    const MyEnrollments = (props) => {
      return (
        <LinkContainer className='custom-nav-item' to='/my-enrollments'>
          <NavItem eventKey={7.3}>My Enrollments</NavItem>
        </LinkContainer>
      )
    }
    const ProfileMenuComponent = VisibleOnlyToLoggedInUser(MyEnrollments, this.props)

    return <ProfileMenuComponent {...this.props} />
  }

  getLoginLink () {
    const Login = (props) => (<LinkContainer className='custom-nav-item' to='/login'><NavItem eventKey={5}>Login</NavItem></LinkContainer>)
    const LoginLink = VisibleOnlyToNonLoggedInUsers(Login, this.props)
    return <LoginLink {...this.props} />
  }

  getSignupLink () {
    const Login = (props) => (<LinkContainer className='custom-nav-item' to='/signup'><NavItem eventKey={6}>Signup</NavItem></LinkContainer>)
    const LoginLink = VisibleOnlyToNonLoggedInUsers(Login, this.props)
    return <LoginLink {...this.props} />
  }

  getCreateEventButton () {
    const CreateEvent = (props) => (
      <NavItem eventKey={5}><Button bsStyle='primary' onClick={this.createEvent}>Create New
        Event</Button></NavItem>)
    const CreateEventButton = VisibleOnlyToRoles(CreateEvent, ['EVENT_HOST', 'SITE_ADMIN'])
    return <CreateEventButton {...this.props} />
  }

  getBecomeAHostLink () {
    const BecomeAHost = (props) => (<LinkContainer className='custom-nav-item' to='/become-a-trainer'>
      <NavItem eventKey={8}><Button bsStyle='primary' onClick={this.props.becomeATrainer}>Become a Trainer</Button></NavItem></LinkContainer>)
    const BecomeAHostLink = VisibleToNotRole(BecomeAHost, 'EVENT_HOST', this.props)
    return <BecomeAHostLink {...this.props} />
  }

  render () {
    return (
      <div>
        <Navbar inverse collapseOnSelect componentClass='nav'>
          <Navbar.Header className='custom-nav-item'>
            <Navbar.Brand>
              <IndexLink className='nav-txt' to='/' activeClassName='route--active'>Inside<span>Not</span></IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <IndexLinkContainer to='/'><NavItem className='custom-nav-item' eventKey={1}>Home</NavItem></IndexLinkContainer>
              {this.getLoginLink()}
              {this.getSignupLink()}
              {this.getMyEventsLink()}
              {this.getMyEnrollmentsLink()}
              {this.getBecomeAHostLink()}
              {this.getCreateEventButton()}
              {this.getProfileMenu()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

Header.propTypes = {
  createNewEvent: React.PropTypes.func,
  becomeATrainer: React.PropTypes.func,
  logoutUserAndGoToLogin: React.PropTypes.func
}

export default Header
