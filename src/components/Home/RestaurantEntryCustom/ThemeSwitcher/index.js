'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import moon from '../../../../assets/icons/Home/moon.svg'
import sun from '../../../../assets/icons/Home/sun.svg'
import styles from './style.module.css'

const Index = ({ allData }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light'
    setTheme(storedTheme)
    document.body.className = storedTheme
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.className = newTheme
  }

  return (
    <button className='pt-4 pb-3' onClick={toggleTheme}>
      {theme === 'dark' ? (
        <div
          className={
            allData?.data?.username === 'chaikend'
              ? styles.bg
              : allData?.data?.username === 'obaoschuman'
              ? styles.bg1
              :  allData?.data?.username === 'siestabaku' || allData?.data?.username === 'champusique'
              ? styles.bg2 : styles.switcherContainer
          }
        >
          <Image src={sun} alt='sun' />
        </div>
      ) : (
        <div
          className={
            allData?.data?.username === 'chaikend'
              ? styles.bg
              : allData?.data?.username === 'obaoschuman'
              ? styles.bg1
              :  allData?.data?.username === 'siestabaku' || allData?.data?.username === 'champusique'
              ? styles.bg2 : styles.switcherContainer
          }
        >
          <Image src={moon} alt='moon' />
        </div>
      )}
    </button>
  )
}

export default Index
