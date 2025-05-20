'use client'
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Slider from 'react-slick'
import AOS from 'aos'

// Import icons and images
import arrow from '../../../../assets/icons/Home/arrow.svg'
import share from '../../../../assets/icons/Home/share.svg'
import manat from '../../../../assets/icons/Home/manat.svg'
import euro from '../../../../assets/icons/Home/euro.png'
import cart from '@/assets/images/Home/cart.png'
import calories from '../../../../assets/icons/Home/calories.svg'

// Import styles
import styles from './style.module.css'
import 'aos/dist/aos.css'
import '@/../slick-carousel/slick/slick.css'
import '@/../slick-carousel/slick/slick-theme.css'
import './style.css'

const ProductModal = ({ productDetail, isLoading, setIsActiveShareModal }) => {
  const router = useRouter()
  const pathname = usePathname()
  const modalBottomRef = useRef(null)
  const productImgRef = useRef(null)
  const [isProductInCart, setIsProductInCart] = useState(false)

  // Memoized slider settings to prevent unnecessary re-renders
  const sliderSettings = useMemo(
    () => ({
      dots: true,
      speed: 500,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      draggable: true,
      touchMove: true
    }),
    []
  )

  // Memoized scroll handler to improve performance
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    const brightnessPercent = scrollPosition / 150
    const brightnessScale = scrollPosition / 500

    if (productImgRef.current && modalBottomRef.current) {
      productImgRef.current.style.filter = `brightness(${
        1 - brightnessPercent
      })`
      modalBottomRef.current.style.top = `${scrollPosition}px`
    }
  }, [])

  // Effect for AOS and scroll event
  useEffect(() => {
    AOS.init()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // Memoized cart handling function
  const handleAddToCart = useCallback(() => {
    const currentCartData = localStorage.getItem('cartData')
    const cartArray = currentCartData ? JSON.parse(currentCartData) : []

    const isProductInCart = cartArray.some(
      item => item.id === productDetail?.data.id
    )

    if (!isProductInCart && productDetail?.data) {
      cartArray.push(productDetail.data)
      localStorage.setItem('cartData', JSON.stringify(cartArray))
      router.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}/cart`)
    } else {
      setIsProductInCart(true)
    }
  }, [productDetail, pathname, router])

  // Effect to check if product is already in cart
  useEffect(() => {
    const currentCartData = localStorage.getItem('cartData')
    const cartArray = currentCartData ? JSON.parse(currentCartData) : []

    const isProductInCart = cartArray.some(
      item => item.id === productDetail?.data.id
    )
    setIsProductInCart(isProductInCart)
  }, [productDetail])

  // Early return for loading state
  if (isLoading) return null

  // Render currency symbol based on conditions
  const renderCurrencySymbol = currencyName => {
    if (currencyName === 'tenqe')
      return <span className={`${styles.manat} pl-1`}>₸</span>
    if (pathname.split('/')[2] === 'obaoschuman')
      return <Image className='inline ml-1 w-4' src={euro} alt='euro' />
    return <Image className='inline w-6' src={manat} alt='manat' />
  }

  return (
    <div className='relative h-[100vh]'>
      <div className={styles.modalButtons}>
        <div className={styles.modalImgTop}>
          <div className={styles.leftArr} onClick={() => router.back()}>
            <Image src={arrow} alt='left-arrow' width={14} height={14} />
          </div>
          <div
            className={styles.rightShare}
            onClick={() => setIsActiveShareModal(true)}
          >
            <Image src={share} alt='share' width={14} height={14} />
          </div>
        </div>
      </div>
      <div ref={productImgRef} className={styles.productImg}>
        {!isLoading && (
          <Slider {...sliderSettings}>
            {productDetail?.data?.images?.map(el => (
              <div key={el.id}>
                <img
                  src={el?.image}
                  sizes='100vw'
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                  alt='product-image'
                />
              </div>
            ))}
            {productDetail?.data?.video && (
              <video width='320' height='240' controls>
                <source src={productDetail?.data?.video} type='video/mp4' />
                Tarayıcınız bu videoyu oynatmayı desteklemiyor.
              </video>
            )}
          </Slider>
        )}
        <div className='flex items-center'>
          {productDetail?.data?.etp && (
            <div
              data-aos='fade-up'
              data-aos-delay='100'
              className={styles.minute}
            >
              <span>{productDetail?.data?.etp} min</span>
            </div>
          )}
          {productDetail?.data?.calorie && (
            <div
              data-aos='fade-up'
              data-aos-delay='100'
              className={styles.calorie}
            >
              <Image src={calories} alt='calorie' />
              <span>{productDetail?.data?.calorie} kcal</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.modalBottom} ref={modalBottomRef}>
        <div className='flex items-start justify-between mb-[14px]'>
          <div className={styles.detailHead}>
            <h3>{productDetail?.data?.name}</h3>
            <span>{productDetail?.data?.ingredient}</span>
            {productDetail?.data?.sizes?.[0]?.price &&
            productDetail?.data?.sizes?.[1]?.price ? (
              <div>
                {productDetail?.data?.sizes[0]?.price}
                {renderCurrencySymbol(
                  productDetail?.data?.currency[0]?.name
                )} -{' '}
                {
                  productDetail?.data?.sizes[
                    productDetail?.data?.sizes?.length - 1
                  ].price
                }
                {renderCurrencySymbol(productDetail?.data?.currency[0]?.name)}
              </div>
            ) : (
              <div>
                {productDetail?.data?.price}
                {renderCurrencySymbol(productDetail?.data?.currency[0]?.name)}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-[14px]'>
            {productDetail?.data?.sizes?.map(
              size =>
                size?.price &&
                size?.size && (
                  <div className={styles.mealSize} key={size?.id}>
                    <span>{size?.size}</span>
                    <span>
                      {size?.price}
                      {renderCurrencySymbol(
                        productDetail?.data?.currency[0]?.name
                      )}
                    </span>
                  </div>
                )
            )}
            {(pathname.split('/')[2] === 'theregalo' ||
              pathname.split('/')[2] === 'obaoschuman') && (
              <div
                className={
                  isProductInCart
                    ? styles.addToBasketDeactive
                    : styles.addToBasket
                }
              >
                <button className='relative z-50' onClick={handleAddToCart}>
                  <Image
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 z-50 object-cover'
                    src={cart}
                    alt='cart'
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductModal)
