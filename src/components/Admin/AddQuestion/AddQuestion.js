'use client'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './AddQuestion.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import questionTab from '../../../assets/icons/Admin/mainAdmin/questionTab.svg'
import arrowDownLine from '../../../assets/icons/Admin/mainAdmin/arrowDownLine.svg'
import eyeOpen from '../../../assets/icons/Admin/mainAdmin/eyeOpen.svg'
import eyeClose from '../../../assets/icons/Admin/mainAdmin/eyeClose.svg'
import plus from '../../../assets/icons/Admin/mainAdmin/plus.svg'
import edit from '../../../assets/icons/Admin/mainAdmin/questionEdit.svg'
import trash from '../../../assets/icons/Admin/mainAdmin/questionDelete.svg'
import leftArr from '../../../assets/icons/Hotel/leftArr.svg'
import leftArrow from '../../../assets/icons/Hotel/leftArrow.svg'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useQuery } from 'react-query'
import { getFeedback } from '@/services/api/dataApi'
import Cookies from 'js-cookie'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const AddQuestion = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAddQuestion = searchParams.get('add-question')
  const pathname = usePathname()

  const { data: feedbackQuestion } = useQuery('feedback-question', () => getFeedback())

  const handleNavigateToAddProductModal = () => {
    router.push(
      `/${pathname.split('/')[1]
      }/admin/feedback?add-question=true&add-modal=true&lang=${Cookies.get('active-lang')}`
    )
  }
  const handleNavigateToEditQuestionModal = (id) => {
    router.push(
      `/${pathname.split('/')[1]
      }/admin/feedback?add-question=true&edit-modal=true&questionID=${id}&lang=${Cookies.get('active-lang')}`
    )
  }
  const handleNavigateToDeleteQuestionModal = (id) => {
    router.push(
      `/${pathname.split('/')[1]
      }/admin/feedback?add-question=true&delete-modal=true&questionID=${id}`
    )
  }

  return (
    <div
      className={`${styles.container} ${isAddQuestion === null && '!opacity-0 !hidden'
        }`}
    >
      <div className={styles.title}>
        <h1>
          <div onClick={() => router.push('?')}>
            <Image
              src={leftArr}
              loading="lazy"
              width={22}
              height={22}
              alt="edit"
            />
          </div>
          Feedback sualları ({feedbackQuestion?.data?.results?.length})
        </h1>
        <button onClick={handleNavigateToAddProductModal}>
          <Image src={plus} loading="lazy" width={14} height={14} alt="+" />
          Yeni sual əlavə et
        </button>
      </div>
      <div className={styles.questionsTable}>
        {
          feedbackQuestion?.data?.results?.map((feedback, i) => (
            <div key={feedback.id} className={styles.table}>
              <div className="flex items-center">
                <h1>{i + 1}.</h1>
                <h3>{feedback.question_az}</h3>
              </div>
              <div className="flex gap-[24px]">
                <button
                  className={styles.edit}
                  onClick={() => handleNavigateToEditQuestionModal(feedback.id)}
                >
                  <Image
                    src={edit}
                    loading="lazy"
                    width={22}
                    height={22}
                    alt="edit"
                  />
                  Düzəliş et
                </button>
                <button onClick={() => handleNavigateToDeleteQuestionModal(feedback.id)} className={styles.delete}>
                  <Image
                    src={trash}
                    loading="lazy"
                    width={17}
                    height={17}
                    alt="edit"
                  />
                </button>
              </div>
            </div>
          ))
        }
        {/* <div className={styles.table}>
          <div className="flex items-center">
            <h1>1.</h1>
            <h3>Rezervasiyadan razı qaldınızmı?</h3>
          </div>
          <div className="flex gap-[24px]">
            <button
              className={styles.edit}
              onClick={handleNavigateToEditQuestionModal}
            >
              <Image
                src={edit}
                loading="lazy"
                width={22}
                height={22}
                alt="edit"
              />
              Düzəliş et
            </button>
            <button className={styles.delete}>
              <Image
                src={trash}
                loading="lazy"
                width={17}
                height={17}
                alt="edit"
              />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default AddQuestion
