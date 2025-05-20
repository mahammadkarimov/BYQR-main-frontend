'use client'
import React, { useEffect, useState } from 'react'
import leftArr from '../../../assets/icons/Admin/mainAdmin/leftArr.svg'
import Image from 'next/image'
import styles from './style.module.css'
import BasketMeals from './BasketMeals/page'
import { useRouter } from 'next/navigation'

const index = () => {
  const [currentBasket, setCurrentBasket] = useState([])

  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('cartData')) {
      const cartData = localStorage.getItem('cartData')
      try {
        const currentCartData = JSON.parse(cartData)
        if (Array.isArray(currentCartData)) {
          setCurrentBasket(currentCartData)
        } else {
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    }
  }, [])

  const deleteAllProduct = () => {
    localStorage.setItem('cartData', [])
    setCurrentBasket([])
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftArr} onClick={() => router.back()}>
          <Image src={leftArr} alt='left-arrow' />
        </div>
        <div>
          <h3>Order</h3>
        </div>
      </div>
      <BasketMeals
        setCurrentBasket={setCurrentBasket}
        currentBasket={currentBasket}
      />
      <div onClick={deleteAllProduct} className={styles.deleteAllProduct}>
        <button>Delete All Products</button>
      </div>
    </>
  )
}

export default index
