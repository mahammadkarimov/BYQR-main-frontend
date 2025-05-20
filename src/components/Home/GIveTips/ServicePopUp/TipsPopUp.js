'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Sheet from 'react-modal-sheet'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import waiter from '../../../../assets/icons/Home/waiterExample.png'
import star from '../../../../assets/icons/Feedback/Star.svg'
import card from '../../../../assets/icons/Home/card.svg'
import { useMutation } from 'react-query'
import { sendTipToWaiter } from '@/services/api/dataApi'
import styles from './servicePopUp.module.css'
import { useRouter } from 'next/navigation'
import Payment from '../../../Home/Payment/index'
import Payment2 from '../../../Home/Payment2/index'

const TipsPopUp = ({ waiterInfo, isActiveTips, setIsActiveTips }) => {
  const [activedRating, setactivedRating] = useState(0)
  const t = useTranslations('Home')
  const router = useRouter()
  const [isActiveTip, setIsActiveTip] = useState(null)
  const [iframeSrc, setIframeSrc] = useState('')

  const { mutate: sendTip } = useMutation(data => sendTipToWaiter(data), {
    onSuccess: data => {
      const { redirect_url } = data.data
      router.push(redirect_url)
    },
    onError: err => {
      console.log(err)
    }
  })

  const closeModal = () => {
    setIsActiveTips(false)
  }

  const handleTipClick = value => {
    setIsActiveTip(value)
  }

  const handleActiveRatingClick = ratingId => {
    setactivedRating(ratingId)
  }

  useEffect(() => {
    if (isActiveTips) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isActiveTips])

  const handleSendTipToWaiter = () => {
    if (isActiveTip < 1) {
      setIsActiveTip(0)
    }
    const waiter_id = waiterInfo?.data?.current_waiter?.waiter_id
    const table_id = Cookies.get('table_id')
    const waiterInfos = {
      table_id: table_id,
      waiter_id: waiter_id,
      amount: isActiveTip,
      currency: 1,
      language: 'az'
    }
    if (activedRating !== 0) {
      waiterInfos.rate = activedRating
    }
    sendTip(waiterInfos)
  }
console.log(waiterInfo?.data?.current_waiter?.waiter_id)
  return (
    <Sheet
      isOpen={isActiveTips}
      disableScrollLocking={true}
      onClose={() => setIsActiveTips(false)}
      snapPoints={[0.95]}
      className={styles.openingAnimation}
      onDragStart={() => setIsActiveTips(false)}
    >
      <Sheet.Container className={styles.modalSheetContainer}>
        <Sheet.Content className={styles.container}>
          <div className={styles.profile}>
            <Image
              src={waiter}
              width={54}
              height={54}
              className='rounded-[50%] object-cover'
              alt='profile'
            />
            <div className='bg-[#dbd9e0] absolute rounded-[50%] top-[0px] right-[0px] border-white border h-[18px] w-[18px] z-190 flex items-center justify-center'>
              <p className={styles.profileP}>
                {waiterInfo?.data?.current_waiter?.rating.toFixed(1)}
              </p>
            </div>
          </div>
          <div className={styles.name}>
            {waiterInfo?.data.current_waiter?.first_name}
            {waiterInfo?.data?.current_waiter?.last_name}
          </div>
          <div className={styles.id}>
            ID {waiterInfo?.data.current_waiter?.waiter_id}
          </div>
          <ul className='flex justify-between pb-4 items-center mt-3'>
            {[...Array(5)].map((_, i) => {
              return (
                <li key={i} className='px-1'>
                  <Image
                    onClick={() => handleActiveRatingClick(i + 1)}
                    className={`object-cover w-[25px] h-full cursor-pointer grayscale ${
                      activedRating >= i + 1 ? '!filter-none' : ''
                    } `}
                    alt='star'
                    src={star}
                  />
                </li>
              )
            })}
          </ul>
          <div
            className='rounded w-full h-[1px] bg-[#F5F2FA]'
            id='sheetBorder'
          ></div>
          <div className={styles.firstContent}>
            <p>{t('Do you want to leave a tip?')}</p>
            <span>
              {t('Manats will be transferred personally to the employee')}
            </span>
            <div>
              <button
                onClick={() => handleTipClick(1)}
                className={`${
                  isActiveTip == 1 && '!bg-[#fd451c] !border-none !text-[#fff]'
                }`}
              >
                1₼
              </button>
              <button
                onClick={() => handleTipClick(3)}
                className={`${
                  isActiveTip == 3 && '!bg-[#fd451c] !border-none !text-[#fff]'
                }`}
              >
                3₼
              </button>
              <button
                onClick={() => handleTipClick(5)}
                className={`${
                  isActiveTip == 5 && '!bg-[#fd451c] !border-none !text-[#fff]'
                }`}
              >
                5₼
              </button>
              <button
                onClick={() => handleTipClick(10)}
                className={`${
                  isActiveTip == 10 && '!bg-[#fd451c] !border-none !text-[#fff]'
                }`}
              >
                10₼
              </button>
            </div>
          </div>
          <div className={styles.tipInput}>
            <p>{t('Enter tip manually')}</p>
            <input
              type='number'
              onChange={e =>
                +e.target.value < 201 && setIsActiveTip(e.target.value)
              }
              value={isActiveTip}
              placeholder='10₼'
            />
          </div>
          <div className='flex h-16 items-center justify-between w-full'>
            {waiterInfo?.data?.current_waiter?.waiter_id === 'b06d9b' ? (
              <Payment2
                paymentDetail={{
                  waiterInfo,
                  tableId: Cookies.get('table_id'),
                  isActiveTip,
                  setIsActiveTip,
                  iframeSrc,
                  setIframeSrc
                }}
              />
            ) : (
              <Payment
                paymentDetail={{
                  waiterInfo,
                  tableId: Cookies.get('table_id'),
                  isActiveTip,
                  setIsActiveTip,
                  iframeSrc,
                  setIframeSrc
                }}
              />
            )}
            <button
              className={`flex justify-center items-center w-full ml-2 bg-slate-100 py-3 rounded-md ${
                Number(isActiveTip) < 1 &&
                isActiveTip !== null &&
                'pointer-events-none'
              }`}
              onClick={handleSendTipToWaiter}
            >
              <Image
                src={card}
                className='mr-2'
                width={20}
                height={20}
                alt='Card'
              />
              {t('Pay by card')}
            </button>
          </div>
          {+isActiveTip < 1 && isActiveTip !== null && (
            <div className='bg-red-500 text-white py-2 px-2 rounded-md border border-red-700'>
              <p className='font-semibold text-[12px]/4 text-center'>
                {t(
                  'Please enter an amount (Minimum amount 1 manat, maximum 200 manat)'
                )}
              </p>
            </div>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        {...Sheet.defaultBackdropProps}
        onClick={() => setIsActiveTips(false)}
      />
    </Sheet>
  )
}
export default TipsPopUp
