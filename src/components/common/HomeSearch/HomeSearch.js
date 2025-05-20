'use client'
import React from 'react'
import styles from './homesearch.module.css'
import Image from 'next/image'

import homeMagnifying from '../../../assets/images/Home/home-magnifying.svg'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

const HomeSearch = () => {
  const t = useTranslations('Home')
  const pathname = usePathname()
  const router = useRouter()
  const selScrollY = useSelector((state) => state.scrollSlice.yScrollValue)

  return (
    <>
      <div
        onClick={() => router.push(`${pathname}/search`)}
        className={styles[' home-search-scroll']}
        style={{
          top: `${-selScrollY > -70 && -selScrollY}`,
          opacity: `${selScrollY > 5 ? 0 : 1}`,
        }}
      >
        <div>
          <div className={styles['home-search-inp']}>
            <input
              type="text"
              readOnly
              className="cursor-pointer"
              placeholder={t('Search meal, drink')}
            />
          </div>
          <div className="absolute top-8 left-4">
            <Image src={homeMagnifying} alt="homeMagnifying" />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeSearch
