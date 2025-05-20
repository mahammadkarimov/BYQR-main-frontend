'use client'
import React, { useEffect } from 'react'
import RestaurantCategoryCards from '../../../../components/Home/RestaurantCategoryCards/index'
import { useQuery } from 'react-query'
import { usePathname, useRouter } from 'next/navigation'
import { MealCategoriesWithQr } from '@/services/api/dataApi'

const page = () => {
  const pathname = usePathname()
  const router = useRouter()

  const { data: allData, isLoading } = useQuery(
    ['user', pathname.split('/')[2]],
    () => MealCategoriesWithQr(pathname.split('/')[2], pathname.split('/')[1])
  )

  useEffect(() => {
    document.body.className = localStorage.getItem('theme')
    document.body.className += pathname.split('/')[1] === 'ar' ? ' rtl' : ' ltr'
  }, [])

  return (
    <>
      {(allData?.data?.username === 'theregalo' ||
        allData?.data?.username === 'chaikend' ||
        allData?.data?.username === 'mirvaricafe' ||
        allData?.data?.username === 'villagepro' ||
        allData?.data?.username === 'khatairooms' ||
        allData?.data?.username === 'obaoschuman') && (
        <RestaurantCategoryCards
          allData={allData}
          pathname={pathname}
          router={router}
        />
      )}
    </>
  )
}

export default page
