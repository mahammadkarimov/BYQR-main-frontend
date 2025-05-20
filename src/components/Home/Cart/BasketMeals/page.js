import React from 'react'
import styles from './style.module.css'
import styles2 from '../../../../components/Home/RestaurantMenu/MenuProduct/style.module.css'
import manat from '../../../../assets/icons/Home/manat.svg'
import trash from '../../../../assets/icons/Home/trash.svg'
import Image from 'next/image'

const page = ({ currentBasket, setCurrentBasket }) => {
  console.log(currentBasket)

  const handleDeleteProduct = mealId => {
    const filteredProduct = currentBasket.filter(el => el.id !== mealId)
    localStorage.setItem('cartData', JSON.stringify(filteredProduct))
    setCurrentBasket(filteredProduct)
  }

  return (
    <div className={styles.container}>
      {currentBasket.map(meal => (
        <div className='flex gap-2 items-center' key={meal.id}>
          <div className={styles2.productCard}>
            <div className={styles2.productCardLeft}>
              <img
                src={meal?.images?.[0]?.image}
                loading='lazy'
                className={styles2.productImg}
                alt='product-image'
              />
            </div>
            <div className={styles2.productCardRight}>
              <div className={styles2.cardHead}>
                <h4>{meal.name}</h4>
                <div>{meal.ingredient}</div>
              </div>
              <div className={styles2.cardFooter}>
                <div className='flex items-center'>
                  <span>{meal.price}</span>
                  <Image
                    src={manat}
                    className={styles2.manat}
                    width={500}
                    height={500}
                    loading='lazy'
                    alt='manat'
                  />
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => handleDeleteProduct(meal.id)}>
            <Image src={trash} alt='trash' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default page
