'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Rating.module.css'
import star from '../../../assets/icons/Feedback/Star.svg'
import { Inter } from 'next/font/google'
import { handleActiveRating } from '@/redux/features/feedbackSlice'
import { useDispatch } from 'react-redux'
import { useTranslations } from 'next-intl'

const inter = Inter({ subsets: ['latin'] })

const Rating = (props) => {
  const t = useTranslations("Home")
  const { ratingContainer, setactivedRating, activedRating } = props
  const dispatch = useDispatch()

  const handleActiveRatingClick = (ratingId) => {
    dispatch(handleActiveRating(ratingId))
    setactivedRating(ratingId)
  }

  return (
    <div
      className={` pt-3.5 flex flex-col items-center bg-[#FFEEE8] ${styles.ratingContainer} ${ratingContainer} ${inter.className}`}
    >
      <div className={`p-2.5 ${styles.titlePlace}`}>
        <h1>{t('Rate your experience')}</h1>
      </div>
      <ul className="flex justify-between items-center mt-3">
        {[...Array(5)].map((_, i) => {
          return (
            <li>
              <Image
                onClick={() => handleActiveRatingClick(i + 1)}
                className={`object-cover w-full h-full cursor-pointer ${activedRating >= i + 1 ? '!filter-none' : ''
                  } `}
                alt="star"
                src={star}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Rating
