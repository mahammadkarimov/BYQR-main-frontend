'use client'
import TechnicalService from '@/components/Hotel/TechnicalService/TechnicalService'
import { GetHotelServiceWithUsername, GetHotelWithQr } from '@/services/api/dataApi'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'

const page = () => {
    const pathname = usePathname()
    const firstKey = (pathname.split('/')[2]).split('-')[0]
    const secondKey = pathname.split('-')[1]

    const { data: hotelLastData, isLoading } = useQuery('hotel', () => secondKey == 'hotel/technical' ? GetHotelWithQr(pathname.split('/')[2]) : MealCategoriesWithQr(pathname.split('/')[2]))
    const { data: hotelData, isLoading: isLoading2} = useQuery('hotelService', () => GetHotelServiceWithUsername(pathname.split('/')[2], pathname.split('/')[1]))
    return (
        <>
            <TechnicalService hotelData={hotelData} hotelLastData={hotelLastData} isLoading={isLoading} isLoading2={isLoading2} />
        </>
    )
}

export default page