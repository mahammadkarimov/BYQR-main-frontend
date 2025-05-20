'use client'
import React, { useEffect } from 'react'
import error from '../../../assets/icons/Home/error.svg'
import Image from 'next/image'
import styles from './tipserror.module.css'
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
                    <Image src={error} alt='check' />
                    <span>Payment Error</span>
                </div>
                <span>The payment is not process.</span>
            </div>
        </div>
    )
}

export default TipSucess