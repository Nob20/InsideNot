import React, { Component } from 'react'
import './BecomeAHost.scss'

class BecomeAHost extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    // this.changeView = this.changeView.bind(this);
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='container-wrapper top-70 become-a-host'>
        <div className='row top-50'>
          <div className='col-xs-12 col-md-4'>
            <div className='panel panel-primary'>
              <div className='panel-heading'>
                <h3 className='panel-title'>Bronze</h3>
              </div>
              <div className='panel-body'>
                <div className='the-price'>
                  <h1>$10<span className='subscript'>/mo</span></h1>
                  <small>3 months FREE trial</small>
                </div>
              </div>
              <div className='subscription-cell'>Upto 2 workouts/mo</div>
              <div className='subscription-cell'>Upto 10 participants/event</div>
              <div className='subscription-cell'>2 Hrs of customer support/mo</div>
              <div className='subscription-cell'>No marketing help</div>
              <div className='panel-footer'>
                <a href='mailto:info@insidenot.com' className='btn btn-success' role='button'>Sign Up</a>
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                <h3 className='panel-title'>Silver</h3>
              </div>
              <div className='panel-body'>
                <div className='the-price'>
                  <h1>$50<span className='subscript'>/mo</span></h1>
                  <small>1 month FREE trial</small>
                </div>
                <div className='subscription-cell'>Upto 4 workouts/mo</div>
                <div className='subscription-cell'>Unlimited participants/event</div>
                <div className='subscription-cell'>8 Hrs of customer support/mo</div>
                <div className='subscription-cell'>4 Hrs of marketing help/mo</div>
                <div className='panel-footer'>
                  <a href='mailto:info@insidenot.com' className='btn btn-success' role='button'>Sign Up</a>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='panel panel-info'>
              <div className='cnrflash'>
                <div className='cnrflash-inner'>
                  <span className='cnrflash-label'>MOST POPULAR</span>
                </div>
              </div>
              <div className='panel-heading'>
                <h3 className='panel-title'>Gold</h3>
              </div>
              <div className='panel-body'>
                <div className='the-price'>
                  <h1>$200<span className='subscript'>/mo</span></h1>
                  <small>1 month FREE trial</small>
                </div>
              </div>
              <div className='subscription-cell'>Unlimited workouts/mo</div>
              <div className='subscription-cell'>Unlimited participants/event</div>
              <div className='subscription-cell'>20 Hrs of customer support/mo</div>
              <div className='subscription-cell'>20 Hrs of marketing help/mo</div>
              <div className='panel-footer'>
                <a href='mailto:info@insidenot.com' className='btn btn-success' role='button'>Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

BecomeAHost.propTypes = {
  store: React.PropTypes.object
}

export default BecomeAHost
