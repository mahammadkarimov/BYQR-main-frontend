'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import styles from './hotelhomeheader.module.css'
import styles1 from './hotelhomeheader1.module.css'
import { GetHotelWithQr } from '@/services/api/dataApi'
import { useQuery } from 'react-query'
import Skeleton from 'react-loading-skeleton'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import hotelBg from '../../../assets/images/Hotel/hotelBg.jpg'
import leftArr from '../../../assets/icons/Hotel/leftArr.svg'

const HotelHomeHeader = () => {
    const router = useRouter()
    const pathname = usePathname()

    const { data, isLoading } = useQuery(['hotelUser'], () => GetHotelWithQr(pathname.split('/')[2]))

    return (
        <>
            <motion.header className="pb-[6px]">
                <motion.div
                    className={styles1.headerContainer}
                >
                    <motion.div className="h-[60%] w-full">
                        <button className='absolute top-4 left-4' onClick={() => router.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`)}>
                            <Image src={leftArr} alt='left-arrow' />
                        </button>
                        <Image className={styles1.hotelBg} width={213} height={360} alt="headerImg" src={hotelBg} />
                    </motion.div>
                </motion.div>
                <div className={styles1.curvedDiv}></div>
                <motion.div className={styles1.logoPlace}
                >
                    {!isLoading ? (
                        <Image
                            src={data?.data?.profile_photo}
                            width={105}
                            height={105}
                            alt="restaurant-image"
                            loading="eager"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Skeleton
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                        />
                    )}
                </motion.div>
                <div className={styles1.profileName}>
                    <motion.h1 style={{ textTransform: 'capitalize' }}>
                        {data?.data?.first_name ? (
                            data?.data?.first_name + " " + data?.data?.last_name
                        ) : (
                            <Skeleton width={160} height={14} />
                        )}
                    </motion.h1>
                </div>
                <div className={styles1.profileDesc}>
                    <motion.h1>
                        {data?.data?.address ? (
                            data?.data?.address
                        ) : (
                            <Skeleton width={200} height={12} />
                        )}
                    </motion.h1>
                </div>
            </motion.header>
        </>
    )
}

export default HotelHomeHeader