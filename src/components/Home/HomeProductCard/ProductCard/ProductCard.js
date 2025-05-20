'use client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import TwiceCards from '@/components/common/TwiceCards/TwiceCards'

const ProductCard = ({ mainCategory, index, subCategories, mainCategoryName, mainCategoryId, isLoading, setCategoryId, categoryId }) => {
  return (
    <>
      {
        isLoading ? (
          <>
            <Skeleton
              count={2}
              height={244}
              width={600}
              containerClassName="w-full flex gap-2 px-2.5"
              style={{ borderRadius: '12px 12px 0px 0px' }}
            />
          </>
        ) :
          <>
            <TwiceCards
              setCategoryId={setCategoryId}
              categoryId={categoryId}
              index={index}
              mainCategory={mainCategory}
              subCategories={subCategories}
              mainCategoryName={mainCategoryName}
              mainCategoryId={mainCategoryId}
            />
          </>
      }
    </>
  )
}

export default ProductCard
