'use client'
import React, { useState } from 'react'
import styles from './search.module.css'
import Image from 'next/image'
import magnifying from '../../../assets/images/Home/home-magnifying.svg'
import close from '../../../assets/icons/HomeSearch/close.svg'
import noResult from '../../../assets/images/HomeSearch/noResult.svg'
import { useRef } from 'react'
import { useQuery } from 'react-query'
import { GetMealsWithName } from '@/services/api/dataApi'
import SearchTwiceCard from './SearchTwiceCard/SearchTwiceCard'
import style from '../../../app/[locale]/[restaurant]/favorites/favorites.module.css'
import { useTranslations } from 'use-intl'
import ProductModal from '../ProductModal/ProductModal'
import { useDebounce } from '@/hooks/useDebounce'
import TwiceCards from '../TwiceCards/TwiceCards'


const Search = () => {
  const t = useTranslations('Home')
  const [isActiveSearch, setIsActiveSearch] = useState()
  const [isActiveCloseBtn, setActiveCloseBtn] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const [searchedMeal, setSearchedMeal] = useState()
  const searchInpRef = useRef(null)
  const debouncedValue = useDebounce(searchedMeal, 250)

  const { data: searchedMeals } = useQuery(
    ['searchedMeal', debouncedValue],
    () => GetMealsWithName(debouncedValue)
  )

  const handleSearch = (e) => {
    if (e.target.value.length <= 30) {
      setSearchedMeal(e.target.value)
      console.log(searchedMeals?.data?.length)
      if (searchedMeals?.data?.length < 1) {
        setErrMessage(e.target.value)
      } else {
        setErrMessage('')
        setSearchedMeal(e.target.value)
      }
      setIsActiveSearch(true)
      setActiveCloseBtn(false)
    } else {
      setErrMessage('')
      setIsActiveSearch(false)
    }
  }

  return (
    <>
      <div className="pt-[25px] bg-white flex items-center">
        <div className={`${styles['search-inp-area']}`}>
          {/* <Image src={magnifying} alt="magnifying" /> */}
          <input
            type="text"
            ref={searchInpRef}
            value={searchedMeal}
            onChange={handleSearch}
            placeholder={t('Search meal, drink')}
            className={styles.searchInput}
          />
          {/* {(isActiveSearch && !isActiveCloseBtn) && <Image src={close} className={styles.closeBtn} onClick={() => handleDeleteSearch()} alt='close' />} */}
        </div>
        {/* <div>
                    {isActiveSearch && <button onClick={() => closeSearchInp()} className={styles['search-cancel']}>{t('Cancel')}</button>}
                </div> */}
      </div>
      <div
        className={style['twiceCardsContainer']}
        style={{ marginTop: '80px' }}
      >
        {errMessage ? (
          <div>
            <div className={styles.noResultHead}>Nəticə "{errMessage}"</div>
            <div className={styles.noResultBody}>
              <div className="flex flex-col items-center w-[300px]">
                <Image
                  src={noResult}
                  className={styles.noResultImg}
                  alt="no-result"
                />
                <span>No result for "{errMessage}"</span>
                <span>Try to enter another keyword that related</span>
              </div>
            </div>
          </div>
        ) : (
          searchedMeals?.data?.map((product, index) => (
            <SearchTwiceCard
              index={index}
              product={product}
              text={product?.name}
              imageSrc={product?.image}
            />
          ))
        )}
      </div>
      <ProductModal />
    </>
  )
}

export default Search
