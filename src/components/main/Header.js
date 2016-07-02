import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

const Header = () => {
  return (
    <nav>
      <IndexLink to='/' activeClassName='active'> Home </IndexLink>
      {' | '}
      <IndexLink to='/invoices' activeClassName='active'> Page </IndexLink>
      {' | '}
      <IndexLink to='/organizations' activeClassName='active'> About </IndexLink>
    </nav>
  )
}

export default Header
