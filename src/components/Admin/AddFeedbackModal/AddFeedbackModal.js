'use client'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styles from './AddFeedbackModal.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import { useSearchParams, useRouter } from 'next/navigation'
import x from '../../../assets/icons/Profile/x.svg'
import { useMutation, useQueryClient } from 'react-query'
import { addFeedback } from '@/services/api/dataApi'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const AddFeedbackModal = () => {
  const [isActiveLang, setIsActiveLang] = useState(Cookies.get('active-lang'))
  const [feedbackQuestion, setFeedbackQuestion] = useState({
    question_az: '',
    question_ko: '',
    question_ru: '',
    question_ar: '',
    question_en: '',
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const isAddQuestion = searchParams.get('add-modal')
  const outside = useRef(null)
  const inside = useRef(null)
  const questionRef = useRef(null)

  const { mutate: addFeedbackQuestion } = useMutation({
    mutationFn: (data) => addFeedback(data),
    onSuccess: () => {
      toast.success('Created Feedback Question!')
      setFeedbackQuestion({
        question_az: '',
        question_ko: '',
        question_ru: '',
        question_ar: '',
        question_en: '',
      })
      router.push('?add-question=true')
      queryClient.invalidateQueries('feedback-question')
    },
    onError: () => {
      router.push('?add-question=true')
    }
  })

  const handleClickOutside = (event) => {
    if (outside.current && !inside.current.contains(event.target)) {
      router.push('?add-question=true')
      setFeedbackQuestion({
        question_az: '',
        question_ko: '',
        question_ru: '',
        question_ar: '',
        question_en: '',
      })
    }
  }

  const addQuestion = () => {
    addFeedbackQuestion(feedbackQuestion)
  }

  const handleFeedbackQuestion = (e) => {
    const updatedObject = { ...feedbackQuestion }
    updatedObject[`question_${isActiveLang}`] = e.target.value
    setFeedbackQuestion(updatedObject)
  }

  const handleChangeLang = (e) => {
    router.push(`?add-question=true&add-modal=true&lang=${e.target.value}`)
    Cookies.set('active-lang', e.target.value)
    setIsActiveLang(e.target.value)
  }
  return (
    <div
      onClick={handleClickOutside}
      ref={outside}
      className={`${styles.sideFlow} ${isAddQuestion === null && '!opacity-0 !hidden'
        }`}
    >
      <div
        ref={inside}
        className={`${styles.container}  ${isAddQuestion === null && styles.close
          }`}
      >
        <div className={styles.title}>
          <h1>Feedback sualı</h1>
          <div onClick={() => {
            router.push('?add-question=true')
            setFeedbackQuestion({
              question_az: '',
              question_ko: '',
              question_ru: '',
              question_ar: '',
              question_en: '',
            })
          }}>
            <Image src={x} loading="lazy" width={30} height={30} alt="x" />
          </div>
        </div>
        <div className={styles.content}>
          <h1>Sualınızı qeyd edin</h1>
          <textarea value={feedbackQuestion[`question_${isActiveLang}`]}
            type="textarea" onChange={handleFeedbackQuestion} />
          <div className={styles.paragraph}>
            <h1>Choose Upload Language</h1>
            <select
              onChange={handleChangeLang}
              className="block w-64 p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="language"
              id="lang"
            >
              <option value="en" selected={searchParams.get('lang') === 'en'}>EN</option>
              <option value="az" selected={searchParams.get('lang') === 'az'}>AZ</option>
              <option value="ru" selected={searchParams.get('lang') === 'ru'}>RU</option>
              <option value="ko" selected={searchParams.get('lang') === 'ko'}>KO</option>
              <option value="ar" selected={searchParams.get('lang') === 'ar'}>AR</option>
            </select>
          </div>
          <div className="flex gap-[36px] items-center justify-between">
            <button onClick={() => {
              router.push('?add-question=true')
              setFeedbackQuestion({
                question_az: '',
                question_ko: '',
                question_ru: '',
                question_ar: '',
                question_en: '',
              })
            }} className={styles.cancel}>
              Ləğv et
            </button>
            <button onClick={addQuestion} className={styles.submit}>Əlavə et</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFeedbackModal
