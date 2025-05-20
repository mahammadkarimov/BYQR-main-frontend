import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import check from '../../../assets/icons/Admin/Entry/check.svg'

const AddCompany = ({ router, t, pathname }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHead}>
                <div className={styles.checkBg}>
                    <Image src={check} alt='check' />
                </div>
                <div className={styles.cardText}>
                    <h3>{t('Addition of campaigns')}</h3>
                    <span>{t('You can add your weekly or daily campaigns')}</span>
                </div>
            </div>
            <div className={styles.cardBottom}>
                <button onClick={() => router.push(`${pathname}?company=true&modal=true`)}>{t('Edit')}</button>
            </div>
        </div>
    )
}

export default AddCompany