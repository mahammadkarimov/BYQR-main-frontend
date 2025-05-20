'use client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './Stories.module.css'
import storieImg from '../../../assets/images/storieExample1.jpg'

const Stories = ({ sliderCurrent }) => {
  const sliderRef = useRef(null)

  useEffect(() => {
    goToFirstSlide(sliderCurrent)
  }, [sliderCurrent])

  const goToFirstSlide = (param) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(param)
    }
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 6,
    swipeToSlide: true,
    slidesToShow: 4,
    // touchMove: false,  ---  drag scroll disabler
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 493,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  }
  return (
    <>
      <div className={` fixed inset-0 ${styles.storiesContainer}`}>
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {[...Array(33)].map((_, i) => {
              return (
                <div
                  className={` ${
                    sliderCurrent == i ? '!border-[#FD451C]' : ''
                  } ${styles.sliderCard}`}
                >
                  <Image
                    className="rounded-full object-cover w-full h-full"
                    alt="storie"
                    src={storieImg}
                  />
                </div>
              )
            })}
            {/* <div className={` !border-[#FD451C] ${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div>
            <div className={`${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div>
            <div className={`${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div>
            <div className={`  ${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div>
            <div className={`  ${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div>
            <div className={`  ${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div>
            <div className={`  ${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div>
            <div className={`  ${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div>
            <div className={`  ${styles.sliderCard}`}>
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="storie"
                src={storieImg}
              />
            </div> */}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Stories
