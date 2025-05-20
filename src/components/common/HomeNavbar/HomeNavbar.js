'use client'
import Image from 'next/image'
import React from 'react'
import styles from './homenavbar.module.css'

import home from '../../../assets/icons/Home/home.svg'
import homeNavbar from '../../../assets/icons/Home/homenavbar.svg'
import homebasket from '../../../assets/icons/Home/homebasket.svg'
import discount from '../../../assets/icons/Home/discount.svg'
import activeFavorite from '../../../assets/icons/Home/activeFavorite.svg'
import deactivehome from '../../../assets/icons/Home/deActiveHome.svg'
import activeDiscount from '../../../assets/icons/Home/activeDiscount.svg'
import profile from '../../../assets/icons/Home/profile.svg'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const HomeNavbar = () => {
  const [isActiveLang, setIsActiveLang] = useState(null)
  const pathname = usePathname()
  const selFavoritesItems = useSelector((state) => state.favorites.items)

  useEffect(() => {
    setIsActiveLang(pathname.slice(1, 3))
  }, [pathname])

  return (
    <>
      <nav>
        <div className={styles['home-navbar']}>
          <ul className="flex items-center justify-around pl-[26px] pr-[21px] pt-[6px]">
            <li>
              <Link href={`#`}>
                <Image
                  src={
                    pathname === `/${isActiveLang}/home` || pathname === '/'
                      ? home
                      : deactivehome
                  }
                  loading="eager"
                  alt="home-icon"
                />
              </Link>
            </li>
            <li className="relative">
              <Link href="#">
                <Image
                  src={
                    pathname === `/${isActiveLang}/home/favorites`
                      ? activeFavorite
                      : homeNavbar
                  }
                  loading="eager"
                  alt="home-navbar-icon"
                />
                {selFavoritesItems.length > 0 ? (
                  <span className={styles['basket-count']}>
                    {selFavoritesItems.length}
                  </span>
                ) : null}
              </Link>
            </li>
            <li className="relative">
              <button className={styles['basket-btn-bg']}>
                <Image src={homebasket} loading="eager" alt="product-basket" />
              </button>
              <span className={styles['basket-count']}>2</span>
            </li>
            <li>
              <Link href="#">
                <Image
                  src={
                    pathname === `/${isActiveLang}/home/promos`
                      ? activeDiscount
                      : discount
                  }
                  loading="eager"
                  alt="discount"
                />
              </Link>
            </li>
            <li>
              <button>
                <Image src={profile} loading="eager" alt="profile" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default HomeNavbar
