import React, { Component } from 'react'
import './EnrollmentsList.scss'

class EnrollmentsList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.getAllEnrollmentsTableContent = this.getAllEnrollmentsTableContent.bind(this)
  }

  getAllEnrollmentsTableContent () {
    if (this.props.enrollments && this.props.enrollments.length > 0) {
      return (
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>User Email</th>
                <th>User Name</th>
                <th>Event Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              { this.props.enrollments && this.props.enrollments.map((enrollment, index) => {
                return (
                  <tr key={'enrollment' + index}>
                    <td>{enrollment.userEmail}</td>
                    <td>{enrollment.userName}</td>
                    <td>{enrollment.eventName}</td>
                    <td>{enrollment.currency} {enrollment.amount / 100}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>)
    } else {
      return (<h3>No users have enrolled so far</h3>)
    }
  }
  render () {
    if (this.props.hasErrored) {
      return <div className='top-70'><p>Sorry! There was an error loading the enrollments</p></div>
    }

    if (this.props.isLoading) {
      return (<div className='text-center top-30'><i className='top-70 fa fa-circle-o-notch fa-spin in-spinner' /></div>)
    }

    return (
      <div>
        <h2>All Enrollments</h2>
        <br />
        <br />
        {this.getAllEnrollmentsTableContent()}
      </div>
    )
  }

}

EnrollmentsList.propTypes = {
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  enrollments: React.PropTypes.array
}

export default EnrollmentsList
