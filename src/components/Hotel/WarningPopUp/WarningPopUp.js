'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import styles from './WarningPopUp.module.css'
import database from '../../../firebaseConfig'
import { push, ref, serverTimestamp } from 'firebase/database'
import popUpAreYouSure from '../../../assets/images/Hotel/popUpAreYouSure.png'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from 'react-query'
import { GetHotelServiceWithSlug } from '../../../services/api/dataApi'
import { useState } from 'react'
import Cookies from 'js-cookie'

const WarningPopUp = ({
  isActiveWarningPopUp,
  setActiveWarningPopUp,
  setActiveThanksPopUp,
  serviceSlug,
}) => {
  const t = useTranslations('Home')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.id === 'warningPopup') {
        setActiveWarningPopUp(false)
      }
    })

    if (isActiveWarningPopUp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isActiveWarningPopUp])

  const handleServiceData = async () => {
    const timestamp = serverTimestamp()
    const hotelortableNum = Cookies.get('activeRoom')
    const serviceData = await GetHotelServiceWithSlug(serviceSlug)
    const serviceRef = ref(database, `${pathname.split('/')[2]}/services`)
    const serviceRef2 = ref(
      database,
      `${pathname.split('/')[2] + '-service'}/services`
    )
    if (hotelortableNum) {
      await push(serviceRef, {
        ...serviceData?.data,
        hotelortableNum,
        timestamp,
      })
        .then(() => {
          console.log('User data has been successfully written to Firebase')
          setActiveThanksPopUp(true)
          setActiveWarningPopUp(false)
          router.push(
            `/${pathname.split('/')[1]}/${pathname.split('/')[2]
            }/technical-service`
          )
        })
        .catch((error) => {
          console.error('Error writing user data to Firebase:', error)
        })
      await push(serviceRef2, {
        ...serviceData?.data,
        hotelortableNum,
        timestamp,
      })
    }
  }

  return (
    <>
      {isActiveWarningPopUp && (
        <>
          <div
            className={`w-full left-0 right-0 z-[1000] fixed top-[30vh] opening-animation`}
          >
            <div
              className={`${styles.popUpAreYouSureContainer} relative px-[15px] pb-[14px] pt-[59px] rounded-[10px] border border-[#E6E7EB] bg-white flex flex-col justify-between items-center z-[1000]`}
            >
              <>
                <div className="relative top-[-60px] flex justify-center items-center">
                  <div className="flex items-center justify-center absolute h-[100px] w-[100px] bg-[#FF6363] border-solid border-[#fff] border-[3.3px] border-opacity-40 rounded-[50%] p-[25px]">
                    <Image
                      loading="eager"
                      src={popUpAreYouSure}
                      width={51}
                      height={66}
                      alt="popUpAreYouSure"
                    />
                  </div>
                </div>
                <h3 className="text-[#7C8691] font-medium text-[20px] leading-normal">
                  {t('Are you sure?')}
                </h3>
                <p className="font-normal text-[12px] leading-normal text-[#D3DAE0]">
                  {t('If you confirm, our staff will come to your room')}
                </p>
                <div className="w-full flex justify-between gap-[13px] mt-[58px]">
                  <button
                    onClick={() => setActiveWarningPopUp(false)}
                    className="w-[144px] rounded-[4px] h-[38px] bg-[#FF3535] font-bold text-[14px] text-[#fff]"
                  >
                    {t('No')}
                  </button>
                  <button
                    onClick={handleServiceData}
                    className="bg-[#13C36F] w-[144px] rounded-[4px] h-[38px]  font-bold text-[14px] text-[#fff]"
                  >
                    {t('Yes')}
                  </button>
                </div>
              </>
            </div>
          </div>
          <div
            id='warningPopup'
            className={`fixed top-0 left-0 w-screen h-screen z-[999] ${styles.backgroundBlur}`}
          />
        </>
      )}
    </>
  )
}
export default WarningPopUp