'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import leftArrow from '../../../assets/icons/Hotel/leftArrow.svg'
import styles from '../HotelEntry/hotelentry.module.css'
import styles2 from '../TechnicalService/technicalservice.module.css'
import { Poppins } from 'next/font/google'
import WarningPopUp from '../WarningPopUp/WarningPopUp'
import ThanksPopUp from '../ThanksPopUp/ThanksPopUp'
import { usePathname, useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import { ClipLoader } from 'react-spinners'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
const TechnicalService = ({ hotelData, hotelLastData, isLoading, isLoading2 }) => {
  const [isActiveWarningPopUp, setActiveWarningPopUp] = useState(false)
  const [isActiveThanksPopUp, setActiveThanksPopUp] = useState(false)
  const [serviceSlug, setServiceSlug] = useState('')
  const t = useTranslations('Home')
  const router = useRouter()
  const pathname = usePathname()

  const handleService = (serviceSlug) => {
    setServiceSlug(serviceSlug)
    setActiveWarningPopUp(true)
  }
  
  return (
    <>
      <div className={`${poppins.className} ${styles.bg}`}>
        <section>
          <div className={styles2.hotelHeaderBg}>
            <div className={styles2.hotelBackBtn}>
              <Link href={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`} >
                <Image src={leftArrow} alt="left-arrow" />
                {t('Home')}
              </Link>
            </div>
            <div className={styles.hotelHead}>
              {
                isLoading ?
                  <Skeleton
                    circle
                    width={40}
                    height={40}
                    containerClassName="avatar-skeleton" />
                  :
                  <Image src={hotelLastData?.data?.profile_photo} width={500} height={500} alt="hotel-profile" />
              }
              {isLoading ?
                <Skeleton
                  width={80}
                  height={16} />
                :
                <h1>
                  {hotelLastData?.data?.first_name} {hotelLastData?.data?.last_name}
                </h1>
              }
            </div>
          </div>
        </section>
        <section>
          <div className={styles2.servicesContainer}>
            <div className={styles2.serviceHead}>
              <h2>{t('Services')}</h2>
            </div>
            <div className={styles2.serviceCardContainer}>
              {
                isLoading2 ?
                  <div className="flex justify-center items-center mt-5 mx-0 h-[100vh] my-auto">
                    <ClipLoader color="#FF1212" loading={true} size={35} />
                  </div>
                  :
                  hotelData?.data?.results?.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleService(service.slug)}
                      className={styles2.serviceCard}
                    >
                      <div
                        className={styles2.serviceCardImg}
                      >
                        <Image src={service.icon} className={styles2.serviceIcon} width={60} height={60} alt="repairman" />
                      </div>
                      <div className={styles2.serviceCardPara}>
                        <span>{service?.title}</span>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </section>
        <section>
          <div className={styles.bottomContainer}>
            <div className={styles.bottomArea}>
              <span>{t('Thanks for choosing us')}</span>
              <span>Powered by BYQR</span>
            </div>
          </div>
        </section>
      </div>
      <WarningPopUp
        isActiveWarningPopUp={isActiveWarningPopUp}
        setActiveWarningPopUp={setActiveWarningPopUp}
        setActiveThanksPopUp={setActiveThanksPopUp}
        serviceSlug={serviceSlug}
      />
      <ThanksPopUp
        isActiveThanksPopUp={isActiveThanksPopUp}
        setActiveThanksPopUp={setActiveThanksPopUp}
      />
    </>
  )
}
export default TechnicalService