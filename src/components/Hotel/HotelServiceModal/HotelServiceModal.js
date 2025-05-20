'use client'
import {
  GetHotelCustomerServiceWithSlug,
  GetMealWithSlugQr
} from '@/services/api/dataApi'
import styles from '../../Home/HomeProductCard/homeproductcard.module.css'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import Sheet from 'react-modal-sheet'
import Image from 'next/image'
import closeBtn from '../../../assets/icons/Home/closeBtn.svg'
import SmallMealTypes from '../../common/SmallMealTypes/SmallMealTypes'
import StarPriceContent from '../../common/StarPriceContent/StarPriceContent'
import DeliveryMinute from '../../common/DeliveryMinute/DeliveryMinute'
import manat from '../../../assets/icons/Home/manat.svg'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { selectProductSlug } from '@/redux/features/categorySlugSlice'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Slider from 'react-slick'
import '@/../slick-carousel/slick/slick.css'
import '@/../slick-carousel/slick/slick-theme.css'
import './style.css'

const plusJakarta = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

const ProductModal = () => {
  const selProductData = useSelector(state => state.categorySlug.productSlug)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data } = useQuery(
    ['serviceDetail', searchParams.get('service')],
    () => GetHotelCustomerServiceWithSlug(searchParams.get('service'))
  )

  const closeModal = () => {
    router.back()
    dispatch(selectProductSlug(false))
  }

  const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    infinity: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    touchMove: true
  }

  return (
    <>
      <Sheet
        isOpen={selProductData}
        disableScrollLocking={true}
        onClose={() => dispatch(selectProductSlug(false))}
        snapPoints={[0.95]}
        onDragStart={() => dispatch(selectProductSlug(false))}
      >
        <Sheet.Container className={styles.modalSheetContainer}>
          <Sheet.Content>
            <div className={styles.modalContent}>
              <div className={styles.modalImgContainer}>
                <Slider {...settings}>
                  {data?.data?.images?.map((el, index) => (
                    <div key={index} className={styles.modalImgContainer}>
                      {el.endsWith('.mp4') || el.endsWith('.webm') ? (
                        <video
                          className={styles.productVideo}
                          width={700}
                          height={700}
                          controls
                          playsInline
                        >
                          <source
                            src={el}
                            type={`video/${el.split('.').pop()}`}
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={el}
                          className={styles.productImg}
                          alt='product-image'
                        />
                      )}
                    </div>
                  ))}
                </Slider>
                <button onClick={closeModal} className={styles.closeBtn}>
                  <Image src={closeBtn} alt='close-btn' />
                </button>
              </div>
              <div className={styles.modalDescContainer}>
                <div
                  className={styles.bigTitle}
                  style={{ marginBottom: '10px' }}
                >
                  <h3>{data?.data?.[`title_${pathname.split('/')[1]}`]}</h3>
                </div>
                {/* <div className={styles.modalAdditionContainer}>
                  <StarPriceContent
                    price={data?.data?.price}
                    fontWeight='700'
                    padding='7px 16px'
                    borderRadius='20px'
                    border='1px solid #EDF1F8'
                    imageSrc={manat}
                  />
                  <DeliveryMinute
                    preparationTime={data?.data?.etp}
                    className={styles.deliveryMinute}
                  />
                </div> */}
                {data?.data?.[`description_${pathname.split('/')[1]}`] && (
                  <div className={styles.modalDetails}>
                    <h5>Details about service</h5>
                    <p
                      className={plusJakarta.className}
                      style={{ color: '#808D9E' }}
                    >
                      {data?.data?.[`description_${pathname.split('/')[1]}`]
                        ?.split('.') // Nöqtəyə görə böl
                        .map((item, index) =>
                          item.trim() ? <p key={index}>{item.trim()}.</p> : null
                        )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          {...Sheet.defaultBackdropProps}
          onClick={() => dispatch(selectProductSlug(false))}
        />
      </Sheet>
    </>
  )
}

export default ProductModal
