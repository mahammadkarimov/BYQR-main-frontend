import Image from 'next/image'
import React from 'react'
import calorieImg from '../../../assets/icons/Home/calorie.svg'
import styles from './calorie.module.css'

const Calorie = ({calorie}) => {
    return (
        <div className={styles.calorieBg}>
            <div className='flex gap-0.5 items-center'>
                <div>
                    <Image src={calorieImg} alt='calorie' />
                </div>
                <div className={styles.calorieText}>
                    <span>{calorie}</span>
                    <span>kal</span>
                </div>
            </div>
        </div>
    )
}

export default Calorie