'use client'
import HomeNavbar from '@/components/common/HomeNavbar/HomeNavbar'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTransform, motion, useScroll } from 'framer-motion'
import HotelHomeHeader from '../HotelHomeHeader/HotelHomeHeader'

const HomeLayout = ({ children }) => {
  const { scrollY } = useScroll()
  const width = useTransform(scrollY, [0, 300], [160, 0])
  const height = useTransform(scrollY, [0, 300], ['500px', '650px'])
  const height1 = useTransform(scrollY, [0, 300], ['580px', '650px'])
  const opacity = useTransform(scrollY, [0, 150], [1, 0])

  const [scrollPosition, setScrollPosition] = useState(144)
  const [scrollPosition2, setScrollPosition2] = useState(90)
  const selScrollY = useSelector((state) => state.scrollSlice.yScrollValue)
  const selActiveService = useSelector(
    (state) => state.activeService.isActiveService
  )
  const isActiveService = useSelector(
    (state) => state.callService.isActiveService
  )
  const isActivePayment = useSelector(
    (state) => state.makePayment.isActivePayment
  )

  return (
    <>
      <div className="fixed top-0 left-0 bg-white z-50 w-full">
        <HotelHomeHeader/>
      </div>
      <div
        className={`absolute w-full ${
          selScrollY > 300
            ? 'top-[600px]'
            : selActiveService
            ? 'top-[330px]'
            : 'top-[330px]'
        }`}
      >
        {children}
      </div>
      {/* <HomeNavbar /> */}
    </>
  )
}

export default HomeLayout