import Image from 'next/image'
import close from '../../../../assets/icons/Home/Close.svg'
import '../../CallService/ServicePopUp/servicePopUp.css'
import database from '../../../../firebaseConfig'
import React, { useEffect } from 'react'
import { push, ref, serverTimestamp, set } from 'firebase/database'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import styles from './billingpopup.module.css'
import check from '../../../../assets/icons/Home/check.png'
import { NotifyWaiterData, getTableID } from '@/services/api/dataApi'

const BillingPopUp = ({ setIsActivePayment, isSuccess, setIsSuccess, setSelectedMethod, selectedMethod, isActivePayment }) => {
  const t = useTranslations('Home')

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.id === 'emptyArea') {
        setIsActivePayment(false)
        return
      }
    })
  }, [])

  const selectMethod = (method) => {
    setSelectedMethod(method)
  }

  const closePopUp = () => {
    setIsActivePayment(false)
  }

  const getMethodStyle = (method) => {
    return `flex justify-center items-center flex-col h-[78px] px-3 py-[6px] min-w-[100px] rounded-lg  ${selectedMethod === method
      ? ' bg-[#7fd44a]'
      : 'border-solid border-1 border-[#E6E7EB] bg-[#fff]'
      }`
  }

  const getButtonStyle = () => {
    return `w-[276px] py-[10px] text-center text-white mt-9 rounded-[30px] ${selectedMethod ? 'bg-[#FD451C]' : 'bg-[#E4E6ED]'
      }`
  }

  const handleActivePayment = async () => {
    if (selectedMethod) {
      let tableNum = Cookies.get('activeTable')
      let tableId = await getTableID()
      let not_responded = false
      const timestamp = serverTimestamp()
      const guestRef = ref(database, `${Cookies.get('activeParams')}/guests`)
      const guestRef2 = ref(
        database,
        `${Cookies.get('activeParams') + '-ofisiant'}/guest`
      )
      if (tableNum) {
        await push(guestRef, {
          selectedMethod,
          tableNum,
          timestamp,
        })
          .then(() => {
            console.log('User data has been successfully written to Firebase')
            setIsSuccess(true)
          })
          .catch((error) => {
            console.error('Error writing user data to Firebase:', error)
            setIsActivePayment(false)
          })
        await push(guestRef2, {
          selectedMethod,
          tableNum,
          timestamp,
          not_responded
        }).then(() => {
          NotifyWaiterData({
            'table_id': tableId?.data?.table_id,
            'title': `Masa ${tableNum}`,
            'body': selectedMethod === 'card' ? 'Müştəri kart ilə ödəniş etmək istəyir' : selectedMethod === 'cash' ? 'Müştəri nəğd ödəniş etmək istəyir' : null
          })
          setIsSuccess(true)
        })
          .catch((err) => {
            setIsActivePayment(false)
          })
      }
    }
    return
  }
  useEffect(() => {
    if (isActivePayment) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isActivePayment])
  return (
    <>
      <div className={isActivePayment && styles.overlay}>
        <div
          className={`${isActivePayment ? 'opening-animation' : 'close-modal'}`}>
          <div className='h-[100vh] relative' id='emptyArea'>
            <div className="customer-payment absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 mx-auto mt-5 px-3 py-10 max-w-[302px] rounded-[16px] border border-[#E6E7EB] bg-white flex flex-col justify-center items-center z-[1000]">
              {!isSuccess ? (
                <>
                  <button onClick={closePopUp}>
                    <Image
                      loading="eager"
                      className="absolute top-[18px] right-[20px]"
                      src={close}
                      width={30}
                      height={30}
                      alt="close"
                    />
                  </button>
                  <h3 className="mb-3 text-[#191A26] font-bold text-[18px] leading-[19.8px]">
                    {t('Billing method')}
                  </h3>
                  <p className="mb-9 font-normal text-[14px] leading-[17.6px] text-[#45475F]">
                    {t('Choose your billing method')}
                  </p>
                  <div className="flex gap-x-6">
                    <button
                      onClick={() => selectMethod('cash')}
                      className={getMethodStyle('cash')}
                    >
                      <span
                        className={
                          selectedMethod === 'cash'
                            ? styles.payByActiveCard
                            : styles.payByCash
                        }
                      >
                        {t('Pay by cash')}
                      </span>
                    </button>
                    <button
                      onClick={() => selectMethod('card')}
                      className={
                        selectedMethod === 'card'
                          ? styles.activeCardMethod
                          : styles.payByCard
                      }
                    >
                      <span>{t('Pay by card')}</span>
                    </button>
                  </div>
                  <button
                    onClick={handleActivePayment}
                    disabled={!selectedMethod}
                    className={getButtonStyle()}
                  >
                    {t('Confirm')}
                  </button>
                </>
              ) : (
                <div className="w-[260px] flex flex-col items-center gap-4 justify-center">
                  <button>
                    <Image
                      loading="eager"
                      onClick={closePopUp}
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
        {/* {isActivePayment && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-[999]" id='emptyArea' />
        )} */}
      </div>
    </>
  )
}
export default BillingPopUp
