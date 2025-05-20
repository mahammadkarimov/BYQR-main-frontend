import Image from 'next/image'
import React, { useEffect, useRef, useState, memo, useCallback } from 'react'
import heart from '../../../../assets/icons/Home/heart.svg'
import manat from '../../../../assets/icons/Home/manat2.svg'
import euro from '../../../../assets/icons/Home/euro.png'
import styles from './style.module.css'

// Optimize edilmiş meal item bileşeni
const MealItem = memo(({ meal, pathname, t, restaurantData, router }) => {
  const isActive = meal?.is_active
  const isChaiKend = restaurantData?.data?.username === 'chaikend'
  const isObaoschuman = restaurantData?.data?.username === 'obaoschuman'

  const handleClick = useCallback(() => {
    router.push(`${pathname}/${meal?.slug}`)
  }, [router, pathname, meal?.slug])

  const truncatedName =
    meal?.name?.length > 20 ? meal?.name?.slice(0, 20) + '...' : meal?.name
  const truncatedIngredient = !meal?.ingredient
    ? t('The composition of the product is not mentioned')
    : meal?.ingredient?.length > 40
    ? meal?.ingredient?.slice(0, 40) + '...'
    : meal?.ingredient

  if (!isActive) {
    return (
      <div className='relative'>
        <div
          className={`${styles.productCard} ${styles.deactiveProductCard}`}
          onClick={handleClick}
        >
          <div className={isChaiKend ? styles.mealImg2 : styles.mealImg}>
            <img
              src={meal?.image}
              loading='lazy'
              alt='product-image'
              width={100}
              height={100}
              decoding='async'
            />
          </div>
          <div className={styles.mealInfo}>
            <div>
              <h4>{truncatedName}</h4>
              <div>{truncatedIngredient}</div>
            </div>
            <div className={styles.productBottom}>
              <div className={styles.mealPrice}>
                <span
                  className={isObaoschuman ? styles.customPrice : undefined}
                >
                  {meal?.price}
                </span>
                <Image
                  src={isObaoschuman ? euro : manat}
                  className={
                    isChaiKend
                      ? styles.manat2
                      : isObaoschuman
                      ? styles.customPrice
                      : styles.manat
                  }
                  loading='lazy'
                  width={500}
                  height={500}
                  alt='manat'
                  priority={false}
                />
              </div>
              <div
                className={
                  isObaoschuman ? styles.plusProduct3 : styles.plusProduct
                }
              >
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.soldOut}>
          <button>Sold out</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.productCard} onClick={handleClick}>
      <div className={styles.mealImg}>
        <img
          src={meal?.image}
          loading='lazy'
          alt='product-image'
          width={100}
          height={100}
          decoding='async'
        />
      </div>
      <div className={styles.mealInfo}>
        <div>
          <h4>{truncatedName}</h4>
          <div>{truncatedIngredient}</div>
        </div>
        <div className={styles.productBottom}>
          <div className={isChaiKend ? styles.mealPrice2 : styles.mealPrice}>
            <span className={isObaoschuman ? styles.customPrice : undefined}>
              {meal?.price}
            </span>
            <Image
              src={isObaoschuman ? euro : manat}
              className={
                isChaiKend
                  ? styles.manat2
                  : isObaoschuman
                  ? styles.customEuro
                  : styles.manat
              }
              loading='lazy'
              width={500}
              height={500}
              alt='manat'
              priority={false}
            />
          </div>
          <div
            className={isObaoschuman ? styles.plusProduct3 : styles.plusProduct}
          >
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  )
})

// Optimize edilmiş kategori görüntüsü bileşeni
const CategoryImage = memo(({ src }) => (
  <Image
    className={styles.categoryImage}
    src={src}
    loading='lazy'
    width={500}
    height={500}
    alt='category-image'
    sizes='(max-width: 768px) 100vw, 500px'
  />
))

// Optimize edilmiş alt kategori bileşeni
const Subcategory = memo(
  ({ subcategory, pathname, restaurantData, t, router, setRef }) => (
    <div
      key={subcategory?.id}
      id={subcategory?.id}
      ref={el => setRef(subcategory?.id, el)}
    >
      <div className={styles.subcategoryName} id='subcategoryName'>
        {subcategory.name}
      </div>

      {subcategory?.image && (
        <div className='mb-6'>
          <CategoryImage src={subcategory?.image} />
        </div>
      )}

      <div className={styles.mealContainer}>
        {subcategory?.meals?.map(meal => (
          <MealItem
            key={meal?.slug}
            meal={meal}
            pathname={pathname}
            t={t}
            restaurantData={restaurantData}
            router={router}
          />
        ))}
      </div>
    </div>
  )
)

// Optimize edilmiş MealCategory bileşeni
const MealCategory = memo(
  ({
    mealCategory,
    setDivRef,
    index,
    pathname,
    restaurantData,
    t,
    router,
    setSubcategoryRef
  }) => (
    <div
      className='px-3 mb-[29px]'
      ref={el => setDivRef(index, el)}
      key={mealCategory?.category_id}
      id={mealCategory?.category_id}
      data-index={index}
    >
      <div>
        <div className='mb-3'>
          <div className={styles.categoryHead}>
            <h3>{mealCategory?.category_name}</h3>
            <span>{`${
              mealCategory?.subcategories[0]?.name
                ? mealCategory?.subcategories[0]?.name + ','
                : ''
            } ${
              mealCategory?.subcategories[1]?.name
                ? mealCategory?.subcategories[1]?.name + ','
                : ''
            } ${
              mealCategory?.subcategories[2]?.name
                ? mealCategory?.subcategories[2]?.name
                : ''
            }`}</span>
          </div>

          <div>
            <CategoryImage src={mealCategory?.category_icon} />
          </div>

          <div>
            {mealCategory?.subcategories?.map(subcategory => (
              <Subcategory
                key={subcategory?.id}
                subcategory={subcategory}
                pathname={pathname}
                restaurantData={restaurantData}
                t={t}
                router={router}
                setRef={setSubcategoryRef}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
)

const MenuProduct = ({
  router,
  restaurantData,
  setVisibleId,
  setVisibleSubcategoryId,
  setCategoryIndex,
  pathname,
  cartCount,
  t
}) => {
  const divRefs = useRef([])
  const subcategoryRefs = useRef([])

  // Optimize edilmiş ref setter fonksiyonları
  const setDivRef = useCallback((index, el) => {
    divRefs.current[index] = el
  }, [])

  const setSubcategoryRef = useCallback((id, el) => {
    subcategoryRefs.current[id] = el
  }, [])

  // Gözlemci oluşturma ve temizliği
  useEffect(() => {
    if (typeof window === 'undefined' || divRefs.current.length === 0) return

    const observerOptions = { threshold: 0.01 }
    const handleIntersection = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCategoryIndex(entry.target.getAttribute('data-index'))
          setVisibleId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    )

    // Boş olmayan div'leri gözlemle
    divRefs.current.forEach(div => {
      if (div) observer.observe(div)
    })

    return () => {
      divRefs.current.forEach(div => {
        if (div) observer.unobserve(div)
      })
    }
  }, [restaurantData, setCategoryIndex, setVisibleId])

  // Alt kategori gözlemleme
  useEffect(() => {
    const handleScroll = () => {
      if (!subcategoryRefs.current.length) return

      const currentSubcategory = Object.values(subcategoryRefs.current).find(
        ref => {
          if (!ref) return false
          const rect = ref.getBoundingClientRect()
          return rect.top >= 0 && rect.top <= window.innerHeight * 0.8
        }
      )

      if (currentSubcategory) {
        setVisibleSubcategoryId(currentSubcategory.id)
      }
    }

    // Pasif dinleme ile performans iyileştirmesi
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [restaurantData, setVisibleSubcategoryId])

  // Sepet butonunun tıklama fonksiyonu
  const handleViewCartClick = useCallback(() => {
    router.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}/cart`)
  }, [router, pathname])

  // Sepete git butonunun stil kontrolü
  const cartButtonClass =
    restaurantData?.data?.username === 'chaikend'
      ? styles.viewCart2
      : restaurantData?.data?.username === 'obaoschuman'
      ? styles.viewCart3
      : styles.viewCart

  return (
    <>
      {restaurantData?.data?.meals?.map(
        (mealCategory, index) =>
          mealCategory?.is_active && (
            <MealCategory
              key={mealCategory?.category_id}
              mealCategory={mealCategory}
              setDivRef={setDivRef}
              index={index}
              pathname={pathname}
              restaurantData={restaurantData}
              t={t}
              router={router}
              setSubcategoryRef={setSubcategoryRef}
            />
          )
      )}

      <div className={cartButtonClass}>
        <button onClick={handleViewCartClick}>View Cart ({cartCount})</button>
      </div>
    </>
  )
}

export default memo(MenuProduct)
