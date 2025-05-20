import Image from 'next/image'
import React, { useEffect } from 'react'
import topArrow from '../../../../assets/icons/Home/topArrow.svg'
import styles from './style.module.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const TopArrow = () => {

    useEffect(() => { AOS.init() })

    const handleTopMenu = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div data-aos="fade-up" data-aos-delay="100" onClick={handleTopMenu} className={styles.topArrow}>
            <Image src={topArrow} alt='top-arrow' />
        </div>
    )
}

export default TopArrow