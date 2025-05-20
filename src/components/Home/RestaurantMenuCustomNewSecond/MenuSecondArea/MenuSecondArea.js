import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ads from '../../../../assets/images/Home/ads.svg'
import filter from '../../../../assets/icons/Home/filter.svg'
import styles from './style.module.css'
import Cookies from 'js-cookie'

const MenuSecondArea = ({ router, t, restaurantData }) => {
    const [tableNum, setTableNum] = useState(null);

    useEffect(() => {
        setTableNum(Cookies.get('activeTable'));
    }, []);


    return (
        <div className='px-3 pt-[13.5px] pb-6'>
            <div className={styles.table}>
                <h3>{t('Table')} {tableNum}</h3>
                {/* <span>Here we offer options for your taste</span> */}
            </div>
            {restaurantData?.data?.campaigns[(restaurantData?.data?.campaigns)?.length - 1]?.cover &&
                <div className={styles.adsArea}>
                    <Image className='w-full h-[132px] object-cover rounded-xl mb-6' width={500} height={500} src={restaurantData?.data?.campaigns[(restaurantData?.data?.campaigns)?.length - 1].cover} alt='ads' />
                </div>
            }

            <div className={styles.searchArea}>
                <div className={styles.searchInp} onClick={() => router.push('?search=true')}>
                    <input className='focus:ring-0 cursor-pointer' readOnly type="search" placeholder={t('Search for something tasty') + '....'} />
                </div>
                {/* <div className={styles.filter}>
                    <Image src={filter} alt='filter' />
                </div> */}
            </div>
        </div>
    )
}

export default MenuSecondArea