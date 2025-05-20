'use client'
import HomeHeader from '@/components/common/HomeHeader/HomeHeader'
import HomeNavbar from '@/components/common/HomeNavbar/HomeNavbar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HomeCategories from '../HomeCategories/HomeCategories'
import styles from '../../../components/Home/SearchFilterModal/searchfiltermodal.module.css'
import CallService from '../CallService/CallService'
import MakePayment from '../MakePayment/MakePayment'
import ServicePopUp from '../CallService/ServicePopUp/ServicePopUp'
import BillingPopUp from '../MakePayment/BillingPopUp/BillingPopUp'
import { useTransform, motion, useScroll } from 'framer-motion'
import SearchArea from '../SearchArea/SearchArea'
import { useQuery } from 'react-query'
import { useMediaQuery } from 'react-responsive'
import GiveTips from '../GIveTips/GiveTips'
import TipsPopUp from '../GIveTips/ServicePopUp/TipsPopUp'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import FeedbackBtn from '../FeedbackBtn/FeedbackBtn'
import Cookies from 'js-cookie'

const HomeLayout = ({ children, allData, waiterInfo, setCategoryId, categoryId }) => {
  const [scrollPosition, setScrollPosition] = useState(144)
  const [scrollPosition2, setScrollPosition2] = useState(90)
  const selScrollY = useSelector((state) => state.scrollSlice.yScrollValue)
  const isMaxH600 = useMediaQuery({ maxHeight: 600 })
  const pathname = usePathname()

  useEffect(() => {
    Cookies.set('user-type', '')
  }, [])

  const isActiveService = useSelector(
    (state) => state.callService.isActiveService
  )
  const isActivePayment = useSelector(
    (state) => state.makePayment.isActivePayment
  )
  const isActiveTips = useSelector((state) => state.tipSlice.isActiveTips)

  return (
    <>
      <div className="fixed top-0 left-0 bg-white z-50 w-full">
        <HomeHeader
          scrollPosition={scrollPosition}
          scrollPosition2={scrollPosition2}
        />
        {allData?.data?.package?.name !== 'bronze' && (
          <div className="flex flex-col gap-3 items-center justify-center w-[92vw] -mt-2 mx-[14px] mb-3">
            {allData?.data?.package?.features?.some(feature => feature.name === 'Feedback') ?
              <div className={`${styles['fadeInAnimation2']}`}>
                <div>
                  <FeedbackBtn />
                </div>
                <div className={`${styles['fadeInAnimation']}`}>
                  {allData?.data?.package?.features?.some(feature => feature.name === 'Call waiter') &&
                    <>
                      <CallService />
                      <MakePayment />
                    </>
                  }
                  {allData?.data?.package?.features?.some(feature => feature.name === 'Tips') &&
                    <GiveTips />
                  }
                </div>
              </div>
              :
              <div className={`${styles['fadeInAnimation']}`}>
                {allData?.data?.package?.features?.some(feature => feature.name === 'Call waiter') &&
                  <>
                    <CallService />
                    <MakePayment />
                  </>
                }
                {allData?.data?.package?.features?.some(feature => feature.name === 'Tips') &&
                  <GiveTips />
                }
              </div>
            }
            {isActiveService && <ServicePopUp />}
            {isActivePayment && <BillingPopUp />}
            {isActiveTips && <TipsPopUp waiterInfo={waiterInfo} />}
          </div>
        )}
        <HomeCategories activeFeedback={allData?.data?.package?.features?.some(feature => feature.name === 'Feedback')} categoryId={categoryId} setCategoryId={setCategoryId} scrollPosition={scrollPosition} />
      </div>
      <div
        className={`${'w-full'}` && allData?.data?.package?.name === 'bronze' ? "mt-[450px]" : allData?.data?.package?.name === 'diamond' || allData?.data?.package?.name === 'gold' ? "mt-[550px] " : "mt-[500px]"}>
        {children}
      </div>
      {/* <HomeNavbar /> */}
      <SearchArea />
    </>
  )
}

export default HomeLayout
