'use client'
import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const index = ({ cardIcon, textHead, textBody, urlPath, urlCreatePath }) => {
    const pathname = usePathname()

    return (
        <div className={styles.mobileAppCardContainer}>
            <div>
                <div>
                    <Image src={cardIcon} alt='mobile-app-card-icon' />
                </div>
                <div>
                    <div>
                        <h3>{textHead}</h3>
                        <p>{textBody}</p>
                    </div>
                    <div>
                        <Link href={`/${pathname.split('/')[1]}/admin/mobile-app/${urlPath}?page=1&offset=0`}>Gözdən keçir</Link>
                        <Link href={`/${pathname.split('/')[1]}/admin/mobile-app/mobile-event/${urlCreatePath}`}>Əlavə et</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index