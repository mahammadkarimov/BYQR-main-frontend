import Image from 'next/image'
import React from 'react'
import feedback from '../../../../assets/icons/Home/feedback.svg'
import info from '../../../../assets/icons/Home/info.svg'
import styles from './style.module.css'
import Link from 'next/link'

const RestaurantFourthArea = ({router, packageName, pathname, t, allData }) => {
    return (
        <div className='py-14px'>
            {(packageName === 'gold' || packageName === 'gold+' || packageName === 'diamond') &&
                <Link href={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}/feedback`} className={styles.customBtn}>
                    <Image src={feedback} alt='feedback' />
                    <span>{t('Give feedback')}</span>
                </Link>
            }
            <div className={styles.customBtn} onClick={() => router.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}?infomodal=true`)}>
                <Image src={info} alt='info' />
                <span>{t('Info')}</span>
            </div>
        </div>
    )
}

export default RestaurantFourthArea