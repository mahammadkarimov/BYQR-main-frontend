import Image from 'next/image'
import React, { useState } from 'react'
import insta from '../../../../assets/icons/Home/insta2.svg'
import insta2 from '../../../../assets/icons/Home/insta3.svg'
import insta3 from '../../../../assets/icons/Home/insta4.svg'
import wpred from '../../../../assets/icons/Home/wp2.svg'
import wpred2 from '../../../../assets/icons/Home/wp3.svg'
import wpred3 from '../../../../assets/icons/Home/wp4.svg'
import fbred from '../../../../assets/icons/Home/fb2.svg'
import fbred2 from '../../../../assets/icons/Home/fb3.svg'
import fbred3 from '../../../../assets/icons/Home/fb4.svg'
import link from '../../../../assets/icons/Home/link2.svg'
import link2 from '../../../../assets/icons/Home/link3.svg'
import link3 from '../../../../assets/icons/Home/link4.svg'
import tiktok from '../../../../assets/icons/Home/tiktok2.svg'
import tiktok2 from '../../../../assets/icons/Home/tiktok3.svg'
import tiktok3 from '../../../../assets/icons/Home/tiktok4.svg'
import Link from 'next/link'
import SuccessModal from '../../RestaurantMenu/SuccessModal/SuccessModal'

const SocialAreaCustom = ({ allData }) => {
  const [copied, setCopied] = useState(false)

  const copyUrlToClipboard = async () => {
    try {
      if (window.location.href) {
        await navigator.clipboard.writeText(window.location.href)
        // setIsActiveShareModal(false);
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy the URL: ', err)
    }
  }
  return (
    <>
      <div
        className='pt-[44px] pb-[74px] flex gap-[14px] justify-center'
        id='socialAreaBtn'
      >
        {allData?.data?.whatsapp && (
          <Link target='_blank' href={allData?.data?.whatsapp}>
            <Image
              width={26}
              height={26}
              src={
                allData?.data?.username === 'chaikend'
                  ? wpred2
                  : allData?.data?.username === 'obaoschuman'
                  ? wpred3
                  : wpred
              }
              alt='whatsapp'
            />
          </Link>
        )}
        {allData?.data?.instagram && (
          <Link target='_blank' href={allData?.data?.instagram}>
            <Image
              width={26}
              height={26}
              src={
                allData?.data?.username === 'chaikend'
                  ? insta2
                  : allData?.data?.username === 'obaoschuman'
                  ? insta3
                  : insta
              }
              alt='instagram'
            />
          </Link>
        )}
        {allData?.data?.tiktok && (
          <Link target='_blank' href={allData?.data?.tiktok}>
            <Image
              width={26}
              height={26}
              src={
                allData?.data?.username === 'chaikend'
                  ? tiktok2
                  : allData?.data?.username === 'obaoschuman'
                  ? tiktok3
                  : tiktok
              }
              alt='tiktok'
            />
          </Link>
        )}
        {allData?.data?.facebook && (
          <Link target='_blank' href={allData?.data?.facebook}>
            <Image
              width={26}
              height={26}
              src={
                allData?.data?.username === 'chaikend'
                  ? fbred2
                  : allData?.data?.username === 'obaoschuman'
                  ? fbred3
                  : fbred
              }
              alt='facebook'
            />
          </Link>
        )}
        <button onClick={copyUrlToClipboard}>
          <div className='p-1 rounded-full'>
            <Image
              width={26}
              height={26}
              src={
                allData?.data?.username === 'chaikend'
                  ? link2
                  : allData?.data?.username === 'obaoschuman'
                  ? link3
                  : link
              }
              alt='link'
            />
          </div>
        </button>
      </div>
      <SuccessModal copied={copied} />
    </>
  )
}

export default SocialAreaCustom
