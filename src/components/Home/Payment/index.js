'use client'
import React, { useState, useEffect } from 'react'
import googlePay from '@/assets/icons/Home/google-pay-logo.png'
import applePay from '@/assets/icons/Home/apple-pay-logo.png'
import Image from 'next/image'

const PaymentWidget = ({ paymentDetail }) => {
  const [showButtons, setShowButtons] = useState(false)
  const [paymentImage, setPaymentImage] = useState(null)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isChrome = /chrome|chromium|crios/i.test(navigator.userAgent)
    const isIOS = /iphone|ipad|ipod/i.test(userAgent)
    const isAndroid = /android/i.test(userAgent)

    if (isSafari || isChrome) {
      setShowButtons(true)
    }

    if (isIOS) {
      setPaymentImage(applePay)
    } else if (isAndroid) {
      setPaymentImage(googlePay)
    }
  }, [])

  useEffect(() => {
    const handlePaymentMessage = event => {
      if (!event.data) return

      console.log("📩 iFrame'den gelen mesaj:", event)

        if (event.data.type === 'PAYMENT_SUCCESS') {
        console.log('✅ Ödeme Başarılı!')
        sendLogToServer('✅ Ödeme Başarılı!')
        setPaymentStatus('success')
      } else if (event.data.type === 'PAYMENT_FAILED') {
        console.error('❌ Ödeme Başarısız!')
        sendLogToServer('❌ Ödeme Başarısız!')
        setPaymentStatus('error')
      }
    }

    window.addEventListener('message', handlePaymentMessage)

    return () => {
      window.removeEventListener('message', handlePaymentMessage)
    }
  }, [])

  const handleShowPayment = async () => {
    try {
      if (paymentDetail.isActiveTip < 1) return
      const response = await fetch('https://api.byqr.az/wallet-pay/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: paymentDetail.isActiveTip,
          description: 'test',
          waiter: paymentDetail.waiterInfo?.data?.current_waiter?.waiter_id,
          table_id: paymentDetail.tableId,
          currency: '1'
        })
      })

      const data = await response.json()
      console.log('API Response:', data)

      if (data.widget_url) {
        paymentDetail.setIframeSrc(data.widget_url)
      } else {
        console.error('Widget URL alınamadı:', data)
      }
    } catch (error) {
      console.error('Ödeme isteği hatası:', error)
    }
  }

  useEffect(() => {
    handleShowPayment()
  }, [paymentDetail.isActiveTip])

  const handleClick = () => {
    if (paymentDetail.isActiveTip < 1) {
      paymentDetail.setIsActiveTip(0)
    }
    if (paymentDetail.iframeSrc) {
      window.open(paymentDetail.iframeSrc, '_blank', 'width=500,height=600')
    }
  }

  if (!showButtons || !paymentImage) return null

  return (
    <div
      className={`flex w-full h-[48px] justify-center items-center bg-slate-100 rounded-md relative cursor-pointer ${
        paymentDetail.isActiveTip < 1 &&
        paymentDetail.isActiveTip !== null &&
        'pointer-events-none'
      }`}
      onClick={handleClick}
    >
      <Image src={paymentImage} width={40} height={40} alt='Payment Button' />
    </div>
  )
}

export default PaymentWidget