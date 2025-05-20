'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './categories.module.css'

import backBtn from '@/../../src/assets/images/Categories/backBtn.svg'
import CategoryCard from '@/components/common/CategoryCard/CategoryCard'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const page = () => {
    const t = useTranslations('Home')
    const router = useRouter()

    return (
        <>
            <title>BY-QR Menu | Categories</title>
            <section className='mt-5 mx-3'>
                <div className={styles['categories-head']}>
                    <button onClick={() => router.back()} className={styles['back-btn']}>
                        <Image src={backBtn} alt='back-btn' width={24} height={24} />
                    </button>
                    <h2>{t('Categories')}</h2>
                </div>
                <div className={styles['category-area']}>
                    <CategoryCard />
                </div>
            </section>
        </>
    )
}

export default page