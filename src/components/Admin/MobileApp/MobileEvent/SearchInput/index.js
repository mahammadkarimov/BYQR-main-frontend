import React from 'react'
import styles from './style.module.css'

const index = ({setSearchEvent}) => {
  return (
    <div className={styles.searchArea}>
        <input onChange={(e) => setSearchEvent((e.target.value).toLowerCase().trim())} type="search" placeholder='Search events' />
    </div>
  )
}

export default index