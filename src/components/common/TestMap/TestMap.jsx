'use client'
import React from 'react'
import Image from 'next/image'

const Stories = ({ sliderCurrent }) => {
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
  return <div></div>
}

export default Stories
