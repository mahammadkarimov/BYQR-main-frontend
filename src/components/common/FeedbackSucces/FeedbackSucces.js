'use client'
import React from 'react'
import styles from './FeedbackSucces.module.css'
import Button from '../UI/Button/Button'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const FeedbackSucces = (props) => {
  const t = useTranslations('Home')
  const { buttonCss } = props
  const router = useRouter()
  const pathname = usePathname()

  return (
    <>
      <div className={styles.feedbackSuccesContainer}>
        <div className={styles.layout}>
          <h1>{t('Your feedback has been sent!')}</h1>
        </div>
        <Button
          onClick={() => router.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`)}
          type="submit"
          title="submit"
          styleCss={buttonCss}
          children={t('Done')}
        />
      </div>
    </>
  )
}

export default FeedbackSucces
