import React from 'react'
import Image from 'next/image'
import styles from './DetailFirst.module.css'
import restaurantImg from '../../../assets/images/restaurant.jpg'
import restaurantLogo from '../../../assets/images/Logo.png'

const DetailFirst = () => {
  return (
    <div className={styles.detailFirstContainer}>
      <div className={`relative mx-auto w-full ${styles.detailFirst}`}>
        <Image
          className="object-cover w-full h-full"
          alt="restaurant"
          src={restaurantImg}
        />
        <div
          className={`absolute rounded-full overflow-hidden ${styles.restaurantLogo}`}
        >
          <Image
            className="object-cover w-full h-full"
            alt="restaurant"
            src={restaurantLogo}
            width={50}
            height={50}
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailFirst
