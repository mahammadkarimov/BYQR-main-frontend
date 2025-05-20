'use client'
import ScrollTop from '@/components/common/ScrollTop/ScrollTop'
import HotelLayout from '../../../../components/Hotel/HotelLayout/HotelLayout'
import HotelServiceCard from '../../../../components/Hotel/HotelServiceCard/HotelServiceCard'
import React from 'react'

const page = () => {
  return (
    <>
      <HotelLayout>
        <HotelServiceCard />
      </HotelLayout>
      <ScrollTop />
    </>
  )
}

export default page
