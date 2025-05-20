'use client'
import Feedback from '../../common/Feedback/Feedback'
import Rating from '../../common/Rating/Rating'
import Comment from '../../common/Comment/Comment'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getFeedbackQuestion, getRoomId, sendCustomerFeedback } from '@/services/api/dataApi'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const RestaurantDetails = () => {
  const [questionID, setQuestionID] = useState(null)
  const [feedback, setFeedback] = useState([])
  const [rating, setRating] = useState(null)
  const [feedbackImage, setFeedbackImage] = useState(null)
  const [activedRating, setactivedRating] = useState(0)
  const [text, setText] = useState('')
  const [review, setReview] = useState('')
  const [images, setImages] = useState([])

  const pathname = usePathname()
  const router = useRouter()
  const roomId = Cookies.get('activeRoom')
  const tableId = Cookies.get('activeTable')
  const username = Cookies.get('activeParams')
  const hotelRestUsername = Cookies.get('hotel-rest-username')


  const { data: questionData } = useQuery('client-question', () => getFeedbackQuestion(pathname.split('/')[1]))
  // const { data: roomId } = useQuery('room-id', getRoomId)
  const { mutate: sendFeedback } = useMutation((data) => sendCustomerFeedback(data), {
    onSuccess: (data) => {
      console.log(data)
      router.push(`${pathname}?feedback=success`)
    }
  })

  return (
    <>
      <Feedback
        feedbackContainer="!pt-[42px] sm:!pt-[60px]"
        smilesContainer="!mt-[2px] sm:!mt-[20px]"
        setRating={setRating}
        setQuestionID={setQuestionID}
        setFeedback={setFeedback}
        questionID={questionID}
        feedback={feedback}
        rating={rating}
        questionData={questionData}
        setReview={setReview}
        review={review}
        setFeedbackImage={setFeedbackImage}
        feedbackImage={feedbackImage}
        setImages={setImages}
        images={images}
      />
      <Rating ratingContainer="!mt-[32px] sm:!mt-[40px] !bg-[#EDF1F8]"
        activedRating={activedRating}
        setactivedRating={setactivedRating}
      />
      <Comment
        commentContainer="!mt-[32px] sm:!mt-[40px]"
        buttonStyleCss="!mt-[42px] sm:!mt-[60px] !bg-[#59C3FF]"
        text={text}
        setText={setText}
        feedback={feedback}
        username={username}
        roomId={roomId}
        tableId={tableId}
        hotelRestUsername={hotelRestUsername}
        activedRating={activedRating}
        sendFeedback={sendFeedback}
        images={images}
      />
    </>
  )
}

export default RestaurantDetails
