'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import union from '../../../assets/icons/Feedback/Union.svg'
import smileA from '../../../assets/icons/Feedback/feedbackSmiles/smileA.gif'
import smileB from '../../../assets/icons/Feedback/feedbackSmiles/smileB.gif'
import smileC from '../../../assets/icons/Feedback/feedbackSmiles/smileC.gif'
import smileD from '../../../assets/icons/Feedback/feedbackSmiles/smileD.gif'
import smileF from '../../../assets/icons/Feedback/feedbackSmiles/smileF.gif'
import attachment from '../../../assets/icons/Feedback/attachment.svg'
import leftArrow from '../../../assets/icons/Home/leftArrow.svg'
import styles from './Feedback.module.css'
import { Inter } from 'next/font/google'
import { handleActiveFeedback } from '@/redux/features/feedbackSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

const Feedback = (props) => {
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState({}); // Her input için farklı dosyaları saklamak için state
  const { feedbackContainer, setImages, images, smilesContainer, setQuestionID, review, setReview, feedbackImage, setFeedbackImage, setFeedback, setRating, questionID, rating, feedback, questionData } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const refs = useRef({})
  const refsFile = useRef({})
  const [refValue, setRefValue] = useState("");

  const handleRefChange = () => {
    const value = refs.current[questionID + rating]?.value || "";
    setRefValue(value);
  };

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleFileChange = async (questionId, ratingId) => {
    const file = refsFile.current[questionId + ratingId]?.files[0] || ""; // İlgili input'taki dosyayı al
    if (file) {
      setFileData(file)
      document.querySelector(`.fileName${questionId + "" + ratingId}`).innerText = file.name
      setFileName(file.name)
    }

  }

  useEffect(() => {
    const handleRefChange = async () => {
      const lastFeedback = [...feedback];
      const existingQuestionIndex = lastFeedback.findIndex(
        (item) => item.question === questionID
      );
      const base64Image = fileData ? await toBase64(fileData) : null;
      if (questionID && rating) {
        if (existingQuestionIndex > -1) {
          lastFeedback[existingQuestionIndex] = {
            question: questionID,
            rating: rating,
            review: rating == 1 || rating == 2 ? refValue : '',
            image: (rating == 1 || rating == 2) && base64Image ? base64Image : null,
          };
          setFeedback(lastFeedback);
        } else {
          setFeedback((prevItems) => [
            ...prevItems,
            {
              question: questionID,
              rating: rating,
              review: rating == 1 || rating == 2 ? refValue : '',
              image: (rating == 1 || rating == 2) && base64Image ? base64Image : null,
            },
          ]);
        }
      }
    };

    handleRefChange();
  }, [questionID, rating, refValue, fileData]);

  const handleQuestionModal = (questionId, ratingId) => {
    setRating(ratingId)
    setQuestionID(questionId)

    if (ratingId === 1) {
      document.querySelector(`#descArea1${questionId}`).style.display = 'block'
      document.querySelector(`#descArea2${questionId}`).style.display = 'none'
    } else if (ratingId === 2) {
      document.querySelector(`#descArea1${questionId}`).style.display = 'none'
      document.querySelector(`#descArea2${questionId}`).style.display = 'block'
    } else {
      document.querySelector(`#descArea1${questionId}`).style.display = 'none'
      document.querySelector(`#descArea2${questionId}`).style.display = 'none'
    }
  }

  const handleFeedback = (e) => {
    const questionId = +e.target.parentElement.parentElement.parentElement.id
    if (questionId !== 0) {
      const questionSmiles = document.querySelectorAll(`.smile${questionId}`)
      questionSmiles.forEach((smile) => {
        smile.children[0].style.transform = 'scale(1)'
        smile.children[0].style.filter = 'grayscale(100%)'
        smile.children[0].style.background = "#F7DDB4";
      })
      if (e.target.tagName === 'IMG') {
        e.target.style.transform = 'scale(1.4)'

      }
      e.target.style.filter = 'grayscale(0%)'
    }
  }
  console.log(feedback)
  return (
    <div
      onClick={handleFeedback}
      className={`flex flex-col gap-10 items-center h-auto ${styles.feedbackContainer} ${feedbackContainer} ${inter.className}`}
    >
      <div className='absolute left-4 top-4' onClick={() => router.back()}>
        <Image src={leftArrow} alt='left-arrow' />
      </div>
      {
        questionData?.data?.results?.map((question, i) => (
          <div key={question.id} id={question.id} className='flex flex-col items-center w-full'>
            <div
              className={`p-4 flex mt-4 justify-left items-center ${styles.titlePlace}`}
            >
              <h1 onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }} className='!text-xl text-left'>{i + 1}. {question.question}</h1>
            </div>
            <ul
              className={`flex justify-between items-center w-9/12 ${smilesContainer}`}
            >
              <li id='1' className={`relative flex flex-col items-center smile${question.id}`}>
                <Image
                  onClick={() => handleQuestionModal(question.id, 1)}
                  alt="smileF"
                  data-id={question.id}
                  data-questionID={question.id}
                  id={`activeFeedback1${question.id}`}
                  src={smileF}
                  className='grayscale transition duration-300 ease-in-out mb-3 w-8 p-[2.4px] border border-[#EFEFEF] rounded-full'
                />
                <span onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }} className={styles.smileText}>Terrible</span>
                <div id={`descArea1${question?.id}`} onClick={(e) => e.stopPropagation()}
                  className={styles.feedbackDescModal}>
                  <textarea name="feedbackDesc" ref={(el) => {
                    refs.current[question?.id + 1] = el
                    if (el) el.addEventListener("input", handleRefChange);
                  }} id="feedbackDesc" placeholder='Please specify the reason for your dissatisfaction and what aspects you dislike, or attach a screenshot for reference.'></textarea>
                  <div>
                    <input onChange={() => handleFileChange(question?.id, 1)} ref={(el) => refsFile.current[question?.id + 1] = el} className='feedbackFile' accept="image/*" type="file" />
                    <Image width={20} height={20} src={attachment} alt="attachment" />
                    <span className={`fileName${question?.id + "1"}`}>Attached-file-name.jpg</span>
                  </div>
                </div>
              </li>
              <li id='2' className={`relative flex flex-col items-center smile${question.id}`}>
                <Image
                  alt="smileD"
                  onClick={() => handleQuestionModal(question.id, 2)}
                  data-id={2}
                  id={`activeFeedback2${question.id}`}
                  src={smileD}
                  className='grayscale transition duration-300 ease-in-out mb-3 w-8 p-[2.4px] border border-[#EFEFEF] rounded-full'
                />
                <span onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }} className={styles.smileText}>Bad</span>
                <div id={`descArea2${question?.id}`} onClick={(e) => e.stopPropagation()} className={styles.feedbackDescModal}>
                  <textarea name="feedbackDesc" ref={(el) => {
                    refs.current[question?.id + 2] = el
                    if (el) el.addEventListener("input", handleRefChange);
                  }} id="feedbackDesc2" placeholder='Please specify the reason for your dissatisfaction and what aspects you dislike, or attach a screenshot for reference.'></textarea>
                  <div>
                    <input className='feedbackFile' onChange={() => handleFileChange(question?.id, 2)} ref={(el) => refsFile.current[question?.id + 2] = el} accept="image/*" type="file" />
                    <Image width={20} height={20} src={attachment} alt="attachment" />
                    <span className={`fileName${question?.id + "2"}`}>Attached-file-name.jpg</span>
                  </div>
                </div>
              </li>
              <li id='3' className={`flex flex-col items-center smile${question.id}`}>
                <Image
                  alt="smileC"
                  onClick={() => handleQuestionModal(question.id, 3)}
                  data-id={3}
                  id={`activeFeedback3${question.id}`}
                  src={smileC}
                  className='grayscale transition duration-300 ease-in-out w-8 mb-3 p-[2.4px] border border-[#EFEFEF] rounded-full'
                />
                <span onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }} className={styles.smileText}>OK</span>
              </li>
              <li id='4' className={`flex flex-col items-center smile${question.id}`}>
                <Image
                  alt="smileB"
                  onClick={() => handleQuestionModal(question.id, 4)}
                  data-id={4}
                  id={`activeFeedback4${question.id}`}
                  src={smileB}
                  className='grayscale transition duration-300 ease-in-out w-8 mb-3 p-[2.4px] border border-[#EFEFEF] rounded-full' style={{ transform: 'scale(1)' }}
                />
                <span onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }} className={styles.smileText}>Good</span>
                <div
                  id={`activeFeedbackText4${question.id}`}
                  className='!mt-10 opacity-0 hidden'
                >
                  <Image className={styles.unionImg} src={union} alt="union" />
                  <p className="rounded-full">Measdsadsaddium</p>
                </div>
              </li>
              <li id='5' className={`flex flex-col items-center smile${question.id}`}>
                <Image
                  alt="smileA"
                  onClick={() => handleQuestionModal(question.id, 5)}
                  data-id={5}
                  id={`activeFeedback5${question.id}`}
                  src={smileA}
                  className='grayscale transition duration-300 ease-in-out w-8 mb-3 p-[2.4px] border border-[#EFEFEF] rounded-full'
                />
                <span onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }} className={styles.smileText}>Amazing</span>
              </li>
            </ul>
          </div>
        ))
      }
    </div >
  )
}

export default Feedback
