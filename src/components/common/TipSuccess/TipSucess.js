'use client'
import React, { useEffect } from 'react'
import check from '../../../assets/icons/Home/check.svg'
import Image from 'next/image'
import styles from './tipsuccess.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'

const TipSucess = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push(`/${pathname.split('/')[1]}/${Cookies.get('activeParams')}`)
        }, 2000)

        return () => {
            clearTimeout(timer);
        }
    }, [])
    
    return (
        <div className={styles.filterContainer}>
            <div className={styles.successContainer}>
                <div className={styles.checkArea}>
                    <Image src={check} alt='check' />
                </div>
                <span>Your tips sent!</span>
            </div>
        </div>
    )
}

export default TipSucess