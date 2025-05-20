'use client'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from './SideNavigation.module.css'
import Image from 'next/image'
import Link from 'next/link'

import list from '../../../../assets/icons/Admin/mainAdmin/list.svg'
import service from '../../../../assets/icons/Admin/mainAdmin/service.svg'
import build from '../../../../assets/icons/Admin/mainAdmin/build.svg'
import menu from '../../../../assets/icons/Admin/mainAdmin/menu.svg'
import tableBron from '../../../../assets/icons/Admin/mainAdmin/tableBron.svg'
import services from '../../../../assets/icons/Admin/mainAdmin/services.svg'
import smile from '../../../../assets/icons/Admin/mainAdmin/smile.svg'
import productIcon from '../../../../assets/icons/Admin/mainAdmin/productIcon.svg'
import feedback from '../../../../assets/icons/Admin/mainAdmin/feedback.svg'
import byqrLogo from '../../../../assets/images/Admin/mainAdmin/byqrLogo.svg'
import byqrLogoBlue from '../../../../assets/images/Admin/mainAdmin/byqrLogoBlue.svg'
import code from '../../../../assets/icons/Admin/mainAdmin/code.svg'
import mobile from '../../../../assets/icons/Admin/mainAdmin/mobile.svg'
import museum from '../../../../assets/icons/Admin/mainAdmin/museum.svg'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'

const SideNavigation = ({ userAuth }) => {
  const selAdminSidebar = useSelector(state => state.sidebar.isActiveSidebar)
  const selUserType = useSelector(state => state.identifyUser.userType)
  const selFeedbackState = useSelector(
    state => state.identifyUser.feedbackState
  )
  const [linkRef, setLinkRef] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('Admin')

  const isFeedbackPage = pathname.includes('/feedback')

  return (
    <>
      <div className={selAdminSidebar ? styles.sideNavigation : undefined}>
        <div
          className={!selAdminSidebar ? styles.hideSidebar : styles.showSidebar}
        >
          <div
            className='pt-2.5 pb-6 cursor-pointer transition duration-300 ease-in-out hover:scale-105'
            onClick={() => router.push(`/${pathname.split('/')[1]}/admin`)}
          >
            <Image
              src={isFeedbackPage ? byqrLogoBlue : byqrLogo}
              width={38}
              height={38}
              loading='lazy'
              alt='restaurant-logo'
            />
          </div>
          <ul className='flex flex-col gap-6 px-0 w-full'>
            <ul className={styles.navSection}>
              {userAuth?.data?.user_type !== 'museum' && (
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/products`}
                    className={` ${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    }  ${
                      pathname.split('/')[3] === 'products' &&
                      styles.sideNavBgActive
                    } sideNavBg`}
                  >
                    <Image src={productIcon} alt='product-icon' />
                    {selAdminSidebar && 'Məhsullar'}
                  </Link>
                </li>
              )}
              {userAuth?.data?.user_type !== 'museum' && (
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/categories`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    }  ${
                      pathname.split('/')[3] === 'categories' &&
                      styles.sideNavBgActive
                    } sideNavBg`}
                  >
                    <Image src={list} alt='product-icon' />
                    {selAdminSidebar && 'Kateqoriyalar'}
                  </Link>
                </li>
              )}
              {userAuth?.data?.package?.features?.map(
                (feature, i) =>
                  feature.name === 'Call waiter' && (
                    <li key={i}>
                      <Link
                        href={`/${pathname.split('/')[1]}/admin/services`}
                        className={`${
                          isFeedbackPage
                            ? styles.sideNavBgBlue
                            : styles.sideNavBg
                        }  ${
                          pathname.split('/')[3] === 'services' &&
                          styles.sideNavBgActive
                        }`}
                      >
                        <Image src={service} alt='product-icon' />
                        {selAdminSidebar && 'Xidmətlər'}
                      </Link>
                    </li>
                  )
              )}
              {/* {userAuth?.data?.user_type !== 'museum' && (
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/facebook-pixel`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    }  ${
                      pathname.split('/')[3] === 'facebook-pixel' &&
                      styles.sideNavBgActive
                    } sideNavBg`}
                  >
                    <Image src={code} alt='code' />
                    {selAdminSidebar && 'Facebook pixel'}
                  </Link>
                </li>
              )} */}
              {/* {userAuth?.data?.user_type !== 'museum' && (
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/mobile-app`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    }  ${
                      pathname.split('/')[3] === 'mobile-app' &&
                      styles.sideNavBgActive
                    } sideNavBg`}
                  >
                    <Image src={mobile} alt='mobile-app' />
                    {selAdminSidebar && 'Mobil App'}
                  </Link>
                </li>
              )} */}
              {userAuth?.data?.user_type === 'museum' && (
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/museum`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    }  ${
                      pathname.split('/')[3] === 'museum' &&
                      styles.sideNavBgActive
                    } sideNavBg`}
                  >
                    <Image src={museum} alt='museum' />
                    {selAdminSidebar && 'Museum'}
                  </Link>
                </li>
              )}
              {userAuth?.data?.user_type === 'hotel' && (
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/services`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    }  ${
                      pathname.split('/')[3] === 'services' &&
                      styles.sideNavBgActive
                    }`}
                  >
                    <Image src={service} alt='product-icon' />
                    {selAdminSidebar && 'Xidmətlər'}
                  </Link>
                </li>
              )}
              {userAuth?.data?.package?.features?.map(
                (feature, i) =>
                  feature.name === 'Feedback' && (
                    <li key={i}>
                      <Link
                        href={`/${
                          pathname.split('/')[1]
                        }/admin/restaurant-feedback`}
                        className={`${
                          isFeedbackPage
                            ? styles.sideNavBgBlue
                            : styles.sideNavBg
                        }  ${
                          pathname.split('/')[3] === 'restaurant-feedback' &&
                          styles.sideNavBgActive
                        }`}
                      >
                        <Image src={feedback} alt='product-icon' />
                        {selAdminSidebar && 'Rəy Bildirmələr'}
                      </Link>
                    </li>
                  )
              )}
            </ul>
            {userAuth?.data?.user_type === 'hotel' && (
              <ul className={styles.navSection}>
                <span
                  className={
                    selAdminSidebar
                      ? styles.sideNavHeader
                      : styles.sideNavHeaderHidden
                  }
                >
                  HOTEL
                </span>
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/technical-services`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    } ${
                      pathname.split('/')[3] === 'technical-services' &&
                      styles.sideNavBgActive
                    }`}
                  >
                    <Image src={build} alt='product-icon' />
                    {selAdminSidebar && 'Texniki Servis'}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${
                      pathname.split('/')[1]
                    }/admin/additional-services`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    } ${
                      pathname.split('/')[3] === 'additional-services' &&
                      styles.sideNavBgActive
                    }`}
                  >
                    <Image src={services} alt='product-icon' />
                    {selAdminSidebar && 'Əlavə xidmətlər'}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/feedback`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    } ${
                      pathname.split('/')[3] === 'feedback' &&
                      styles.sideNavBgActive
                    } ${isFeedbackPage && '!bg-[#1877f2]'}`}
                  >
                    <Image src={feedback} alt='product-icon' />
                    {selAdminSidebar && 'Rəy Bildirmələr'}
                  </Link>
                </li>
              </ul>
            )}
            {userAuth?.data?.package?.features?.map(
              (feature, i) =>
                feature.name === 'Call waiter' && (
                  <ul key={i} className={styles.navSection}>
                    <span
                      className={
                        selAdminSidebar
                          ? styles.sideNavHeader
                          : styles.sideNavHeaderHidden
                      }
                    >
                      RESTORAN
                    </span>
                    <li>
                      <Link
                        href={`/${pathname.split('/')[1]}/admin/table-bron`}
                        className={`${
                          isFeedbackPage
                            ? styles.sideNavBgBlue
                            : styles.sideNavBg
                        } ${
                          pathname.split('/')[3] === 'table-bron' &&
                          styles.sideNavBgActive
                        }`}
                      >
                        <Image src={tableBron} alt='product-icon' />
                        {selAdminSidebar && 'Masa bron'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${
                          pathname.split('/')[1]
                        }/admin/waiters?restaurant_username=${Cookies.get(
                          'restaurant_username'
                        )}`}
                        className={`${
                          isFeedbackPage
                            ? styles.sideNavBgBlue
                            : styles.sideNavBg
                        }  ${
                          pathname.split('/')[3] === 'waiters' &&
                          styles.sideNavBgActive
                        }`}
                      >
                        <Image src={smile} alt='product-icon' />
                        {selAdminSidebar && 'Əməkdaşlar'}
                      </Link>
                    </li>
                  </ul>
                )
            )}
            {userAuth?.data?.user_type === 'hotel' && (
              <ul className={styles.navSection}>
                <span
                  className={
                    selAdminSidebar
                      ? styles.sideNavHeader
                      : styles.sideNavHeaderHidden
                  }
                >
                  RESTORAN
                </span>
                <li>
                  <Link
                    href={`/${pathname.split('/')[1]}/admin/table-bron`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    } ${
                      pathname.split('/')[3] === 'table-bron' &&
                      styles.sideNavBgActive
                    }`}
                  >
                    <Image src={tableBron} alt='product-icon' />
                    {selAdminSidebar && 'Masa bron'}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${
                      pathname.split('/')[1]
                    }/admin/waiters?restaurant_username=${Cookies.get(
                      'restaurant_username'
                    )}`}
                    className={`${
                      isFeedbackPage ? styles.sideNavBgBlue : styles.sideNavBg
                    }  ${
                      pathname.split('/')[3] === 'waiters' &&
                      styles.sideNavBgActive
                    }`}
                  >
                    <Image src={smile} alt='product-icon' />
                    {selAdminSidebar && 'Əməkdaşlar'}
                  </Link>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SideNavigation
