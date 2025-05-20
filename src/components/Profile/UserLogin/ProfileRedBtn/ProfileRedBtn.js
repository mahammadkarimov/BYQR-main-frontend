import React from 'react'
import styles from './profileredbtn.module.css'

const ProfileRedBtn = ({text, isActive}) => {
    
    return (
        <>
            <button className={isActive ? styles.redBtn : styles.deactiveBtn}>{text}</button>
        </>
    )
}

export default ProfileRedBtn