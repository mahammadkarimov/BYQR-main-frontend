import React from 'react'
import styles from './textinp.module.css'

import user from '../../../../assets/icons/UserLogin/user.svg'
import Image from 'next/image'

const TextInp = (props) => {

    const {text} = props

    return (
        <>
            <div className={styles.emailInp}>
                <Image src={user} className={styles.mailIcon} alt='user-icon' loading='eager' />
                <input type="text" placeholder={text} />
            </div>
        </>
    )
}

export default TextInp