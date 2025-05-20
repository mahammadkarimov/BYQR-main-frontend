'use client'
import { Modal } from 'react-bootstrap'
import styles2 from '../../../app/[locale]/admin/products/products.module.css'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import closeBtn from '../../../assets/images/Admin/adminModal/close.svg'
import warning from '../../../assets/images/Admin/adminModal/warning.svg'
import { GridLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './FilterFeedback.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  GetHotelCustomerServices,
  GetHotelServices,
  HotelCustomerServiceDelete,
  HotelServiceDelete,
} from '@/services/api/dataApi'
import filterIcon from '../../../assets/icons/Admin/mainAdmin/filterIcon.svg'
import search from '../../../assets/icons/Admin/mainAdmin/search.svg'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const FeedbackTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className={styles.container}>
      <div className={styles.rightFilter}>
        <button className={!searchParams.get('filter') && styles.selectedBtn} onClick={() => router.push('?')}>Bütün nəticələr</button>
        <button className={searchParams.get('filter') === 'month' && styles.selectedBtn} onClick={() => router.push('?filter=month')}>Aylıq</button>
        <button className={searchParams.get('filter') === 'week' && styles.selectedBtn} onClick={() => router.push('?filter=week')}>Həftəlik</button>
        <button className={searchParams.get('filter') === 'today' && styles.selectedBtn} onClick={() => router.push('?filter=today')}>Günlük</button>
      </div>
      {/* <div className={styles.leftFilter}>
        <div className={styles.leftInput}>
          <Image
            src={search}
            loading="lazy"
            width={20}
            height={20}
            alt="search"
          />
          <input placeholder="Axtarış" />
        </div>
        <div className={styles.leftFilterImg}>
          <Image
            src={filterIcon}
            className="w-full h-full object-cover"
            loading="lazy"
            width={24}
            height={24}
            alt="filter"
          />
        </div>
      </div> */}
    </div>
  )
}

export default FeedbackTable
