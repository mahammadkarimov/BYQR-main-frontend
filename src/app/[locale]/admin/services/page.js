'use client'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import database from '../../../../firebaseConfig'
import { ref, onValue } from 'firebase/database'
import styles from './services.module.css'

import { GridLoader } from 'react-spinners'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

const page = () => {
  const [isActiveGuests, setIsActiveGuests] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations('Admin')
  const voiceRef = useRef(null)

  useEffect(() => {
    setIsLoading(true)
    console.log(Cookies.get('activeRest'))
    const databaseRef = ref(
      database,
      `${Cookies.get('hotel-rest-username')}-ofisiant/guest`
    )

    const unsubscribe = onValue(databaseRef, (snapshot) => {
      if (snapshot.exists() && voiceRef.current) {
        const updatedData = snapshot.val()
        setIsActiveGuests(Object.entries(updatedData))
        setIsLoading(false)
        if (voiceRef.current) {
          voiceRef.current.play()
        }
      } else {
        setIsLoading(false)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AdminLayout>
      <div className={styles.servicesContainer}>
        <table className="border-collapse border-2 w-full border-slate-500">
          <thead className="bg-[#FD451C] text-[16px] text-white font-semibold text-center">
            <tr>
              <th className="border border-slate-600 w-5 p-2">{t('Order')}</th>
              <th className="border border-slate-600 w-5 p-2">{t('Table')}</th>
              <th className="border border-slate-600 w-5 p-2">{t('Reason')}</th>
              <th className="border border-slate-600 p-2">{t('Message')}</th>
              <th className="border border-slate-600 w-10 p-2">{t('Date')}</th>
              <th className="border border-slate-600 w-10 p-2">Status</th>
              <th className="border border-slate-600 w-5 p-2">ID</th>
            </tr>
          </thead>
          <tbody className={styles.servicesBodyContainer}>
            {isLoading ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <GridLoader
                  color="#FF1212"
                  loading={isLoading ? true : false}
                  size={15}
                />
              </div>
            ) : (
              isActiveGuests
                ?.map((guest, i) => (
                  <tr key={i}>
                    <td className="border-b border-gray-300 pt-4 ">{i + 1}</td>
                    <td className="border-b border-gray-300 overflow-x-auto whitespace-nowrap">
                      {guest[1]?.tableNum}
                    </td>
                    <td className="border-b border-gray-300 overflow-x-auto whitespace-nowrap">
                      {guest[1]?.guestMessage
                        ? t('Call Waiter')
                        : guest[1]?.selectedMethod === 'cash'
                        ? t('Pay By Cash')
                        : guest[1]?.selectedMethod === 'card'
                        ? t('Pay By Card')
                        : ''}
                    </td>
                    <td className="border-b border-gray-300 font-semibold ">
                      {guest[1]?.guestMessage
                        ? guest[1]?.guestMessage
                        : guest[1]?.selectedMethod === 'cash'
                        ? t('the guest wants to pay by cash')
                        : guest[1]?.selectedMethod === 'card'
                        ? t('the guest wants to pay by card')
                        : ''}
                    </td>
                    <td className="border-b border-gray-300 w-5 px-4 pb-2">
                      {new Intl.DateTimeFormat('tr-TR', {
                        hour: 'numeric',
                        minute: 'numeric',
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      }).format(new Date(guest[1].timestamp))}
                    </td>
                    <td className="border-b border-gray-300 table-cell align-middle">
                      {guest[1]?.accepted ? (
                        <div className="w-[80px] h-[40px] py-auto bg-[#009B2B]"></div>
                      ) : (
                        <div className="w-[80px] h-[40px] py-auto bg-[#FF1212]"></div>
                      )}
                    </td>
                    <td className="border-b border-gray-300 w-5 pb-2">
                      {guest[1]?.waiterID}
                    </td>
                  </tr>
                ))
                .reverse()
            )}
          </tbody>
        </table>
      </div>
      <audio ref={voiceRef} controls={false}>
        <source src="/voice/serviceVoice.mp3" type="audio/mp3" />
      </audio>
    </AdminLayout>
  )
}

export default page
