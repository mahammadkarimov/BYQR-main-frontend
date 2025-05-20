'use client'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './QuestionFeedback.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import questionTab from '../../../assets/icons/Admin/mainAdmin/questionTab.svg'
import arrowDownLine from '../../../assets/icons/Admin/mainAdmin/arrowDownLine.svg'
import star from '../../../assets/icons/Feedback/Star.svg'
import zoom from '../../../assets/icons/Feedback/zoom.svg'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getFeedbackDetail } from '@/services/api/dataApi'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const QuestionFeedback = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [data, setData] = useState({})
  const [isOpen, setIsOpen] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [tooltip, setTooltip] = useState(false)
  const [feedbackState, setFeedbackState] = useState(['Çox pis', 'Pis', 'Orta', 'Yaxşı', 'Əla'])
  const feedbackColor = ['#F15757', '#F19857', '#FFDC61', '#57C3F1', '#35C53B']

  useEffect(() => {
    const feedbackId = searchParams.get('feedbackId')
    const getFeedback = async () => {
      if (feedbackId) {
        console.log('test')
        const data = await getFeedbackDetail(feedbackId)
        console.log(data)
        setData(data)
      }
    }
    getFeedback()
    return () => {
      getFeedback()
    }
  }, [searchParams.get('feedbackId')])

  const handleToggle = (id) => {
    setToggle(!toggle)
    setIsOpen(id)
  }

  return (
    <div className={styles.container}>
      <div
        onClick={() => handleToggle('first-tab')}
        className={`${styles.questionTab} ${(isOpen === 'first-tab' && toggle) && styles.selectedFeedback}`}
      >
        <h1>Ümumi rəy və reytinq</h1>
        <div className={styles.tabRight}>
          <Image
            src={questionTab}
            loading="lazy"
            width={24}
            height={24}
            alt="search"
            className="pointer-events-none select-none"
          />
          <Image
            src={arrowDownLine}
            loading="lazy"
            width={24}
            height={24}
            alt="search"
            className={`transition duration-300 ease-in-out select-none ${(isOpen === 'first-tab' && toggle) && 'rotate-180'
              }`}
          />
        </div>
      </div>
      <table
        className={`${styles.questionDropdown} ${(isOpen === 'first-tab' && toggle) ? styles.selectedTab : 'hidden'
          }`}
      >
        <tr
          className={`${styles.titleTable} ${(isOpen === 'first-tab' && toggle) && styles.selectedTitle}`}
        >
          <th>
            <h5>Sıralama</h5>
          </th>
          <th>
            <h5>Otaq nömrəsi</h5>
          </th>
          <th>
            <h5>Feedback tarixi</h5>
          </th>
          <th>
            <h5>Verilən rəy</h5>
          </th>
          <th>
            <h5>Verilən reytinq</h5>
          </th>
        </tr>
        {children[0]?.data?.results?.map((feedback, i) => (
          <tr key={feedback.id} className={styles.tab}>
            <td>
              <h1>{i + 1}</h1>
            </td>
            <td>
              <h1>{feedback.instance}</h1>
            </td>
            <td>
              <h1>{feedback.created_at}</h1>
            </td>
            <td className={styles.feedbackDesc}>
              <span onMouseLeave={() => setTooltip('')} onMouseEnter={() => setTooltip(feedback.id)}>
                {feedback?.description?.length > 25
                  ? feedback.description.slice(
                    0,
                    25
                  ) + '...'
                  : feedback.description}
              </span>
              <span onMouseLeave={() => setTooltip('')} onMouseEnter={() => setTooltip(feedback.id)} id="tooltip-light" role="tooltip" className={`absolute z-10  px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm left-1/3 top-1/3 -translate-x-1/3 -translate-y-1/3 ${tooltip === feedback.id ? 'visible' : 'hidden'} `}>{feedback.description}</span>
            </td>
            <td>
              <div className={`${styles.feedbackResult} `}>
                {[...Array(feedback.overall_rating)].map((_, i) => {
                  return (
                    <Image
                      className='object-cover cursor-pointer !filter-none'
                      alt="star"
                      src={star}
                      width={20}
                      height={20}
                    />
                  )
                })}
              </div>
            </td>
          </tr>
        ))}
      </table>
      {children[1]?.data?.results?.map((question) => (
        <>
          <div
            key={question.id}
            onClick={() => handleToggle(question.id)}
            className={`${styles.questionTab} ${(isOpen === question.id && toggle) && styles.selectedFeedback}`}
          >
            <h1>{question.question_az}</h1>
            <div className={styles.tabRight}>
              <Image
                src={questionTab}
                loading="lazy"
                width={24}
                height={24}
                alt="search"
                className="pointer-events-none select-none"
              />
              <Image
                src={arrowDownLine}
                loading="lazy"
                width={24}
                height={24}
                alt="search"
                className={`transition duration-300 ease-in-out select-none ${(isOpen === question.id && toggle) && 'rotate-180'
                  }`}
              />
            </div>
          </div>
          <table
            className={`${styles.questionDropdown} ${(isOpen === question.id && toggle) ? styles.selectedTab : 'hidden'
              }`}
          >
            <tr
              className={`${styles.titleTable} ${(isOpen === question.id && toggle) && styles.selectedTitle}`}
            >
              <th>
                <h5>Sıralama</h5>
              </th>
              <th>
                <h5>Otaq nömrəsi</h5>
              </th>
              <th>
                <h5>Feedback tarixi</h5>
              </th>
              <th>
                <h5>Feedback nəticəsi</h5>
              </th>
              <th>
                <h5>Rəyin Detalı</h5>
              </th>
            </tr>
            {question?.feedbacks?.map((feedback, i) => (
              <tr className={styles.tab}>
                <td>
                  <h1>{i + 1}</h1>
                </td>
                <td>
                  <h1>{feedback.instance}</h1>
                </td>
                <td>
                  <h1>{feedback.created_at}</h1>
                </td>
                <td>
                  <div className={`${styles.feedbackResult}`} style={{ backgroundColor: `${feedbackColor[feedback.rating - 1]}` }}>
                    <h4>{feedbackState[feedback?.rating - 1]}</h4>
                  </div>
                </td>
                {(feedback?.rating == 1 || feedback?.rating == 2) ?
                  <td onClick={() => router.push(`${pathname}?feedbackId=${feedback.id}`)}>
                    <div className={styles.detailFeedback}>
                      <span>Rəyin detalını gör <div>...</div></span>
                    </div>
                  </td>
                  : <div className={styles.detailFeedback}>
                    -
                  </div>
                }
              </tr>
            ))}
          </table >
        </>
      ))
      }
      {
        searchParams.get('feedbackId') &&
        <div className={styles.detailFeedbackModal}>
          <div>
            <div>
              <h4>Rəyin detalları</h4>
              <button onClick={() => router.back()}>+</button>
            </div>
            <div>
              <div>
                <span>Şəkil</span>
                <div className='!relative w-[120px]'>
                  <Image className={styles.feedbackImage} src={data?.data?.image} width={120} height={120} alt='feedback-detail-image' />
                  <Image className={styles.zoom} src={zoom} alt='zoom' />
                </div>
              </div>
              <div>
                <h5>Rəy</h5>
                <span>{data?.data?.review}</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default QuestionFeedback
