import Image from 'next/image'
import React from 'react'
import defaultBg from '../../../../assets/images/Home/defaultBg.jpg'
import obaoBg from '../../../../assets/images/Home/obaoBg.jpg'
import info from '../../../../assets/icons/Home/info2.svg'
import world from '../../../../assets/icons/Home/world.svg'
import botArrow from '../../../../assets/icons/Home/botArrow.svg'
import chaikend from '../../../../assets/icons/Home/chaikend.JPEG'
import siesta from '../../../../assets/icons/Home/siesta.JPG'
import champBg from '../../../../assets/icons/Home/champBg.svg'
import styles from './style.module.css'

const index = ({ allData, setIsActiveLang, pathname, t, router }) => {
  const lang = {
    az: 'Azərbaycan',
    en: 'English',
    ru: 'Русский',
    ar: 'عربي',
    ko: '한국인'
  }

  return (
    <>
      <div className='relative'>
        <div className={styles.defaultBg}>
          {allData?.data?.username === 'chaikend' ? (
            <Image src={chaikend} alt='chaikend' />
          ) : allData?.data?.username === 'obaoschuman' ? (
            <Image src={obaoBg} alt='obaoBg' />
          ) : allData?.data?.username === 'siestabaku' ? (
            <Image src={siesta} alt='siestaBg' />
          ) :  allData?.data?.username === 'champusique' ? (
            <Image src={champBg} alt='champBg' />
          ) : (
            <Image src={defaultBg} alt='defaultBg' />
          )}
          <div
            className={
              allData?.data?.username === 'chaikend'
                ? styles.newGradient
                : allData?.data?.username === 'obaoschuman'
                ? styles.newGradient1
                : allData?.data?.username === 'siestabaku' ? styles.newGradient3 : 
                allData?.data?.username === 'champusique' ? undefined : styles.gradientOverlay
            }
          ></div>
        </div>
        <div
          className={styles.infoArea}
          onClick={() =>
            router.push(
              `/${pathname.split('/')[1]}/${
                pathname.split('/')[2]
              }?infomodal=true`
            )
          }
        >
          <Image src={info} alt='info' />
        </div>
        <div className={allData?.data?.username === 'champusique' ? styles.infoBottom1 : styles.infoBottom}>
          <Image
            src={allData?.data?.profile_photo}
            width={600}
            height={600}
            alt='profile-photo'
          />
          <h2>
           {allData?.data?.username !== 'siestabaku' && allData?.data?.username !== 'champusique' ?  allData?.data?.first_name+' '+ allData?.data?.last_name : ''}
          </h2>
          <span>{allData?.data?.address}</span>
        </div>
      </div>
      <div
        className={
          allData?.data?.username === 'chaikend'
            ? styles.langDropdown1
            : allData?.data?.username === 'obaoschuman'
            ? styles.langDropdown2
            : allData?.data?.username === 'siestabaku' || allData?.data?.username === 'champusique'
            ? styles.langDropdown3
            : styles.langDropdown
        }
        onClick={() => setIsActiveLang(true)}
      >
        <Image src={world} alt='world-lang' />
        <span>{lang[pathname.split('/')[1]]}</span>
        <Image src={botArrow} alt='bottom-arrow' />
      </div>
    </>
  )
}

export default index
