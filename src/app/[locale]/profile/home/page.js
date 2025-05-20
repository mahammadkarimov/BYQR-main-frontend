'use client'
import HomeNavbar from '@/components/common/HomeNavbar/HomeNavbar'
import ProfileHomeCategories from '@/components/common/ProfileHomeCategories/ProfileHomeCategories'
import ProfileHomeHeader from '@/components/common/ProfileHomeHeader/ProfileHomeHeader'
import ProfileMainCourse from '@/components/common/ProfileMainCourse/ProfileMainCourse'
import SearchFilterModal from '@/components/Home/SearchFilterModal/SearchFilterModal'
import MainCourse from '@/components/Profile/MainCourse/MainCourse'
import PopularRecipes from '@/components/Profile/PopularRecipes/PopularRecipes'
import React from 'react'

const page = () => {
    return (
        <>
            <section>
                <ProfileHomeHeader />
                <PopularRecipes />
                <MainCourse />
                <HomeNavbar />
            </section>
            <SearchFilterModal />
        </>
    )
}

export default page