import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handlePayment } from '@/redux/features/makePaymentSlice'
import { useTranslations } from 'use-intl'
import styles from './makepayment.module.css'
import Image from 'next/image'
import payment from '../../../assets/icons/Home/payment.png'
import { useTransform, motion, useScroll } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const MakePayment = () => {
  const { scrollY } = useScroll()
  const isMaxH600 = useMediaQuery({ maxHeight: 600 })

  const width = useTransform(scrollY, [0, 300], ['33.3%', '0%']);
  const height = useTransform(scrollY, [0, 300], [68, 0])
  const heightIcon = useTransform(scrollY, [0, 300], [35, 0])
  const heightIconY600 = useTransform(scrollY, [0, 300], [28, 0])
  const opacity = useTransform(scrollY, [0, 150], [1, 0])

  const t = useTranslations('Home')
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(handlePayment(true))
  }

  return (
    <>
      <motion.button
        onClick={() => handleClick()}
        className={`${styles.serviceCard}`}
        style={{ width, height, opacity }}
      >
        <motion.div style={{ height: isMaxH600 ? heightIconY600 : heightIcon }}>
          <Image src={payment} width={30} height={30} alt="payment" />
        </motion.div>
        <p className={styles.makePaymentText}>{t('Make Payment')}</p>
      </motion.button>
    </>
  )
}

export default MakePayment
