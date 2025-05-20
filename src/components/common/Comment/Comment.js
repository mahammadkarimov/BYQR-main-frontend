'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Comment.module.css'
import Button from '../UI/Button/Button'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'

const Comment = (props) => {
  const t = useTranslations('Home')
  const { commentContainer, images, buttonStyleCss, text, setText, activedRating, feedback, sendFeedback, roomId, tableId, username, hotelRestUsername } = props
  const selActiveFeedbackBtn = useSelector((state) => state.feedbackService.isActiveFeedback)
  const selActiveFeedbackBtn2 = useSelector((state) => state.feedbackService.isActiveRating)

  const onSubmitHandler = (event) => {
    console.log(feedback)
    console.log(JSON.stringify(feedback))
    event.preventDefault()
    if (Cookies.get('user-type') === 'hotel') {
      sendFeedback({
        description: text,
        instance: roomId,
        overall_rating: activedRating,
        feedbacks: feedback,
        // images: images,
        username: username,
      })
      setText('')
    } else {
      sendFeedback({
        description: text,
        instance: tableId,
        overall_rating: activedRating,
        feedbacks: feedback,
        // images: images,
        username: username
      })
    }

  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className={`flex flex-col items-center ${styles.commentContainer} ${commentContainer}`}
    >
      <div className={`p-2.5 ${styles.titlePlace}`}>
        <h1>{t('Share your opinion with us')}</h1>
      </div>
      <textarea
        placeholder={t("Describe your experience here")}
        className={styles.commentArea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <Button
        type="submit"
        title="submit"
        styleCss={buttonStyleCss}
        children={t('Send your feedback')}
      // disabled={!(selActiveFeedbackBtn2 && selActiveFeedbackBtn)}
      />
      <div className=""></div>
    </form>
  )
}

export default Comment
