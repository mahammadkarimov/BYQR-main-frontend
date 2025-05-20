'use client'
import React, { useState } from 'react'
import azFlag from '../../../assets/icons/Home/AzFlag.svg'
import enFlag from '../../../assets/icons/Home/EngFlag.svg'
import ruFlag from '../../../assets/icons/Home/RusFlag.svg'
import koFlag from '../../../assets/icons/Home/koFlag.jpg'
import close from '../../../assets/icons/Home/closex.svg'
import arFlag from '../../../assets/icons/Home/ArabicFlag.svg'
import Image from 'next/image'
import styles from './chooselang.module.css'
import Cookies from 'js-cookie'
import Link from 'next/link'

const langImg = {
    az: azFlag,
    en: enFlag,
    ru: ruFlag,
    ar: arFlag,
    ko: koFlag,
}

const langCountry = {
    az: 'Azərbaycan',
    en: 'English',
    ru: 'Русский',
    ar: 'عربي',
    ko: '한국인',
}

const ChooseLang = ({ t, allData, isActiveLang, setIsActiveLang, pathname }) => {

    const handleCloseModal = (e) => {
        if ((e.target.id).includes('overlay')) {
            setIsActiveLang(false)
        }
    }

    return (
        <div className={isActiveLang ? styles.overlay : undefined} id='overlay' onClick={handleCloseModal}>
            <div className={isActiveLang ? styles.container : styles.deactive}>
                <div className={styles.head}>
                    <span>{t('Choose Language')}</span>
                    <div onClick={() => setIsActiveLang(false)}>
                        <Image src={close} alt='close' />
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    {
                        allData?.data?.language?.map((lang,i) => (
                            <Link key={i} href={`/${lang?.name}/${pathname.split('/')[2]}`} className={styles.langContainer}>
                                <Image src={langImg[`${lang?.name}`]} alt='aze-flag' />
                                {langCountry[`${lang.name}`]}
                            </Link>
                        ))
                    }

                    {/* <Link href={`/en/${pathname.split('/')[2]}`} className={isActiveLang === 'en' ? styles.activeLang : styles.langContainer}>
                        <Image src={EngFlag} alt='eng-flag' />
                        English
                    </Link>
                    <Link href={`/ru/${pathname.split('/')[2]}`} className={isActiveLang === 'ru' ? styles.activeLang : styles.langContainer}>
                        <Image src={RuFlag} alt='ru-flag' />
                        Russian
                    </Link>
                    <Link href={`/ar/${pathname.split('/')[2]}`} className={isActiveLang === 'ar' ? styles.activeLang : styles.langContainer}>
                        <Image src={ArabicFlag} alt='ar-flag' />
                        Arabic
                    </Link>
                    <Link href={`/ko/${pathname.split('/')[2]}`} className={isActiveLang === 'ko' ? styles.activeLang : styles.langContainer}>
                        <Image src={koFlag} className='object-cover' alt='ko-flag' />
                        Korean
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default ChooseLang