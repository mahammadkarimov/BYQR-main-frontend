import React from 'react'
import Image from 'next/image'
import styles from './InfoDetail.module.css'
import star from '../../../assets/icons/Star.svg'

const InfoDetail = () => {
  return (
    <div className={styles.infoDetailContainer}>
      <div className={`flex flex-col justify-between ${styles.infoDetail}`}>
        <h1 className="inline-block">Kentucky Fried Chicken</h1>
        <p className="inline-block">Kentucky Fried Chicken</p>
        <ul className="flex">
          <li>
            <Image
              className="object-cover w-full h-full"
              alt="star"
              src={star}
            />
          </li>
          <li>
            <Image
              className="object-cover w-full h-full"
              alt="star"
              src={star}
            />
          </li>
          <li>
            <Image
              className="object-cover w-full h-full"
              alt="star"
              src={star}
            />
          </li>
          <li>
            <Image
              className="object-cover w-full h-full"
              alt="star"
              src={star}
            />
          </li>
          <li>
            <Image
              className="object-cover w-full h-full"
              alt="star"
              src={star}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default InfoDetail
