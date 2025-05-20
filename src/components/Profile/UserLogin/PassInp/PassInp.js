import React from 'react'
import styles from './passinp.module.css'

import pass from '../../../../assets/icons/UserLogin/pass.svg'
import hidden from '../../../../assets/icons/UserLogin/hidden.svg'
import Image from 'next/image'

const PassInp = (props) => {

    const {text} = props

    return (
        <>
            <div className={styles.emailInp}>
                <Image src={pass} className={styles.mailIcon} alt='email' loading='eager' />
                <input type="password" placeholder={text} />
                <Image src={hidden} className={styles.hiddenIcon} alt='hidden-icon' />
            </div>
        </>
    )
}

export default PassInp