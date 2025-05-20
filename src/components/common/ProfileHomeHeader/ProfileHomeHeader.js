'use client'
import React from 'react'
import styles from './profilehomeheader.module.css'

import filterBtn from '../../../assets/icons/Home/filterBtn.svg'
import circleProfile from '../../../assets/images/Home/circleProfile.svg'
import search from '../../../assets/icons/Home/search.svg'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { handleSearchFilter } from '@/redux/features/searchSlice'

const ProfileHomeHeader = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = usePathname()

    const handleCloseSearchFilter = () => {
        dispatch(handleSearchFilter())
    }

    const goSearchArea = () => {
        router.push(`/${pathname.slice(1, 3)}/home/search`)
    }

    return (
        <>
            <header>
                <div className={styles.headerBg}>
                    <div className='flex mb-[22px]'>
                        <div className='mr-[10px]'>
                            <Image src={circleProfile} className={styles.profileImg} alt='circle-profile' loading='eager' />
                        </div>
                        <div className='mt-2'>
                            <h3 className={styles.profileHead}>Sanan Abdullayev</h3>
                            <div>
                                <button className={styles.profileHeadBtn}>
                                    Xoş gəldin 🙂
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.searchArea}>
                        <div className='relative w-full'>
                            <Image src={search} className={styles.searchIcon} alt='search' loading='eager' />
                            <input type="email" onClick={() => goSearchArea()} placeholder='Search meal, drink, i.e.' className={styles.searchInp} />
                            <button onClick={() => handleCloseSearchFilter()} className={styles.filterBtn}>
                                <Image src={filterBtn} alt='filter-btn' loading='eager' />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default ProfileHomeHeader