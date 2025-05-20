import React from 'react'
import google from '../../../../assets/icons/Home/google2.svg'
import google1 from '../../../../assets/icons/Home/google1.svg'
import google2 from '../../../../assets/icons/Home/google3.svg'
import google3 from '../../../../assets/icons/Home/google4.svg'
import tripadvisor from '../../../../assets/icons/Home/tripadvisor2.svg'
import tripadvisor1 from '../../../../assets/icons/Home/tripadvisor1.svg'
import tripadvisor2 from '../../../../assets/icons/Home/tripadvisor3.svg'
import tripadvisor3 from '../../../../assets/icons/Home/tripadvisor4.svg'
import feedback from '../../../../assets/icons/Home/feedback2.svg'
import feedback1 from '../../../../assets/icons/Home/feedback1.svg'
import feedback2 from '../../../../assets/icons/Home/feedback3.svg'
import feedback3 from '../../../../assets/icons/Home/feedback4.svg'
import styles from './style.module.css'
import Image from 'next/image'

const index = ({ t, pathname, allData, router }) => {
  return (
    <>
      <div className={styles.container}>
        <div onClick={() => router.push(allData?.data?.google)}>
          <Image
            src={
              allData?.data?.username === 'chaikend'
                ? google2
                : allData?.data?.username === 'obaoschuman'
                ? google1
                :  allData?.data?.username === 'siestabaku' || allData?.data?.username === 'champusique'
                ? google3 : google
            }
            alt='google'
          />
          <span>{t('Review us on Google')}</span>
        </div>
        <div onClick={() => router.push(allData?.data?.tripadvisor)}>
          <Image
            src={
              allData?.data?.username === 'chaikend'
                ? tripadvisor2
                : allData?.data?.username === 'obaoschuman'
                ? tripadvisor1
                :  allData?.data?.username === 'siestabaku' || allData?.data?.username === 'champusique'
                ? tripadvisor3 : tripadvisor
            }
            alt='tripadvisor'
          />
          <span>{t('Review us on TripAdvisor')}</span>
        </div>
        <div
          onClick={() =>
            router.push(
              `/${pathname.split('/')[1]}/${pathname.split('/')[2]}/feedback`
            )
          }
        >
          <Image
            src={
              allData?.data?.username === 'chaikend'
                ? feedback2
                : allData?.data?.username === 'obaoschuman'
                ? feedback1
                : allData?.data?.username === 'siestabaku' || allData?.data?.username === 'champusique'
                ? feedback3 : feedback
            }
            alt='feedback'
          />
          <span>{t('Give feedback')}</span>
        </div>
      </div>
      <div
        className={
          allData?.data?.username === 'chaikend'
            ? styles.goToMenu2
            : allData?.data?.username === 'obaoschuman'
            ? styles.goToMenu3
            :   allData?.data?.username === 'siestabaku' || allData?.data?.username === 'champusique'
            ? styles.goToMenu4 : styles.goToMenu
        }
        onClick={() =>  allData?.data?.username === 'siestabaku' || allData?.data?.username === 'champusique' ? router.push(`${pathname}/menu`) : router.push(`${pathname}/category-cards`)}
      >
        <button>{t('Go to Menu')}</button>
      </div>
    </>
  )
}

export default index
