import React from 'react'
import styles from '../../Home/HomeCategories/HomeCategoriesName/homecategoriesname.module.css'
import homecategorymeal from '../../../assets/images/Home/homecategorymeal.svg'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const AllCategory = ({ getAllProducts }) => {
  const t = useTranslations('Home')

  return (
    <>
      <div
        onClick={() => getAllProducts()}
        className={styles['home-category-card']}
      >
        <div className={styles['home-category-img']}>
          <Image
            src={homecategorymeal}
            width={64}
            height={64}
            loading="eager"
            alt="category-meal"
          />
        </div>
        <span>{t('All')}</span>
      </div>
    </>
  )
}

export default AllCategory
