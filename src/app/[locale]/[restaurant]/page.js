'use client'
import HomeLayout from '@/components/Home/HomeLayout/HomeLayout'
import HomeProductCard from '@/components/Home/HomeProductCard/HomeProductCard'
import { handleQueryParams } from '@/redux/features/queryParamsSlice'
import '../../../styles/reset.css'
import Cookies from 'js-cookie'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Distance, GetHotelWithQr, getTableID } from '@/services/api/dataApi'
import { handleActiveService } from '@/redux/features/activeService'
import ScrollTop from '@/components/common/ScrollTop/ScrollTop'
import SearchArea from '@/components/Home/SearchArea/SearchArea'
import HotelEntry from '@/components/Hotel/HotelEntry/HotelEntry'
import TechnicalService from '@/components/Hotel/TechnicalService/TechnicalService'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { MealCategoriesWithQr } from '@/services/api/dataApi'
import ChooseLang from '@/components/Home/ChooseLang/ChooseLang'
import TipSucess from '@/components/common/TipSuccess/TipSucess'
import RestaurantEntry from '@/components/Home/RestaurantEntry/RestaurantEntry'
import RestaurantEntryCustom from '@/components/Home/RestaurantEntryCustom/index'
import RestaurantEntryCustomNew from '@/components/Home/RestaurantEntryCustomNew/RestaurantEntry'
import RestaurantMenu from '@/components/Home/RestaurantMenu/RestaurantMenu'
import SocialArea from '@/components/Home/RestaurantEntry/SocialArea/SocialArea'
import SocialAreaCustomNew from '@/components/Home/RestaurantEntryCustomNew/SocialAreaCustomNew/SocialArea'
import SocialAreaCustom from '@/components/Home/RestaurantEntryCustom/SocialAreaCustom/index'
import PoweredByqr from '@/components/common/PoweredByqr/PoweredByqr'
import PoweredAgabala from '@/components/common/PoweredAgabala/index'
import './style.css'

export default function Home () {
  const [categoryId, setCategoryId] = useState('')
  const dispatch = useDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const firstKey = pathname.split('/')[2] || ''
  const secondKey = firstKey.split('-')[1] || ''

  const { data: hotelData = { data: {} } } = useQuery(
    'hotel',
    () =>
      secondKey === 'hotel'
        ? GetHotelWithQr(firstKey)
        : MealCategoriesWithQr(firstKey, pathname.split('/')[1]),
    {
      onSuccess: () => {
        Cookies.set('hotelUsername', firstKey + '-' + secondKey)
      },
      staleTime: 60000,
      cacheTime: 300000
    }
  )

  const { data: allData = { data: {} } } = useQuery(
    ['user', firstKey],
    () => MealCategoriesWithQr(firstKey, pathname.split('/')[1]),
    {
      staleTime: 60000,
      cacheTime: 300000
    }
  )

  const { data: waiterInfo } = useQuery(['user'], getTableID, {
    enabled: !!Cookies.get('table_id'),
    onSuccess: data => {
      if (data?.data?.table_id) {
        Cookies.set('table_id', data.data.table_id)
      }
    }
  })

  useEffect(() => {
    if (firstKey) {
      dispatch(handleQueryParams(firstKey))
      if (!['tips-success', 'tips-error'].includes(firstKey)) {
        Cookies.set('activeParams', firstKey)
      }
      if (searchParams.get('t_id')) {
        Cookies.set('activeTable', searchParams.get('t_id'))
      }
      if (searchParams.get('r_id')) {
        Cookies.set('activeRoom', searchParams.get('r_id'))
      }
    }
  }, [])

  useEffect(() => {
    if (allData?.data?.fbpixel) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      )
      fbq('init', allData?.data?.fbpixel)
      fbq('track', 'PageView')

      return () => {
        fbq('consent', 'revoke')
      }
    }
  }, [allData])

  return (
    <>
      {secondKey && hotelData?.data?.restaurants && (
        <div>
          <title>BY-QR Hotel</title>
          <HotelEntry
            hasTechnicalService={
              hotelData?.data?.restaurants[0]?.has_technical_service
            }
            hotelData={hotelData}
          />
        </div>
      )}
      {!secondKey && allData?.data?.username && (
        <div className='flex flex-col items-center justify-between w-full flex-grow min-h-[100vh]'>
          <div>
            {['theregalo', 'chaikend', 'obaoschuman','siestabaku','champusique','mirvaricafe','villagepro','khatairooms'].includes(
              allData?.data?.username
            ) ? (
              <RestaurantEntryCustom allData={allData} />
            ) : ['champusique'].includes(
              allData?.data?.username
            ) ? <RestaurantEntryCustomNew allData={allData} /> : <RestaurantEntry allData={allData} />}
          </div>
          <div>
            {['theregalo', 'chaikend', 'obaoschuman','siestabaku','champusique','mirvaricafe','villagepro','khatairooms'].includes(
              allData?.data?.username
            ) ? (
              <SocialAreaCustom allData={allData} />
            ) : ['champusique'].includes(
              allData?.data?.username
            ) ? (
              <SocialAreaCustomNew allData={allData} />
            ) : <SocialArea allData={allData} />}
            {allData?.data?.username !== 'agabala' ? (
              <PoweredByqr />
            ) : (
              <PoweredAgabala />
            )}
          </div>
        </div>
      )}
    </>
  )
}
