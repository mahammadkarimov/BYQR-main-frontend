import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import x from '../../../../assets/icons/Admin/Entry/x.svg'
import Cookies from 'js-cookie'

const InfoModal = ({
  t,
  pathname,
  searchParams,
  router,
  createInfo,
  restInfo,
  putInfo,
  restInfo2,
  refetch3
}) => {
  const tripadvisorRef = useRef(null)
  const googleRef = useRef(null)
  const startHoursRef = useRef(null)
  const endHoursRef = useRef(null)
  const [tripAdvisor, setTripAdvisor] = useState(restInfo?.data?.tripadvisor)
  const [google, setGoogle] = useState(restInfo?.data?.google)
  const [socialAddress, setSocialAddress] = useState({})
  const [address, setAddress] = useState({})
  const [phoneNumber, setPhoneNumber] = useState('')
  const [serviceFee, setServiceFee] = useState('')
  const [workingHours, setWorkingHours] = useState({
    monday: { start: '', end: '' },
    tuesday: { start: '', end: '' },
    wednesday: { start: '', end: '' },
    thursday: { start: '', end: '' },
    friday: { start: '', end: '' },
    saturday: { start: '', end: '' },
    sunday: { start: '', end: '' }
  })
  const [selectedDay, setSelectedDay] = useState('monday')

  const handleChangeWorkingHours = e => {
    const day = e.target.value
    setSelectedDay(day)

    // Seçilen günün saatlerini koruyup, diğer günleri sıfırlamadan geçiş yap
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        start: prev[day]?.start || '', // Seçilen gün varsa saatini tut
        end: prev[day]?.end || '' // Seçilen gün varsa saatini tut
      }
    }))
  }
  const handleInputChange = e => {
    const { name, value } = e.target

    setWorkingHours(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [name]: value
      }
    }))
  }

  useEffect(() => {
    setAddress({
      address_az: restInfo2?.data?.address_az,
      address_ru: restInfo2?.data?.address_ru,
      address_en: restInfo2?.data?.address_en,
      address_ko: restInfo2?.data?.address_ko,
      address_ar: restInfo2?.data?.address_ar
    })
    setSocialAddress({
      facebook: restInfo2?.data?.facebook,
      instagram: restInfo2?.data?.instagram,
      whatsapp: restInfo2?.data?.whatsapp,
      tiktok: restInfo2?.data?.tiktok
    })
    console.log(restInfo2?.data)
    setWorkingHours(restInfo2?.data?.working_hours)
    setPhoneNumber(restInfo2?.data?.phone_number)
    setServiceFee(restInfo2?.data?.service_fee)
  }, [restInfo2])

  const handleSaveInfo = () => {
    createInfo({
      google: googleRef.current.value,
      tripadvisor: tripadvisorRef.current.value
    })
  }

  return (
    <>
      <div
        onClick={() =>
          router.push(`/${pathname.split('/')[1]}/admin/?info=true`)
        }
        className={
          searchParams?.get('modal1') ? styles.overlay : styles.deactive
        }
      >
        <div onClick={e => e.stopPropagation()} className={styles.container}>
          <div className={styles.head}>
            <h3>{t('Feedback section')}</h3>
            <div
              onClick={() =>
                router.push(`/${pathname.split('/')[1]}/admin/?info=true`)
              }
            >
              <Image src={x} alt='close' />
            </div>
          </div>
          <div>
            <div className={styles.input}>
              <label htmlFor='tripadvisor'>Tripadvisor</label>
              <input
                type='text'
                value={tripAdvisor}
                onChange={e => setTripAdvisor(e.target.value)}
                ref={tripadvisorRef}
                placeholder={t('Add a Tripadvisor link')}
              />
            </div>
            <div className={styles.input}>
              <label htmlFor='Google'>Google</label>
              <input
                type='text'
                value={google}
                onChange={e => setGoogle(e.target.value)}
                ref={googleRef}
                placeholder={t('Add a Google link')}
              />
            </div>
          </div>
          <div className={styles.save}>
            <button onClick={handleSaveInfo}>{t('Save')}</button>
          </div>
        </div>
      </div>
      <div
        onClick={() =>
          router.push(`/${pathname.split('/')[1]}/admin/?info=true`)
        }
        className={
          searchParams?.get('modal2') ? styles.overlay : styles.deactive
        }
      >
        <div onClick={e => e.stopPropagation()} className={styles.container}>
          <div className={styles.head}>
            <h3>{t('About the restaurant')}</h3>
            <div
              onClick={() =>
                router.push(`/${pathname.split('/')[1]}/admin/?info=true`)
              }
            >
              <Image src={x} alt='close' />
            </div>
          </div>
          <div>
            <div className={styles.input}>
              <label htmlFor='Ünvan'>{t('Address')}</label>
              <input
                type='text'
                value={address[`address_${searchParams.get('lang')}`]}
                onChange={e => {
                  const lastAddress = { ...address }
                  lastAddress[`address_${searchParams.get('lang')}`] =
                    e.target.value
                  setAddress(lastAddress)
                }}
                placeholder={t('Enter the address')}
              />
            </div>
            <div className='flex items-center gap-4'>
              <div>
                <div className={styles.input}>
                  <label htmlFor='Facebook'>Facebook</label>
                  <input
                    type='text'
                    value={socialAddress.facebook}
                    onChange={e => {
                      const lastSocial = { ...socialAddress }
                      lastSocial.facebook = e.target.value
                      setSocialAddress(lastSocial)
                    }}
                    placeholder={t('Add a social media link')}
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor='Instagram'>Instagram</label>
                  <input
                    type='text'
                    value={socialAddress.instagram}
                    onChange={e => {
                      const lastSocial = { ...socialAddress }
                      lastSocial.instagram = e.target.value
                      setSocialAddress(lastSocial)
                    }}
                    placeholder={t('Add a social media link')}
                  />
                </div>
              </div>
              <div>
                <div className={styles.input}>
                  <label htmlFor='Tiktok'>Tiktok</label>
                  <input
                    type='text'
                    value={socialAddress.tiktok}
                    onChange={e => {
                      const lastSocial = { ...socialAddress }
                      lastSocial.tiktok = e.target.value
                      setSocialAddress(lastSocial)
                    }}
                    placeholder={t('Add a social media link')}
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor='Whatsapp'>Whatsapp</label>
                  <input
                    type='text'
                    value={socialAddress.whatsapp}
                    onChange={e => {
                      const lastSocial = { ...socialAddress }
                      lastSocial.whatsapp = e.target.value
                      setSocialAddress(lastSocial)
                    }}
                    placeholder={t('Add a social media link')}
                  />
                </div>
              </div>
            </div>
            <div className={styles.input}>
              <label htmlFor='Əlaqə nömrəsi'>{t('Phone number')}</label>
              <input
                type='text'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder='+994'
              />
            </div>
            <div className={`${styles.input} ${styles.workingHoursArea}`}>
              <label htmlFor='İş saatları'>{t('Working hours')}</label>
              <div>
                <div>
                  <select
                    onChange={handleChangeWorkingHours}
                    name='workingHours'
                    id='workingHours'
                  >
                    <option value='monday'>{t('Monday')}</option>
                    <option value='tuesday'>{t('Tuesday')}</option>
                    <option value='wednesday'>{t('Wednesday')}</option>
                    <option value='thursday'>{t('Thursday')}</option>
                    <option value='friday'>{t('Friday')}</option>
                    <option value='saturday'>{t('Saturday')}</option>
                    <option value='sunday'>{t('Sunday')}</option>
                  </select>
                </div>
                <div>
                  <input
                    ref={startHoursRef}
                    type='text'
                    name='start'
                    value={workingHours?.[selectedDay]?.start}
                    placeholder='01:30 P.M.'
                    onChange={handleInputChange}
                  />
                  <input
                    ref={endHoursRef}
                    type='text'
                    name='end'
                    value={workingHours?.[selectedDay]?.end}
                    placeholder='12:30 A.M.'
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex items-end gap-3'>
            <div className={`${styles.input} ${styles.servicePercentageArea}`}>
              <label htmlFor='Servis haqqı'>{t('Service fee')}</label>
              <input
                type='text'
                value={serviceFee}
                onChange={e => setServiceFee(e.target.value)}
                placeholder={t('Service fee')}
              />
            </div>
            <div>
              <select
                onChange={e =>
                  router.push(
                    `/${
                      pathname.split('/')[1]
                    }/admin/?info=true&modal2=true&lang=${e.target.value}`
                  )
                }
                className='block w-64 mb-[12px] p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                name='language'
                id='lang'
              >
                <option
                  value='en'
                  selected={Cookies.get('active-lang') === 'en'}
                >
                  EN
                </option>
                <option
                  value='az'
                  selected={Cookies.get('active-lang') === 'az'}
                >
                  AZ
                </option>
                <option
                  value='ru'
                  selected={Cookies.get('active-lang') === 'ru'}
                >
                  RU
                </option>
                <option
                  value='ko'
                  selected={Cookies.get('active-lang') === 'ko'}
                >
                  KO
                </option>
                <option
                  value='ar'
                  selected={Cookies.get('active-lang') === 'ar'}
                >
                  AR
                </option>
              </select>
            </div>
          </div>
          <div className={styles.save}>
            <button
              onClick={() => {
                if (phoneNumber) {
                  putInfo({
                    ...socialAddress,
                    ...address,
                    working_hours: workingHours,
                    service_fee: serviceFee,
                    phone_number: phoneNumber
                  })
                } else {
                  putInfo({
                    ...socialAddress,
                    ...address,
                    working_hours: workingHours,
                    service_fee: serviceFee
                  })
                }
              }}
            >
              {t('Save')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoModal
