'use client'
import React, { useState, useEffect, useRef } from 'react'
import googlePay from '@/assets/icons/Home/google-pay-logo.png'
import applePay from '@/assets/icons/Home/apple-pay-logo.png'
import Image from 'next/image'

const PaymentWidget = ({ paymentDetail }) => {
  const [showButtons, setShowButtons] = useState(false)
  const [paymentImage, setPaymentImage] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const iframeRef = useRef(null)
  const popupWindowRef = useRef(null)

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
    // Ödeme sayfasının domain'i - API'dan alınan URL'den extract edilebilir
    const getPaymentDomain = (url) => {
      try {
        const urlObj = new URL(url);
        return urlObj.origin;
      } catch (e) {
        console.error('URL parse hatası:', e);
        return null;
      }
    };

    // window üzerinden gelen mesajları filtreleyen fonksiyon
    const handleMessage = (event) => {
      // İframe URL'si varsa, onun domain'ini kontrol et
      if (paymentDetail.iframeSrc) {
        const paymentDomain = getPaymentDomain(paymentDetail.iframeSrc);
        
        // Eğer ödeme domain'ini tespit edebildiysek ve mesaj bu domain'den GELMİYORSA,
        // bu mesajı güvenlik için yoksayalım
        if (paymentDomain && event.origin !== paymentDomain && event.origin !== window.location.origin) {
          // Güvenilmeyen kaynaktan gelen mesajları sessizce yoksay
          return;
        }
      }
      
      console.log(`📩 Mesaj alındı (${event.origin}):`, event.data);
      
      // Mesajın içeriğini analiz et
      const messageData = event.data;
      
      // Eğer data yoksa işlem yapma
      if (!messageData) return;
      
      // Farklı mesaj formatlarını kontrol et
      
      // Format 1: doğrudan type property'si içeren mesajlar
      if (messageData.type) {
        if (messageData.type === 'PAYMENT_SUCCESS') {
          console.log('✅ Ödeme Başarılı!');
          setPaymentStatus('success');
          
          // Başarılı ödeme callback'i
          if (paymentDetail.onPaymentSuccess) {
            paymentDetail.onPaymentSuccess(messageData);
          }
          
          // Eğer popup açıksa, kapat
          closePopupIfOpen();
        } else if (messageData.type === 'PAYMENT_FAILED') {
          console.error('❌ Ödeme Başarısız!');
          setPaymentStatus('error');
          
          // Başarısız ödeme callback'i
          if (paymentDetail.onPaymentFailed) {
            paymentDetail.onPaymentFailed(messageData);
          }
          
          // Eğer popup açıksa, kapat
          closePopupIfOpen();
        }
      }
      
      // Format 2: PANELOS_MESSAGE formatı
      if (messageData.posdMessageId === 'PANELOS_MESSAGE') {
        if (messageData.type === 'PAYMENT_SUCCESS') {
          console.log('✅ Panel - Ödeme Başarılı!');
          setPaymentStatus('success');
          
          if (paymentDetail.onPaymentSuccess) {
            paymentDetail.onPaymentSuccess(messageData);
          }
          
          closePopupIfOpen();
        } else if (messageData.type === 'PAYMENT_FAILED') {
          console.error('❌ Panel - Ödeme Başarısız!');
          setPaymentStatus('error');
          
          if (paymentDetail.onPaymentFailed) {
            paymentDetail.onPaymentFailed(messageData);
          }
          
          closePopupIfOpen();
        }
      }
      
      // Format 3: metamask-inpage formatı
      if (messageData.target === 'metamask-inpage') {
        console.log('MetaMask mesajı alındı:', messageData);
        
        // MetaMask işlemleri için detaylı veri kontrolü
        if (messageData.data) {
          // MetaMask başarılı işlem kodları vs. kontrol edilebilir
          // Örneğin, işlem hash'i varsa, işlem başarılı olabilir
          if (messageData.data.txHash || messageData.data.transactionHash) {
            console.log('✅ MetaMask işlemi başarılı olabilir:', messageData.data);
            
            // İşlem sonucunu doğrulamak için ek kontroller yapabilirsiniz
          }
        }
      }
      
      // Derin veri yapısında arama fonksiyonu
      const findPaymentStatus = (obj) => {
        if (!obj || typeof obj !== 'object') return null;
        
        // Doğrudan status, paymentStatus veya state araması
        if (obj.status === 'success' || obj.paymentStatus === 'success' || obj.state === 'success') {
          return 'success';
        }
        if (obj.status === 'failed' || obj.paymentStatus === 'failed' || obj.state === 'failed') {
          return 'failed';
        }
        
        // Alt objeler ve dizilerde rekursif arama
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            const result = findPaymentStatus(obj[key]);
            if (result) return result;
          }
        }
        
        return null;
      };
      
      // Derin veri kontrolü
      const deepStatus = findPaymentStatus(messageData);
      if (deepStatus === 'success') {
        console.log('✅ Derin Analiz - Ödeme Başarılı!');
        setPaymentStatus('success');
        
        if (paymentDetail.onPaymentSuccess) {
          paymentDetail.onPaymentSuccess(messageData);
        }
        
        closePopupIfOpen();
      } else if (deepStatus === 'failed') {
        console.error('❌ Derin Analiz - Ödeme Başarısız!');
        setPaymentStatus('error');
        
        if (paymentDetail.onPaymentFailed) {
          paymentDetail.onPaymentFailed(messageData);
        }
        
        closePopupIfOpen();
      }
    };
    
    // Açık popup'ı kapatma fonksiyonu
    const closePopupIfOpen = () => {
      if (popupWindowRef.current && !popupWindowRef.current.closed) {
        popupWindowRef.current.close();
      }
    };
    
    // Window message listener'ını ekle
    window.addEventListener('message', handleMessage);
    
    // İframe üzerinden yoklamaları kontrol etmek için interval
    const popupCheckInterval = setInterval(() => {
      // Popup açıksa ve kapandıysa (kullanıcı tarafından manuel olarak)
      if (popupWindowRef.current && popupWindowRef.current.closed) {
        console.log('📱 Popup kullanıcı tarafından kapatıldı');
        popupWindowRef.current = null;
      }
    }, 1000);
    
    return () => {
      // Listener'ı temizle
      window.removeEventListener('message', handleMessage);
      
      // Interval'i temizle
      clearInterval(popupCheckInterval);
      
      // Açık popup'ı kapat
      closePopupIfOpen();
    };
  }, [paymentDetail]);

  const handleShowPayment = async () => {
    try {
      if (paymentDetail.isActiveTip < 1) return;
      
      // Daha önce başarılı bir ödeme yapıldıysa, tekrar API çağrısı yapmaya gerek yok
      if (paymentStatus === 'success') {
        console.log('✅ Zaten başarılı bir ödeme var!');
        return;
      }
      
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
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.widget_url) {
        paymentDetail.setIframeSrc(data.widget_url);
      } else {
        console.error('Widget URL alınamadı:', data);
      }
    } catch (error) {
      console.error('Ödeme isteği hatası:', error);
    }
  };

  useEffect(() => {
    handleShowPayment();
  }, [paymentDetail.isActiveTip]);

  const handleClick = () => {
    if (paymentDetail.isActiveTip < 1) {
      paymentDetail.setIsActiveTip(0);
      return;
    }
    
    if (paymentDetail.iframeSrc) {
      // Popup referansını sakla
      popupWindowRef.current = window.open(
        paymentDetail.iframeSrc, 
        'PaymentWindow', 
        'width=500,height=600,resizable=yes,scrollbars=yes'
      );
      
      // Popup açılamazsa (popup engelleyici vs.)
      if (!popupWindowRef.current || popupWindowRef.current.closed || typeof popupWindowRef.current.closed === 'undefined') {
        console.error('❌ Popup açılamadı! Popup engelleyici kapalı olduğundan emin olun.');
        
        // Alternatif olarak, iframe'i görünür yap
        if (iframeRef.current) {
          iframeRef.current.style.display = 'block';
          iframeRef.current.style.width = '100%';
          iframeRef.current.style.height = '500px';
          iframeRef.current.style.border = '1px solid #ddd';
          iframeRef.current.style.borderRadius = '8px';
        }
      }
    }
  };

  if (!showButtons || !paymentImage) return null;
  
  return (
    <div className="payment-widget">
      {paymentDetail.iframeSrc && (
        <div>
          <button 
            onClick={handleClick}
            className="payment-button"
          >
            <Image 
              src={paymentImage} 
              alt="Payment method" 
              width={120} 
              height={40} 
            />
          </button>
          
          {/* İframe yüklendikten sonra message event'ine erişebilmek için */}
          <iframe
            ref={iframeRef}
            style={{ display: 'none' }}
            src={paymentDetail.iframeSrc}
            allow="payment"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation"
            title="Payment Frame"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentWidget;