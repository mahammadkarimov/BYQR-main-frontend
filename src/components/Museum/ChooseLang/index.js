import Image from 'next/image'
import React from 'react'
import az from '../../../assets/icons/Museum/az.png'
import en from '../../../assets/icons/Museum/en.png'
import ko from '../../../assets/icons/Museum/ko.png'
import ru from '../../../assets/icons/Museum/ru.png'
import ar from '../../../assets/icons/Museum/ar.png'
import check from '../../../assets/icons/Museum/check.svg'
import indicator from '../../../assets/icons/Museum/indicator.svg'
import styles from './style.module.css'

const index = ({
  activeLang,
  setActiveLang,
  setIsActiveLang,
  isActiveLang,
  pathname,
  router
}) => {
  return (
    <div
      onClick={e => {
        if (e.target.id === 'blur') {
          setActiveLang(false)
        }
      }}
      id='blur'
      className={`${activeLang ? styles.overlay : styles.deactiveContainer}`}
    >
      <div
        id='container'
        className={`${
          activeLang ? styles.container : styles.deactiveContainer
        }`}
      >
        <div className='flex justify-center pb-4'>
          <Image src={indicator} alt='indicator' />
        </div>
        <h2>Select Language</h2>
        <div
          onClick={() => {
            setIsActiveLang('az')
            setTimeout(() => {
              router.push(`/az/${pathname.slice(4)}`)
            }, 500)
          }}
          className={`${styles.card} ${
            isActiveLang === 'az'
              ? styles.activeCard
              : ''
          }`}
        >
          <div className='flex items-center gap-[14px]'>
            <div>
              <Image src={az} alt='az-flag' />
            </div>
            <div>
              <span>Azerbaijan</span>
            </div>
          </div>
          <div>
            <Image src={check} alt='check' />
          </div>
        </div>
        <div
          onClick={() => {
            setIsActiveLang('en')
            setTimeout(() => {
              router.push(`/en/${pathname.slice(4)}`)
            }, 500)
          }}
          className={`${styles.card} ${
             isActiveLang === 'en'
              ? styles.activeCard
              : ''
          }`}
        >
          <div className='flex items-center gap-[14px]'>
            <div>
              <Image src={en} alt='az-flag' />
            </div>
            <div>
              <span>English (US)</span>
            </div>
          </div>
          <div>
            <Image src={check} alt='check' />
          </div>
        </div>
        <div
          onClick={() => {
            setIsActiveLang('ko')
            setTimeout(() => {
              router.push(`/ko/${pathname.slice(4)}`)
            }, 500)
          }}
          className={`${styles.card} ${
            pathname.split('/')[1] === 'ko' || isActiveLang === 'ko'
              ? styles.activeCard
              : ''
          }`}
        >
          <div className='flex items-center gap-[14px]'>
            <div>
              <Image src={ko} alt='az-flag' />
            </div>
            <div>
              <span>Korean</span>
            </div>
          </div>
          <div>
            <Image src={check} alt='check' />
          </div>
        </div>
        <div
          onClick={() => {
            setIsActiveLang('ru')
            setTimeout(() => {
              router.push(`/ru/${pathname.slice(4)}`)
            }, 500)
          }}
          className={`${styles.card} ${
            pathname.split('/')[1] === 'ru' || isActiveLang === 'ru'
              ? styles.activeCard
              : ''
          }`}
        >
          <div className='flex items-center gap-[14px]'>
            <div>
              <Image src={ru} alt='az-flag' />
            </div>
            <div>
              <span>Russian</span>
            </div>
          </div>
          <div>
            <Image src={check} alt='check' />
          </div>
        </div>
        <div
          onClick={() => {
            setIsActiveLang('ar')
            setTimeout(() => {
              router.push(`/ar/${pathname.slice(4)}`)
            }, 500)
          }}
          className={`${styles.card} ${
            pathname.split('/')[1] === 'ar' || isActiveLang === 'ar'
              ? styles.activeCard
              : ''
          }`}
        >
          <div className='flex items-center gap-[14px]'>
            <div>
              <Image src={ar} alt='az-flag' />
            </div>
            <div>
              <span>Arabic</span>
            </div>
          </div>
          <div>
            <Image src={check} alt='check' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
