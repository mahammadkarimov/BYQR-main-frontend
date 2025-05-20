'use client'
import { Modal } from 'react-bootstrap'
import '../../../styles/style.css'
import styles from './FeedbackMain.module.css'
import { useSearchParams } from 'next/navigation'

const FeedbackMain = ({ children }) => {
  const searchParams = useSearchParams()
  const isAddQuestion = searchParams.get('add-question')
  return (
    <div
      className={`${styles.container} ${isAddQuestion && '!opacity-0 !hidden'}`}
    >
      {children}
    </div>
  )
}

export default FeedbackMain
