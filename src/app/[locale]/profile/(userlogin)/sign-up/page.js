import EmailInp from '@/components/Profile/UserLogin/EmailInp/EmailInp'
import LoginSocial from '@/components/Profile/UserLogin/LoginSocial/LoginSocial'
import PassInp from '@/components/Profile/UserLogin/PassInp/PassInp'
import ProfileRedBtn from '@/components/Profile/UserLogin/ProfileRedBtn/ProfileRedBtn'
import TextInp from '@/components/Profile/UserLogin/TextInp/TextInp'
import React from 'react'
import styles from './signup.module.css'

const page = () => {
  return (
    <>
      <section className='mx-5 mb-4 mt-12'>
        <div className={styles.header}>
          <h2>Sign Up</h2>
          <span>Please fill out the form below!</span>
        </div>
        <div className='mb-6'>
          <div className='mb-4'>
            <form className={styles.formContainer}>
              <div className='flex flex-col gap-4'>
                <TextInp text="user"/>
                <EmailInp text="email"/>
                <PassInp text="Type Your password"/>
              </div>
            </form>
            <button className={styles.forgotPass}>Forgot Password?</button>
          </div>
          <ProfileRedBtn text='Sign Up' />
        </div>
        <div className='flex items-center justify-center mb-6'>
          <div className={styles.line}></div>
          <span className={styles.orSign} style={{ width: '400px', padding: '0 16px' }}>Or sign up with</span>
          <div className={styles.line}></div>
        </div>
        <div>
          <div className='mb-5'>
            <LoginSocial />
          </div>
          <div className={styles.haveAccount}>
            <span>Have an account?</span>
            <button>Sign In</button>
          </div>
        </div>
        <div className={styles.terms}>
          <span>By using our services you are agreeing to our <span className={styles.redTerm}>Terms</span> and <span className={styles.redTerm}>Privacy Policy</span></span>
        </div>
      </section>
    </>
  )
}

export default page