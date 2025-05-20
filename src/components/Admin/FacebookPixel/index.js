import Image from 'next/image'
import React from 'react'
import facebookPixel from '../../../assets/images/Admin/mainAdmin/facebookPixel.svg'
import styles from './style.module.css'

const index = ({router, pathname}) => {
    return (
        <div onClick={() => router.push(`${pathname}?modal=true`)} className={styles.facebookPixelContainer}>
            <Image src={facebookPixel} alt='facebook-pixel' />
            <span>Facebook pixel</span>
        </div>
    )
}

export default index