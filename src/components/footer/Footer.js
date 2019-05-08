import React, { Component } from 'react'
import './Footer.scss'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    // this.changeView = this.changeView.bind(this);
  }

  componentDidMount () {
  }

  render () {
    return (
      <footer className='footer-content footer-distributed'>
        <div className='container'>
          <div className='footer-left'>
            <h3>Inside<span>Not</span></h3>
            <p className='footer-company-name'>InsideNot &copy; 2017</p>
          </div>
          <div className='footer-center'>
            <div>
              <i className='fa fa-map-marker' />
              <p><span>159 Romina Street</span>Stittsville, ON K2S 0J3</p>
            </div>
            <div>
              <i className='fa fa-phone' />
              <p>+1 610-509-3939</p>
            </div>
            <div>
              <i className='fa fa-envelope' />
              <p><a href='mailto:support@insidenot.com'>support@insidenot.com</a></p>
            </div>
          </div>
          <div className='footer-right'>
            <p className='footer-company-about'>
              <span>About InsideNot</span>
              InsideNot is an online marketplace and fitness platform, enabling fitness experts in
              various domains to offer their fitness services outside of the gym.
            </p>
            <div className='footer-icons'>
              <a href='#'><i className='fa fa-facebook' /></a>
              <a href='#'><i className='fa fa-twitter' /></a>
              <a href='#'><i className='fa fa-linkedin' /></a>
              <a href='#'><i className='fa fa-github' /></a>
            </div>

          </div>
        </div>
      </footer>
    )
  }

}

Footer.propTypes = {
  store: React.PropTypes.object
}

export default Footer
