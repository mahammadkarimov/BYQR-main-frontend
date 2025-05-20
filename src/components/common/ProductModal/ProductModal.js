'use client'
import { GetMealWithSlugQr } from '@/services/api/dataApi'
import "@/../slick-carousel/slick/slick.css";
import "@/../slick-carousel/slick/slick-theme.css";
import './style.css'
import styles from '../../Home/HomeProductCard/homeproductcard.module.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import Sheet from 'react-modal-sheet'
import Image from 'next/image'
import blur from '../../../assets/images/Home/blur.jpg'
import closeBtn from '../../../assets/icons/Home/closeBtn.svg'
import SmallMealTypes from '../SmallMealTypes/SmallMealTypes'
import StarPriceContent from '../StarPriceContent/StarPriceContent'
import DeliveryMinute from '../DeliveryMinute/DeliveryMinute'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import manat from '../../../assets/icons/Home/manat.svg'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { selectProductSlug } from '@/redux/features/categorySlugSlice'
import Slider from 'react-slick'
import Calorie from '../Calorie/Calorie';
import MealSizeArea from '../MealSizeArea/MealSizeArea';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const plusJakarta = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const ProductModal = () => {
  const t = useTranslations('Home')
  const [isLoadingImg, setIsLoadingImg] = useState(true)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selProductData = useSelector((state) => state.categorySlug.productSlug)
  const dispatch = useDispatch()
  const [mealSizeId, setMealSizeId] = useState(null)

  const { data } = useQuery(['productDetail', searchParams.get('productSlug')], () => GetMealWithSlugQr(searchParams.get('productSlug'), pathname.split('/')[1]), {
    onSuccess: (data) => {
      if (data?.data?.sizes[0]?.id) {
        setMealSizeId(data?.data?.sizes[0]?.id)
      }
    }
  })

  useEffect(() => {
    if (data?.data?.sizes[0]?.id) {
      setMealSizeId(data?.data?.sizes[0]?.id)
    }
  }, [searchParams.get('productSlug')])

  const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    infinity: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Sheet
        isOpen={searchParams.get('productSlug')}
        disableScrollLocking={true}
        onClose={() => {
          const url = new URL(window.location.href);
          const params = new URLSearchParams(url.search);
          params.delete('productSlug');
          window.history.replaceState({}, '', `${url.pathname}?${params}`);
        }}
        snapPoints={[0.95]}
      >
        <Sheet.Container className={styles.modalSheetContainer}>
            <Sheet.Content>
          <div className={styles.sheetScroller}>
              <Slider {...settings}>
                {data?.data?.images?.map(img => (
                  <div key={img?.id} className={styles.modalImgContainer}>
                    <Image
                      src={img?.image}
                      width={1000}
                      height={1000}
                      loading='eager'
                      className={styles.productImg}
                      alt="product-image"
                    />
                    <button
                      onClick={() => {
                        const url = new URL(window.location.href);
                        const params = new URLSearchParams(url.search);
                        params.delete('productSlug');
                        window.history.replaceState({}, '', `${url.pathname}?${params}`);
                      }}
                      className={styles.closeBtn}
                    >
                      <Image src={closeBtn} alt="close-btn" />
                    </button>
                  </div>
                ))}
                {data?.data?.video && (
                  <div className='relative'>
                    <VideoPlayer videoUrl={data?.data?.video} />
                    <button
                      onClick={() => {
                        const url = new URL(window.location.href);
                        const params = new URLSearchParams(url.search);
                        params.delete('productSlug');
                        window.history.replaceState({}, '', `${url.pathname}?${params}`);
                      }}
                      className={styles.closeBtn}
                    >
                      <Image src={closeBtn} alt="close-btn" />
                    </button>
                  </div>
                )}
              </Slider>
              <div className={styles.modalDescContainer}>
                <div className={styles.bigTitle}>
                  <h3>{data?.data?.name}</h3>
                </div>
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <div className={styles.modalAdditionContainer}>
                    <StarPriceContent
                      mealSizeId={mealSizeId}
                      price={data?.data?.price}
                      sizePrice={data?.data?.sizes}
                      fontWeight="700"
                      padding="7px 16px"
                      borderRadius="20px"
                      border="1px solid #EDF1F8"
                      imageSrc={manat}
                    />
                  </div>
                  <SmallMealTypes
                    text={data?.data?.is_vegan ? 'vegan' : 'non-vegan'}
                    fontSize="14px"
                  />
                  {data?.data?.is_halal && (
                    <div className="text-[#009000] bg-[#E0F1D5] px-3 py-2.5 rounded-[4px] flex items-center justify-center">
                      <p className="text-[10px]">halal</p>
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-2'>
                  <DeliveryMinute
                    preparationTime={data?.data?.etp}
                    className={styles.deliveryMinute}
                  />
                  {data?.data?.calorie && <Calorie calorie={data?.data?.calorie} />}
                </div>
                {data?.data?.sizes[0]?.size && <MealSizeArea mealSizeId={mealSizeId} setMealSizeId={setMealSizeId} sizes={data?.data?.sizes} />}
                <div className={styles.modalDetails}>
                  <h5>{t('Ingredients')}</h5>
                  <p
                    className={plusJakarta.className}
                    style={{ color: '#808D9E' }}
                  >
                    {data?.data?.ingredient}
                  </p>
                </div>
              </div>
          </div>
            </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          {...Sheet.defaultBackdropProps}
          onClick={() => {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.delete('productSlug');
            window.history.replaceState({}, '', `${url.pathname}?${params}`);
          }}
        />
      </Sheet>
    </>
  )
}

export default ProductModal
