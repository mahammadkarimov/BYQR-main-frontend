'use client'
import { Modal } from 'react-bootstrap'
import '../../../styles/style.css'
import styles from './FeedbackContainer.module.css'
import { useSearchParams } from 'next/navigation'

const FeedbackContainer = ({ children }) => {
  const searchParams = useSearchParams()
  const isAddQuestion = searchParams.get('add-question')
  return <div className={`relative`}>{children}</div>
}

export default FeedbackContainer
