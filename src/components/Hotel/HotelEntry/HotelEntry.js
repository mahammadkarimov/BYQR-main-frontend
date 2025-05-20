import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from '../HotelEntry/hotelentry.module.css'
import serviceIcon from '../../../assets/icons/Hotel/serviceIcon.svg'
import restaurant from '../../../assets/icons/Hotel/restaurant.svg'
import man from '../../../assets/icons/Hotel/man.svg'
import feedback from '../../../assets/icons/Hotel/feedback.png'
import { Poppins } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Cookies from 'js-cookie'
import az from '../../../assets/icons/Home/azFlag1.svg'
import en from '../../../assets/icons/Home/engFlag1.svg'
import ru from '../../../assets/icons/Home/RusFlag.svg'
import ar from '../../../assets/icons/Home/ArabicFlag.svg'
import ko from '../../../assets/icons/Home/koFlag.jpg'
import dropdownArr from '../../../assets/icons/Home/dropdownArrow.svg'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

export const lang = [
  [az, 'az'],
  [en, 'en'],
  [ru, 'ru'],
  [ar, 'ar'],
  [ko, 'ko']
]

const HotelEntry = ({ hotelData, isLoading2, hasTechnicalService }) => {
  const pathname = usePathname()
  const [isActiveDropdown, setIsActiveDropdown] = useState(false)
  const [activeLang, setActiveLang] = useState(pathname.split('/')[1])
  const t = useTranslations('Home')
  const router = useRouter()

  const dropdownArrRef = useRef(null)

  useEffect(() => {
    Cookies.set('user-type', hotelData?.data?.user_type)
  }, [])

  const handleDropdownMenu = e => {
    if (isActiveDropdown) {
      dropdownArrRef.current.style.transform = 'rotate(0deg)'
      setIsActiveDropdown(false)
      return
    }
    dropdownArrRef.current.style.transform = 'rotate(180deg)'
    setIsActiveDropdown(true)
  }

  const handleLang = e => {
    router.push(
      `/${e.target.getAttribute('data-lang')}/${pathname.split('/')[2]}`
    )
    Cookies.set('client-lang', pathname.split('/')[1])
    setActiveLang(e.target.getAttribute('data-lang'))
  }

  return (
    <>
      <div className={`${poppins.className} ${styles.bg}`}>
        <section>
          <div className={styles.hotelHeaderBg}>
            <div className={styles.hotelHead}>
              <Image
                src={hotelData.data.profile_photo}
                width={50}
                height={50}
                alt='hotel-profile'
              />
              <h1>
                {hotelData.data.first_name} {hotelData.data.last_name}
              </h1>
            </div>
            <div className={styles.hotelDesc}>
              <h2>
                {t('Xoş gəlmisiniz!')}&nbsp;
                {/* <span>
                  {hotelData.data.first_name} {hotelData.data.last_name}
                </span> */}
              </h2>
            </div>
            <div className={styles.dropdown} onClick={handleDropdownMenu}>
              <Image
                src={
                  activeLang == 'az'
                    ? az
                    : activeLang == 'en'
                    ? en
                    : activeLang == 'ru'
                    ? ru
                    : activeLang == 'ar'
                    ? ar
                    : activeLang == 'ko'
                    ? ko
                    : null
                }
                alt='language'
                className='!w-8'
                width={100}
                height={100}
              />
              <Image
                ref={dropdownArrRef}
                src={dropdownArr}
                alt='dropdown-arrow'
              />
            </div>
            <div
              className={`${
                isActiveDropdown
                  ? styles.langDropdownVisible
                  : styles.langDropdownHidden
              }`}
            >
              <ul className='flex flex-col gap-2'>
                {lang.map(
                  (lan, i) =>
                    Cookies.get('client-lang') !== lan && (
                      <li key={i}>
                        <button onClick={handleLang}>
                          <Image
                            width={100}
                            height={100}
                            className='!w-8'
                            data-value={lan[0]}
                            data-lang={lan[1]}
                            src={lan[0]}
                            alt='language'
                          />
                        </button>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </section>
        <section>
          <div className={styles.servicesContainer}>
            <div className={styles.servicesHead}>
              <h2>{t('Services')}</h2>
            </div>
            <div>
              {hotelData.data.username !== 'premiumpark-hotel' &&  (hasTechnicalService && (
                <Link
                  href={`${pathname}/technical-service`}
                  className={styles.serviceCardContainer}
                >
                  <div className={styles.serviceLeftCard}>
                    <Image src={serviceIcon} alt='service-icon' />
                  </div>
                  <div className={styles.serviceRightCard}>
                    <h3>{t('Texniki servis')}</h3>
                    <p>{t('Hamam, otaq, elektrik enerjisi və s')}.</p>
                    <span>👉🏻</span>
                  </div>
                </Link>
              ))}
              <Link href={`${pathname}/restaurant-list`}>
                <div className={styles.serviceCardContainer}>
                  <div className={styles.serviceLeftCard2}>
                    <Image src={restaurant} alt='restaurant-icon' />
                  </div>
                  <div className={styles.serviceRightCard}>
                    <h3>{t('Restoran siyahısı')}</h3>
                    <p>
                      {t('Restoran və menyu')}
                    </p>
                    <span>👉🏻</span>
                  </div>
                </div>
              </Link>
              <Link href={`${pathname}/${pathname.split('/')[2].split('-')[0]}-services`}>
                <div className={styles.serviceCardContainer}>
                  <div className={styles.serviceLeftCard3}>
                    <Image src={man} alt='restaurant-icon' />
                  </div>
                  <div className={styles.serviceRightCard}>
                    <h3>{t('Bizim xidmətlər')}</h3>
                    <p>{t('Otel daxili xidmətlər')}</p>
                    <span>👉🏻</span>
                  </div>
                </div>
              </Link>
              <Link href={`${pathname}/feedback`}>
                <div className={styles.serviceCardContainer}>
                  <div className={styles.serviceLeftCard4}>
                    <Image src={feedback} alt='restaurant-icon' />
                  </div>
                  <div className={styles.serviceRightCard}>
                    <h3>{t('Müştəri rəyi')}</h3>
                    <p>{t('Otel haqqında rəyin verilməsi')}</p>
                    <span>👉🏻</span>
                  </div>
                </div>
              </Link>
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
    </>
  )
}
export default HotelEntry
