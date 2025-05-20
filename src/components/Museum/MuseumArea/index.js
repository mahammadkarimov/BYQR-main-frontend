import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import az from '../../../assets/icons/Museum/az.png'
import en from '../../../assets/icons/Museum/en.png'
import ru from '../../../assets/icons/Museum/ru.png'
import ar from '../../../assets/icons/Museum/ar.png'
import ko from '../../../assets/icons/Museum/ko.png'
import byqr from '../../../assets/icons/Museum/byqr.svg'
import 'swiper/css/bundle'

import './style.css'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'
import test from '../../../assets/images/Museum/test.svg'
import { EffectCards, Pagination } from 'swiper/modules'
import { useRouter } from 'next/navigation'

const Index = ({ t, museumData, pathname, setActiveLang }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowHeight, setWindowHeight] = useState(1150)
  const [rotated, setRotated] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(window.innerHeight)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageSrc, setModalImageSrc] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const router = useRouter()

  // useEffect(() => {
  //   const handleResize = () => {
  //     setScrollY(window.innerHeight)
  //   }
  //   window.addEventListener('resize', handleResize)
  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  const imgsArr = [
    { id: 1, image: museumData?.data?.image_1 ?? null },
    { id: 2, image: museumData?.data?.image_2 ?? null },
    { id: 3, image: museumData?.data?.image_3 ?? null },
    { id: 4, image: museumData?.data?.image_4 ?? null },
    { id: 5, image: museumData?.data?.image_5 ?? null }
  ]

  const totalSlides = imgsArr.filter(el => el.image).length || 0

  const openModal = id => {
    setCurrentSlide(id)
    setIsModalOpen(true)
  }

  const closeModal = e => {
    if (e.target.id === 'modalOverlay') {
      setIsModalOpen(false)
      setCurrentSlide(0)
    }
  }

  const detectLang = () => {
    const currentLang = pathname?.split('/')[1]
    switch (currentLang) {
      case 'az':
        return az
      case 'en':
        return en
      case 'ar':
        return ar
      case 'ru':
        return ru
      case 'ko':
        return ko
      default:
        return az
    }
  }

  return (
    <div className={styles.container}>
      {museumData?.data?.image && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}
        ></div>
      )}
      <div className={styles.head}>
        <h2>{museumData?.data?.[`name_${pathname.split('/')[1]}`]}</h2>
        <h3>{museumData?.data?.museum?.name}</h3>
      </div>
      <div className={styles.langBtn} onClick={() => setActiveLang(true)}>
        <Image
          className='w-[24px] !h-[24px] pb-[2.5px]'
          src={detectLang()}
          alt='az'
        />
      </div>
      <div>
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Pagination]}
          cardsEffect={{
            slideShadows: false
          }}
          pagination={{
            clickable: true
          }}
          className='mySwiper'
        >
          {imgsArr?.map(
            (el, i) =>
              el.image && (
                <SwiperSlide>
                  <Image
                    key={el?.id}
                    src={el?.image}
                    alt='Image 1'
                    width={400}
                    height={400}
                    style={{
                      maxWidth: '400px',
                      height: '400px',
                      objectFit: 'cover'
                    }}
                    onClick={() => openModal(i)}
                  />
                </SwiperSlide>
              )
          )}
        </Swiper>

        {/* <div className='flex justify-center'>
          <svg
            width='58'
            height='56'
            viewBox='0 0 58 56'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{
              transform: `scale(${scrollY >= 100 ? 1 : 1.1})`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <path
              d='M1 54.9995L28.6056 37.6631L56.2113 54.9995'
              stroke='#4d3523'
              strokeWidth='2'
              strokeLinecap='round'
              style={{
                transition: 'transform 0.5s ease-in-out'
              }}
            />
            <path
              d='M1.78882 37.1685L29.3945 19.832L57.0001 37.1685'
              stroke='white'
              strokeOpacity='0.8'
              strokeWidth='2'
              strokeLinecap='round'
              style={{
                transition: 'transform 0.5s ease-in-out'
              }}
            />
            <path
              d='M1.78882 19.3364L29.3945 2L57.0001 19.3364'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              style={{
                transition: 'transform 0.5s ease-in-out'
              }}
            />
          </svg>
        </div> */}

        {/* Metin İçeriği */}
        {museumData?.data?.[`text_${pathname?.split('/')[1]}`].length && (
          <div className={styles.body}>
            {museumData?.data?.[`text_${pathname?.split('/')[1]}`].slice(
              0,
              1000
            )}
          </div>
        )}

        {/* Video Bölümü */}
        {museumData?.data?.[`video_${pathname?.split('/')[1]}`] && (
          <div className={styles.mediaSection}>
            <video controls className={styles.videoPlayer}>
              <source
                src={museumData?.data?.[`video_${pathname?.split('/')[1]}`]}
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Ses Bölümü */}
        {museumData?.data?.[`sound_${pathname?.split('/')[1]}`] ? (
          <div className={`${styles.mediaSection} ${styles.audioSection}`}>
            <audio controls className={styles.audioPlayer} preload='auto'>
              {/* Birden fazla formatta ses kaynağı sağlama */}
              <source
                src={museumData?.data?.[`sound_${pathname?.split('/')[1]}`]}
                type='audio/mpeg'
              />
              <source
                src={museumData?.data?.[`sound_${pathname?.split('/')[1]}`]}
                type='audio/ogg'
              />
              <source
                src={museumData?.data?.[`sound_${pathname?.split('/')[1]}`]}
                type='audio/wav'
              />
              {/* Ses kaynağının bulunamaması durumunda alternatif mesaj */}
              Your browser does not support the audio element or the audio file
              is not available.
            </audio>
          </div>
        ) : (
          <p>Ses kaynağı bulunamadı veya mevcut değil.</p>
        )}

        {museumData?.data?.[`text_${pathname?.split('/')[1]}`].length > 1000 && (
          <div className={styles.body}>
            {museumData?.data?.[`text_${pathname?.split('/')[1]}`].slice(1000)}
          </div>
        )}

        <div className={styles.byqrPowered}>
          <div>Powered</div>
          <Image src={byqr} alt='byqr' />
        </div>

        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999
            }}
            id='modalOverlay'
            onClick={closeModal}
          >ə
            {/* Resim üzerine tıklanınca modal kapanmasın */}
            <Swiper
              slidesPerView={'auto'}
              centeredSlides={true}
              spaceBetween={30}
              initialSlide={currentSlide}
              onSlideChange={swiper => setCurrentSlide(swiper.realIndex + 1)}
              onSwiper={swiper => setCurrentSlide(swiper.realIndex + 1)}
              pagination={{
                el: '.swiper-pagination-number',
                clickable: true,
                renderBullet: (index, className) =>
                  `<span className="${className}">${index + 1}</span>`
              }}
              modules={[Pagination]}
              className='mySwiper'
            >
              {imgsArr?.map(el => (
                el.image &&
                <SwiperSlide key={el.id}>
                  <Image
                    src={el.image}
                    width={500}
                    height={500}
                    alt='Image 1'
                    style={{
                      width: '100%',
                      height: '80vh',
                      borderRadius: '16px'
                    }}
                    onClick={() => openModal(el.id)}
                  />
                </SwiperSlide>
              ))}
              <div className='custom-pagination'>
                {currentSlide} / {totalSlides}
              </div>
            </Swiper>
            <div
              className={styles.closeBtn}
              onClick={() => {
                setIsModalOpen(false)
                setCurrentSlide(0)
              }}
            >
              <span>+</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
