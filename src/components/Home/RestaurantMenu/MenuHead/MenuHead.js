import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import leftArrow from '../../../../assets/icons/Home/leftArrow.svg'
import hamburger from '../../../../assets/icons/Home/hamburger.svg'
import styles from './style.module.css'

const MenuHead = ({  pathname, setIsActiveSidebar, restaurantData }) => {
    return (
        <div className={styles.menuHeadArea}>
            <Link className={styles.leftArr} href={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`} >
                <Image src={leftArrow} alt='left-arrow' />
            </Link>
            <div className={styles.menuHead}>
                <h2>{`${restaurantData?.data?.first_name} ${restaurantData?.data?.last_name}`}</h2>
            </div>
            <div className={styles.hamburgerMenu} onClick={() => setIsActiveSidebar(true)}>
                <Image src={hamburger} alt='hamburger-menu' />
            </div>
        </div>
    )
}

export default MenuHead