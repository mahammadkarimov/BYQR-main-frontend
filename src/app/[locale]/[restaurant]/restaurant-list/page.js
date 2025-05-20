'use client'
import { GetRestaurantListFromHotel } from '@/services/api/dataApi'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'
import leftArr from '../../../../assets/icons/Hotel/leftArr.svg'
import styles from './restaurantlist.module.css'
import { Poppins } from 'next/font/google'
import { ClipLoader } from 'react-spinners'
import Slider from 'react-slick'
import "@/../slick-carousel/slick/slick.css";
import "@/../slick-carousel/slick/slick-theme.css";
import './style.css'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})
const page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations('Home')
    const firstKey = (pathname.split('/')[2])
    const { data: hotelRestaurant, isLoading } = useQuery('hotelRestaurant', () => GetRestaurantListFromHotel(pathname.split('/')[2]))
    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => <ul>{dots}</ul>,
    };
    if (isLoading) {
        return <div className="flex justify-center items-center mt-5 mx-0 h-[100vh] my-auto">
            <ClipLoader color="#FF1212" loading={true} size={35} />
        </div>
    }
    return (
        <>
            <section className={`${poppins.className}`}>
                <div className={styles.headContainer}>
                    <div className={styles.backBtnContainer}>
                        <Link href='#' className={styles.backBtn} onClick={() => router.back()}>
                            <Image src={leftArr} alt='left-arrow' />
                        </Link>
                    </div>
                    <div className={styles.restHead}>
                        <h2>{t('Restoranlar')}</h2>
                    </div>
                </div>
                <div className={styles.restaurantContainer}>
                    <Slider {...settings}>
                        {hotelRestaurant?.data?.results?.map((rest) => (
                            <Link key={rest.slug} href={`/${pathname.slice(1, 3)}/${rest.username}`}>
                                <div className='relative mr-5'>
                                    <div>
                                        <Image src={rest.profile_photo} className={styles.hotelPhoto} objectFit='contain' width={300} height={300} loading='lazy' alt='restaurant-image' />
                                    </div>
                                    <div className={styles.restName}>
                                        <h2 className={styles.restText}>{rest.first_name} {rest.last_name}</h2>
                                    </div>
                                </div>
                            </Link>
                        )).reverse()}
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default page