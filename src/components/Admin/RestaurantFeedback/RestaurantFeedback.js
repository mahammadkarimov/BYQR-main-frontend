'use client'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../QuestionFeedback/QuestionFeedback.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import questionTab from '../../../assets/icons/Admin/mainAdmin/questionTab.svg'
import arrowDownLine from '../../../assets/icons/Admin/mainAdmin/arrowDownLine.svg'
import star from '../../../assets/icons/Feedback/Star.svg'
import eyeOpen from '../../../assets/icons/Admin/mainAdmin/eyeOpen.svg'
import eyeClose from '../../../assets/icons/Admin/mainAdmin/eyeClose.svg'

const inter = Inter({
    weight: ['300', '400', '500', '600', '700', '800'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

const QuestionFeedback = ({ children }) => {
    const [isOpen, setIsOpen] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [tooltip, setTooltip] = useState(false)
    const [feedbackState, setFeedbackState] = useState(['Çox pis', 'Pis', 'Orta', 'Yaxşı', 'Əla'])
    const feedbackColor = ['#F15757', '#F19857', '#FFDC61', '#57C3F1', '#35C53B']
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
                <h1>Ofisinatların xidmətinin dəyərləndirilməsi</h1>
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
                        <h5>ID</h5>
                    </th>
                    <th>
                        <h5>Masa nömrəsi</h5>
                    </th>
                    <th>
                        <h5>Feedback tarixi</h5>
                    </th>
                    <th>
                        <h5>Feedback nəticəsi</h5>
                    </th>
                </tr>
                {children?.data?.results?.map((feedback, i) => (
                    <tr key={feedback.id} className={styles.tab}>
                        <td>
                            <h1>{feedback.get_waiter_id}</h1>
                        </td>
                        <td>
                            <h1>{feedback.table}</h1>
                        </td>
                        <td>
                            <h1>{feedback.created_at}</h1>
                        </td>
                        <td>
                            <div className={`${styles.feedbackResult} `}>
                                {[...Array(feedback.rate)].map((_, i) => {
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
        </div >
    )
}

export default QuestionFeedback
