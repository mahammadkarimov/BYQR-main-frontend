'use client'
import { colors } from '@/styles/color/colors'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const StarPriceContent = (props) => {
  const [isActiveSize, setIsActiveSize] = useState(false)
  const t = useTranslations('Home')

  const {
    mealSizeId,
    sizePrice,
    price,
    imageSrc,
    fontWeight,
    border,
    padding,
    minWidth,
  } = props
  const textColor = colors.big_title
  const boxStyle = {
    color: textColor,
    display: 'flex',
    textAlign: 'center',
    justifyContent: props.isModalPrice === 'active' ? 'center' : 'flex-start',
    alignItems: 'center',
    gap: '2px',
    borderRadius: '20px',
    fontWeight,
    border,
    height: '32px',
    fontSize: '18px',
    padding,
    minWidth,
  }
  useEffect(() => {
    const isActive = sizePrice?.some(size => size.size !== '')

    setIsActiveSize(isActive)
  }, [sizePrice])

  console.log(isActiveSize)

  return (
    <div style={boxStyle}>
      {(price && !isActiveSize) &&
        <div className='flex items-center'>
          <p className='!mb-0 text-sm'>{price == 0 ? 0 : price}</p>
          <Image
            src={imageSrc}
            width='auto'
            height='auto'
            className='w-6'
            alt="star-price"
            loading="lazy"
          />
        </div>
      }
      {sizePrice?.map((size) => (
        (size.id === mealSizeId && isActiveSize) &&
        <>
          <p className='!mb-0'>{size.price}</p>
          <Image
            src={imageSrc}
            width='auto'
            height='auto'
            className='w-6'
            alt="star-price"
            loading="lazy"
          />
        </>
      ))}
    </div>
  )
}
export default StarPriceContent
