'use client'
import { colors } from '@/styles/color/colors'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import SmallMealTypes from '../SmallMealTypes/SmallMealTypes'
import StarPriceContent from '../StarPriceContent/StarPriceContent'
import styles from './TwiceCards.module.css'
import manat from '../../../assets/icons/Home/manat.svg'
import {
  handleScrollCategoryId,
  handleScrollIndex,
  selectProductSlug,
} from '@/redux/features/categorySlugSlice'
import { useDispatch, useSelector } from 'react-redux'
import DeliveryMinute from '../DeliveryMinute/DeliveryMinute'
import { handleMainCategoryID } from '@/redux/features/scrollSlice'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const TwiceCards = (props) => {
  const { subCategories, mainCategoryId, mainCategoryName } = props
  const [cardHeight, setCardHeight] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()
  const textColor = colors.big_title
  const selActiveCategoryId = useSelector(
    (state) => state.categorySlug.activeCategory
  )

  const selScrollActive = useSelector(
    (state) => state.categorySlug.scrollCategoryId
  )

  const subCategoryRef = useRef({})
  const observerRef = useRef(null)
  const observerRef2 = useRef(null)

  const handleThreshold = () => {
    if (cardHeight < 400) {
      return [cardHeight * 0.2 / 100]
    } else if (cardHeight < 600) {
      return [cardHeight * 0.5 / 100]
    }
  }

  const options = {
    root: document.querySelector('.scrollable-div'),
    rootMargin: '0px 0px 0px 0px',
    threshold: handleThreshold(),
  }

  const options2 = {
    root: document.querySelector('.main-category-div'),
    rootMargin: '0px 0px 0px 0px',
    threshold: [0.02],
  }

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      const currentDivId = entry.target.id
      if (entry.isIntersecting) {
        setCardHeight(entry.target.getBoundingClientRect().height)
        dispatch(handleScrollIndex(entry.target.dataset.index))
        dispatch(handleScrollCategoryId(currentDivId))
      }
    })
  }

  const handleIntersect2 = (entries) => {
    // console.log(entries)
    entries.forEach((entry) => {
      // console.log(entry)

      const currentDivId = entry.target.id

      if (entry.isIntersecting) {
        dispatch(handleMainCategoryID(currentDivId))
      }
    })
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, options)
    const divs = document.querySelectorAll('.scrollable-div')
    observerRef2.current = new IntersectionObserver(handleIntersect2, options2)
    const mainCategoryDivs = document.querySelectorAll('.main-category-div')
    mainCategoryDivs.forEach((div) => {
      observerRef2.current.observe(div)
    })

    divs.forEach((div) => {
      observerRef.current.observe(div)
    })

    return () => {
      observerRef2.current.disconnect()
      observerRef.current.disconnect()
    }
  }, [])

  useEffect(() => {
    if (subCategoryRef.current && selActiveCategoryId) {
      const tagRef = subCategoryRef.current[selActiveCategoryId]
      if (tagRef) {
        tagRef.scrollIntoView({ behavior: 'instant', block: 'nearest' })
      }
    }

  }, [selActiveCategoryId])

  const style = {
    color: textColor,
    marginBottom: '16px',
    width: '100%',
    borderRadius: '16px',
    padding: '0px 0px 20px 0px',
    border: '1px solid #ccc',
    gap: '12px',
  }

  const handleGetProductSlug = (product) => {
    // dispatch(selectProductSlug(product))
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('productSlug', product.slug);
    window.history.pushState({}, '', newUrl);
    // router.push(`?productSlug=${product.slug}`)
  }
console.log(subCategories)
  return (
    <>
      <div
        className="main-category-div"
        id={mainCategoryId}
        data-index={mainCategoryName}
      >
        {subCategories?.map((subcategory, i) => (
          <div key={i}>
            <div className={styles.subcategoryName}>
              <h2>{subcategory.name}</h2>
            </div>
            <div
              className="scrollable-div"
              data-index={i}
              key={i}
              id={subcategory?.id}
              ref={(el) => {
                if (el) {
                  if (!subCategoryRef.current[subcategory.id]) {
                    subCategoryRef.current[subcategory.id] = el
                  }
                }
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '9px',
                margin: '0 12px 10px 12px',
              }}
            >
              <>
                {subcategory?.meals?.map((product, i) => (
                  <div
                    onClick={() => handleGetProductSlug(product)}
                    style={style}
                    key={i}
                  >
                    <div className="relative h-[36vw]">
                      <Image
                        width={100}
                        height={100}
                        className={styles.productImage}
                        src={product?.image}
                        // blurDataURL={"data:image/jpeg;base64," + product?.image_base64}
                        // placeholder='blur'

                        alt="product_image"
                      />
                      {product?.is_new && (
                        <span className={styles.isNewCard}>new</span>
                      )}
                    </div>
                    <div className="flex justify-start pl-2.5 flex-col text-center">
                      <div
                        className={styles['cardText']}
                        style={{ color: colors.big_title }}
                      >
                        <h2>
                          {product?.name?.length > 15
                            ? product?.name?.slice(0, 15) + '...'
                            : product?.name}
                        </h2>
                      </div>
                      {/* <div className="flex justify-start sm:justify-center gap-2 w-[80%]">
                        <SmallMealTypes
                          text={product?.vegan ? 'vegan' : 'non-vegan'}
                          fontSize="10px"
                        />
                        {product?.is_halal && (
                          <div className="text-[#009000] bg-[#E0F1D5] rounded-[4px] px-3 flex items-center justify-center">
                            <p className="text-[10px]">halal</p>
                          </div>
                        )}
                      </div> */}
                      <div className="flex justify-between h-[20px] pr-3">
                        <StarPriceContent
                          justifyContent="start"
                          price={product?.price}
                          fontWeight="600"
                          imageSize={24}
                          imageSrc={manat}
                        />
                        {product?.etp && (
                          <DeliveryMinute
                            isTwiceCard="active"
                            preparationTime={product?.etp}
                            className={styles.deliveryMinute}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TwiceCards