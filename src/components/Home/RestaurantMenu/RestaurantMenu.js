import React, { useEffect, useState } from 'react'
import MenuHead from './MenuHead/MenuHead'
import MenuSecondArea from './MenuSecondArea/MenuSecondArea'
import MenuProduct from './MenuProduct/MenuProduct'
import PoweredByqr from '@/components/common/PoweredByqr/PoweredByqr'
import PoweredAgabala from '@/components/common/PoweredAgabala/index'
import HomeCategoriesName from '../HomeCategories/HomeCategoriesName/HomeCategoriesName'
import SideBar from './SideBar/SideBar'
import TopArrow from './TopArrow/TopArrow'
import SearchArea from './SearchArea/SearchArea'
import SearchedProduct from './SearchedProduct/SearchedProduct'
import ProductPopup from './ProductPopup/index'
import ChooseLang from '../ChooseLang/ChooseLang'


const RestaurantMenu = ({ t, searchParams, router, pathname, restaurantData, searchedMeals, setSearchedMeal, searchedMeal }) => {
    const [isActiveSidebar, setIsActiveSidebar] = useState(false)
    const [isActiveLang, setIsActiveLang] = useState(false)
    const [visibleId, setVisibleId] = useState();
    const [visibleSubcategoryId, setVisibleSubcategoryId] = useState()
    const [previousScrollPosition, setPreviousScrollPosition] = useState(0)
    const [categoryIndex, setCategoryIndex] = useState(0)
    const restaurantUsername = pathname.split('/')[2]

    useEffect(() => {
        const isActiveSearch = searchParams.get('search') ?? null
        if (isActiveSidebar || isActiveSearch) {
            setPreviousScrollPosition(window.scrollY)
            document.body.style.position = 'fixed'
            document.body.style.top = `-${previousScrollPosition}px`
            document.body.style.width = '100%'
        } else {
            document.body.style.position = ''
            document.body.style.top = ''
            window.scrollTo(0, previousScrollPosition)
        }

        return () => {
            document.body.style.position = ''
            document.body.style.top = ''
        }
    }, [isActiveSidebar, searchParams.get('search'), previousScrollPosition])

    return (
        <div className='max-w-5xl mx-auto' id='restaurantEntryContain'>
            <MenuHead restaurantData={restaurantData} setIsActiveSidebar={setIsActiveSidebar} router={router} pathname={pathname} />
            <MenuSecondArea restaurantData={restaurantData} t={t} router={router} />
            <HomeCategoriesName setCategoryIndex={setCategoryIndex} categoryIndex={categoryIndex} visibleId={visibleId} visibleSubcategoryId={visibleSubcategoryId} restaurantData={restaurantData} restaurantUsername={restaurantUsername} />
            <MenuProduct pathname={pathname} setCategoryIndex={setCategoryIndex} setVisibleId={setVisibleId} setVisibleSubcategoryId={setVisibleSubcategoryId} restaurantData={restaurantData} router={router} />
            {restaurantData?.data?.username !== 'agabala' && <PoweredByqr />}
            {restaurantData?.data?.username === 'agabala' && <PoweredAgabala />}
            <SideBar t={t} setIsActiveLang={setIsActiveLang} pathname={pathname} restaurantData={restaurantData} setIsActiveSidebar={setIsActiveSidebar} isActiveSidebar={isActiveSidebar} />
            <ChooseLang t={t} allData={restaurantData} pathname={pathname} setIsActiveLang={setIsActiveLang} isActiveLang={isActiveLang} />
            <TopArrow />
            <SearchArea t={t} restaurantData={restaurantData} searchParams={searchParams} router={router} pathname={pathname} searchedMeal={searchedMeal} searchedMeals={searchedMeals} setSearchedMeal={setSearchedMeal} />
            {/* <ProductPopup /> */}
        </div>
    )
}

export default RestaurantMenu