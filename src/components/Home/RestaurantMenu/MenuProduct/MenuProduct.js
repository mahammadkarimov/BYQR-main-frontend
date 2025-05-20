import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import heart from '../../../../assets/icons/Home/heart.svg'
import manat from '../../../../assets/icons/Home/manat.svg'
import styles from './style.module.css'

const MenuProduct = ({ router, restaurantData, setVisibleId, setVisibleSubcategoryId, setCategoryIndex, pathname }) => {
    const divRefs = useRef([])
    const subcategoryRefs = useRef([])
    const restaurant_image = ["chiochiosan","shur","vynobaku","urfasofrasi","crazzymosquito"]
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [showPortionPopup, setShowPortionPopup] = useState(false)
    

    useEffect(() => {
        if (typeof window !== 'undefined' && divRefs.current.length > 0) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setCategoryIndex(entry.target.getAttribute('data-index'))
                            console.log(entry.target.getAttribute('data-index'))
                            setVisibleId(entry.target.id);
                        }
                    });
                },
                {
                    threshold: 0.01,
                }
            );

            divRefs.current.forEach(div => {
                if (div) observer.observe(div);
            });

            return () => {
                divRefs.current.forEach(div => {
                    if (div) observer.unobserve(div);
                });
            };
        } else {
            console.log("divRefs.current boş veya tanımlı değil");
        }
    }, [restaurantData, divRefs.current]);


    useEffect(() => {
        const handleScroll = () => {
            const currentSubcategory = subcategoryRefs.current.find(ref => {
                if (!ref) return false;
                const rect = ref.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight * 0.8;
            });

            if (currentSubcategory) {
                setVisibleSubcategoryId(currentSubcategory.id);
            }
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [restaurantData])

    return (
        <>
            {restaurantData?.data?.meals?.map((mealCategory, index) => (
                mealCategory?.is_active &&
                <div className='px-3 mb-[29px]' ref={el => divRefs.current[index] = el}
                    key={mealCategory?.category_id} id={mealCategory?.category_id} data-index={index}>
                    <div>
                        <div className='mb-3'>
                            <div className={styles.categoryHead}>
                                <h3>{mealCategory?.category_name}</h3>
                                <span>{`${mealCategory?.subcategories[0]?.name ? mealCategory?.subcategories[0]?.name + ',' : ''} ${mealCategory?.subcategories[1]?.name ? mealCategory?.subcategories[1]?.name + ',' : ''} ${mealCategory?.subcategories[2]?.name ? mealCategory?.subcategories[2]?.name : ''}`}</span>
                            </div>
                            <div>
                          
                                                                <img className={styles.categoryImage} src={mealCategory?.category_icon} loading='lazy' width={500} height={500} alt='category-image' />
                                                        
                                
                            </div>
                            <div>
                                {
                                    mealCategory?.subcategories?.filter(subcategory => subcategory?.is_active).map((subcategory) => (
                                        <div key={subcategory?.id} id={subcategory?.id} ref={el => subcategoryRefs.current[subcategory?.id] = el}>
                                            <div className={styles.subcategoryName}>{subcategory.name}</div>
                                            {subcategory?.image  &&
                                            
                                                <div  className='mb-6'>
                                                    <img className={styles.categoryImage} src={subcategory?.image} loading='lazy' width={500} height={500} alt='category-image' />
                                                </div>
                                            }
                                            {subcategory?.meals?.map((meal) => (
                                                meal?.is_active ?
                                                <div 
                                                key={meal?.slug} 
                                                className={styles.productCard}  
                                                onClick={subcategory.is_image || meal?.sizes?.length > 1 && meal?.sizes[0]?.price && meal?.sizes[1]?.price ? () => router.push(`${pathname}/${meal?.slug}`) : undefined}
                                              >
                                              
                                                        <div className={styles.productCardLeft}>
                                                            {subcategory.is_image && (
                                                                <img src={meal?.image} loading='lazy' className={styles.productImg} alt='product-image' />
                                                            )}
                                                            
                                                            {/* <div className={styles.favorite}>
                                                            <Image src={heart} alt='heart' />
                                                        </div> */}
                                                        </div>
                                                        <div className={styles.productCardRight}>
                                                            <div className={styles.cardHead}>
                                                                <h4 >{meal?.name}</h4>
                                                                <div>{meal?.ingredient}</div>
                                                            </div>
                                                            <div className={styles.cardFooter}>
                                                                <div className='flex items-center'>
                                                                    <span>{meal?.price == 0 ? '' : meal?.price}</span>
                                                                    {meal?.price != 0 && (restaurantData?.data?.currency[0]?.name === 'tenqe' ?
                                                                        <span className={`${styles.manat} pl-1`}>₸</span>
                                                                        :
                                                                        <Image src={manat} className={styles.manat} width={500} height={500} loading='lazy' alt='manat' />)
                                                                    }
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
                                                    :
                                                    <div className='relative'>
                                                       <div 
  key={meal?.slug} 
  className={styles.productCard}  
  onClick={restaurantData?.data?.username !== 'notes' ? () => router.push(`${pathname}/${meal?.slug}`) : undefined}
>

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
                                                                            <Image src={manat} className={styles.manat} loading='lazy' width={500} height={500} alt='manat' />
                                                                        }
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
                                    ))
                                }

                                {/* <div className='relative'>
                                <div className={`${styles.productCard} ${styles.deactiveProductCard}`} onClick={() => router.push('menu/menu-detail')} >
                                    <div className={styles.productCardLeft}>
                                        <Image src={demoProduct} className={styles.productImg} alt='product-image' />
                                        <div className={styles.favorite}>
                                            <Image src={heart} alt='heart' />
                                        </div>
                                    </div>
                                    <div className={styles.productCardRight}>
                                        <div className={styles.cardHead}>
                                            <h4>Cheesecake</h4>
                                            <div>granulated sugar, cream cheese, vanilla extract</div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <div>
                                                <span>$10 - $15</span>
                                            </div>
                                            <div className={styles.productType}>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.soldOut}>
                                    <button>Sold out</button>
                                </div>
                            </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MenuProduct
