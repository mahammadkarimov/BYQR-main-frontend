import React from 'react'
import backArr from '../../../assets/icons/Home/backArr.svg'
import Image from 'next/image'
import styles from './style.module.css'

const index = ({ allData, router, pathname }) => {
  return (
    <div className='mx-4 my-4'>
      <div className={styles.backArr} onClick={() => router.back()}>
        <Image src={backArr} alt='back-arrow' />
      </div>
      <div
        className={
          allData?.data?.username === 'chaikend'
            ? styles.container2
            : allData?.data?.username === 'obaoschuman'
            ? styles.container3
            : styles.container
        }
      >
        {allData?.data?.categories?.map(
          category =>
            category?.is_active && (
              <div
                key={category?.id}
                onClick={() =>
                  (window.location.href = `/${pathname.split('/')[1]}/${
                    pathname.split('/')[2]
                  }/menu#${category?.id}`)
                }
              >
                <Image
                  src={category?.icon}
                  width={600}
                  height={600}
                  alt='category-icon'
                />
                <span>{category?.name}</span>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default index
