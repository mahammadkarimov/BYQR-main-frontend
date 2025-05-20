import React from 'react'
import './style.css'

const layout = ({ children }) => {
  return (
    <body className='light'>
      <div className='light' id='themeContainer'>{children}</div>
    </body>
  )
}

export default layout