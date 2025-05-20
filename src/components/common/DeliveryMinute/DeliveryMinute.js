import Image from 'next/image'
import React from 'react'
import minute from '../../../assets/icons/Home/minute.svg'
import styles from './deliveryminute.module.css'

const DeliveryMinute = ({ preparationTime, isTwiceCard }) => {
  return (
    <>
      {preparationTime &&
        <div className={isTwiceCard === 'active' ? styles.minutTwiceContainer : styles.minuteContainer}>
          <div className={styles.minuteImg}>
            <Image src={minute} alt="minute" />
          </div>
          <div className={isTwiceCard === 'active' ? styles.minTextTwiceCard : styles.minText}>
            <span>{preparationTime} min</span>
          </div>
        </div>
      }
    </>
  )
}
export default DeliveryMinute