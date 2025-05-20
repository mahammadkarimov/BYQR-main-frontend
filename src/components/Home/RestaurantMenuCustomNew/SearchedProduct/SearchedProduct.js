import React, { useEffect } from 'react'
import styles from './stlye.module.css'
import Image from 'next/image'
import manat from '../../../../assets/icons/Home/manat.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const SearchedProduct = ({ searchedMeals, pathname, router, restaurantData }) => {
    return (
        <div className='ml-4 mr-4 my-4 h-auto'>
            {searchedMeals?.data?.results?.map((meal) => (
                meal?.is_active ?
                    <div key={meal?.slug} className={styles.productCard} onClick={undefined} >
                        
                      
                            <div className={styles.cardHead}>
                                <h4>{meal?.name}</h4>
                                <div>{(meal?.ingredient)?.length > 84 ? (meal?.ingredient)?.slice(0, 84) + '...' : meal?.ingredient}</div>
                            </div>
                            <div className={styles.cardFooter}>
                                <div className='flex items-center'>
                                    <span>{meal?.price}</span>
                                    {restaurantData?.data?.currency[0]?.name === 'tenqe' ?
                                        <span className={`${styles.manat} pl-1`}>₸</span>
                                        :
                                        <Image src={manat} className={styles.manat} width={500} height={500} loading='lazy' alt='manat' />
                                    }                                </div>
                                {/* <div className={styles.productType}>
                             <div>
                                 <Image src={donut} alt='product-type' />
                             </div>
                             <div>
                                 <Image src={donut} alt='product-type' />
                             </div>

                             <div>
                                 <Image src={donut} alt='product-type' />
                             </div>
                             <div>
                                 <Image src={donut} alt='product-type' />
                             </div>
                         </div> */}
                            </div>
                       
                    </div>
                    :
                    <div className='relative'>
                        <div className={`${styles.productCard} ${styles.deactiveProductCard}`} onClick={undefined} >
                            <div className={styles.productCardLeft}>
                                <img src={meal?.image} className={styles.productImg} loading='lazy' alt='product-image' />
                                {/* <div className={styles.favorite}>
                                 <Image src={heart} alt='heart' />
                             </div> */}
                            </div>
                            <div className={styles.productCardRight}>
                                <div className={styles.cardHead}>
                                    <h4>{meal?.name}</h4>
                                    <div>{meal?.ingredient}</div>
                                </div>
                                <div className={styles.cardFooter}>
                                    <div className='flex items-center'>
                                        <span>{meal?.price}</span>
                                        {restaurantData?.data?.currency[0]?.name === 'tenqe' ?
                                            <span className={`${styles.manat} pl-1`}>₸</span>
                                            :
                                            <Image src={manat} className={styles.manat} width={500} height={500} loading='lazy' alt='manat' />
                                        }
                                        {/* <Image src={manat} className={styles.manat} width={700} height={700} alt='manat' /> */}
                                    </div>
                                    {/* <div className={styles.productType}>
                                     <div>
                                         <Image src={donut} alt='product-type' />
                                     </div>
                                     <div>
                                         <Image src={donut} alt='product-type' />
                                     </div>

                                     <div>
                                         <Image src={donut} alt='product-type' />
                                     </div>
                                     <div>
                                         <Image src={donut} alt='product-type' />
                                     </div>
                                 </div> */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.soldOut}>
                            <button>Sold out</button>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default SearchedProduct