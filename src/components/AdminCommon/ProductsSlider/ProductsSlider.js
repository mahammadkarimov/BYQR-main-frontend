'use client'
import Image from 'next/image'
import React from 'react'

import noImage from '../../../assets/images/Admin/AdminProducts/noImage.png'

const ProductsSlider = ({ selectedFile }) => {
  return (
    <>
      <Image
        className="w-full h-full object-cover"
        src={selectedFile ? selectedFile : noImage}
        width={1000}
        height={1000}
        unoptimized
        alt="First slide"
      />
    </>
  )
}

export default ProductsSlider
