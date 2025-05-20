import React from 'react'
import Image from 'next/image'
import styles from './Description.module.css'
import searchImg from '../../../assets/icons/ic_outline-search.svg'
import eventImg from '../../../assets/icons/mdi_event-busy.svg'
import likeImg from '../../../assets/icons/solar_like-bold.svg'

const Description = () => {
  return (
    <div className={styles.descriptionContainer}>
      <div className={`flex flex-col ${styles.description}`}>
        <h1 className={styles.descriptionTitle}>Description</h1>
        <p className={styles.descriptionParagraph}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consat du veniam consequat coseqtures adipsing
          content.
        </p>
      </div>
      <div className="flex mt-6">
        <div className="flex flex-col w-1/2">
          <h1 className={styles.descriptionTitle}>Open hour</h1>
          <p className={styles.descriptionParagraph}>09:00 - 23:00</p>
        </div>
        <div className="flex flex-col w-1/2">
          <h1 className={styles.descriptionTitle}>Cuisiness</h1>
          <p className={styles.descriptionParagraph}>Western, Asian</p>
        </div>
      </div>
      <div
        className={` flex justify-between border border-x-[#fff] border-y-[#E6E7EB] mt-6 ${styles.lable}`}
      >
        <div
          className={`sm:gap-1.5 flex flex-col justify-center items-center ${styles.frame}`}
        >
          <Image alt="search" src={searchImg} />
          <p>Searching</p>
        </div>
        <div
          className={`sm:gap-1.5 flex flex-col justify-center items-center ${styles.frame}`}
        >
          <Image alt="like" src={likeImg} />
          <p>Feedback</p>
        </div>
        <div
          className={`sm:gap-1.5 flex flex-col justify-center items-center ${styles.frame}`}
        >
          <Image alt="event" src={eventImg} />
          <p>Events</p>
        </div>
      </div>
    </div>
  )
}

export default Description
