import React, { Component } from 'react'
import './MyEnrollments.scss'
import moment from 'moment'

class MyEnrollments extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.getEnrollmentsTableContent = this.getEnrollmentsTableContent.bind(this)
  }

  componentDidMount () {
    this.props.loadMyEnrollments()
  }

  changeView (event) {
    event.preventDefault()
    console.log(event.target.id)
  }

  getEnrollmentsTableContent () {
    if (this.props.enrollments && this.props.enrollments.length > 0) {
      return (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Amount</th>
              <th>Enrolled</th>
            </tr>
          </thead>
          <tbody>
            { this.props.enrollments && this.props.enrollments.map((enrollment, index) => {
              return (
                <tr key={'my-enrollment' + index}>
                  <td>{enrollment.eventName}</td>
                  <td>{(enrollment.amount / 100).toFixed(2)} {enrollment.currency}</td>
                  <td>{moment(enrollment.dateTime).fromNow()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    } else {
      return (<h3>You have not enrolled in any event so far</h3>)
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
      <div className='container-wrapper top-70 list-enrollments-container'>
        <div>
          <h2>My Enrollments</h2>
          <br />
          <br />
          {this.getEnrollmentsTableContent()}
        </div>
      </div>
    )
  }

}

MyEnrollments.propTypes = {
  loadMyEnrollments: React.PropTypes.func,
  hasErrored: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  enrollments: React.PropTypes.array
}

export default MyEnrollments
