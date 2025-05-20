import React from 'react'
import styles from './Button.module.css'

const Button = (props) => {
  const { children, styleCss } = props

  return (
    <button
      {...props}
      className={`active:bg-[#e65d4e] w-full h-14 sm:h-16 py-2.5 px-8 mb-4 flex items-center justify-center rounded-full bg-[#FD451C] ${styles.buttonPlace} ${styleCss}`}
    >
      {children}
    </button>
  )
}

export default Button
