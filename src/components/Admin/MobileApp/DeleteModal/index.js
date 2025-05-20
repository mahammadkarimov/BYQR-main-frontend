import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import delWarning from '../../../../assets/images/Admin/adminModal/delWarning.svg'
import closeDel from '../../../../assets/images/Admin/adminModal/closeDel.svg'

const index = ({ router, searchParams, deleteEvent }) => {


    return (
        <>
            {searchParams.get('deleteModal') &&
                <div className={styles.modalBg}>
                    <div className={styles.modalContainer}>
                        <div>
                            <Image src={delWarning} alt='delete-warning' />
                            <span>Are you sure want to delete this event?</span>
                            <div>
                                <button onClick={() => deleteEvent(searchParams.get('eventId'))}>Yes, I’m sure</button>
                                <button onClick={() => router.back()}>No, cancel</button>
                            </div>
                        </div>
                        <div onClick={() => router.back()} className='cursor-pointer'>
                            <Image src={closeDel} alt='close' />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default index