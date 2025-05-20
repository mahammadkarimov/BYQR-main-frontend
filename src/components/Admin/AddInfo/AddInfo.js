import React from 'react'
import styles from './style.module.css'
import business from '../../../assets/icons/Admin/Entry/business.svg'
import location from '../../../assets/icons/Admin/Entry/location.svg'
import Image from 'next/image'

const AddInfo = ({ t, router, pathname, refetch }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.checkBg}>
            <Image width={30} height={30} src={business} alt='business' />
          </div>
          <div className={styles.cardText}>
            <h3>{t('Home page information')}</h3>
            <span>
              {t('In this section, information about your restaurants with your customers you can share')}
            </span>
          </div>
        </div>
        <div
          className={styles.cardBottom}
          onClick={() => {
            router.push(`${pathname}?info=true&modal1=true`)
            refetch()
          }}
        >
          <button>{t('Edit')}</button>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.checkBg}>
            <Image width={30} height={30} src={location} alt='location' />
          </div>
          <div className={styles.cardText}>
            <h3>{t('Restaurant information')}</h3>
            <span>
             {t('You can add address, social media links, business hours')}
            </span>
          </div>
        </div>
        <div className={styles.cardBottom}>
          <button
            onClick={() => router.push(`${pathname}?info=true&modal2=true`)}
          >
            {t('Edit')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddInfo
