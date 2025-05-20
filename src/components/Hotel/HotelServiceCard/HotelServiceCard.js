'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleScrollFunc } from '@/redux/features/scrollSlice'
import HotelServiceModal from '../../Hotel/HotelServiceModal/HotelServiceModal'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { HotelGetCustomerServices } from '@/services/api/dataApi'
import HotelProductCard from '../../Hotel/HotelProductCard/HotelProductCard'
import { usePathname } from 'next/navigation'

const HomeProductCard = () => {
  const dispatch = useDispatch()
  const selActiveParam = useSelector(
    (state) => state.queryParams.isActiveQueryParams
  )
  const pathname = usePathname()

  const { data: customerServicesData, isLoading } = useQuery(
    ['hotelServices'],
    () => HotelGetCustomerServices(pathname.split('/')[2], pathname.split('/')[1])
  )
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleScroll = () => {
    dispatch(handleScrollFunc(window.scrollY))
  }

  return (
    <>
      <section>
        <div className="mb-20">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '9px',
              margin: '0 12px 40px 12px',
            }}
          >
            {customerServicesData?.data?.results?.map((service, index) => (
              <HotelProductCard
                isLoading={isLoading}
                service={service}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
      <HotelServiceModal />
    </>
  )
}
export default HomeProductCard
