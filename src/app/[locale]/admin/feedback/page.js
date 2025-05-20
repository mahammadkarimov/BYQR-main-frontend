'use client'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import FeedbackCardInfo from '@/components/Admin/FeedbackCardInfo/FeedbackCardInfo'
import FilterFeedback from '@/components/Admin/FilterFeedback/FilterFeedback'
import QuestionFeedback from '@/components/Admin/QuestionFeedback/QuestionFeedback'
import AddQuestion from '@/components/Admin/AddQuestion/AddQuestion'
import FeedbackContainer from '@/components/Admin/FeedbackContainer/FeedbackContainer'
import AddFeedbackModal from '@/components/Admin/AddFeedbackModal/AddFeedbackModal'
import EditFeedbackModal from '@/components/Admin/EditFeedbackModal/EditFeedbackModal'
import DeleteFeedbackModal from '@/components/Admin/DeleteFeedbackModal/DeleteFeedbackModal'
import FeedbackMain from '@/components/Admin/FeedbackMain/FeedbackMain'
import { useQuery } from 'react-query'
import { getFeedbackList, getFeedbackStatistics, getQuestionList } from '@/services/api/dataApi'
import { usePathname, useSearchParams } from 'next/navigation'

const page = () => {
  const searchParams = useSearchParams()
  const [feedbackQuestion, setFeedbackQuestion] = useState({
    question_az: '',
    question_ko: '',
    question_ru: '',
    question_ar: '',
    question_en: '',
  })
  const { data: feedbackList, refetch } = useQuery('feedback-list', () => getFeedbackList(searchParams.get('filter')))
  const { data: questionlist, refetch: refetchQuestion } = useQuery('question-list', () => getQuestionList(searchParams.get('filter')))
  const { data: feedbackStatistics } = useQuery('feedback-statistics', getFeedbackStatistics)
  useEffect(() => {
    refetch()
    refetchQuestion()
  }, [searchParams.get('filter')])
  return (
    <AdminLayout>
      <FeedbackContainer>
        <FeedbackMain>
          <FeedbackCardInfo>
            {feedbackStatistics}
          </FeedbackCardInfo>
          <FilterFeedback />
          <QuestionFeedback>
            {feedbackList}
            {questionlist}
          </QuestionFeedback>
        </FeedbackMain>
        <AddQuestion />
      </FeedbackContainer>
      <AddFeedbackModal />
      <EditFeedbackModal />
      <DeleteFeedbackModal />
    </AdminLayout>
  )
}

export default page
