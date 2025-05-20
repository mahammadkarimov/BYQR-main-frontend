'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './homecategoriesname.module.css'
import Image from 'next/image'

const HomeCategoriesName = ({
  restaurantData,
  visibleId,
  visibleSubcategoryId,
  categoryIndex,
  setCategoryIndex
}) => {
  const containerRef = useRef(null)
  const [scrollActive, setScrollActive] = useState(false)
  useEffect(() => {
    const calculateDistanceFromTop = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        if (rect.top < 10 && window.scrollY > 200) {
          setScrollActive(true)
        } else if (window.scrollY < 436) {
          setScrollActive(false)
        }
      }
    }

    calculateDistanceFromTop()

    window.addEventListener('scroll', calculateDistanceFromTop)
    window.addEventListener('resize', calculateDistanceFromTop)

    return () => {
      window.removeEventListener('scroll', calculateDistanceFromTop)
      window.removeEventListener('resize', calculateDistanceFromTop)
    }
  }, [])

  useEffect(() => {
    const activeDiv = document.getElementById(`sub-${visibleSubcategoryId}`)
    if (activeDiv) {
      activeDiv.scrollIntoView()
    }
  }, [visibleSubcategoryId])

  const handleSrollSubcategory = subcategoryId => {
    const element = document.getElementById(subcategoryId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScroll = (categoryId, index) => {
    const element = document.getElementById(categoryId)
    if (element) {
      setCategoryIndex(index)
      element.scrollIntoView()
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div ref={containerRef} className={styles.categoryCardContainer}>
          {restaurantData?.data?.categories?.map(
            (category, index) =>
              category?.is_active && (
                <div
                  onClick={() => handleScroll(category?.id, index)}
                  key={category?.id}
                  className={styles.categoryCard}
                >
                  <Image
                    src={category?.icon}
                    className={styles.categoryImg}
                    loading='lazy'
                    alt='category-image'
                    width={300}
                    height={300}
                  />
                  <span>{category?.name}</span>
                </div>
              )
          )}
        </div>
        {/* <div className={styles.subcategoryContainer}>
          <div className={styles.subcategoryCard}>
            <span>Vodka</span>
          </div>
        </div> */}
      </div>

      <div className={scrollActive ? styles.scrollCategoryCard : 'hidden'}>
        <div className={styles.categoryCard1}>
          {restaurantData?.data?.categories?.map(
            (category, index) =>
              category?.is_active && (
                <div
                  key={category?.id}
                  onClick={() => handleScroll(category?.id, index)}
                  className={`${styles.scrolLCategoryCard} ${
                    visibleId == category?.id &&
                    (restaurantData?.data?.username === 'chaikend'
                      ? styles.activeCategory2
                      : restaurantData?.data?.username === 'obaoschuman'
                      ? styles.activeCategory3
                      : styles.activeCategory)
                  }`}
                >
                  <span>{category?.name}</span>
                </div>
              )
          )}
        </div>
        <div className={styles.categoryCard2}>
          {restaurantData?.data?.meals[categoryIndex]?.is_active &&
            restaurantData?.data?.meals[categoryIndex]?.subcategories?.map(
              subcategory => (
                <div
                  key={subcategory?.id}
                  onClick={() => handleSrollSubcategory(subcategory?.id)}
                  id={`sub-${subcategory?.id}`}
                  className={`${styles.subcategoryCard} ${
                    visibleSubcategoryId == subcategory?.id &&
                    (restaurantData?.data?.username === 'chaikend'
                      ? styles.activeSubcategory2
                      : restaurantData?.data?.username === 'obaoschuman'
                      ? styles.activeSubcategory3
                      : styles.activeSubcategory)
                  }`}
                >
                  <span>{subcategory?.name}</span>
                </div>
              )
            )}
        </div>
      </div>
      <div></div>
    </>
  )
}

export default HomeCategoriesName
