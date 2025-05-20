import Image from 'next/image'
import React from 'react'
import success from '../../../../assets/icons/Home/success.svg'
import styles from './style.module.css'
import { useTranslations } from 'next-intl'

const SuccessModal = ({copied}) => {
    const t = useTranslations('Home')
    return (
            <div className={copied ? styles.successBg : styles.deactive}>
                <Image src={success} alt='sucess' />
                {t("Copied")}
            </div>
    )
}

export default SuccessModal