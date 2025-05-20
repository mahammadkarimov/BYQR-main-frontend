import React from 'react'
import Image from 'next/image'
import world from '../../../../assets/icons/Home/world.svg'
import botArrow from '../../../../assets/icons/Home/botArrow.svg'
import styles from './style.module.css'
import Layout from '../layout'
import Link from 'next/link'

const lang = {
    az: 'Azərbaycan',
    en: 'English',
    ru: 'Русский',
    ar: 'عربي',
    ko: '한국인',
}

const RestaurantFirstArea = ({ allData, setIsActiveLang, pathname, t }) => {
    return (
        <Layout>
            <div className='flex flex-col items-center'>
                <div className='mb-[24px]'>
                    <Image src={allData?.data?.profile_photo} loading='lazy' className='rounded-[4px]' width={85} height={85} alt='demo' />
                </div>
                <div className={styles.langDropdown} onClick={() => setIsActiveLang(true)}>
                    <Image src={world} alt='world-lang' />
                    <span>{lang[pathname.split('/')[1]]}</span>
                    <Image src={botArrow} alt='bottom-arrow' />
                </div>
                <div className='w-full flex'>
                    <Link href={`${pathname}/menu`} className={styles.goToMenuBtn}>
                        {t('Go to Menu')}
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default RestaurantFirstArea