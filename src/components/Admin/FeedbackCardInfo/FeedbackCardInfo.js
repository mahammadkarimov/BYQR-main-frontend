'use client'
import { Modal } from 'react-bootstrap'
import styles2 from '../../../app/[locale]/admin/products/products.module.css'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import closeBtn from '../../../assets/images/Admin/adminModal/close.svg'
import warning from '../../../assets/images/Admin/adminModal/warning.svg'
import { GridLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './FeedbackCardInfo.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  GetHotelCustomerServices,
  GetHotelServices,
  HotelCustomerServiceDelete,
  HotelServiceDelete,
} from '@/services/api/dataApi'
import mounthFeedback from '../../../assets/icons/Admin/mainAdmin/mounthFeedback.svg'
import dailyFeedback from '../../../assets/icons/Admin/mainAdmin/dailyFeedback.svg'
import questionAnswer from '../../../assets/icons/Admin/mainAdmin/questionAnswer.svg'
import addQuestion from '../../../assets/icons/Admin/mainAdmin/addQuestion.svg'
import AddQuestion from '@/components/Admin/AddQuestion/AddQuestion'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const FeedbackCardInfo = ({ children }) => {
  const router = useRouter()
  const pathName = usePathname()

  const handleNavigateToAddProduct = () => {
    router.push(`${pathName.split('/')[3]}?add-question=true`)
  }
  return (
    <div className={styles.container}>
      <h1>Müştəri rəy nəticələri</h1>
      <div className="flex gap-10 mt-10 flex-wrap">
        <div className="min-w-[179px] min-h-[120px] p-[0 20px] justify-center flex flex-col items-center rounded-[12px] bg-[#CDC3FF]">
          <div
            className={`flex gap-[5px] items-center justify-center ${styles.firstTitle}`}
          >
            <Image
              src={questionAnswer}
              loading="lazy"
              width={20}
              height={20}
              alt="questionAnswer"
            />
            <h1 className="relative top-[5px]">Ümumi feedback</h1>
          </div>
          <div
            className={`mt-[20px] flex flex-col gap-[0px] items-center justify-center ${styles.bodyParagraph}`}
          >
            <h1>{children?.data?.total_feedbacks}</h1>
            <h2>Ümumi aylar ərzində</h2>
          </div>
        </div>
        <div className="min-w-[179px] min-h-[120px] p-[0 20px] justify-center flex flex-col items-center rounded-[12px] bg-[#AAC9FF]">
          <div
            className={`flex gap-[5px] items-center justify-center ${styles.firstTitle}`}
          >
            <Image
              src={mounthFeedback}
              loading="lazy"
              width={20}
              height={20}
              alt="questionAnswer"
            />
            <h1 className="relative top-[5px]">Aylıq feedback</h1>
          </div>
          <div
            className={`mt-[20px] flex flex-col gap-[0px] items-center justify-center ${styles.bodyParagraph}`}
          >
            <h1>{children?.data?.monthly_feedbacks}</h1>
            <h2>Son ay ərzində</h2>
          </div>
        </div>
        <div className="min-w-[179px] min-h-[120px] p-[0 20px] justify-center flex flex-col items-center rounded-[12px] bg-[#FEFFC3]">
          <div
            className={`flex gap-[5px] items-center justify-center ${styles.firstTitle}`}
          >
            <Image
              src={dailyFeedback}
              loading="lazy"
              width={20}
              height={20}
              alt="questionAnswer"
            />
            <h1 className="relative top-[5px]">Həftəlik feedback</h1>
          </div>
          <div
            className={`mt-[20px] flex flex-col gap-[0px] items-center justify-center ${styles.bodyParagraph}`}
          >
            <h1>{children?.data?.weekly_feedbacks}</h1>
            <h2>Həftə ərzində</h2>
          </div>
        </div>
        <div className="min-w-[179px] min-h-[120px] p-[0 20px] justify-center flex flex-col items-center rounded-[12px] bg-[#92E3B8]">
          <div
            className={`flex gap-[5px] items-center justify-center ${styles.firstTitle}`}
          >
            <Image
              src={dailyFeedback}
              loading="lazy"
              width={20}
              height={20}
              alt="questionAnswer"
            />
            <h1 className="relative top-[5px]">Günlük feedback</h1>
          </div>
          <div
            className={`mt-[20px] flex flex-col gap-[0px] items-center justify-center ${styles.bodyParagraph}`}
          >
            <h1>{children?.data?.daily_feedbacks}</h1>
            <h2>Gün ərzində</h2>
          </div>
        </div>
        <div
          onClick={handleNavigateToAddProduct}
          className="min-w-[179px] min-h-[120px] p-[0 20px] justify-center flex flex-col items-center rounded-[12px] border border-black ease-in duration-300 hover:bg-slate-200 cursor-pointer"
        >
          <div
            className={`flex gap-[5px] items-center justify-center ${styles.firstTitle}`}
          >
            <Image
              src={addQuestion}
              loading="lazy"
              width={20}
              height={20}
              alt="questionAnswer"
            />
            <h1 className="relative top-[5px]">Sual əlavə et</h1>
          </div>
          <div
            className={`mt-[20px] flex flex-col gap-[0px] items-center justify-center ${styles.bodyParagraph}`}
          >
            <h4>+</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackCardInfo
