import React, { Component } from 'react'
import './Sticky.scss'

class Sticky extends Component {

  constructor (props) {
    super(props)
    this.scrollListener = this.scrollListener.bind(this)
  }
  scrollListener (stickies) {
    const top = document.documentElement.scrollTop || document.body.scrollTop
    const bottom = document.documentElement.scrollHeight || document.body.scrollHeight;

    [].forEach.call(stickies, (sticky) => {
      const stickyInitial = parseInt(sticky.getAttribute('data-sticky-initial'), 10)
      const stickyEnter = parseInt(sticky.getAttribute('data-sticky-enter'), 10) || stickyInitial
      const stickyExit = parseInt(sticky.getAttribute('data-sticky-exit'), 10) || bottom

      if (top >= stickyEnter && top <= stickyExit) {
        sticky.classList.add('sticky')
      } else {
        sticky.classList.remove('sticky')
      }
    })
  }

  componentDidMount () {
    const setInitialHeights = (elements) => {
      [].forEach.call(elements, (sticky) => {
        sticky.setAttribute('data-sticky-initial', sticky.getBoundingClientRect().top)
      })
    }

    const stickies = document.querySelectorAll('[data-sticky]')
    setInitialHeights(stickies)

    document.addEventListener('scroll', () => this.scrollListener(stickies))
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.scrollListener)
  }

  render () {
    const { className, enter, exit, children } = this.props
    return (
      <div className={`Sticky ${className}`} data-sticky data-sticky-enter={enter} data-sticky-exit={exit} >
        {children}
      </div>)
  }
}

Sticky.propTypes = {
  className: React.PropTypes.string,
  enter: React.PropTypes.string,
  exit: React.PropTypes.string,
  children: React.PropTypes.node
}

export default Sticky
