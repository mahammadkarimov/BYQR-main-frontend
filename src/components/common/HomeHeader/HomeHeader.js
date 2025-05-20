'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styles from './homeheader.module.css'
import styles1 from './homeHeader1.module.css'
import byqrlogo from '../../../assets/images/Home/byqr-logo.svg'
import HomeSearch from '../HomeSearch/HomeSearch'
import headerImgBg from '../../../assets/images/Home/headerImgBg.jpg'
import searchIcon from '../../../assets/icons/HomeSearch/search.svg'
import dropdownArr from '../../../assets/icons/Home/dropdownArrow.svg'
import homeLogo from '../../../assets/images/Home/logoExample.png'
import az from '../../../assets/icons/Home/azFlag1.svg'
import en from '../../../assets/icons/Home/engFlag1.svg'
import ru from '../../../assets/icons/Home/rus1.svg'
import ar from '../../../assets/icons/Home/arab1.svg'
import ko from '../../../assets/icons/Home/koFlag.jpg'
import { MealCategoriesWithQr } from '@/services/api/dataApi'
import { useQuery } from 'react-query'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import { useTransform, motion, useScroll } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { handleActiveSearch } from '@/redux/features/searchSlice'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const lang = [[az, 'az'], [en, 'en'], [ru, 'ru'], [ar, 'ar'], [ko, 'ko']]

const HomeHeader = ({ scrollPosition, scrollPosition2 }) => {
    const pathname = usePathname()

    const [isActiveDropdown, setIsActiveDropdown] = useState(false)
    const [activeLang, setActiveLang] = useState(pathname.split('/')[1])
    const t = useTranslations('Home')

    const dropdownArrRef = useRef(null)
    const dropdownRef = useRef(null) 

    const isMax1023 = useMediaQuery({ maxWidth: 1023 })
    const isMax700 = useMediaQuery({ maxWidth: 700 })
    const isMax400 = useMediaQuery({ maxWidth: 500 })
    const isMaxH600 = useMediaQuery({ maxHeight: 600 })

    const { scrollY } = useScroll()
    const offsetY = [0, 300]
    const offsetY2 = [200, 300]
    const offsetY3 = [0, 50]

    const heightHeaderSizes = [280, 50]
    const heightHeaderSizesResponsive = [225, 10]
    const heightHeaderSizes1 = [183, 113]
    const heightHeaderSizes1Responsive = [160, 93]
    const imageLogoSizes = [100, 35]
    const opacityChanger = [1, 0]
    const marginTopMotion = [-90, -30]

    const height = useTransform(scrollY, offsetY, heightHeaderSizes)
    const heightY600 = useTransform(scrollY, offsetY, heightHeaderSizesResponsive)
    const height1 = useTransform(scrollY, offsetY, heightHeaderSizes1)
    const height1Y600 = useTransform(scrollY, offsetY, heightHeaderSizes1Responsive)
    const imageLogo = useTransform(scrollY, offsetY, imageLogoSizes)
    const opacity = useTransform(scrollY, offsetY2, opacityChanger)
    const opacity1 = useTransform(scrollY, offsetY, opacityChanger)
    const opacity2 = useTransform(scrollY, offsetY3, opacityChanger)
    const marginTop = useTransform(scrollY, offsetY, marginTopMotion)
    const translateX1024 = useTransform(scrollY, [0, 200], ['8%', '6%'])
    const translateX1023 = useTransform(scrollY, [0, 200], ['10%', '9%'])
    const translateX700 = useTransform(scrollY, [0, 200], ['14%', '12%'])
    const translateX400 = useTransform(scrollY, [0, 200], ['22%', '18%'])
    const widthSearch = useTransform(scrollY, [0, 200], ['69.4%', '90%'])

    const selActiveParam = useSelector(
        (state) => state.queryParams.isActiveQueryParams
    )
    // const selScrollY = useSelector((state) => state.scrollSlice.yScrollValue)

    const { data, isLoading } = useQuery(['user', selActiveParam], () =>
        MealCategoriesWithQr(selActiveParam)
    )

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsActiveDropdown(false)
                dropdownArrRef.current.style.transform = 'rotate(0deg)'
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [dropdownRef])

    const handleDropdownMenu = (e) => {
        if (isActiveDropdown) {
            dropdownArrRef.current.style.transform = 'rotate(0deg)'
            setIsActiveDropdown(false)
            return
        }else {
            dropdownArrRef.current.style.transform = 'rotate(180deg)'
            setIsActiveDropdown(true)
        }
    }

    const handleLang = (e) => {
        router.push(`/${e.target.getAttribute('data-lang')}/${pathname.split('/')[2]}`)
        Cookies.set('client-lang', pathname.split('/')[1])
        setActiveLang(e.target.getAttribute('data-lang'))
    }

    return (
        <>
            <motion.header style={{ height: isMaxH600 ? heightY600 : height }} className={`pb-[0px] `}>
                <motion.div
                    style={{ height: isMaxH600 ? height1Y600 : height1 }}
                    className={styles1.headerContainer}
                >
                    <motion.div style={{ opacity: opacity1 }} className='h-full w-full'>
                        <Image width={213} height={360} alt="headerImg" src={headerImgBg} />
                    </motion.div>
                    <div>
                        <div
                            onClick={() => dispatch(handleActiveSearch())}
                            className={styles1.searchIput}
                            style={{ width: widthSearch }}
                        >
                            <div className={styles1.searchFixer}></div>
                            <div
                                className={styles1.search}
                                style={{
                                    left: isMax400
                                        ? translateX400
                                        : isMax700
                                            ? translateX700
                                            : isMax1023
                                                ? translateX1023
                                                : translateX1024,
                                }}
                            >
                                <div className={styles1.searchImg}>
                                    <Image
                                        width={20}
                                        height={20}
                                        src={searchIcon}
                                        alt="searchIcon"
                                    />
                                </div>
                                {/* <span>Search</span> */}
                                <input
                                    type="text"
                                    placeholder={t("Search")}
                                    className="pointer-events-none"
                                />
                            </div>
                        </div>
                        <div className={styles.dropdown} id='dropdown' onClick={handleDropdownMenu} ref={dropdownRef}>
                            <Image src={activeLang == 'az' ? az : activeLang == 'en' ? en : activeLang == 'ru' ? ru : activeLang == 'ar' ? ar : activeLang == 'ko' ? ko : null} alt='language' className='!w-8' id='lang' width={100} height={100} />
                            <Image ref={dropdownArrRef} src={dropdownArr} id='arrow' alt='dropdown-arrow' />
                        </div>
                        <div className={`${isActiveDropdown ? styles.langDropdownVisible : styles.langDropdownHidden}`}>
                            <ul className='flex flex-col gap-2'>
                                {
                                    lang.map((lan, i) => (
                                        Cookies.get('client-lang') !== lan &&
                                        <li key={i}>
                                            <button onClick={handleLang}>
                                                <Image width={100} height={100} className='!w-8' data-value={lan[0]} data-lang={lan[1]} src={lan[0]} alt='language' />
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </motion.div>
                <div className={styles1.curvedDiv}></div>
                <motion.div
                    style={{ width: imageLogo, height: imageLogo, opacity, marginTop }}
                    className={styles1.logoPlace}
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
                    <motion.h1 style={{ opacity: opacity2, textTransform: 'capitalize' }}>
                        {data?.data?.first_name ? (
                            data?.data?.first_name + " " + data?.data?.last_name
                        ) : (
                            <Skeleton width={160} height={14} />
                        )}
                    </motion.h1>
                </div>
                <div className={styles1.profileDesc}>
                    <motion.h1 style={{ opacity: opacity2, width: '200px', textAlign: 'center' }}>
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

export default HomeHeader
