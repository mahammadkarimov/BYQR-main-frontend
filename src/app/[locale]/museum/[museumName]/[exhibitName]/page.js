'use client'
import React, { useEffect, useRef, useState } from 'react'
import ChooseLang from '@/components/Museum/ChooseLang/index'
import MuseumArea from '@/components/Museum/MuseumArea/index'
import './style.css'
import { useQuery } from 'react-query'
import { getMuseumData } from '@/services/api/dataApi'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const page = () => {
  const bottomRef = useRef()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('Museum')
  const [activeLang, setActiveLang] = useState(false)
  const [isActiveLang, setIsActiveLang] = useState('')

  const { data: museumData, isLoading } = useQuery('museum-data', () =>
    getMuseumData({
      museumName: pathname.split('/')[3],
      exhibitName: pathname.split('/')[4]
    })
  )

  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log(window.scrollY)
  //   }

  //   window.addEventListener('scroll', handleScroll)
  // }, [])

  if (isLoading) {
    return null
  }

  return (
    <div>
      {/* <ExhibitBg museumData={museumData} /> */}
      <MuseumArea
        t={t}
        setActiveLang={setActiveLang}
        pathname={pathname}
        museumData={museumData}
        bottomRef={bottomRef}
      />
      <ChooseLang
        router={router}
        pathname={pathname}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        setIsActiveLang={setIsActiveLang}
        isActiveLang={isActiveLang}
      />
    </div>
  )
}

export default page
