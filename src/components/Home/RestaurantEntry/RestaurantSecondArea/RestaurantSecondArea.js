import Image from 'next/image'
import React, { useEffect } from 'react'
import googleImg from '../../../../assets/icons/Home/google.svg'
import tripAdvisor from '../../../../assets/icons/Home/tripAdvisor.svg'
import woltJpg from '../../../../assets/icons/Home/wolt.png'
import BoltFood from '../../../../assets/icons/Home/boltFood.png'
import styles from './style.module.css'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const RestaurantSecondArea = ({allData}) => {
  const t = useTranslations('Home')

  const { google, tripadvisor,wolt,bolt } = allData?.data

  return (
    <div>
      {google && (
        <Link href={google} target='_blank' className={styles.customBtn}>
          <Image src={googleImg} alt='google' />
          <span>{t('Review us on Google')}</span>
        </Link>
      )}
      {tripadvisor && (
        <Link href={tripadvisor} target='_blank' className={styles.customBtn}>
          <Image src={tripAdvisor} alt='tripadvisor' />
          <span>{t('Review us on TripAdvisor')}</span>
        </Link>
      )}
      {wolt && (
        <Link href={wolt} target='_blank' className={styles.customBtn}>
          <Image src={woltJpg} alt='wolt' style={{width:'24px'}} />
          <span>{t('Review us on Wolt')}</span>
        </Link>
      )}
      {bolt && (
        <Link href={bolt} target='_blank' className={styles.customBtn}>
          <Image src={BoltFood} alt='bolt' style={{width:'24px',borderRadius:'5px'}} />
          <span>{t('Review us on Bolt Food')}</span>
        </Link>
      )}
    </div>
  )
}

export default RestaurantSecondArea
