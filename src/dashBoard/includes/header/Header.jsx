import React from 'react'
import './Header.css'

const Header = ({header}) => {
  return (
    <div className='dash_header'>
        <h4>{header}</h4>
    </div>
  )
}

export default Header