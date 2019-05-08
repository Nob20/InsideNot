import React, { Component } from 'react'
import Header from '../../containers/HeaderContainer'
import Footer from './../../components/footer/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'

class CoreLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.loginExistingUser()
  }

  render () {
    const { children } = this.props
    return (
      <div className='core-layout-wrapper'>
        <Header />
        <div className='wrap-content'>
          <div className='main-content'>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element,
  loginExistingUser: React.PropTypes.func
}

export default CoreLayout
