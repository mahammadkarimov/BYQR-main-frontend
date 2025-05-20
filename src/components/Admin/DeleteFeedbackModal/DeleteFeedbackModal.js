'use client'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import styles from './DeleteFeedbackModal.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import { useSearchParams, useRouter } from 'next/navigation'
import x from '../../../assets/icons/Profile/x.svg'
import { useMutation, useQueryClient } from 'react-query'
import { deleteQuestion } from '@/services/api/dataApi'
import { toast } from 'react-toastify'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const DeleteFeedbackModal = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAddQuestion = searchParams.get('delete-modal')
  const queryClient = useQueryClient()
  const outside = useRef(null)
  const inside = useRef(null)

  const { mutate: delQuestion } = useMutation(() => deleteQuestion(searchParams.get('questionID')), {
    onSuccess: () => {
      toast.success('Deleted Question!')
      router.back()
      queryClient.invalidateQueries('feedback-question')
    },
    onError: () => {
      router.back()
    }
  })

  const handleClickOutside = (event) => {
    if (outside.current && !inside.current.contains(event.target)) {
      router.back()
    }
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
          <h1>Silməyə əminmisinizmi?</h1>
          <div onClick={() => router.back()}>
            <Image src={x} loading="lazy" width={30} height={30} alt="x" />
          </div>
        </div>
        <div className={styles.content}>
          <div className="flex gap-[36px] items-center justify-between">
            <button onClick={() => router.back()} className={styles.cancel}>
              Ləğv et
            </button>
            <button onClick={() => delQuestion()} className={styles.submit}>Bəli</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteFeedbackModal
