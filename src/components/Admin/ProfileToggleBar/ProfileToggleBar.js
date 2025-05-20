'use client'
import React, { useRef } from 'react'
import styles from './ProfileToggleBar.module.css'
import Image from 'next/image'
import { getAuth, signOut } from 'firebase/auth'
import settings from '../../../assets/icons/Admin/ProfileAccount/settings.svg'
import power from '../../../assets/icons/Admin/ProfileAccount/power.svg'
import { useDispatch, useSelector } from 'react-redux'
import { handleToggleBar } from '@/redux/features/adminProfileBarSlice'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useQuery } from 'react-query'
import { UserList } from '@/services/api/dataApi'
import { useTranslations } from 'next-intl'
import { app } from '@/firebaseConfig'

const ProfileToggleBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Admin')

  const { data } = useQuery(['user'], UserList)

  const selAdminProfileBar = useSelector(
    (state) => state.profileToggle.isActiveProfileBar
  )

  const SignOutFromFirebase = () => {
    const auth = getAuth(app)
    signOut(auth)
      .then(() => { })
      .catch((error) => { })
  }

  const handleGoSettings = () => {
    router.push(`?page=profile-settings`)
    dispatch(handleToggleBar())
  }

  const handleGoLogin = () => {
    router.push(`/${pathname.slice(1, 3)}/panel/login`)
    dispatch(handleToggleBar())
    Cookies.set('access_token', '')
    SignOutFromFirebase()
  }

  return (
    <div
      className={
        !selAdminProfileBar
          ? styles.profileToggleBarHidden
          : styles.profileToggleBarShow
      }
    >
      <div className={styles['toggleHeadName']}>
        <div>
          {t('Welcome')},{' '}
          {data?.data?.first_name
            ? (data?.data?.first_name).slice(0, 11)
            : 'Anonymous user'}{' '}
        </div>
      </div>
      <div className="w-full h-full flex flex-col">
        <ul className={styles['listContainer']}>
          <li onClick={handleGoSettings}>
            <Image
              src={settings}
              loading="eager"
              width={20}
              height={20}
              alt="Settings"
            />
            <div>{t('Settings')}</div>
          </li>
          <li onClick={handleGoLogin}>
            <Image
              src={power}
              loading="eager"
              width={20}
              height={20}
              alt="power"
            />
            <button>{t('Log Out')}</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileToggleBar
