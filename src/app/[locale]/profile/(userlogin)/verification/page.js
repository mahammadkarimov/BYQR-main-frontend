import ProfileRedBtn from '@/components/Profile/UserLogin/ProfileRedBtn/ProfileRedBtn'
import React from 'react'
import styles from './verification.module.css'

const page = () => {
  return (
    <>
      <section className='mx-4 mb-4 mt-12'>
        <div className={styles.header}>
          <h2>Verification Code</h2>
          <span>Please enter the verification code that we have sent to your email</span>
        </div>
        <div className='mb-20'>
          <div className='flex gap-3 justify-center'>
            <input className={styles.verifyInp} minLength='1' maxLength='1' type="text" />
            <input className={styles.verifyInp} minLength='1' maxLength='1' type="text" />
            <input className={styles.verifyInp} minLength='1' maxLength='1' type="text" />
            <input className={styles.verifyInp} minLength='1' maxLength='1' type="text" />
          </div>
          <div className='flex justify-center mt-6'>
            <button className={styles.resendCode}>Resend Code</button>
          </div>
        </div>
        <div>
          <ProfileRedBtn text='Continue' />
        </div>
      </section>
    </>
  )
}

export default page