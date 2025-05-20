'use client'
import React, { Suspense } from 'react'
import styles from './categorycard.module.css'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { MealCategoriesWithQr } from '@/services/api/dataApi'
import { useDispatch } from 'react-redux'
import {
  handleMaincategoryId,
  selectCategorySlug,
} from '@/redux/features/categorySlugSlice'
import { usePathname, useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import Cookies from 'js-cookie'

const CategoryCard = () => {
  const { data, isLoading } = useQuery('categories', () =>
    MealCategoriesWithQr(Cookies.get('activeParams'))
  )
  console.log(data?.data?.categories)
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()

  const customColors = ['#FFE8ED', '#EBF8E6', '#E5EDFA', '#FFEFB6']

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * customColors.length)
    return customColors[randomIndex]
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const handleCategories = ({ slug, id }) => {
    dispatch(selectCategorySlug(slug))
    dispatch(handleMaincategoryId(id))
    router.push(`/${pathname.slice(1, 3)}/${Cookies.get('activeParams')}`)
  }

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ClipLoader color="#FF1212" loading={true} size={45} />
      </div>
    )
  }

  return (
    <>
      {data?.data?.categories?.map((item, index) => (
        <div
          onClick={() => handleCategories(item)}
          key={index}
          className={styles['category-card']}
          style={{ backgroundColor: getRandomColor() }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
          initial={{ opacity: 0 }}
        >
          <Image
            className={styles['category-img']}
            width={149}
            height={150}
            src={item?.icon}
            alt="food-image"
          />
          <div className="flex justify-center items-center h-[34%]">
            <h3 className="flex items-center justify-center">{item?.name}</h3>
          </div>
        </div>
      ))}
    </>
  )
}

export default CategoryCard
