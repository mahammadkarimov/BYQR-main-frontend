import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import leftArrow from '../../../../assets/icons/Home/leftArrow.svg'
import SearchedProduct from '../SearchedProduct/SearchedProduct'

const SearchArea = ({ t, searchedMeal, searchedMeals, setSearchedMeal, searchParams, pathname, router, restaurantData }) => {

    const handleSearch = (e) => {
        if (e.target.value.length <= 30) {
            setSearchedMeal(e.target.value)
        }
    }

    return (
        <>
            {searchParams.get('search') ?
                <div className={styles.bgWhite}>
                    <div className='flex items-center'>
                        <div className={styles.leftArrow} onClick={() => router.back()}>
                            <Image src={leftArrow} alt='left-arrow' />
                        </div>
                        <div className={styles.searchInp}>
                            <div>
                                <input className='focus:ring-0' type="text" placeholder={t('Search for something tasty') + '....'} value={searchedMeal} onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <SearchedProduct restaurantData={restaurantData} router={router} pathname={pathname} searchedMeals={searchedMeals} />
                </div> : null
            }
        </>
    )
}

export default SearchArea