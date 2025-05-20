import Image from 'next/image'
import React from 'react'
import service from '../../../../../assets/icons/Home/service.svg'
import styles from './style.module.css'

const CallService = ({ setIsActiveService, setIsSuccess, setGuestMessage, t }) => {
    return (
        <div>
            <div className={styles.cardContain} onClick={() => {
                setIsSuccess(false)
                setGuestMessage('')
                setIsActiveService(true)
                }}>
                <Image loading='lazy' src={service} alt='service' />
                <span>{t('Call Service')}</span>
            </div>
        </div>
    )
}

export default CallService