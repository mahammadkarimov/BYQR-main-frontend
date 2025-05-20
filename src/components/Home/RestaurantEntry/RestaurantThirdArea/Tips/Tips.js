import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import money from '../../../../../assets/icons/Home/money.svg'

const Tips = ({ setIsActiveTips, t }) => {
    return (
        <div>
            <div className={styles.cardContain} onClick={() => setIsActiveTips(true)}>
                <Image loading='lazy' src={money} alt='money' />
                <span>{t('Tips')}</span>
            </div>
        </div>)
}

export default Tips