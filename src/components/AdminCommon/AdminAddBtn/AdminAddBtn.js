import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './adminaddbtn.module.css'

const AdminAddBtn = ({ children, category }) => {
    const pathname = usePathname()
    const t = useTranslations("Admin")
    console.log(pathname)
    return (
        <>
            <Link href={`${pathname}/${children.categoryUrl}?lang=${pathname.split('/')[1]}`} className={category ? styles.addBtnCategory : styles.addBtn}>
                {t(children.categoryName)}
            </Link>
        </>
    )
}

export default AdminAddBtn