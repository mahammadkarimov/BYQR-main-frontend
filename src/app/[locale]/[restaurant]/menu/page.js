'use client'
import { Suspense, lazy, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { MealCategoriesWithQr, MealsWithNameGet } from '@/services/api/dataApi'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from 'react-query'
import './style.css'
import '../style.css'

// Lazy load the components
const RestaurantMenu = lazy(() =>
  import('@/components/Home/RestaurantMenu/RestaurantMenu')
)
const RestaurantMenuCustom = lazy(() =>
  import('@/components/Home/RestaurantMenuCustom')
)

const RestaurantMenuCustomNew = lazy(() =>
  import('@/components/Home/RestaurantMenuCustomNew/RestaurantMenuCustomNew')
)
const RestaurantMenuCustomNewSecond = lazy(() =>
  import('@/components/Home/RestaurantMenuCustomNewSecond/RestaurantMenuCustomNewSecond')
)


// Loading fallback component
const LoadingSkeleton = () => (
  <div className='loading-skeleton'>
    <div className='skeleton-header'></div>
    <div className='skeleton-search'></div>
    <div className='skeleton-categories'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='skeleton-category'></div>
      ))}
    </div>
    <div className='skeleton-meals'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='skeleton-meal-card'></div>
      ))}
    </div>
  </div>
)

const Page = () => {
  const [searchedMeal, setSearchedMeal] = useState('')
  const debouncedValue = useDebounce(searchedMeal, 250)
  const t = useTranslations('Home')
  const t2 = useTranslations('Admin')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Extract these values once instead of splitting multiple times
  const lang = pathname.split('/')[1]
  const restaurantId = pathname.split('/')[2]

  useEffect(() => {
    document.body.className = localStorage.getItem('theme') || ''
    document.body.className += lang === 'ar' ? ' rtl' : ' ltr'
  }, [lang])

  const { data: restaurantData, isLoading } = useQuery(
    ['user', restaurantId],
    () => MealCategoriesWithQr(restaurantId, lang),
    {
      staleTime: 60000, // Cache data for 1 minute
      retry: 1 // Limit retry attempts
    }
  )

  const { data: searchedMeals } = useQuery(
    ['searchedMeal', debouncedValue, lang],
    () => (debouncedValue ? MealsWithNameGet(lang, debouncedValue) : null),
    {
      staleTime: 30000, // Cache data for 30 seconds
      enabled: debouncedValue.length > 0 // Only run query if there's a search term
    }
  )

  if (isLoading) {
    return <LoadingSkeleton />
  }

  const isCustomRestaurant =
    restaurantData?.data?.username === 'theregalo' ||
    restaurantData?.data?.username === 'chaikend' ||
    restaurantData?.data?.username === 'obaoschuman'

  const isCustomNewRestaurant = restaurantData?.data?.username === 'champusique'
  const isCustomNewSecondRestaurant = restaurantData?.data?.username === 'siestabaku'

  let ComponentToRender;

  if (isCustomNewRestaurant) {
  ComponentToRender =  RestaurantMenuCustomNew;
} else if (isCustomNewSecondRestaurant) {
  ComponentToRender = RestaurantMenuCustomNewSecond ;
} else if(isCustomRestaurant) {
  ComponentToRender = RestaurantMenuCustom ;
}

else {
  ComponentToRender = RestaurantMenu;
}
  const commonProps = {
    t,
    searchParams,
    searchedMeals,
    setSearchedMeal,
    searchedMeal,
    restaurantData,
    router,
    pathname
  }

  return (
    <>
     <ComponentToRender {...commonProps} {...(ComponentToRender === RestaurantMenuCustom ? { t2 } : {})} />
    </>
  )
}

export default Page
