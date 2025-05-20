import React from 'react'
import ProfileHomeCard from '../ProfileHomeCard/ProfileHomeCard'
import styles from './profilemaincourse.module.css'

const ProfileMainCourse = () => {
    return (
        <>
            <section className='mx-4'>
                <div className={styles.mainCourse}>
                    <h3>Main Course</h3>
                    <button>See All</button>
                </div>
                <div className={styles['category-area']}>
                    <ProfileHomeCard />
                </div>
            </section>
        </>
    )
}

export default ProfileMainCourse