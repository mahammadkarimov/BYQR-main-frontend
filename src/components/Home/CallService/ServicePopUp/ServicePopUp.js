'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import close from '../../../../assets/icons/Home/Close.svg'
import './servicePopUp.css'
import styles from './style.module.css'
import { push, ref, serverTimestamp, set } from 'firebase/database'
import database from '../../../../firebaseConfig'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import check from '../../../../assets/icons/Home/check.png'
import { useMutation } from 'react-query'
import { NotifyWaiterData, getTableID } from '@/services/api/dataApi'

const ServicePopUp = ({ setIsActiveService, guestMessage, setGuestMessage, setIsSuccess, isSuccess, isActiveService }) => {
  const t = useTranslations('Home')

  const { mutate: NotifyWaiter } = useMutation((data) => NotifyWaiterData(data))

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.id === 'emptyArea') {
        setIsActiveService(false)
        return
      }
    })
  }, [])

  const handleRequestChange = (e) => {
    if (e.target.value.length <= 60) {
      setGuestMessage(e.target.value)
    }
  }

  const handleSendReq = async () => {
    let guestCall = true
    let requestType = 'call waiter'
    let accepted = false
    let not_responded = false
    let tableNum = Cookies.get('activeTable')
    let tableId = await getTableID()
    if (tableNum) {
      const timestamp = serverTimestamp()
      const guestRef = ref(database, `${Cookies.get('activeParams')}/guests`)
      const guestRef2 = ref(
        database,
        `${Cookies.get('activeParams') + '-ofisiant'}/guest`
      )
      await push(guestRef, {
        guestMessage,
        guestCall,
        tableNum,
        timestamp,
      })
        .then(() => {
          setIsSuccess(true)
        })
        .catch((error) => {
          setIsActiveService(false)
        })
      await push(guestRef2, {
        guestMessage,
        accepted,
        tableNum,
        timestamp,
        requestType,
        not_responded
      })
        .then(() => {
          setIsSuccess(true)
          NotifyWaiter({
            'table_id': tableId?.data?.table_id,
            'title': `Masa ${tableNum}`,
            'body': guestMessage
          })
        })
        .catch((err) => {
          setIsActiveService(false)
        })
    }
  }

  useEffect(() => {
    if (isActiveService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isActiveService])

  return (
    <>
      <div className={isActiveService && styles.overlay}>
        <div
          className={`${isActiveService ? 'opening-animation' : 'close-modal'}`}
        >
          <div className='h-[100vh] relative' id='emptyArea'>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 px-3 mx-auto !w-[302px] h-[292px] rounded-[16px] border border-[#E6E7EB] bg-white flex flex-col justify-center items-center customer-service">
              {!isSuccess ? (
                <>
                  <Image
                    loading="eager"
                    onClick={() => setIsActiveService(false)}
                    src={close}
                    width={30}
                    className="absolute right-2 top-1"
                    height={30}
                    alt=""
                  />
                  <h3 className="mb-3 text-[#191A26] font-bold text-[18px] leading-[19.8px]">
                    {t('Description')}
                  </h3>
                  <p className="mb-6 font-normal leading-[17.6px] text-[#45475F]">
                    {t('Describe your request to the waiter')}
                  </p>
                  <textarea
                    className="w-full resize-none h-[110px] p-[10px] rounded-[10px] border border-[#EDF1F8] mb-6 outline-none"
                    type="text"
                    value={guestMessage}
                    placeholder={t('Describe your request here')}
                    onChange={handleRequestChange}
                  />
                  <span className="absolute left-5 bottom-[58px] text-sm">
                    {guestMessage.length}/60
                  </span>
                  <button
                    onClick={() => handleSendReq()}
                    className="w-full h-9 mt-3 text-center rounded-[30px] bg-[#FD451C] text-white"
                  >
                    {t('Send your request')}
                  </button>
                </>
              ) : (
                <div className="w-[260px] flex flex-col items-center gap-4 justify-center">
                  <button>
                    <Image
                      loading="eager"
                      onClick={() => setIsActiveService(false)}
                      src={close}
                      width={30}
                      className="absolute right-2 top-1"
                      height={30}
                      alt=""
                    />
                  </button>
                  <Image width={70} height={70} src={check} alt="check" />
                  <span className="text-[18px] text-center font-bold">
                    {t('Your request has been noted')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* {isActiveService && (
          <div className="fixed top-0 left-0 w-screen h-[screen] bg-black opacity-50 z-[999]" id='emptyArea' />
        )} */}
      </div>
    </>
  )
}
export default ServicePopUp
