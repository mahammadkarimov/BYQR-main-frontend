import Image from 'next/image'
import React from 'react'
import styles from './loginsocial.module.css'

import apple from '../../../../assets/icons/UserLogin/apple.svg'
import google from '../../../../assets/icons/UserLogin/google.svg'
import facebook from '../../../../assets/icons/UserLogin/facebook.svg'
import twitter from '../../../../assets/icons/UserLogin/twitter.svg'

const LoginSocial = () => {
    return (
        <>
            <div className='flex gap-6 justify-center'>
                <button className={styles.socialLoginBtn}>
                    <Image src={apple} alt='apple-icon' loading='eager' />
                </button>
                <button className={styles.socialLoginBtn}>
                    <Image src={google} alt='apple-icon' loading='eager' />
                </button>
                <button className={styles.socialLoginBtn}>
                    <Image src={facebook} alt='apple-icon' loading='eager' />
                </button>
                <button className={styles.socialLoginBtn}>
                    <Image src={twitter} alt='apple-icon' loading='eager' />
                </button>
            </div>
        </>
    )
}

export default LoginSocial