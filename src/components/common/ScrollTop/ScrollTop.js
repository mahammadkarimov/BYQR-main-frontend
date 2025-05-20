import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from './scrolltop.module.css'
import Image from 'next/image'
import arrowUp from '../../../assets/icons/Home/topScrollArrowUp.svg'

const ScrollTop = () => {
  const [isActiveArrow, setIsActiveArrow] = useState(false)

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 100 ? setIsActiveArrow(true) : setIsActiveArrow(false)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  return (
    <button
      className={`${styles.topScrollContainer} ${
        isActiveArrow ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <div
        className={`${styles.topScroll} z-20 text-3xl p-[15px] w-[45px] h-[45px] flex items-center justify-center text-white rounded-full}`}
      >
        <Image src={arrowUp} className={styles.icon} alt="arrowUp" />
      </div>
    </button>
  )
}

export default ScrollTop
