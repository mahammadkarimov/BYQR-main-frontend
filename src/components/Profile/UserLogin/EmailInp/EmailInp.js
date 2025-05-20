import React from 'react'
import Image from 'next/image'
import styles from './emailinp.module.css'

import mail from '../../../../assets/icons/UserLogin/mail.svg'

const EmailInp = (props) => {

    const {text} = props

    return (
        <>
            <div className={styles.emailInp}>
                <Image src={mail} className={styles.mailIcon} alt='email' loading='eager' />
                <input type="email" placeholder={text} />
            </div>
        </>
    )
}

export default EmailInp