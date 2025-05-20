import React from 'react'
import payment from '../../../../../assets/icons/Home/Payment.svg'
import styles from './style.module.css'
import Image from 'next/image'

const Payment = ({ setIsActivePayment, setSelectedMethod, setIsSuccess, t }) => {
    return (
        <div>
            <div className={styles.cardContain} onClick={() => {
                setIsSuccess(false)
                setSelectedMethod(null)
                setIsActivePayment(true)
                }}>
                <Image loading='lazy' src={payment} alt='payment' />
                <span>{t('Payment')}</span>
            </div>
        </div>
    )
}

export default Payment