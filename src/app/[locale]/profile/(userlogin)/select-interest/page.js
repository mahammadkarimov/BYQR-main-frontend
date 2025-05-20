'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './selectinterest.module.css'

import back from '../../../../../assets/icons/Profile/back.svg'
import interestImg from '../../../../../assets/icons/Profile/interestImg.svg'
import ProfileRedBtn from '@/components/Profile/UserLogin/ProfileRedBtn/ProfileRedBtn'
import trueIcon from '../../../../../assets/icons/Profile/true.svg'
import { current } from '@reduxjs/toolkit'

const userInterest = [
    {
        id: 1,
        interest: "Discovery Recipes"
    },
    {
        id: 2,
        interest: "Vegetarian"
    },
    {
        id: 3,
        interest: "Vegan"
    },
    {
        id: 4,
        interest: "Gluten"
    },
    {
        id: 5,
        interest: "Nut Free"
    },
]

const page = () => {
    const [activeInterest, setActiveInterest] = useState([])
    const [isActiveContinue, setIsActiveContinue] = useState(false)

    const handleActiveInterest = (currentInterest) => {
        if (activeInterest.includes(currentInterest)) {
            setActiveInterest(prevSelectedElements =>
                prevSelectedElements.filter(element => element !== currentInterest)
            );
        } else {
            setActiveInterest(prevSelectedElements => [...prevSelectedElements, currentInterest])
        }
    }

    useEffect(() => {
        if (activeInterest.length > 2) {
            setIsActiveContinue(true)
        } else {
            setIsActiveContinue(false)
        }
    }, [activeInterest])

    return (
        <>
            <section>
                <header>
                    <div className='mx-4 mt-4 mb-[58px] flex items-center'>
                        <button className='mr-5'>
                            <Image src={back} alt='back-btn' />
                        </button>
                        <h2 className={styles.header}>Select Interest</h2>
                    </div>
                </header>
                <main>
                    <div>
                        <div className={styles.interestContainer}>
                            {userInterest.map((int) => (
                                <button key={int.id} onClick={() => handleActiveInterest(int.interest)} className={!activeInterest.includes(int.interest) ? styles.interestCard : styles.activeInterestCard}>
                                    <div className='relative'>
                                        <Image src={interestImg} alt='interest-image' />
                                        {activeInterest.includes(int.interest) &&
                                            <div>
                                                <div className={styles.overlay}></div>
                                                <Image className='absolute top-[18px] left-[18px]' src={trueIcon} alt='true-icon' />
                                            </div>
                                        }
                                    </div>
                                    {int.interest}
                                </button>
                            ))}
                        </div>
                        <div className='mx-3 w-[89%] absolute bottom-4'>
                            <ProfileRedBtn text="Continue" isActive={isActiveContinue} />
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default page