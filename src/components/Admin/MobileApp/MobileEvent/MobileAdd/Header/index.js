import React from 'react'
import styles from './style.module.css'

const index = ({searchParams}) => {
    return (
        <div className={styles.container}>
            <div className={!searchParams.get('step2') && styles.active}>1</div>
            <span></span>
            <div className={searchParams.get('step2') && styles.active}>2</div>
        </div>
    )
}

export default index