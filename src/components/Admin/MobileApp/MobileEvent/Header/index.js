import React from 'react'
import styles from './style.module.css'

const index = ({ router, pathname }) => {
  return (
    <div className={styles.head}>
      <h2>Event</h2>
      <button onClick={() => router.push(`${pathname}/add-event`)}>Create Event</button>
    </div>
  )
}

export default index