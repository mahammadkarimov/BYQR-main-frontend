import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import leftArr from '../../../../../assets/icons/Admin/mainAdmin/leftArr.svg'
import rightArr from '../../../../../assets/icons/Admin/mainAdmin/rightArr.svg'

const index = ({ pageCount, router, pathname, searchParams }) => {
    return (
        <div className={styles.container}>
            {/* <button>
                <Image src={leftArr} alt='left-arrow' />
            </button> */}
            {pageCount && [...Array(pageCount)]?.map((_, index) => (
                <span onClick={() => router.push(`${pathname}?page=${index + 1}&offset=${index === 0 ? 0 : index * 5}`)} className={(index + 1) === +searchParams.get('page') ? styles.active : ''}>{index + 1}</span>
            ))}
            {/* <button>
                <Image src={rightArr} alt='right-arrow' />
            </button> */}
        </div>
    )
}

export default index