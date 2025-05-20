import Image from 'next/image'
import React from 'react'
import byqrLogo from '../../../assets/icons/Home/byqrlogo.svg'
import styles from './style.module.css'

const PoweredByqr = () => {
    return (
        <div className={styles.byqrLogo}>
            <span>Powered</span>
            <Image src={byqrLogo} alt='byqr-logo' />
        </div>
    )
}

export default PoweredByqr