'use client'
import React, { useEffect, useState } from 'react'
import RestaurantFirstArea from './RestauranFirstArea/RestaurantFirstArea'
import RestaurantSecondArea from './RestaurantSecondArea/RestaurantSecondArea'
import RestaurantThirdArea from './RestaurantThirdArea/RestaurantThirdArea'
import RestaurantFourthArea from './RestaurantFourthArea/RestaurantFourthArea'
import ThemeSwitcher from './ThemeSwitcher/index'
import SocialArea from './SocialArea/SocialArea'
import PoweredByqr from '@/components/common/PoweredByqr/PoweredByqr'
import ChooseLang from '../ChooseLang/ChooseLang'
import ServicePopUp from '../CallService/ServicePopUp/ServicePopUp'
import BillingPopUp from '../MakePayment/BillingPopUp/BillingPopUp'
import TipsPopUp from '../GIveTips/ServicePopUp/TipsPopUp'
import { useQuery } from 'react-query'
import { getTableID } from '@/services/api/dataApi'
import Cookies from 'js-cookie'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import './style.css'
import InfoModal from './InfoModal/InfoModal'

const RestaurantEntry = ({ allData }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('Home')
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [isActiveLang, setIsActiveLang] = useState(false)
  const [isActiveService, setIsActiveService] = useState(false)
  const [isActivePayment, setIsActivePayment] = useState(false)
  const [isActiveTips, setIsActiveTips] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [guestMessage, setGuestMessage] = useState('')
  const [selectedMethod, setSelectedMethod] = useState(null)
  const { data: waiterInfo } = useQuery(['user'], getTableID, {
    onSuccess: data => {
      Cookies.set('table_id', data?.data?.table_id)
    }
  })

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', 'dark')
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      localStorage.setItem('theme', 'light')
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    if (pathname.split('/')[1] === 'ar') {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
    }
  }, [pathname])

  useEffect(() => {
    if (isActiveLang) {
      document.body.style.overflow = 'hidden'
      return
    }

    document.body.style.overflow = 'auto'
  }, [isActiveLang])

  return (
    <>
      <div className='max-w-sm mx-auto'>
        <ThemeSwitcher />
        <RestaurantFirstArea
          t={t}
          allData={allData}
          pathname={pathname}
          setIsActiveLang={setIsActiveLang}
        />
        <RestaurantSecondArea pathname={pathname} allData={allData} />
        <RestaurantFourthArea
          router={router}
          packageName={allData?.data?.package?.name}
          t={t}
          pathname={pathname}
        />
        <RestaurantThirdArea
          packageName={allData?.data?.package?.name}
          t={t}
          setSelectedMethod={setSelectedMethod}
          setGuestMessage={setGuestMessage}
          setIsSuccess={setIsSuccess}
          setIsActiveService={setIsActiveService}
          setIsActivePayment={setIsActivePayment}
          setIsActiveTips={setIsActiveTips}
        />
        <ChooseLang
          t={t}
          allData={allData}
          pathname={pathname}
          setIsActiveLang={setIsActiveLang}
          isActiveLang={isActiveLang}
        />
        <ServicePopUp
          setIsSuccess={setIsSuccess}
          setGuestMessage={setGuestMessage}
          guestMessage={guestMessage}
          isSuccess={isSuccess}
          isActiveService={isActiveService}
          setIsActiveService={setIsActiveService}
        />
        <BillingPopUp
          setIsSuccess={setIsSuccess}
          isSuccess={isSuccess}
          setSelectedMethod={setSelectedMethod}
          selectedMethod={selectedMethod}
          isActivePayment={isActivePayment}
          setIsActivePayment={setIsActivePayment}
        />
        <TipsPopUp
          waiterInfo={waiterInfo}
          setIsActiveTips={setIsActiveTips}
          isActiveTips={isActiveTips}
        />
        <InfoModal
          t={t}
          allData={allData}
          router={router}
          searchParams={searchParams}
        />
      </div>
    </>
  )
}

export default RestaurantEntry
