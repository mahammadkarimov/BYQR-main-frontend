'use client'
import React, { useEffect, useState } from 'react'
import agabalaBlack from '../../../assets/images/Home/agabalaBlack.png'
import agabalaWhite from '../../../assets/images/Home/agabalaWhite.png'
import Image from 'next/image'

const index = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(localStorage.getItem('theme'))
  }, [localStorage.getItem('theme')])

  return (
    <div className='mb-4 flex justify-center'>
      {theme == 'dark' ? <Image src={agabalaWhite} width={60} height={60} alt='agabala-logo' /> : <Image src={agabalaBlack} width={60} height={60} alt='agabala-logo' />}
    </div>
  )
}

export default index