'use client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import TwiceHotelCard from '../../Hotel/TwiceHotelCard/TwiceHotelCard'

const HotelProductCard = ({ index, isLoading, service }) => {
  return (
    <>
      {
        isLoading ? (
          <>
            <Skeleton
              count={2}
              height={244}
              width={600}
              containerClassName="w-full flex gap-2 px-2.5"
              style={{ borderRadius: '12px 12px 0px 0px' }}
            />
          </>
        ) :
          <>
            <TwiceHotelCard
              index={index}
              service={service}
            />
          </>
      }
    </>
  )
}

export default HotelProductCard