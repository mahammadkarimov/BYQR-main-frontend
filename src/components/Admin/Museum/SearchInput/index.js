import React from 'react'
import styles from './style.module.css'
import search from '../../../../assets/icons/Admin/mainAdmin/search.svg'
import Image from 'next/image'

const index = ({setSearchedVal}) => {
    return (
        <div className={styles.input}>
            <Image src={search} alt='search' />
            <input type="search" onChange={(e) => setSearchedVal(e.target.value)} placeholder='Axtarış' />
        </div>
    )
}

export default index