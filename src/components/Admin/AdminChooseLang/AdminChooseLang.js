import Link from 'next/link'
import React, { useRef, useState } from 'react'
import styles from './style.module.css'
import arrow from '../../../assets/icons/Home/dropdownArrow.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const langs = ['az', 'en', 'ru']

const AdminChooseLang = () => {
    const [isActiveDropdown, setIsActiveDropdown] = useState(false)
    const arrowRef = useRef(null)
    const pathname = usePathname()

    const handleActiveDropdown = () => {
        setIsActiveDropdown(!isActiveDropdown)
        if (isActiveDropdown) {
            arrowRef.current.style.transform = 'rotate(360deg)'
        } else {
            arrowRef.current.style.transform = 'rotate(180deg)'
        }
    }

    return (
        <div className={styles.langContainer}>
            <div className={styles.lang} onClick={handleActiveDropdown}>
                <span>{pathname.split('/')[1]}</span>
                <Image src={arrow} ref={arrowRef} alt='arrow' />
            </div>
            <div className={isActiveDropdown ? styles.dropdown : styles.deactive}>
                {langs.map((lang, i) => (
                    pathname.split('/')[1] !== lang &&
                        <Link key={i} href={`/${lang}${pathname.slice(3)}`}>{lang}</Link>
                ))}
            </div>
        </div>
    )
}

export default AdminChooseLang