import React from 'react'
import alert from '../../../../assets/icons/Admin/mainAdmin/alert.svg'
import Image from 'next/image'
import styles from './style.module.css'

const index = ({ router, delExhibit, museumId, searchParams }) => {
  const id = +searchParams.get('exhibitId')
  const ids = { museumId, id }
  console.log(ids)
  return (
    <div
      className={styles.bg}
      id='bg'
      onClick={e => {
        if (e.target.id !== 'container' && e.target.id === 'bg') router.back()
      }}
    >
      <div className={styles.container} id='container'>
        <Image src={alert} alt='alert' />
        <span>Are you sure want to delete this exhibit?</span>
        <div>
          <button onClick={() => delExhibit(ids)}>Yes, I'm sure</button>
          <button onClick={() => router.back()}>No, cancel</button>
        </div>
      </div>
    </div>
  )
}

export default index
