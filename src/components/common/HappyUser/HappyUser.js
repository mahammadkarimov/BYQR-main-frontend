import React from 'react'
import Image from 'next/image'
import happyUser from '../../../assets/images/Feedback/success.svg'
import styles from './HappyUser.module.css'

const HappyUser = (props) => {
  const { happyUserContainer } = props
  return (
    <div className={`${styles.happyUserContainer} ${happyUserContainer}`}>
      <div className={styles.imgPlace}></div>
      <Image
        className="object-cover w-full h-full"
        alt="happyUser"
        loading='lazy'
        src={happyUser}
      />
    </div>
  )
}

export default HappyUser
