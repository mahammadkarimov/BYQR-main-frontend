'use client'
import React, { useEffect } from 'react'
import ProductCard from './ProductCard/ProductCard'
import { useDispatch } from 'react-redux'
import { handleScrollFunc } from '@/redux/features/scrollSlice'
import ProductModal from '@/components/common/ProductModal/ProductModal'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import {
  MealCategoriesWithQr,
} from '@/services/api/dataApi'
import { handleRestPlan } from '@/redux/features/restaurantPlan'

const HomeProductCard = ({categoryId, setCategoryId}) => {
  const dispatch = useDispatch()
  const selActiveParam = useSelector(
    (state) => state.queryParams.isActiveQueryParams
  )
  
  const { data: allData, isLoading } = useQuery(
    ['user', selActiveParam],
    () => MealCategoriesWithQr(selActiveParam),
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleScroll = () => {
    dispatch(handleScrollFunc(window.scrollY))
  }

  return (
    <>
      <section>
        <div className="mb-20">
          <div>
            {allData?.data?.meals?.map((mainCategory, index) => (
              <ProductCard setCategoryId={setCategoryId} categoryId={categoryId} isLoading={isLoading} mainCategory={mainCategory} index={index} key={index} mainCategoryName={mainCategory?.category_name} mainCategoryId={mainCategory?.category_id} subCategories={mainCategory?.subcategories} />
            ))
            }
          </div>
        </div>
      </section>
      <ProductModal />
    </>
  )
}
export default HomeProductCard